import {
  documentPageSchema,
  type DocumentGroupContent,
  type DocumentLink,
  type DocumentPage,
} from "../../content/schema/documents.ts";
import { describeIssue } from "./field-path.ts";
import { normalizeDocument } from "./normalize.ts";

/**
 * One page of `content/documents.json` ⇄ the documents editor.
 *
 * The state is the page entry itself, as in the departments editor: rows keep
 * their handles beside them (`row-id.ts`), so nothing has to be minted on load
 * or stripped on publish. What the Editor may change is narrower than the
 * entry — the groups inside each block. The page's title, address, upload
 * folder and the set of blocks are the page's *code* talking (each block is
 * asked for by name in a `page.tsx`), so they are copied from what was loaded,
 * never from state.
 */

export type DocumentPageState = DocumentPage;

export function toState(content: DocumentPage): DocumentPageState {
  return content;
}

/** Working state → the page entry that gets published. */
export function toDocument(state: DocumentPageState, content: DocumentPage): DocumentPage {
  return {
    ...content,
    blocks: Object.fromEntries(
      Object.entries(content.blocks).map(([id, block]) => [
        id,
        { ...block, groups: (state.blocks[id]?.groups ?? []).map(normalizeGroup) },
      ]),
    ),
  };
}

/**
 * Trimmed, with cleared boxes taken out — but a group keeps its `documents`
 * even when empty, because the schema requires the list and "a heading with
 * nothing under it yet" is a state an Editor passes through, not an error.
 */
function normalizeGroup(group: DocumentGroupContent): DocumentGroupContent {
  const normalized = (normalizeDocument(group) ?? {}) as Partial<DocumentGroupContent>;
  return { ...normalized, documents: (normalized.documents ?? []).map(inFieldOrder) };
}

/**
 * Fields in one fixed order. A row switched from a PDF to a web address gains
 * `url` *after* its note, and the file should read the same whichever way a
 * row got to be what it is.
 */
function inFieldOrder(doc: DocumentLink): DocumentLink {
  const { title, file, url, meta, isNew, ...rest } = doc;
  return {
    title,
    ...(file !== undefined ? { file } : {}),
    ...(url !== undefined ? { url } : {}),
    ...(meta !== undefined ? { meta } : {}),
    ...(isNew !== undefined ? { isNew } : {}),
    // Nothing else is allowed, but if something is there the schema should
    // name it rather than this function silently deleting it.
    ...rest,
  };
}

/** A blank group, for "Add a group". */
export function newGroup(): DocumentGroupContent {
  return { label: "", documents: [] };
}

/** A blank document row, for "Add a document". */
export function newDocument(): DocumentLink {
  return { title: "", file: "" };
}

/** Whether a row links out to the web rather than to a file on R2. */
export function isWebLink(doc: DocumentLink): boolean {
  return doc.url !== undefined;
}

/**
 * The patch that switches a row to the other kind of link. The field it leaves
 * is set to `undefined` rather than omitted, because a row patch *merges* — an
 * omitted `file` would survive the switch and the row would hold both.
 */
export function switchLinkKind(toWeb: boolean): Partial<DocumentLink> {
  return toWeb ? { file: undefined, url: "" } : { url: undefined, file: "" };
}

export type Problem = { where: string; message: string };

/** The first thing that would stop this page publishing, phrased for an Editor. */
export function firstProblem(page: DocumentPage): Problem | undefined {
  const result = documentPageSchema.safeParse(page);
  if (result.success) return undefined;
  const issue = result.error.issues[0];
  return { where: describePath(page, issue.path), message: describeIssue(issue, page) };
}

const FIELD_NAMES: Record<string, string> = {
  title: "What the link says",
  file: "PDF",
  url: "Web address",
  meta: "Note",
  label: "Heading",
  description: "Description",
};

/**
 * "Criteria-wise documents › Criterion 2 › Metric 2.1.1 › PDF" — rows named by
 * what they say on screen, so the Editor can find them without counting. A
 * page with a single block leaves the block out; it is the whole screen.
 */
export function describePath(page: DocumentPage, path: readonly PropertyKey[]): string {
  const parts: string[] = [];
  // blocks › <id> › groups › <n> › (documents › <n> › <field> | <field>)
  const [, blockId, , groupIndex, groupStep, docIndex, field] = path;
  const blockIds = Object.keys(page.blocks);
  const block = blockId === undefined ? undefined : page.blocks[String(blockId)];
  if (block && blockIds.length > 1) parts.push(block.label);

  const group = typeof groupIndex === "number" ? block?.groups[groupIndex] : undefined;
  if (typeof groupIndex === "number") {
    parts.push(group?.label?.trim() || `Group ${groupIndex + 1}`);
  }

  const doc = typeof docIndex === "number" ? group?.documents[docIndex] : undefined;
  if (typeof docIndex === "number") {
    parts.push(doc?.title?.trim() || `Document ${docIndex + 1}`);
  }

  const last = typeof docIndex === "number" ? field : groupStep === "documents" ? undefined : groupStep;
  if (typeof last === "string") parts.push(FIELD_NAMES[last] ?? last);

  return parts.length > 0 ? parts.join(" › ") : "This page";
}

/** Every document on a page, across blocks — the count the page list shows. */
export function countDocuments(page: DocumentPage): number {
  return Object.values(page.blocks).reduce(
    (total, block) => total + block.groups.reduce((sum, group) => sum + group.documents.length, 0),
    0,
  );
}
