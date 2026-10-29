import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { describe, test } from "node:test";

import {
  DYNAMIC_ASSET_SITES,
  isProtectedKey,
  PROTECTED_PREFIXES,
} from "./protected-prefixes.ts";
import { scanSource } from "./scan-references.ts";

/**
 * The control that matters most in [12]: a page that starts drawing a whole
 * folder, or builds a key from a template literal, creates files no scan can
 * see. If this list falls behind the code, the cleanup screen offers live
 * photographs for deletion — so the code is read here, not trusted.
 *
 * `pnpm build` runs the same checks (scripts/build-asset-references.mjs
 * --check); this is the copy that fails fast on `pnpm test`.
 */
const SRC = fileURLToPath(new URL("../../", import.meta.url)).replace(/\/$/, "");
const scan = scanSource(SRC);
const protectedPrefixes = new Set(PROTECTED_PREFIXES.map(({ prefix }) => prefix));

describe("PROTECTED_PREFIXES", () => {
  test("covers every folder the site draws whole", () => {
    const unprotected = scan.prefixes.filter((prefix) => !protectedPrefixes.has(prefix));
    assert.deepEqual(
      unprotected,
      [],
      `assetsUnder() draws these folders, but nothing protects them: ${unprotected.join(", ")}`,
    );
  });

  test("the scan still finds the folders we know about", () => {
    // A regex that quietly stopped matching would empty the list above and pass
    // it. The site has had at least ten of these folders for a year. Page PDF
    // lists moved to content/documents.json, which left ~150 literal keys.
    assert.ok(scan.prefixes.length >= 10, `only ${scan.prefixes.length} folders found`);
    assert.ok(scan.keys.length >= 100, `only ${scan.keys.length} literal keys found`);
  });

  test("every entry is a folder, not a file", () => {
    for (const { prefix } of PROTECTED_PREFIXES) {
      assert.ok(prefix.endsWith("/"), `${prefix} should end with a slash`);
      assert.ok(!prefix.startsWith("/"), `${prefix} should be a bare key prefix`);
    }
  });

  test("every entry says why it cannot be scanned", () => {
    for (const { prefix, why } of PROTECTED_PREFIXES) {
      assert.ok(why.trim().length > 10, `${prefix} needs a reason`);
    }
  });

  test("protects by folder, not by coincidence of name", () => {
    assert.equal(isProtectedKey("student-life/nss/camp.webp"), true);
    assert.equal(isProtectedKey("departments/cse/gallery/2024/a.webp"), true);
    assert.equal(isProtectedKey("documents/naac/ssr.pdf"), false);
  });
});

describe("DYNAMIC_ASSET_SITES", () => {
  test("every file that builds a key at runtime is acknowledged", () => {
    const acknowledged = new Set(DYNAMIC_ASSET_SITES.map((site) => site.file));
    const unlisted = scan.dynamicFiles.filter((file) => !acknowledged.has(file));
    assert.deepEqual(
      unlisted,
      [],
      `these build asset keys in code, and nothing records which folders they reach: ${unlisted.join(", ")}`,
    );
  });

  test("no entry outlives the call site it was added for", () => {
    const found = new Set(scan.dynamicFiles);
    const stale = DYNAMIC_ASSET_SITES.filter((site) => !found.has(site.file));
    assert.deepEqual(
      stale.map((site) => site.file),
      [],
      "listed as building keys at runtime, but no longer does",
    );
  });

  test("the folders they claim to cover are actually protected", () => {
    for (const { file, covers } of DYNAMIC_ASSET_SITES) {
      assert.ok(covers.length > 0, `${file} lists no folders`);
      for (const prefix of covers) {
        assert.ok(protectedPrefixes.has(prefix), `${file} covers unprotected ${prefix}`);
      }
    }
  });
});

describe("scanSource", () => {
  test("ignores the manifest, which lists every key there is", () => {
    // Scanning it would protect the whole bucket and find nothing to clean.
    assert.ok(!scan.keys.includes("gallery/life-at-bec/campus/dsc-0075.webp"));
  });

  test("reads a literal key out of a page", () => {
    assert.ok(scan.keys.some((key) => key.startsWith("administration/ict-team/")));
  });
});
