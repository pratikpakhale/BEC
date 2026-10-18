import { departmentSchema, type DepartmentContent } from "../../content/schema/departments.ts";
import { collectAssetKeys } from "../../content/schema/asset-fields.ts";
import { commonFolder } from "./departments.ts";
import { describeFieldPath, describeIssue } from "./field-path.ts";
import { normalizeEntry } from "./normalize.ts";

/**
 * `content/departments.json` ⇄ the shape the departments editor works in — and
 * the notable thing is how little conversion there is.
 *
 * Every other editor flattens its document into a typed form state and rebuilds
 * it on the way out, which is a mapper per field. A department has seventy-five
 * of them nested five deep, so this editor's state *is* the department object:
 * fields it does not touch come out byte-identical because they were never
 * taken apart, and a field added to the schema needs a widget, not a mapper.
 *
 * Two things make that safe. `normalize.ts` applies the trim-and-drop rules the
 * per-field mappers used to apply one at a time, and the React handle rows need
 * lives beside each row rather than on it (`row-id.ts`), so nothing the browser
 * invents can reach the file.
 */

export type DepartmentState = DepartmentContent;

/** Loaded department → working state. Identity: the document *is* the form. */
export function toState(content: DepartmentContent): DepartmentState {
  return content;
}

/** Working state → the entry that gets published. */
export function toDocument(state: DepartmentState): DepartmentContent {
  return normalizeEntry(state);
}

/* ------------------------------------------------------------------ tabs -- */

export type TabId =
  | "basics"
  | "home"
  | "about"
  | "academics"
  | "curriculum"
  | "people"
  | "research"
  | "facilities"
  | "activities"
  | "students"
  | "placements"
  | "contact"
  | "extra"
  | "layout";

export const TABS: { id: TabId; label: string; blurb: string }[] = [
  { id: "basics", label: "Basics", blurb: "The name, the banner photos and the facts at the top of the page." },
  { id: "home", label: "Home", blurb: "What a visitor reads first: the overview, the HoD's message and the highlights." },
  { id: "about", label: "About", blurb: "The longer description, the vision and mission, and the milestones." },
  { id: "academics", label: "Academics", blurb: "Programmes, courses and the coded outcome statements (PEOs, POs, PSOs, WK)." },
  { id: "curriculum", label: "Curriculum", blurb: "Scheme and syllabus PDFs, grouped as the tabs they appear under." },
  { id: "people", label: "Faculty & staff", blurb: "Group photographs, supporting staff and the department's committees." },
  { id: "research", label: "Research", blurb: "Areas, publications, patents, scholars, grants and research labs." },
  { id: "facilities", label: "Facilities", blurb: "Laboratories, equipment, software and the infrastructure photos." },
  { id: "activities", label: "Activities", blurb: "Events, programmes, student associations and MoUs." },
  { id: "students", label: "Students & alumni", blurb: "Student achievements, startups, distinguished alumni and testimonials." },
  { id: "placements", label: "Placements", blurb: "The placement photographs and infographics shown above the figures." },
  { id: "contact", label: "Contact", blurb: "Who to reach, and the department's own documents." },
  { id: "extra", label: "Extra pages", blurb: "Sections this department has that no other one does." },
  { id: "layout", label: "Layout", blurb: "Which tab each block lands on. Changes where things appear, never what they say." },
];

/**
 * Which tab every field of the schema is edited on.
 *
 * A field missing from here is a field nobody can reach — the site would still
 * render it and no Editor could change it — so `department-doc.test.ts` walks
 * the schema and fails on any key this table has not been told about.
 */
