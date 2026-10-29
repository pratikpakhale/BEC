import { strict as assert } from "node:assert";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const webRoot = fileURLToPath(new URL("../..", import.meta.url));
const content = JSON.parse(readFileSync(join(webRoot, "content", "documents.json"), "utf8")) as {
  pages: Record<string, { blocks: Record<string, unknown> }>;
};

function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(path);
    return /\.tsx?$/.test(entry.name) && !entry.name.endsWith(".test.ts") ? [path] : [];
  });
}

/**
 * The other half of `documentGroups`' typing. A page asking for a block the
 * file lacks is a type error; a block the file has that *no page asks for* is
 * the quieter fault — an Editor edits it, publishes, and nothing on the site
 * changes. Every block has to be drawn somewhere.
 */
describe("content/documents.json", () => {
  it("every block is rendered by some page", () => {
    const requested = new Set<string>();
    for (const file of sourceFiles(join(webRoot, "src", "app"))) {
      const text = readFileSync(file, "utf8");
      for (const match of text.matchAll(/documentGroups\(\s*"([^"]+)",\s*"([^"]+)"\s*\)/g)) {
        requested.add(`${match[1]}/${match[2]}`);
      }
    }

    const unrendered = Object.entries(content.pages).flatMap(([page, { blocks }]) =>
      Object.keys(blocks)
        .map((block) => `${page}/${block}`)
        .filter((id) => !requested.has(id)),
    );
    assert.deepEqual(unrendered, []);
  });
});
