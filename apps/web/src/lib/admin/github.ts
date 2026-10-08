/**
 * The write path for every Publish: content edits are git commits.
 *
 * Reads come from repo HEAD rather than the deployed bundle, so an Editor who
 * saves twice in a row sees their first edit in the second form instead of the
 * stale copy baked into the running deployment.
 *
 * Commits go through the Git Data API — blobs into a tree, tree into a commit,
 * commit onto the ref — rather than the one-file-at-a-time Contents API,
 * because an image upload has to land its R2 manifest entry, its asset-keys
 * entry and the content file that references it in a *single* commit, or a
 * half-applied deploy ships a broken image.
 */

const OWNER = "pratikpakhale";
const REPO = "BEC";

/**
 * The branch every read and every Publish goes to.
 *
 * `main` is what Vercel deploys to Production, which is precisely what makes
 * it unusable for a rehearsal: there is no such thing as a practice publish on
 * the branch the public reads. Point `GITHUB_CONTENT_BRANCH` at a sandbox
 * branch in `.env.local` and the entire Admin works against it end to end —
 * Vercel builds that branch as a Preview, so "saved → live" still means
 * something real, and nothing on becbgk.edu moves.
 *
 * Deliberately not a per-request choice: an Editor must never be one dropdown
 * away from publishing to the wrong branch, and a screen that reads one branch
 * while saving to another would silently discard their work.
 */
const PRODUCTION_BRANCH = "main";
export const BRANCH = process.env.GITHUB_CONTENT_BRANCH?.trim() || PRODUCTION_BRANCH;

/** True on the branch the public actually reads. */
export const isProductionBranch = BRANCH === PRODUCTION_BRANCH;

/** Content files live here relative to the repo root. */
export const CONTENT_DIR = "apps/web/content";

const API = "https://api.github.com";

export class GitHubError extends Error {
  // Declared rather than a constructor parameter property: Node runs these
  // modules with strip-only type stripping, which rejects those.
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "GitHubError";
    this.status = status;
  }
}

export class GitHubTokenMissingError extends Error {
  constructor() {
    super("GITHUB_CONTENT_TOKEN is not set on this deployment.");
    this.name = "GitHubTokenMissingError";
  }
}

/**
 * Why a read failed, in the only three ways an Editor would act on differently:
 * the file is not in the repository, the deployment was never given a token, or
 * GitHub is having a bad minute. Anything else is worth a retry, so it reads as
 * `unreachable` — the honest default when we do not know.
 */
export type LoadFailure = "missing" | "unconfigured" | "unreachable";

export function loadFailure(error: unknown): LoadFailure {
  if (error instanceof GitHubTokenMissingError) return "unconfigured";
  if (error instanceof GitHubError && error.status === 404) return "missing";
  return "unreachable";
}

async function gh<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = process.env.GITHUB_CONTENT_TOKEN;
  if (!token) throw new GitHubTokenMissingError();

  const res = await fetch(`${API}${path}`, {
    ...init,
    // Never serve an Editor a cached view of the repo: they may have published
    // seconds ago, and a stale read would silently revert their own change.
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "bec-admin",
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...init.headers,
    },
  });

  if (!res.ok) {
    const detail = await res.text();
    let message = `GitHub ${res.status} on ${path}`;
    try {
      const parsed = JSON.parse(detail) as { message?: string };
      if (parsed.message) message += `: ${parsed.message}`;
    } catch {
      if (detail) message += `: ${detail.slice(0, 200)}`;
    }
    throw new GitHubError(message, res.status);
  }

  return (await res.json()) as T;
}

/** A file's current text at repo HEAD. */
export async function readRepoFile(
  path: string,
): Promise<{ text: string; sha: string }> {
  const file = await gh<{ content: string; encoding: string; sha: string }>(
    `/repos/${OWNER}/${REPO}/contents/${encodeURI(path)}?ref=${BRANCH}`,
  );
  if (file.encoding !== "base64") {
    throw new GitHubError(`Unexpected encoding "${file.encoding}" for ${path}`, 500);
  }
  return {
    text: Buffer.from(file.content, "base64").toString("utf8"),
    sha: file.sha,
  };
}

export type CommitFile = { path: string; content: string };

export type Commit = { sha: string; url: string };