export const FIELD_TAB: Record<string, TabId> = {
  name: "basics",
  tagline: "basics",
  assetSlug: "basics",
  hero: "basics",
  chronicleImage: "basics",
  infrastructureGallerySlug: "basics",
  established: "basics",
  degree: "basics",
  intake: "basics",
  quickFacts: "basics",
  nbaAccredited: "basics",

  overview: "home",
  overviewPhoto: "home",
  hodMessage: "home",
  values: "home",
  highlights: "home",
  homeGroupPhoto: "home",
  bestPractices: "home",
  bestPracticesList: "home",

  about: "about",
  aboutPhoto: "about",
  vision: "about",
  mission: "about",
  milestones: "about",

  programsOffered: "academics",
  programsOfferedCount: "academics",
  coursesOffered: "academics",
  programStructure: "academics",
  peos: "academics",
  psos: "academics",
  pos: "academics",
  wk: "academics",

  curriculumGroups: "curriculum",

  facultyGroupPhoto: "people",
  staffGroupPhoto: "people",
  supportingStaff: "people",
  committeeGroups: "people",

  researchAreas: "research",
  researchAchievements: "research",
  publications: "research",
  patents: "research",
  phdsAwarded: "research",
  researchScholars: "research",
  researchGrants: "research",
  labs: "research",
  researchGallery: "research",
  startups: "research",

  researchLaboratories: "facilities",
  infrastructureLabs: "facilities",
  infrastructureItems: "facilities",
  facilitiesTables: "facilities",
  laboratories: "facilities",
  softwareItems: "facilities",
  facilitiesGallery: "facilities",
  galleryExclude: "facilities",

  activities: "activities",
  activityTables: "activities",
  associations: "activities",
  mous: "activities",
  mouImages: "activities",

  studentAchievements: "students",
  distinguishedAlumni: "students",
  testimonials: "students",
  alumniRecords: "students",
  achievementTables: "students",
  alumniMentorship: "students",

  placementsPhoto: "placements",
  placementImages: "placements",

  contact: "contact",
  additionalContacts: "contact",
  documents: "contact",
  newsletters: "contact",

  customSections: "extra",
  sectionDocuments: "extra",
  sectionNavDocuments: "extra",
  sectionEmbeds: "extra",

  layout: "layout",
};

/** What an Editor calls each field, for the messages the Publish bar shows. */
export const FIELD_LABELS: Record<string, string> = {
  name: "Department name",
  tagline: "Tagline",
  assetSlug: "Photo folder",
  hero: "Banner photos",
  chronicleImage: "Chronicle graphic",
  infrastructureGallerySlug: "Photo gallery folder",
  established: "Established",
  degree: "Degree",
  intake: "Intake",
  quickFacts: "Quick facts",
  nbaAccredited: "NBA accreditation",
  overview: "Overview",
  overviewPhoto: "Overview photo",
  hodMessage: "Head of Department's message",
  values: "Values",
  highlights: "Highlights",
  homeGroupPhoto: "Group photo on Home",
  bestPractices: "Best practices (PDFs)",
  bestPracticesList: "Best practices",
  about: "About the department",
  aboutPhoto: "About photo",
  vision: "Vision",
  mission: "Mission",
  milestones: "Milestones",
  programsOffered: "Programmes offered",
  programsOfferedCount: "Programmes offered (count shown)",
  coursesOffered: "Courses offered",
  programStructure: "Programme structure",
  peos: "PEOs",
  psos: "PSOs",
  pos: "POs",
  wk: "WK statements",
  curriculumGroups: "Curriculum",
  facultyGroupPhoto: "Faculty group photo",
  staffGroupPhoto: "Staff group photo",
  supportingStaff: "Supporting staff",
  committeeGroups: "Committees",
  researchAreas: "Research areas",
  researchAchievements: "Research achievements",
  publications: "Publications",
  patents: "Patents",
  phdsAwarded: "Ph.D.s awarded",
  researchScholars: "Research scholars",
  researchGrants: "Research grants",
  labs: "Research labs",
  researchGallery: "Research photos",
  researchLaboratories: "Research laboratories",
  startups: "Startups",
  infrastructureLabs: "Laboratories (Facilities)",
  infrastructureItems: "Equipment",
  facilitiesTables: "Infrastructure tables",
  laboratories: "Laboratories and areas",
  softwareItems: "Software",
  facilitiesGallery: "Facilities photos",
  galleryExclude: "Photos to leave out",
  activities: "Activities",
  activityTables: "Activity tables",
  associations: "Associations",
  mous: "MoUs",
  mouImages: "MoU photos",
  studentAchievements: "Student achievements",
  distinguishedAlumni: "Distinguished alumni",
  testimonials: "Alumni testimonials",
  alumniRecords: "Alumni records",
  achievementTables: "Awards tables",
  alumniMentorship: "Alumni mentorship programme",
  placementsPhoto: "Placements photo",
  placementImages: "Placement infographics",
  contact: "Contact",
  additionalContacts: "More contacts",
  documents: "Documents",
  newsletters: "Newsletters",
  customSections: "Extra pages",
  sectionDocuments: "Extra PDFs per section",
  sectionNavDocuments: "Sidebar PDF links per section",
  sectionEmbeds: "Embedded PDFs per section",
  layout: "Layout",
};

