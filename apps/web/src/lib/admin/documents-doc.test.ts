import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { serializeContentFile } from "../../content/format.ts";
import type { DocumentPage, DocumentsContent } from "../../content/schema/documents.ts";
import { mergeScopedEntry } from "./content-file.ts";
import {
  countDocuments,
  firstProblem,
  newDocument,
  newGroup,
  switchLinkKind,
  toDocument,
  toState,
} from "./documents-doc.ts";

const raw = readFileSync(
  fileURLToPath(new URL("../../../content/documents.json", import.meta.url)),
  "utf8",
);
const file = JSON.parse(raw) as DocumentsContent;
const pages = Object.entries(file.pages);

/** A deep copy, so a test can edit a page without touching the others' fixture. */
function copy(page: DocumentPage): DocumentPage {
  return JSON.parse(JSON.stringify(page)) as DocumentPage;
}

describe("documents round trip", () => {
  it("opening any page and publishing it changes nothing in the file", () => {
    for (const [id, page] of pages) {
      const merged = mergeScopedEntry({
        head: file,
        collection: "pages",
        key: id,
        entry: toDocument(toState(page), page),
      });
      assert.ok(merged.ok, id);
      assert.equal(serializeContentFile(merged.data), raw, id);
    }
  });

  it("opens every real page with nothing to fix", () => {
    const blocked = pages
      .map(([id, page]) => [id, firstProblem(toDocument(toState(page), page))] as const)
      .filter(([, problem]) => problem !== undefined)
      .map(([id, problem]) => `${id}: ${problem?.where} ${problem?.message}`);
    assert.deepEqual(blocked, []);
  });
});

describe("what the Editor can and cannot change", () => {
  const nba = file.pages.nba;

  it("keeps the page's structure from what was loaded, not from state", () => {
    const state = copy(nba);
    state.title = "Something else";
    state.folder = "elsewhere";
    delete (state.blocks as Record<string, unknown>).documents;
    const built = toDocument(state, nba);
    assert.equal(built.title, nba.title);
    assert.equal(built.folder, nba.folder);
    assert.deepEqual(Object.keys(built.blocks), Object.keys(nba.blocks));
    assert.deepEqual(built.blocks.documents.groups, []);
  });

  it("drops a cleared heading instead of publishing an empty one", () => {
    const state = copy(nba);
    state.blocks.documents.groups[0].label = "   ";
    const built = toDocument(state, nba);
    assert.equal("label" in built.blocks.documents.groups[0], false);
  });

  it("keeps a group with no documents yet, so the schema still accepts it", () => {
    const state = copy(nba);
    state.blocks.documents.groups.push(newGroup());
    const built = toDocument(state, nba);
    assert.deepEqual(built.blocks.documents.groups.at(-1), { documents: [] });
    assert.equal(firstProblem(built), undefined);
  });

  it("trims what was typed", () => {
    const state = copy(nba);
    state.blocks.documents.groups[0].documents[0].title = "  Certificate  ";
    const built = toDocument(state, nba);
    assert.equal(built.blocks.documents.groups[0].documents[0].title, "Certificate");
  });
});

describe("firstProblem", () => {
  const nba = file.pages.nba;

  it("names a new document that has no file yet, by its title", () => {
    const state = copy(nba);
    state.blocks.documents.groups[1].documents.push({ ...newDocument(), title: "Mechanical" });
    const problem = firstProblem(toDocument(state, nba));
    assert.equal(problem?.where, "Data Capturing Points › Mechanical › PDF");
    assert.match(problem?.message ?? "", /needs a PDF, or a web address/);
  });

  it("asks for a title on an untitled row, by its position", () => {
    const state = copy(nba);
    state.blocks.documents.groups[0].documents.push({ title: "", file: "documents/nba/x.pdf" });
    const problem = firstProblem(toDocument(state, nba));
    assert.equal(problem?.where, "Accreditation Certificates › Document 4 › What the link says");
    assert.match(problem?.message ?? "", /filled in/);
  });

  it("refuses a web address that is not one", () => {
    const state = copy(nba);
    state.blocks.documents.groups[0].documents[0] = { title: "Portal", url: "nba.org" };
    const problem = firstProblem(toDocument(state, nba));
    assert.equal(problem?.where, "Accreditation Certificates › Portal › Web address");
  });

  it("names the block on a page that has several", () => {
    const naac = file.pages.naac;
    const state = copy(naac);
    state.blocks.criteria.groups[0].documents[0].title = "";
    const problem = firstProblem(toDocument(state, naac));
    assert.equal(
      problem?.where,
      `${naac.blocks.criteria.label} › ${naac.blocks.criteria.groups[0].label} › Document 1 › What the link says`,
    );
  });
});

describe("switching a row between a PDF and a web address", () => {
  const nba = file.pages.nba;

  it("leaves one kind of link, keeps the title and note, and writes fields in order", () => {
    const state = copy(nba);
    const docs = state.blocks.documents.groups[0].documents;
    docs[0] = { ...docs[0], meta: "Certificate", ...switchLinkKind(true) };
    docs[0].url = "https://www.nbaind.org";
    const built = toDocument(state, nba).blocks.documents.groups[0].documents[0];
    assert.deepEqual(Object.entries(built), [
      ["title", nba.blocks.documents.groups[0].documents[0].title],
      ["url", "https://www.nbaind.org"],
      ["meta", "Certificate"],
    ]);
  });

  it("switching back asks for a PDF again", () => {
    const state = copy(nba);
    const docs = state.blocks.documents.groups[0].documents;
    docs[0] = { ...docs[0], ...switchLinkKind(true) };
    docs[0] = { ...docs[0], ...switchLinkKind(false) };
    const problem = firstProblem(toDocument(state, nba));
    assert.match(problem?.where ?? "", /› PDF$/);
  });
});

describe("countDocuments", () => {
  it("adds up every block on the page", () => {
    assert.equal(countDocuments(file.pages.naac), 158);
  });
});
