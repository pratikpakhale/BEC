import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test, describe } from "node:test";
import { fileURLToPath } from "node:url";
import { isCanonicallyFormatted, serializeContentFile } from "./format.ts";

const contentDir = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "content");

describe("serializeContentFile", () => {
  test("uses 2-space indent and a trailing newline", () => {
    assert.equal(serializeContentFile({ a: 1 }), '{\n  "a": 1\n}\n');
  });

  test("preserves the key order it was given, not alphabetical order", () => {
    const text = serializeContentFile({ zebra: 1, apple: 2 });
    assert.ok(text.indexOf('"zebra"') < text.indexOf('"apple"'));
  });

  test("round-trips its own output", () => {
    const data = { title: "News", items: [{ id: "a", tags: ["x"] }] };
    const once = serializeContentFile(data);
    assert.equal(serializeContentFile(JSON.parse(once)), once);
  });
});

describe("isCanonicallyFormatted", () => {
  test("accepts its own output", () => {
    assert.equal(isCanonicallyFormatted(serializeContentFile({ a: [1, 2] })), true);
  });

  test("rejects CRLF line endings", () => {
    assert.equal(isCanonicallyFormatted('{\r\n  "a": 1\r\n}\r\n'), false);
  });

  test("rejects a missing trailing newline", () => {
    assert.equal(isCanonicallyFormatted('{\n  "a": 1\n}'), false);
  });

  test("rejects 4-space indent", () => {
    assert.equal(isCanonicallyFormatted('{\n    "a": 1\n}\n'), false);
  });

  test("rejects unparseable text rather than throwing", () => {
    assert.equal(isCanonicallyFormatted("{ not json"), false);
  });
});

// The gate this file backs only helps if the checked-in files actually pass it —
// an Editor's first Publish must be a one-line diff, not a whole-file rewrite.
describe("checked-in content files", () => {
  for (const file of [
    "home.json",
    "governance.json",
    "faculty.json",
    "placements.json",
    "departments.json",
    "documents.json",
  ]) {
    test(`content/${file} is canonically formatted`, () => {
      assert.equal(isCanonicallyFormatted(readFileSync(join(contentDir, file), "utf8")), true);
    });
  }
});