/* ------------------------------------------------------------ validation -- */

export type Problem = { tab: TabId | undefined; where: string; message: string };

/**
 * What still stops this department being published, phrased for an Editor.
 *
 * The check is the *same Zod contract* the server enforces and the build gate
 * runs, so the Publish button can never disagree with what happens when it is
 * pressed. Only the first problem is reported: a half-filled row usually causes
 * several, and "fix this one thing" is the instruction that gets followed.
 */
export function firstProblem(department: DepartmentContent): Problem | undefined {
  const result = departmentSchema.safeParse(department);
  if (result.success) return undefined;

  const issue = result.error.issues[0];

  // An unrecognised key sits *in* the department rather than at a path inside
  // it, so `path` is empty and the tab has to come from the key itself.
  // Without this the bar names a problem and no tab is marked as holding it.
  const field = issue.path[0] ?? (issue.code === "unrecognized_keys" ? issue.keys[0] : undefined);

  return {
    tab: FIELD_TAB[String(field ?? "")],
    where: describePath(issue.path),
    message: describeIssue(issue, department),
  };
}

/** "Curriculum › item 2 › PDF" — where in the form the problem is. */
export function describePath(path: readonly PropertyKey[]): string {
  return describeFieldPath(path, FIELD_LABELS, "This department");
}

/* --------------------------------------------------------------- picking -- */

/** The fields a department page reads oddly without, for the picker's hint. */
const ESSENTIALS = ["overview", "about", "vision", "mission", "contact"] as const;

/** Which of the essentials this department has not filled in yet. */
export function missingEssentials(department: DepartmentContent): string[] {
  return ESSENTIALS.filter((field) => {
    const value = department[field];
    return value === undefined || (Array.isArray(value) && value.length === 0);
  }).map((field) => FIELD_LABELS[field] ?? field);
}

/* --------------------------------------------------------------- uploads -- */

/**
 * Where this department's next upload belongs, read off the keys it already
 * uses rather than assembled from its slug — the same rule the faculty editor
 * follows, and for the same reason: four departments have no `assetSlug` at all
 * yet file their photos under a folder only the keys record.
 */
export function uploadFolder(department: DepartmentContent, subfolder?: string): string | undefined {
  const keys = collectAssetKeys(departmentSchema, department).map((ref) => ref.key);
  const base =
    commonFolder(keys) ??
    (department.assetSlug ? `departments/${department.assetSlug}` : undefined);
  if (!base) return undefined;
  // The commonest folder is often a leaf like `departments/civil/faculty`;
  // uploads for the department as a whole belong at its root.
  const root = base.replace(/\/(faculty|staff|alumni|docs|gallery|cv)$/, "");
  return subfolder ? `${root}/${subfolder}` : root;
}