/** Head commit sha of the branch we publish to. */
async function headSha(): Promise<string> {
  const ref = await gh<{ object: { sha: string } }>(
    `/repos/${OWNER}/${REPO}/git/ref/heads/${BRANCH}`,
  );
  return ref.object.sha;
}

async function commitOnce(
  files: CommitFile[],
  message: string,
  parent: string,
): Promise<Commit> {
  const base = await gh<{ tree: { sha: string } }>(
    `/repos/${OWNER}/${REPO}/git/commits/${parent}`,
  );

  const tree = await gh<{ sha: string }>(`/repos/${OWNER}/${REPO}/git/trees`, {
    method: "POST",
    body: JSON.stringify({
      base_tree: base.tree.sha,
      tree: files.map((file) => ({
        path: file.path,
        mode: "100644",
        type: "blob",
        content: file.content,
      })),
    }),
  });

  const commit = await gh<{ sha: string; html_url: string }>(
    `/repos/${OWNER}/${REPO}/git/commits`,
    {
      method: "POST",
      body: JSON.stringify({ message, tree: tree.sha, parents: [parent] }),
    },
  );

  await gh(`/repos/${OWNER}/${REPO}/git/refs/heads/${BRANCH}`, {
    method: "PATCH",
    body: JSON.stringify({ sha: commit.sha }),
  });

  return { sha: commit.sha, url: commit.html_url };
}

/**
 * Commit `files` to the branch in one commit.
 *
 * Last-write-wins by design: if someone else commits between our
 * read and our ref update, GitHub rejects the non-fast-forward and we simply
 * rebuild the commit on the new head — our version of these files wins, and
 * files we did not touch keep their newer content. No conflict UX, deliberately.
 */
export async function commitFiles(
  files: CommitFile[],
  message: string,
  attempts = 3,
): Promise<Commit> {
  if (files.length === 0) throw new Error("commitFiles called with no files");

  let lastError: unknown;
  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      return await commitOnce(files, message, await headSha());
    } catch (error) {
      // 422 here means "not a fast forward" — someone published first.
      if (!(error instanceof GitHubError) || error.status !== 422) throw error;
      lastError = error;
    }
  }
  throw lastError;
}

export type DeployState = "pending" | "success" | "failure";

export type DeployStatus = {
  state: DeployState;
  /** The live URL, once there is one. */
  deployUrl?: string;
  description?: string;
};

/**
 * Vercel's GitHub deployment states, mapped down to the three an Editor cares
 * about. Anything in flight — queued, building — is just "pending".
 */
function toDeployState(raw: string): DeployState {
  if (raw === "success") return "success";
  if (raw === "failure" || raw === "error") return "failure";
  return "pending";
}

/**
 * Whether the Editor's commit is live yet, read through the same token — no
 * Vercel API token, no extra service.
 *
 * Deployments rather than commit statuses, because a commit on `main` gets *two*
 * Vercel deployments (a Preview and a Production one) and the combined commit
 * status would happily hand the Editor a preview URL that nobody else can see.
 * Only the Production deployment answers "is my change on becbgk.edu yet?".
 */
export async function getDeployStatus(sha: string): Promise<DeployStatus> {
  const deployments = await gh<{ id: number; environment: string }[]>(
    `/repos/${OWNER}/${REPO}/deployments?sha=${sha}&per_page=20`,
  );

  // On `main` the only deployment worth reporting is Production — a Preview
  // URL would tell an Editor their change is live when the public cannot see
  // it. On a sandbox branch there is never a Production deployment, so holding
  // out for one would leave the banner spinning at "pending" for ever.
  const isProduction = (d: { environment: string }) => /^production$/i.test(d.environment);
  const deployment = isProductionBranch
    ? deployments.find(isProduction)
    : deployments.find((d) => !isProduction(d));

  // Vercel creates the deployment a few seconds after the push, so "no
  // deployment yet" is pending, not failure.
  if (!deployment) {
    return { state: "pending", description: "Waiting for the deployment to start." };
  }

  const [latest] = await gh<
    {
      state: string;
      description: string | null;
      environment_url: string | null;
      target_url: string | null;
    }[]
  >(`/repos/${OWNER}/${REPO}/deployments/${deployment.id}/statuses?per_page=1`);

  if (!latest) return { state: "pending", description: "Deployment queued." };

  return {
    state: toDeployState(latest.state),
    deployUrl: latest.environment_url || latest.target_url || undefined,
    description: latest.description ?? undefined,
  };
}
