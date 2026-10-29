/**
 * How a content file is named, serialised and described in a commit. Pure — no
 * network, no schemas — so the publish path's non-obvious rules (path safety,
 * byte-for-byte formatting, commit-message shape) can be exercised directly.
 */

/** Content files live here relative to the repo root. */
export const CONTENT_DIR = "apps/web/content";

/**
 * Repo-relative path for a content file, or null if `file` is not one of the
 * registered files. An allowlist rather than sanitisation: the set of content
 * files is small, known, and comes from the Zod contract, so anything else —
 * `../next.config.ts`, a nested path, a schema file — is simply not a thing an
 * Editor can publish.
 */
export function resolveContentPath(file: string, allowed: readonly string[]): string | null {
  return allowed.includes(file) ? `${CONTENT_DIR}/${file}` : null;
}

export { serializeContentFile } from "../../content/format.ts";

/**
 * Content files whose top-level map may be published one entry at a time, and
 * the field that map lives under.
 *
 * Every other editor holds its whole file in the browser and sends it back
 * whole. `departments.json` is 768 KB across 18 departments and one of them is
 * 87 KB on its own, so a screen for a single department has no business
 * carrying the other seventeen there and back — and two Editors working on two
 * departments would each publish a copy of the file they loaded minutes ago,
 * quietly undoing the other. A scoped publish sends only the department that
 * was edited and the server splices it into HEAD.
 */
const SCOPED_COLLECTIONS: Record<string, string> = {
  "departments.json": "departments",
  // One site page's document lists. NAAC alone is 158 documents, and two
  // Editors updating NBA and the calendar at once must not undo each other.
  "documents.json": "pages",
};

/** The map field a file's entries live under, or null if it publishes whole. */
export function scopedCollection(file: string): string | null {
  return SCOPED_COLLECTIONS[file] ?? null;
}

export type ScopedMerge =
  | { ok: true; data: Record<string, unknown> }
  | { ok: false; error: string };

/**
 * `head` with one entry of its collection replaced by `entry`.
 *
 * The key has to be one the file already holds. The editor only ever opens a
 * department that exists, a key the catalogue has never heard of would render
 * nowhere on the site, and refusing unknown keys is also what keeps a request
 * from writing `__proto__` or a whole second collection into the document.
 * Spreading over the existing map leaves the entry exactly where it was, so a
 * scoped publish never reorders the file.
 */
export function mergeScopedEntry({
  head,
  collection,
  key,
  entry,
}: {
  head: unknown;
  collection: string;
  key: string;
  entry: unknown;
}): ScopedMerge {
  if (!head || typeof head !== "object" || Array.isArray(head)) {
    return { ok: false, error: "The published file is not in the shape this editor expects." };
  }
  const document = head as Record<string, unknown>;
  const map = document[collection];
  if (!map || typeof map !== "object" || Array.isArray(map)) {
    return { ok: false, error: `The published file has no “${collection}” to update.` };
  }
  if (!Object.prototype.hasOwnProperty.call(map, key)) {
    return { ok: false, error: `“${key}” is not one of the entries in this file.` };
  }
  return {
    ok: true,
    data: { ...document, [collection]: { ...(map as Record<string, unknown>), [key]: entry } },
  };
}

/**
 * Conventional-commit subject plus the Editor's name in the body — the whole of
 * the Admin's attribution. The name is flattened first so it cannot inject extra
 * lines (or a fake trailer) into the message.
 */
export function contentCommitMessage(file: string, editorName: string): string {
  const name = editorName.replace(/\s+/g, " ").trim();
  return `chore(content): update ${file} via Admin\n\nEdited by ${name}.`;
}
