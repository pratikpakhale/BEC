// The content contract: one Zod schema per content/*.json file. Loaders in
// src/content/*.ts parse through these at import time (so `next build` fails
// on invalid content), scripts/validate-content.mjs runs them standalone, and
// scripts/build-content-schema.mjs regenerates the content/*.schema.json IDE
// hints from them. Future admin server routes import from here too.
import type { z } from "zod";
import { homeContentSchema } from "./home.ts";
import { governanceContentSchema } from "./governance.ts";
import { facultyContentSchema } from "./faculty.ts";
import { placementsContentSchema } from "./placements.ts";
import { departmentsContentSchema } from "./departments.ts";
import { newsContentSchema } from "./news.ts";
import { documentsContentSchema } from "./documents.ts";

export { homeContentSchema, type HomeContent } from "./home.ts";
export { governanceContentSchema, bogCategorySchema, type GovernanceContent } from "./governance.ts";
export { facultyContentSchema, facultyEntrySchema, type FacultyContent, type FacultyEntry } from "./faculty.ts";
export {
  placementsContentSchema,
  departmentPlacementsSchema,
  type PlacementsContent,
} from "./placements.ts";
export {
  departmentsContentSchema,
  departmentSchema,
  codedItemSchema,
  type DepartmentsContent,
  type DepartmentContent,
  type CodedItem,
} from "./departments.ts";
export {
  newsContentSchema,
  newsItemSchema,
  type NewsContent,
  type NewsItem,
} from "./news.ts";
export {
  documentsContentSchema,
  documentPageSchema,
  type DocumentsContent,
  type DocumentPage,
  type DocumentLink,
} from "./documents.ts";
export { assetKey, docRef, dataTable, parseContent } from "./shared.ts";

/** One entry per content file: data file name, schema, and the generated *.schema.json metadata. */
export const contentFiles: {
  file: string;
  schemaFile: string;
  title: string;
  description?: string;
  schema: z.ZodType;
}[] = [
  {
    file: "home.json",
    schemaFile: "home.schema.json",
    title: "BEC home page content",
    schema: homeContentSchema,
  },
  {
    file: "news.json",
    schemaFile: "news.schema.json",
    title: "BEC news and announcements",
    description:
      "The two streams shown on the home page and at /news and /announcements. Array order is the published order; `pinned` items are held at the top of their stream.",
    schema: newsContentSchema,
  },
  {
    file: "governance.json",
    schemaFile: "governance.schema.json",
    title: "BEC governance / leadership content",
    schema: governanceContentSchema,
  },
  {
    file: "faculty.json",
    schemaFile: "faculty.schema.json",
    title: "BEC faculty content",
    description:
      "Faculty directory keyed by department URL slug. Each entry is a minimal record: identity + a link to the full profile/CV PDF on R2. src/content/faculty.ts resolves the photo and cv asset keys to public URLs.",
    schema: facultyContentSchema,
  },
  {
    file: "placements.json",
    schemaFile: "placements.schema.json",
    title: "BEC placements content",
    description:
      "Per-department placement records keyed by department content key. src/content/placements.ts serves them to the department Placements tab.",
    schema: placementsContentSchema,
  },
  {
    file: "departments.json",
    schemaFile: "departments.schema.json",
    title: "BEC departments content",
    description:
      "Per-department content keyed by the URL slug used in /departments/<type>/<slug>. Only `name` is required; fill the rest as content arrives.",
    schema: departmentsContentSchema,
  },
  {
    file: "documents.json",
    schemaFile: "documents.schema.json",
    title: "BEC page document lists",
    description:
      "The downloadable documents listed on site pages (NBA, NAAC, NIRF, calendars, cells…), keyed by page and then by the block on that page. Each page's code asks for its blocks by name; src/content/documents.ts resolves file keys to R2 URLs.",
    schema: documentsContentSchema,
  },
];
