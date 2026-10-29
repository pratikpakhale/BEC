import data from "@content/documents.json";
import type { DocumentGroup } from "@/components/common/document-directory";
import { asset } from "@/lib/assets";
import { documentsContentSchema } from "./schema/documents";
import { parseContent } from "./schema/shared";

// Parsed, not cast: every caller is a server component (client pages get their
// groups as props from the server page above them), so Zod never ships.
const content = parseContent("documents.json", documentsContentSchema, data);

type Pages = (typeof data)["pages"];

/** A page in content/documents.json, e.g. "nba". */
export type DocumentPageId = keyof Pages;

/** A block on that page, e.g. "criteria" on "naac". */
export type DocumentBlockId<P extends DocumentPageId> = keyof Pages[P]["blocks"] & string;

/**
 * One block's groups, ready for `<DocumentDirectory>`. The ids are typed off
 * the JSON itself, so a page asking for a block the file does not have is a
 * type error rather than an empty section on the live site.
 */
export function documentGroups<P extends DocumentPageId>(
  page: P,
  block: DocumentBlockId<P>,
): DocumentGroup[] {
  const groups = content.pages[page]?.blocks[block]?.groups;
  if (!groups) throw new Error(`content/documents.json has no block "${block}" on page "${page}".`);

  return groups.map((group) => ({
    label: group.label,
    description: group.description,
    documents: group.documents.map((doc) => ({
      title: doc.title,
      url: doc.file ? asset(doc.file) : (doc.url as string),
      meta: doc.meta,
      isNew: doc.isNew,
    })),
  }));
}
