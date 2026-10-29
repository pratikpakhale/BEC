/**
 * Every asset key the site points at, assembled at request time.
 *
 * Three sources, deliberately overlapping — protection is a union, so a key
 * only has to be seen once to be safe:
 *
 *   1. `SOURCE_KEYS` — literal keys in the code, frozen at build time by
 *      `scripts/build-asset-references.mjs` (a function has no source tree).
 *   2. The content files **this deployment shipped** — free, already in memory.
 *   3. The content files **at repo HEAD** — the fresher truth. An Editor who
 *      publishes a photo at 10:00 has changed HEAD, and the deploy carrying it
 *      does not exist for another two minutes; without this read, that photo is
 *      unreferenced for exactly as long as the deploy takes.
 *
 * Keys are recognised by shape and set-membership, never by field name — a new
 * unschema'd field holding a photo would otherwise silently unprotect it ([10]).
 */

import departments from "@content/departments.json";
import documents from "@content/documents.json";
import faculty from "@content/faculty.json";
import governance from "@content/governance.json";
import home from "@content/home.json";
import news from "@content/news.json";
import placements from "@content/placements.json";
import { SOURCE_KEYS } from "../../data/asset-references.ts";
import { CONTENT_DIR } from "./content-file.ts";
import { readRepoFile } from "./github.ts";
import { collectKeyCandidates } from "./manifest-sync.ts";

const CONTENT_FILES = [
  "home.json",
  "news.json",
  "governance.json",
  "faculty.json",
  "placements.json",
  "departments.json",
  "documents.json",
] as const;

const BUNDLED: unknown[] = [home, news, governance, faculty, placements, departments, documents];

/** Same minute of staleness as the asset index: it is the same GitHub read twice. */
const CACHE_MS = 60_000;

let cached: { at: number; keys: Set<string> } | null = null;

/**
 * Keys referenced by content at HEAD. A file that will not parse is skipped
 * rather than fatal — the bundled copy still protects its keys, and refusing
 * the whole screen because one file is mid-edit would be worse than a slightly
 * older answer. A wholesale failure is caught by the caller's floor check.
 */
async function headContentKeys(): Promise<Set<string>> {
  const found = new Set<string>();
  await Promise.all(
    CONTENT_FILES.map(async (file) => {
      try {
        const { text } = await readRepoFile(`${CONTENT_DIR}/${file}`);
        for (const key of collectKeyCandidates(JSON.parse(text) as unknown)) found.add(key);
      } catch {
        // Bundled copy covers it; the floor check in findOrphans covers us.
      }
    }),
  );
  return found;
}

export async function readReferencedKeys(now = Date.now()): Promise<Set<string>> {
  if (cached && now - cached.at < CACHE_MS) return cached.keys;

  const keys = new Set<string>(SOURCE_KEYS);
  for (const data of BUNDLED) {
    for (const key of collectKeyCandidates(data)) keys.add(key);
  }
  for (const key of await headContentKeys()) keys.add(key);

  cached = { at: now, keys };
  return keys;
}

/** After a publish changes what content points at. */
export function invalidateReferences(): void {
  cached = null;
}
