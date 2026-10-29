import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import {
  CONTENT_DIR,
  contentCommitMessage,
  mergeScopedEntry,
  resolveContentPath,
  scopedCollection,
  serializeContentFile,
} from "./content-file.ts";

const ALLOWED = ["home.json", "governance.json", "faculty.json"];

describe("resolveContentPath", () => {
  it("maps a registered file to its repo-relative path", () => {
    assert.equal(resolveContentPath("home.json", ALLOWED), `${CONTENT_DIR}/home.json`);
  });

  it("refuses anything not on the allowlist", () => {
    for (const file of [
      "unknown.json",
      "home.schema.json",
      "_schema/asset-keys.json",
      "",
    ]) {
      assert.equal(resolveContentPath(file, ALLOWED), null, file);
    }
  });

  it("refuses paths that would escape the content directory", () => {
    for (const file of [
      "../next.config.ts",
      "../../package.json",
      "./home.json",
      "/etc/passwd",
      "home.json/../../.github/workflows/deploy.yml",
    ]) {
      assert.equal(resolveContentPath(file, ALLOWED), null, file);
    }
  });
});

describe("serializeContentFile", () => {
  it("matches the formatting the content files already use", () => {
    assert.equal(
      serializeContentFile({ a: 1, b: [2, 3] }),
      '{\n  "a": 1,\n  "b": [\n    2,\n    3\n  ]\n}\n',
    );
  });

  it("ends with exactly one newline", () => {
    const out = serializeContentFile({ a: 1 });
    assert.equal(out.endsWith("}\n"), true);
    assert.equal(out.endsWith("}\n\n"), false);
  });

  it("preserves the submitted key order so diffs stay small", () => {
    const out = serializeContentFile({ z: 1, a: 2, m: 3 });
    assert.deepEqual(
      [...out.matchAll(/"(\w)":/g)].map((m) => m[1]),
      ["z", "a", "m"],
    );
  });

  it("round-trips through JSON.parse", () => {
    const value = { $schema: "./home.schema.json", hero: [{ title: "A “quoted” title" }] };
    assert.deepEqual(JSON.parse(serializeContentFile(value)), value);
  });
});

describe("scopedCollection", () => {
  it("names the map departments are published one at a time from", () => {
    assert.equal(scopedCollection("departments.json"), "departments");
  });

  it("names the map page document lists are published one at a time from", () => {
    assert.equal(scopedCollection("documents.json"), "pages");
  });

  it("is null for the files that publish whole", () => {
    for (const file of ["home.json", "faculty.json", "news.json", "placements.json"]) {
      assert.equal(scopedCollection(file), null, file);
    }
  });
});

describe("mergeScopedEntry", () => {
  const head = {
    $schema: "./departments.schema.json",
    departments: {
      "civil-engg": { name: "Civil Engineering" },
      mba: { name: "MBA" },
    },
  };

  const merge = (key: string, entry: unknown) =>
    mergeScopedEntry({ head, collection: "departments", key, entry });

  it("replaces one entry and leaves the rest of the file alone", () => {
    const result = merge("mba", { name: "MBA", tagline: "New" });
    assert.equal(result.ok, true);
    assert.deepEqual(result.ok && result.data, {
      $schema: "./departments.schema.json",
      departments: {
        "civil-engg": { name: "Civil Engineering" },
        mba: { name: "MBA", tagline: "New" },
      },
    });
  });

  it("keeps the entry where it was, so the diff is one department", () => {
    const result = merge("civil-engg", { name: "Civil Engineering", tagline: "New" });
    assert.equal(result.ok, true);
    const departments = result.ok
      ? (result.data.departments as Record<string, unknown>)
      : {};
    assert.deepEqual(Object.keys(departments), ["civil-engg", "mba"]);
  });

  it("refuses a key the file does not already hold", () => {
    for (const key of ["pg/nothing", "__proto__", "constructor", ""]) {
      const result = merge(key, { name: "X" });
      assert.equal(result.ok, false, key);
    }
  });

  it("refuses a file that is not shaped like the collection it names", () => {
    assert.equal(
      mergeScopedEntry({ head: [1, 2], collection: "departments", key: "mba", entry: {} }).ok,
      false,
    );
    assert.equal(
      mergeScopedEntry({ head: { departments: [] }, collection: "departments", key: "mba", entry: {} })
        .ok,
      false,
    );
  });

  it("does not mutate the document it was given", () => {
    merge("mba", { name: "Changed" });
    assert.deepEqual(head.departments.mba, { name: "MBA" });
  });
});

describe("contentCommitMessage", () => {
  it("is a conventional commit naming the file and the editor", () => {
    assert.equal(
      contentCommitMessage("home.json", "Shivanand Kulkarni"),
      "chore(content): update home.json via Admin\n\nEdited by Shivanand Kulkarni.",
    );
  });

  it("keeps the subject line under 72 characters", () => {
    for (const file of ["departments.json", "governance.json", "placements.json", "documents.json"]) {
      const subject = contentCommitMessage(file, "Someone").split("\n")[0];
      assert.ok(subject.length < 72, `${subject} is ${subject.length} chars`);
    }
  });

  it("flattens a name that would otherwise inject commit lines", () => {
    const message = contentCommitMessage(
      "home.json",
      "Real Name\n\nCo-Authored-By: Someone Else <x@y.z>",
    );
    assert.equal(message.split("\n").length, 3);
    assert.equal(
      message,
      "chore(content): update home.json via Admin\n\nEdited by Real Name Co-Authored-By: Someone Else <x@y.z>.",
    );
  });
});
