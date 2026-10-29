/**
 * Reading the site's own source for every asset it references.
 *
 * **Build time and tests only.** It walks the source tree with `node:fs`, which
 * a deployed function does not have — the result is baked into
 * `src/data/asset-references.ts` by `scripts/build-asset-references.mjs` and it
 * is that generated file the cleanup screen reads.
 *
 * Three kinds of reference exist (see [10]):
 *
 *   asset("documents/naac/ssr.pdf")     a literal key    → collected here
 *   assetsUnder("cells/step/")          a literal folder → protected by name
 *   asset(`facilities/hostels/${x}`)    built at runtime → invisible; the file
 *                                                          must be acknowledged
 *
 * The third kind is why this also reports *where* interpolation is used. A new
 * template-literal call site nobody protected would make ~80 files on live
 * pages look deletable, so `protected-prefixes.test.ts` fails on an unlisted
 * one.
 *
 * A regex rather than a parser: the input is our own source, the output is
 * filtered through `isAssetKeyShaped`, and over-collecting is harmless — a
 * string that is not really a key protects nothing that exists.
 */

import { readdirSync, readFileSync } from "node:fs";
import { isAssetKeyShaped } from "../asset-key-shape.ts";

export type SourceScan = {
  /** Asset keys written out in full somewhere in the code. */
  keys: string[];
  /** Folders handed to `assetsUnder` as a literal. */
  prefixes: string[];
  /** Files that build a key, or name a folder, at runtime — src-relative. */
  dynamicFiles: string[];
};

const SKIP = new Set([
  // The manifest is the *inventory*, not a reference: every key on R2 is in it,
  // so scanning it would protect the whole bucket and find nothing to clean.
  "data/asset-manifest.ts",
  // This scan's own output. Reading it back would make every key it ever
  // listed protect itself, so a list moved out of the code into a content
  // file would never leave it.
  "data/asset-references.ts",
  // The Admin is not the site. Its gallery registry lists every prefix and its
  // comments quote `assetsUnder("some/prefix/")`; neither draws a page.
  "lib/admin",
]);

/**
 * Every .ts/.tsx under `dir`, src-relative — minus tests, whose fixtures are
 * invented keys ("a/b.webp") that reference nothing and would protect nothing.
 */
export function sourceFiles(dir: string): string[] {
  const out: string[] = [];
  const walk = (relative: string): void => {
    for (const entry of readdirSync(`${dir}${relative}`, { withFileTypes: true })) {
      const next = `${relative}/${entry.name}`;
      if (SKIP.has(next.slice(1))) continue;
      if (entry.isDirectory()) walk(next);
      else if (/\.tsx?$/.test(entry.name) && !/\.test\.tsx?$/.test(entry.name)) {
        out.push(next.slice(1));
      }
    }
  };
  walk("");
  return out.sort();
}

// Quoted strings, one pattern per quote style. Backticks are matched only when
// they hold no `${` — an interpolated key is not a key we can read.
const LITERALS = [/"((?:[^"\\\n]|\\.)*)"/g, /'((?:[^'\\\n]|\\.)*)'/g, /`([^`\\$]*)`/g];

/** Literal first argument of `assetsUnder(...)`, wrapped onto the next line or not. */
const ASSETS_UNDER = /assetsUnder\(\s*(["'])([^"'\n]+)\1/g;

/**
 * A key **built** from a template literal — ``asset(`hostels/${block}/1.webp`)``.
 * The one reference no scan can follow, and the reason folders are protected
 * rather than keys. `asset(variable)` is deliberately not here: those pass a
 * string that came out of a content file, and content is scanned by
 * set-membership, so the key is already accounted for.
 */
const TEMPLATE_BUILT = /\basset(?:sUnder)?\(\s*`[^`]*\$\{/g;

/**
 * A *folder* handed to `assetsUnder` as anything but a literal — the gallery
 * page's `assetsUnder(album.prefix)`. The same problem one level up: a whole
 * folder protected by a name this scan cannot read.
 */
const VARIABLE_PREFIX = /(?<!function )\bassetsUnder\(\s*(?!["'`])[A-Za-z_$]/g;

/** What one source tree references. `srcDir` must end without a trailing slash. */
export function scanSource(srcDir: string): SourceScan {
  const keys = new Set<string>();
  const prefixes = new Set<string>();
  const dynamicFiles = new Set<string>();

  for (const file of sourceFiles(srcDir)) {
    const text = readFileSync(`${srcDir}/${file}`, "utf8");

    for (const pattern of LITERALS) {
      for (const [, value] of text.matchAll(pattern)) {
        if (value && isAssetKeyShaped(value)) keys.add(value);
      }
    }
    for (const [, , prefix] of text.matchAll(ASSETS_UNDER)) prefixes.add(prefix);
    for (const pattern of [TEMPLATE_BUILT, VARIABLE_PREFIX]) {
      if (pattern.test(text)) dynamicFiles.add(file);
      pattern.lastIndex = 0;
    }
  }

  return {
    keys: [...keys].sort(),
    prefixes: [...prefixes].sort(),
    dynamicFiles: [...dynamicFiles].sort(),
  };
}
