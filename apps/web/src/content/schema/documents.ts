import { z } from "zod";
// Explicit extension: the schema build and the Node test runner resolve no aliases.
import { assetKey } from "./shared.ts";

/**
 * One download on a page. Either a file the college holds on R2 (`file`) or a
 * page elsewhere on the web (`url`) — a government portal, an external report —
 * never both, and never neither.
 */
export const documentLinkSchema = z
  .strictObject({
    title: z.string().min(1).describe("What the link says, e.g. \"AQAR 2022–23\"."),
    file: assetKey("The document on R2, usually a PDF.").optional(),
    url: z
      .url({ protocol: /^https?$/ })
      .optional()
      .describe("A web address outside this site, used instead of `file`."),
    meta: z
      .string()
      .optional()
      .describe("A short note printed under the title, e.g. \"CSV Report\"."),
    isNew: z.literal(true).optional().describe("Shows a \"New\" badge beside the title."),
  })
  .superRefine((doc, ctx) => {
    const has = Number(Boolean(doc.file)) + Number(Boolean(doc.url));
    if (has === 1) return;
    ctx.addIssue({
      code: "custom",
      path: ["file"],
      message:
        has === 0
          ? "needs a PDF, or a web address to link to."
          : "has both a PDF and a web address — keep only one.",
    });
  });
export type DocumentLink = z.infer<typeof documentLinkSchema>;

/** A heading and the documents listed under it. */
export const documentGroupSchema = z.strictObject({
  label: z.string().optional().describe("The heading above the documents, e.g. \"2025\"."),
  description: z.string().optional().describe("A sentence under the heading."),
  documents: z.array(documentLinkSchema),
});
export type DocumentGroupContent = z.infer<typeof documentGroupSchema>;

/**
 * One place on a page where a document list is drawn. Most pages have one;
 * NAAC has four, each under its own section heading in the page's code.
 */
export const documentBlockSchema = z.strictObject({
  label: z.string().min(1).describe("What the Admin calls this list, e.g. \"Criteria-wise documents\"."),
  groups: z.array(documentGroupSchema),
});
export type DocumentBlock = z.infer<typeof documentBlockSchema>;

/**
 * A site page's document lists. `title`, `path`, `folder` and the set of
 * blocks are structure: the page's code asks for each block by name, so the
 * Admin edits what is inside a block and never adds or removes one.
 */
export const documentPageSchema = z.strictObject({
  title: z.string().min(1).describe("The page's name, as the Admin lists it."),
  path: z.string().regex(/^\/[a-z0-9/-]*$/).describe("The page's address on the site."),
  folder: z
    .string()
    .regex(/^[a-z0-9][a-z0-9/-]*[a-z0-9]$/)
    .describe("Where the Admin files new uploads for this page on R2."),
  blocks: z.record(z.string().regex(/^[a-z0-9-]+$/), documentBlockSchema),
});
export type DocumentPage = z.infer<typeof documentPageSchema>;

export const documentsContentSchema = z.strictObject({
  $schema: z.string().optional(),
  pages: z.record(z.string().regex(/^[a-z0-9-]+$/), documentPageSchema),
});
export type DocumentsContent = z.infer<typeof documentsContentSchema>;
