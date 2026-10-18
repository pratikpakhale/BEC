import { FacultyMember } from "@/types/faculty";
import {
  getDepartmentContent,
  getDepartmentContentKey,
  getDepartmentGallery,
  getDepartmentGalleryExtra,
  resolveDocuments,
  type DepartmentContent,
} from "@/content/departments";
import { asset, assetUrl } from "@/lib/assets";
import type { Photo, PhotoWidth } from "@/content/schema/shared";
import { getDepartmentFaculty } from "@/content/faculty";

/**
 * A portrait, or nothing — never a URL that 404s. `assetUrl` is the strict half
 * of the pair (see lib/assets.ts); an unknown key returns undefined here and
 * the card shows the person's initials instead of a broken image.
 */
const resolveAssetUrl = assetUrl;

import { getDepartmentPlacements, type PlacementOffersChart } from "@/content/placements";

/** A two-part list entry — primary label + muted secondary detail (no dash-joining) + optional photo. */
export type GroupItem = string | { label: string; value?: string; image?: string };

/** A photo with alt text (and optional highlighted caption), used for inline galleries and banners. */
export type SectionImage = { src: string; alt: string; caption?: string; width?: PhotoWidth };

/**
 * Turn a content photo into a renderable one. `alt` is the calling block's
 * description of what it puts there — "the graduating batch", "the faculty" —
 * and is right for almost every photo, which is why it is not content.
 *
 * Where it is wrong, the content says so. A department that puts an
 * industry-visit photograph in the block meant for a group shot would otherwise
 * have a screen reader announce a graduating batch that is not in the picture,
 * and no amount of editing the page could fix it.
 *
 * The caption is deliberately *not* a fallback: a screen reader reads both, so
 * an alt that repeats the caption says the same words twice and describes the
 * image not at all.
 */
function sectionImage(photo: Photo | undefined, alt: string): SectionImage | undefined {
  if (!photo) return undefined;
  return { src: asset(photo.key), alt: photo.alt ?? alt, caption: photo.caption, width: photo.width };
}

/** A labelled sub-block inside a content section (subheading + text and/or bullets). */
export interface ContentGroup {
  subtitle?: string;
  text?: string;
  items?: GroupItem[];
  /** Photos rendered as a grid under this group (e.g. per-laboratory shots on the Research tab). */
  images?: SectionImage[];
  /** Render this group's images large (single column) instead of small grid tiles. */
  featureImages?: boolean;
  /** Render this group's images at a moderate bump (2 per row) instead of small grid tiles. */
  largeImages?: boolean;
  table?: DataTable;
}

export interface DataTable {
  title: string;
  columns: string[];
  rows: string[][];
  /** Render behind a collapsed disclosure (long rosters that would otherwise bury the section). */
  collapsed?: boolean;
}

/** A header block (Overview / Vision / Mission) — text and/or a bullet list. */
export interface HeaderBlock {
  title: string;
  content?: string;
  items?: string[];
  icon: string;
  /** Optional lead image rendered above the block's body (e.g. the department group photo). */
  image?: SectionImage;
  /** Labelled sub-blocks rendered below the body (e.g. PEOs/PSOs relocated under "About Department"). */
  groups?: ContentGroup[];
}

/** A downloadable document link (title + resolved R2 url). */
export type DocLink = { title: string; url: string };

// Supported section types (discriminated union the renderer switches on).
export type DepartmentSection =
  | {
      id?: string;
      type: "content";
      title: string;
      content?: string;
      items?: string[];
      groups?: ContentGroup[];
      /** Data tables rendered below the content groups (e.g. research achievements folded into the Research tab). */
      tables?: DataTable[];
      /** A captioned group-photo banner shown at the very end of the section (e.g. an association's office bearers). */
      groupPhoto?: SectionImage;
      icon?: string;
      attachments?: DocLink[];
      embeds?: DocLink[];
      redirectUrl?: string;
    }
  | { id?: string; type: "faculty-list"; title: string; faculty: FacultyMember[]; compact?: boolean; groupPhoto?: SectionImage; attachments?: DocLink[]; embeds?: DocLink[] }
  | {
      id?: string;
      type: "documents";
      title: string;
      icon?: string;
      documents: DocLink[];
      /** When present, the curriculum renders as labelled sub-tabs instead of a flat grid.
       * A tab with `sections` renders them as labelled blocks (each its own grid) under the tab. */
      groups?: {
        title: string;
        documents: DocLink[];
        sections?: { title: string; documents: DocLink[] }[];
      }[];
    }
  | {
      id?: string;
      type: "tables";
      title: string;
      icon?: string;
      tables: DataTable[];
      /** A group photo banner shown above the tables (e.g. the supporting-staff photo). */
      groupPhoto?: SectionImage;
      /** Captioned photo galleries shown above the tables (e.g. Facilities: classrooms/labs/library/campus).
       * `natural` renders the group's images uncropped at intrinsic aspect ratio (infographics/collages). */
      imageGroups?: { title?: string; images: SectionImage[]; natural?: boolean }[];
      /** Placement-offers bar chart shown above the tables (e.g. CSE year-wise offers). */
      placementChart?: PlacementOffersChart;
      attachments?: DocLink[];
      embeds?: DocLink[];
    }
  | { id?: string; type: "stats"; title: string; stats: { label: string; value: string; icon?: string }[] }
  | {
      id?: string;
      type: "testimonials";
      title: string;
      icon?: string;
      distinguished?: { name: string; designation?: string; organization?: string; photo?: string }[];
      testimonials: { name: string; quote: string; designation?: string; organization?: string; photo?: string }[];
    }
  | { id?: string; type: "gallery"; title: string; images: { src: string; alt: string }[]; attachments?: DocLink[]; embeds?: DocLink[] }
  | {
      id?: string;
      type: "contact";
      title: string;
      icon?: string;
      people: { name?: string; designation?: string; phone?: string; email?: string; photo?: SectionImage }[];
    };

export interface DepartmentData {
  slug: string;
  name: string;
  tagline?: string;

  /** Full-bleed hero at the top of the page: one image renders still, 2+ roll. */
  hero?: SectionImage[];

  /** Optional "Department Chronicle" banner shown at the top of the Home tab, before the overview. */
  chronicleImage?: SectionImage;

  /** Every block here is present only when the department wrote one — there are
   * no stand-in strings, so a missing Vision leaves the block out rather than
   * promising one "soon". */
  overview: HeaderBlock;
  vision?: HeaderBlock;
  mission?: HeaderBlock;
  about?: HeaderBlock;

  /** Message from the Head of Department, shown on the Home tab. */
  hodMessage?: { title?: string; message?: string; name?: string; designation?: string; image?: { src: string; alt: string } };

  /** Optional "at a glance" stats row shown on the Home tab. */
  quickStats?: { label: string; value: string }[];

  /** Department-specific "Quick Facts" panel (facts + research areas). Only set per-department. */
  quickFacts?: { facts: { label: string; value: string }[]; researchAreas: string[] };

  highlights?: string[];

  /** Milestones bullet list shown under Vision & Mission on the About tab, or on Home when milestonesOnHome is set. */
  milestones?: HeaderBlock;

  /** When true, Milestones render on the Home tab (in place of the Highlights block) instead of under About. */
  milestonesOnHome?: boolean;

  /** Programs / PEOs / POs / WK / PSOs relocated onto the Home overview (no separate Academics tab). */
  academicGroups?: ContentGroup[];

  /** Best-practices PDFs surfaced on the Home tab. */
  bestPractices?: DocLink[];

  /** Best-practices displayed as text (practice + year) instead of a PDF link. */
  bestPracticesList?: { practice: string; year?: string }[];

  /** When true, the Best Practices block moves from the Home tab to "About Department". */
  bestPracticesUnderAbout?: boolean;

  /** When true, the HoD message and lead photo move under "About Department". */
  hodMessageUnderAbout?: boolean;

  /** When true, Home shows Vision & Mission after the overview, and the HoD message, lead photo and Highlights move under "About Department". */
  visionMissionOnHome?: boolean;

  /** When true, the teaching-faculty group photo moves to the About Department tab. */
  groupPhotosUnderAbout?: boolean;
  facultyGroupPhoto?: SectionImage;
  staffGroupPhoto?: SectionImage;

  /** When true, keeps the overview photo on Home instead of moving it to About. */
  overviewPhotoOnHome?: boolean;

  /** When true, removes the About Department tab/sidebar link entirely. */
  hideAboutTab?: boolean;

  /** When true, the Alumni section carries the Alumni Mentorship Program block. */
  alumniMentorship?: boolean;

  /** Captioned group-photo banner shown at the very end of the Home tab (e.g. the graduating batch). */
  homeGroupPhoto?: SectionImage;

  sidebar: {
    id: string;
    label: string;
    icon: string;
    externalUrl?: string;
    subItems?: { label: string; externalUrl: string }[];
  }[];

  sections?: DepartmentSection[];
}

// The intake stat is programme-specific — a B.E. department and an MBA report
// intakes into different degrees, so the department says which it admits to.
function intakeLabel(content: DepartmentContent): string {
  return content.degree ? `${content.degree} Intake` : "Intake";
}

function quickStats(
  contentKey: string,
  content: DepartmentContent,
): { label: string; value: string }[] {
  const stats: { label: string; value: string }[] = [];
  if (content.established) stats.push({ label: "Established", value: content.established });
  if (content.intake) stats.push({ label: intakeLabel(content), value: content.intake });
  if (content.researchAreas?.length)
    stats.push({ label: "Research Supervisors", value: String(content.researchAreas.length) });
  if (content.programsOffered?.length)
    stats.push({
      label: "Programs Offered",
      value: String(content.programsOfferedCount ?? content.programsOffered.length),
    });
  if (content.nbaAccredited) stats.push({ label: "Accredited", value: "NBA" });
  return stats;
}

// Resolve a lab's photo asset keys to captioned gallery images.
function labImages(lab: { name: string; images?: string[] }): SectionImage[] | undefined {
  if (!lab.images?.length) return undefined;
  return lab.images.map((key) => ({ src: asset(key), alt: lab.name }));
}

// Drop any column whose cells are all empty across every row (e.g. a batch with
// no CTC data, or year-wise metrics the department didn't report).
function dropEmptyColumns(
  columns: string[],
  rows: string[][],
): { columns: string[]; rows: string[][] } {
  const keep = columns.map((_, i) => rows.some((row) => (row[i] ?? "").trim() !== ""));
  return {
    columns: columns.filter((_, i) => keep[i]),
    rows: rows.map((row) => row.filter((_, i) => keep[i])),
  };
}

/** PEOs and PSOs as labelled content groups — shared by the Academics section and the "About Department" relocation. */
function academicOutcomeGroups(content: DepartmentContent): ContentGroup[] {
  const groups: ContentGroup[] = [];
  if (content.peos?.length)
    groups.push({
      subtitle: "Programme Educational Objectives (PEOs)",
      items: content.peos.map((p) => `${p.code}: ${p.text}`),
    });
  if (content.psos?.length)
    groups.push({
      subtitle: "Programme Specific Outcomes (PSOs)",
      items: content.psos.map((p) => `${p.code}: ${p.text}`),
    });
  return groups;
}

/** Programs, PEOs/PSOs, WK and POs as content groups — shared by the Academics section and the academicsOnHome relocation. */
function academicsGroups(content: DepartmentContent): ContentGroup[] {
  const groups: ContentGroup[] = [];
  if (content.programsOffered?.length)
    groups.push({ subtitle: "Programs Offered", items: content.programsOffered });
  if (content.coursesOffered?.length)
    groups.push({ subtitle: "Courses Offered", items: content.coursesOffered });
  if (content.programStructure?.length)
    groups.push({ subtitle: "Programme Structure", items: content.programStructure });
  groups.push(...academicOutcomeGroups(content));
  if (content.pos?.length)
    groups.push({
      subtitle: "Programme Outcomes (POs)",
      items: content.pos.map((p) => `${p.code}: ${p.text}`),
    });
  if (content.wk?.length)
    groups.push({
      subtitle: "Knowledge and Attitude Profile (WK)",
      items: content.wk.map((p) => `${p.code}: ${p.text}`),
    });
  return groups;
}

function buildSections(contentKey: string, content: DepartmentContent): DepartmentSection[] {
  const sections: DepartmentSection[] = [];

  // Per-department section heading override (falls back to the shared default).
  const heading = (id: string, def: string) => content.layout?.sectionTitles?.[id] ?? def;

  // Research achievements (Ph.D.s awarded, registered scholars, sponsored grants)
  // as data tables — shared by the standalone "Research Achievements" tab and the
  // inline-under-Research layout (content.layout?.achievementsUnderResearch).
  const achievementTables = (): DataTable[] => {
    const tables: DataTable[] = [];
    if (content.phdsAwarded?.length) {
      tables.push({
        title: `Ph.D.s Awarded (${content.phdsAwarded.length})`,
        columns: ["Research Scholar", "Guide", "Thesis Title", "Year"],
        rows: content.phdsAwarded.map((p) => [p.scholar, p.guide, p.title, p.year ?? ""]),
      });
    }
    if (content.researchScholars?.length) {
      tables.push({
        title: `Research Scholars (${content.researchScholars.length})`,
        columns: ["Research Scholar", "Guide", "Thesis Title", "Status"],
        rows: content.researchScholars.map((p) => [p.scholar, p.guide, p.title ?? "", p.status]),
      });
    }
    if (content.researchGrants?.length) {
      tables.push({
        title: "Sponsored Research Grants",
        columns: ["Project Title", "Sponsoring Agency", "Year", "Grant", "Investigators"],
        rows: content.researchGrants.map((g) => [g.title, g.agency, g.year, g.amount, g.investigators]),
      });
    }
    return tables;
  };
  const hasAchievements = () =>
    Boolean(
      content.phdsAwarded?.length ||
        content.researchScholars?.length ||
        content.researchGrants?.length ||
        content.researchAchievements?.length,
    );
  // Major-equipment + software tables — shared by the standalone Facilities tab
  // and the inline-under-Research layout (content.layout?.labsUnderFacilities).
  const infrastructureTables = (): DataTable[] => {
    const tables: DataTable[] = [];
    if (content.laboratories?.length) {
      tables.push({
        title: "Infrastructure Details",
        columns: ["Laboratory", "Area"],
        rows: content.laboratories.map((lab) => [
          lab.name,
          lab.area ?? "",
        ]),
      });
    }
    if (content.infrastructureItems?.length) {
      const hideQty = content.layout?.hideInfrastructureQuantity;
      tables.push({
        title: "Major Equipment",
        columns: hideQty
          ? ["Equipment", "Brief Specification"]
          : ["Equipment", "Brief Specification", "Quantity"],
        rows: content.infrastructureItems.map((item) =>
          hideQty
            ? [item.name, item.specification ?? ""]
            : [item.name, item.specification ?? "", item.quantity ?? ""],
        ),
      });
    }
    if (content.softwareItems?.length) {
      tables.push({
        title: "Software",
        columns: ["Name", "Version", "System / Application"],
        rows: content.softwareItems.map((item) => [
          item.name,
          item.version ?? "",
          item.usage ?? "",
        ]),
      });
    }
    return tables;
  };
  const patentsTables = (): DataTable[] => {
    if (!content.patents?.length) return [];
    const hasArea = content.patents.some((p) => p.area);
    const columns = ["Title of Invention", "Application No.", "Inventors"];
    if (hasArea) columns.push("Area");
    columns.push("Filed", "Published", "Status");
    return [
      {
        title: `Patents (${content.patents.length})`,
        columns,
        rows: content.patents.map((p) => {
          const status = p.awarded
            ? `Granted ${p.awarded}${p.awardNumber ? ` · No. ${p.awardNumber}` : ""}`
            : p.status ?? "";
          const row = [p.title, p.applicationNumber ?? "", p.inventors ?? ""];
          if (hasArea) row.push(p.area ?? "");
          row.push(p.filed ?? "", p.published ?? "", status);
          return row;
        }),
      },
    ];
  };
  const publicationGroups = (): ContentGroup[] => {
    const groups: ContentGroup[] = [];
    for (const cat of content.publications ?? []) {
      groups.push({ subtitle: cat.category });
      for (const y of cat.years) groups.push({ subtitle: y.year ?? undefined, items: y.items });
    }
    return groups;
  };

  // Academics — programs, PEOs, PSOs. When academicsOnHome is set, the whole lot
  // renders under the Home overview instead.
  const groups = content.layout?.academicsOnHome ? [] : academicsGroups(content);
  if (groups.length)
    sections.push({ id: "academics", type: "content", title: heading("academics", "Academics"), icon: "book", groups });

  // Curriculum & syllabus documents (R2 PDFs). When curriculumGroups is set, the
  // tab renders as labelled sub-tabs (Scheme of Teaching & Examinations / Syllabus).
  if (content.curriculumGroups?.length) {
    const groups = content.curriculumGroups
      .map((g) => ({
        title: g.title,
        documents: resolveDocuments(g.documents),
        sections: g.sections
          ?.map((s) => ({ title: s.title, documents: resolveDocuments(s.documents) }))
          .filter((s) => s.documents.length),
      }))
      .filter((g) => g.documents.length || g.sections?.length);
    if (groups.length) {
      sections.push({
        id: "curriculum",
        type: "documents",
        title: heading("curriculum", "Curriculum"),
        icon: "file-text",
        documents: [],
        groups,
      });
    }
  } else {
    const documents = resolveDocuments(content.documents);
    if (documents.length) {
      sections.push({ id: "curriculum", type: "documents", title: heading("curriculum", "Curriculum & Syllabus"), icon: "file-text", documents });
    }
  }

  // Faculty
  const faculty = getDepartmentFaculty(contentKey);
  if (faculty.length) {
    sections.push({
      id: "faculty",
      type: "faculty-list",
      title: heading("faculty", "Teaching Faculty"),
      faculty,
      compact: content.layout?.facultyCompact,
      groupPhoto: content.layout?.groupPhotosUnderAbout
        ? undefined
        : sectionImage(content.facultyGroupPhoto, `${content.name} — teaching faculty`),
    });
  }

  // Supporting staff. Rendered either as photo cards (staffCards) or as tables,
  // optionally split into "Technical Staff" (instructors) and "Supporting Staff"
  // (helpers / peons / drivers) grouped by designation.
  if (content.supportingStaff?.length && content.layout?.staffCards) {
    sections.push({
      id: "staff",
      type: "faculty-list",
      title: heading("staff", "Supporting Staff"),
      compact: content.layout?.facultyCompact,
      faculty: content.supportingStaff.map((m) => ({
        name: m.name,
        designation: m.designation,
        photoUrl: resolveAssetUrl(m.photo),
      })),
      groupPhoto: sectionImage(content.staffGroupPhoto, `${content.name} — supporting staff`),
    });
  } else if (content.supportingStaff?.length) {
    const staffRow = (m: { name: string; designation: string }) => [m.name, m.designation];
    let tables: DataTable[];
    if (content.layout?.groupSupportingStaff) {
      const technical = content.supportingStaff.filter((m) => m.role !== "supporting");
      const support = content.supportingStaff.filter((m) => m.role === "supporting");
      tables = [
        technical.length && {
          title: "Technical Staff",
          columns: ["Name", "Designation"],
          rows: technical.map(staffRow),
        },
        support.length && {
          title: "Supporting Staff",
          columns: ["Name", "Designation"],
          rows: support.map(staffRow),
        },
      ].filter(Boolean) as DataTable[];
    } else {
      tables = [
        {
          title: "Supporting Staff",
          columns: ["Name", "Designation"],
          rows: content.supportingStaff.map(staffRow),
        },
      ];
    }
    sections.push({
      id: "staff",
      type: "tables",
      title: heading("staff", "Supporting Staff"),
      icon: "users",
      tables,
      groupPhoto: sectionImage(content.staffGroupPhoto, `${content.name} — supporting staff`),
    });
  }

  // Board of Studies / Board of Examiners. A group whose members carry an
  // affiliation gets a third column for it, so the seat and the institution
  // don't crowd one cell.
  if (content.committeeGroups?.length) {
    sections.push({
      id: "governance",
      type: "tables",
      title: heading("governance", "Board Members"),
      icon: "clipboard",
      tables: content.committeeGroups.map((group) => {
        const affiliated = group.members.some((m) => m.affiliation);
        return {
          title: group.title,
          columns: affiliated
            ? ["Name of the Member", "Position", "Designation & Affiliation"]
            : ["Name of the Member", "Position"],
          rows: group.members.map((member) =>
            affiliated
              ? [member.name, member.position, member.affiliation ?? ""]
              : [member.name, member.position],
          ),
        };
      }),
    });
  }

  // Research — research guides + labs, optionally with the achievement tables
  // folded in (content.layout?.achievementsUnderResearch).
  if (
    !content.layout?.hideResearchTab &&
    (content.researchAreas?.length ||
      content.labs?.length ||
      content.researchGallery?.length ||
      (content.layout?.achievementsUnderResearch && hasAchievements()))
  ) {
    const groups: ContentGroup[] = [];
    if (content.researchAreas?.length)
      groups.push({
        subtitle: "Research Guides",
        items: content.researchAreas.map((r) => ({
          label: r.supervisor,
          value: `${r.area}${r.university ? ` · ${r.university}` : ""}`,
        })),
      });
    for (const g of content.researchGallery ?? [])
      groups.push({
        subtitle: g.title,
        images: g.images.map((key) => ({ src: asset(key), alt: g.title ?? `${content.name} research laboratory` })),
        largeImages: true,
      });
    if (!content.layout?.labsUnderFacilities)
      for (const lab of content.labs ?? []) {
        groups.push({ subtitle: lab.name, text: lab.description, items: lab.features, images: labImages(lab), featureImages: lab.feature });
      }
    const tables = [
      ...(content.layout?.achievementsUnderResearch ? [...achievementTables(), ...patentsTables()] : []),
      ...(content.layout?.labsUnderFacilities ? infrastructureTables() : []),
    ];
    sections.push({
      id: "research",
      type: "content",
      title: heading("research", "Research"),
      icon: "flask",
      groups,
      tables: tables.length ? tables : undefined,
    });
  }

  // Research achievements — Ph.D.s awarded, registered scholars, sponsored grants,
  // plus any written-out achievements (patents granted, best-paper awards) that do
  // not fit a table. Skipped when folded into the Research tab
  // (content.layout?.achievementsUnderResearch).
  if (!content.layout?.achievementsUnderResearch && hasAchievements()) {
    const title = heading("research-achievements", "Research Achievements");
    const tables = achievementTables();
    sections.push(
      content.researchAchievements?.length
        ? {
            id: "research-achievements",
            type: "content",
            title,
            icon: "clipboard",
            groups: [{ subtitle: "Awards, Patents and Recognitions", items: content.researchAchievements }],
            tables: tables.length ? tables : undefined,
          }
        : { id: "research-achievements", type: "tables", title, icon: "clipboard", tables },
    );
  }

  // Publications — year-wise research output grouped by category.
  if (content.publications?.length) {
    sections.push({
      id: "publications",
      type: "content",
      title: heading("publications", "Publications"),
      icon: "book",
      groups: publicationGroups(),
    });
  }

  // Patents — filed / published / granted. Folded into the Research tab when
  // achievements live there (achievementsUnderResearch); otherwise a standalone tab.
  if (content.patents?.length && !content.layout?.achievementsUnderResearch) {
    sections.push({
      id: "patents",
      type: "tables",
      title: heading("patents", "Patents"),
      icon: "clipboard",
      tables: patentsTables(),
    });
  }

  // Incubated startups — companies registered and grants received.
  if (content.startups && (content.startups.companies?.length || content.startups.grants?.length)) {
    const tables: DataTable[] = [];
    if (content.startups.companies?.length) {
      tables.push({
        title: `Startups Registered at BEC Incubation Centre (${content.startups.companies.length})`,
        columns: ["Startup", "Founder(s)", "Domain", "Established"],
        rows: content.startups.companies.map((c) => [c.name, c.founders, c.domain, c.established]),
      });
    }
    if (content.startups.grants?.length) {
      tables.push({
        title: "Grants Received",
        columns: ["Startup", "Project", "Funding Year", "Funding Agency", "Grant (₹ Lakh)"],
        rows: content.startups.grants.map((g) => [g.startup, g.project, g.year, g.agency, g.amount]),
      });
    }
    sections.push({ id: "startups", type: "tables", title: heading("startups", "Startups"), icon: "briefcase", tables });
  }

  // Free-form awards/achievements tables (faculty awards, student projects/participation, chapter awards).
  if (content.achievementTables?.length) {
    sections.push({
      id: "achievements",
      type: "tables",
      title: heading("achievements", "Awards & Achievements"),
      icon: "award",
      tables: content.achievementTables.map((t) => ({
        title: t.title,
        columns: t.columns,
        rows: t.rows,
      })),
    });
  }

  // Student achievements — month-wise narrative highlights, with optional
  // Best Outgoing Students and alumni-entrepreneur tables folded in below.
  if (content.studentAchievements) {
    const sa = content.studentAchievements;
    const groups: ContentGroup[] = (sa.months ?? []).map((m) => ({
      subtitle: m.title,
      items: m.items,
    }));
    const tables: DataTable[] = [];
    if (sa.bestOutgoing?.length)
      tables.push({
        title: "Best Outgoing Students",
        columns: ["Student", "Academic Year"],
        rows: sa.bestOutgoing.map((s) => [s.name, s.year]),
      });
    if (sa.entrepreneurs?.length)
      tables.push({
        title: "Alumni Entrepreneurs",
        columns: ["Name", "Role", "Organization"],
        rows: sa.entrepreneurs.map((e) => [e.name, e.role ?? "", e.organization ?? ""]),
      });
    if (groups.length || tables.length)
      sections.push({
        id: "student-achievements",
        type: "content",
        title: heading("student-achievements", "Student Achievements"),
        icon: "award",
        groups,
        tables: tables.length ? tables : undefined,
      });
  }

  // Alumni — distinguished-alumni gallery and/or testimonials
  if (content.distinguishedAlumni?.length || content.testimonials?.length) {
    const distinguished = content.distinguishedAlumni?.map((a) => ({
      ...a,
      photo: a.photo ? asset(a.photo) : undefined,
    }));
    const testimonials = (content.testimonials ?? []).map((t) => ({
      ...t,
      photo: t.photo ? asset(t.photo) : undefined,
    }));
    sections.push({
      id: "alumni",
      type: "testimonials",
      title: heading("alumni", distinguished?.length ? "Alumni" : "Alumni Testimonials"),
      icon: "users",
      distinguished,
      testimonials,
    });
  } else if (content.alumniRecords?.length) {
    const embeds = resolveDocuments(content.alumniRecords);
    if (embeds.length)
      sections.push({
        id: "alumni",
        type: "content",
        title: heading("alumni", "Alumni Records"),
        icon: "users",
        embeds,
      });
  }

  // Placements — year-wise summary, recruiters & packages, student-wise detail
  const placements = getDepartmentPlacements(contentKey);
  if (placements && (placements.yearWise.length || placements.batches?.length)) {
    const tables: DataTable[] = [];
    if (placements.yearWise.length) {
      const summary = dropEmptyColumns(
        ["Year", "Students", "Offers", "On-Campus", "Off-Campus", "Placed", "Placement %", "Companies"],
        placements.yearWise.map((y) => [
          y.year,
          y.students ?? "",
          y.offers ?? "",
          y.onCampus ?? "",
          y.offCampus ?? "",
          y.placed ?? "",
          y.percent ? `${y.percent}%` : "",
          y.companies ?? "",
        ]),
      );
      tables.push({ title: "Year-wise Placement Summary", ...summary });
    }
    for (const batch of placements.batches ?? []) {
      if (batch.companies.length) {
        const recruiters = dropEmptyColumns(
          ["Company", "Package (LPA)", "Students Placed"],
          batch.companies.map((c) => [c.company, c.package, c.count]),
        );
        tables.push({
          title: `Recruiters & Packages — ${batch.batch} (${batch.companies.length})`,
          ...recruiters,
          collapsed: true,
        });
      }
      if (batch.students.length && !content.layout?.placementsSummaryOnly) {
        tables.push({
          title: `Students Placed — ${batch.batch} (${batch.students.length} offers)`,
          columns: ["Student", "USN", "Mode", "Company", "LPA"],
          rows: batch.students.map((s) => [s.name, s.usn, s.mode, s.company, s.lpa]),
        });
      }
    }
    sections.push({
      id: "placements",
      type: "tables",
      title: "Placements",
      icon: "briefcase",
      tables,
      placementChart: placements.offersChart,
      imageGroups: content.placementImages
        ?.map((g) => ({
          title: g.title,
          natural: true,
          images: g.images.map((key) => ({
            src: asset(key),
            alt: g.title ?? `${content.name} placements`,
          })),
        }))
        .filter((g) => g.images.length),
      groupPhoto: sectionImage(content.placementsPhoto, `${content.name} — placed students`),
    });
  } else {
    const placementDocs = resolveDocuments(content.sectionDocuments?.placements);
    if (placementDocs.length) {
      sections.push({
        id: "placements",
        type: "documents",
        title: heading("placements", "Placements"),
        icon: "briefcase",
        documents: placementDocs,
      });
    }
  }

  // Facilities — laboratories rendered as content blocks when labs are routed
  // here (content.layout?.labsUnderFacilities); otherwise the legacy equipment/software
  // tables.
  if (content.layout?.labsUnderFacilities && content.labs?.length) {
    const groups: ContentGroup[] = content.labs.map((lab) => ({
      subtitle: lab.name,
      text: lab.description,
      images: labImages(lab),
      featureImages: lab.feature,
      items: lab.items,
      table: lab.table,
    }));
    if (content.facilitiesTables?.length) {
      for (const t of content.facilitiesTables) {
        groups.push({
          table: t,
        });
      }
    }
    sections.push({
      id: "facilities",
      type: "content",
      title: heading("facilities", "Laboratories & Research Facilities"),
      icon: "building-2",
      groups,
    });
  } else if (
    content.facilitiesTables?.length ||
    content.laboratories?.length ||
    content.infrastructureItems?.length ||
    content.softwareItems?.length ||
    content.researchLaboratories?.length
  ) {
    const facilityTables = content.facilitiesTables?.length
      ? [...content.facilitiesTables]
      : infrastructureTables();
    if (content.researchLaboratories?.length) {
      facilityTables.unshift({
        title: "Research Laboratories",
        columns: ["Laboratory"],
        rows: content.researchLaboratories.map((name) => [name]),
      });
    }
    sections.push({
      id: "facilities",
      type: "tables",
      title: heading("facilities", "Infrastructure Details"),
      icon: "building-2",
      tables: facilityTables,
      imageGroups: content.facilitiesGallery
        ?.map((g) => ({
          title: g.title,
          images: g.images.map((key) => ({ src: asset(key), alt: g.title ?? `${content.name} facilities` })),
        }))
        .filter((g) => g.images.length),
    });
  }

  // Activities & events
  const foldActivitiesIntoAssociation = Boolean(content.layout?.activitiesUnderAssociation && content.associations?.length);
  const activityGroups: ContentGroup[] = [];
  if (content.activities?.length) {
    const richActivities = content.activities.filter((a) => a.details?.length || a.images?.length);
    const simpleActivities = content.activities.filter((a) => !a.details?.length && !a.images?.length);
    if (simpleActivities.length)
      activityGroups.push({
        subtitle: "Recent Events & Activities",
        items: simpleActivities.map((a) => ({
          label: a.title,
          value: [a.date, a.description].filter(Boolean).join(" — "),
        })),
      });
    for (const a of richActivities) {
      activityGroups.push({
        subtitle: a.date ? `${a.title} (${a.date})` : a.title,
        text: a.description,
        items: a.details,
        images: a.images?.map((img) => ({ src: asset(img.key), alt: img.caption ?? a.title, caption: img.caption })),
        largeImages: true,
      });
    }
    if (!foldActivitiesIntoAssociation)
      sections.push({
        id: "activities",
        type: "content",
        title: heading("activities", "Activities"),
        icon: "calendar",
        groups: activityGroups,
      });
  }

  // Student associations & forums — their own section, unless activitiesUnderAssociation folds the activities in.
  if (content.associations?.length) {
    const groups: ContentGroup[] = [];
    for (const assoc of content.associations) {
      groups.push({ subtitle: assoc.name, text: assoc.about });
      if (assoc.coordinators?.length)
        groups.push({
          subtitle: "Faculty Coordinators",
          items: assoc.coordinators.map((c) =>
            typeof c === "string"
              ? { label: c }
              : {
                  label: c.name,
                  value: [c.designation, c.email ? `Email: ${c.email}` : "", c.phone ? `Contact: ${c.phone}` : ""].filter(Boolean).join(" · "),
                  image: c.photo ? asset(c.photo) : undefined,
                },
          ),
        });
      if (assoc.events?.length)
        groups.push({
          subtitle: "Events Organised",
          items: assoc.events.map((e) => ({
            label: e.title,
            value: [e.date, e.coordinators].filter(Boolean).join(" · "),
          })),
        });
      if (assoc.exicom?.length)
        groups.push({
          subtitle: "Association Exicoms (2025–2026)",
          items: assoc.exicom.map((m) => ({
            label: m.name,
            value: m.position,
            image: m.photo ? asset(m.photo) : undefined,
          })),
        });
      for (const g of assoc.exicomGroups ?? [])
        groups.push({
          subtitle: g.title,
          items: g.members?.map((m) =>
            typeof m === "string"
              ? { label: m }
              : {
                  label: m.label,
                  value: m.value,
                  image: m.image ? asset(m.image) : undefined,
                },
          ),
          table: g.table,
        });
      if (assoc.gallery?.length)
        groups.push({
          subtitle: "Activity Highlights",
          images: assoc.gallery.map((key) => ({ src: asset(key), alt: `${assoc.name} activity` })),
        });
      if (assoc.documents?.length) {
        groups.push({
          subtitle: "Reports & Documents",
          items: assoc.documents.map((d) => ({
            label: d.title,
            value: asset(d.file),
          })),
        });
      }
      if (assoc.contact)
        groups.push({
          subtitle: "Chapter Contact & Inquiries",
          items: [
            {
              label: assoc.contact.name,
              value: [
                assoc.contact.designation,
                assoc.contact.department,
                assoc.contact.college,
                assoc.contact.location,
                assoc.contact.email ? `Email: ${assoc.contact.email}` : undefined,
                assoc.contact.phone ? `Phone: ${assoc.contact.phone}` : undefined,
              ]
                .filter(Boolean)
                .join("\n"),
              image: assoc.contact.photo ? asset(assoc.contact.photo) : undefined,
            },
          ],
        });
    }
    if (foldActivitiesIntoAssociation) groups.push(...activityGroups);
    const assocPhoto = content.associations.find((a) => a.photo);
    const groupPhoto = sectionImage(assocPhoto?.photo, assocPhoto?.name ?? "");
    const assocDocs = content.associations.flatMap((a) => a.documents ?? []);
    const docLinks = resolveDocuments(assocDocs);
    sections.push({
      id: "association",
      type: "content",
      title: heading("association", foldActivitiesIntoAssociation ? "Association & Activities" : "Associations"),
      icon: "users",
      groups,
      attachments: docLinks?.length ? docLinks : undefined,
      groupPhoto,
    });
  }

  // Activity programmes (SDPs, FDPs, workshops) — one titled table per category.
  if (content.activityTables?.length) {
    sections.push({
      id: "activity-programs",
      type: "tables",
      title: heading("activity-programs", "Activities"),
      icon: "calendar",
      tables: content.activityTables.map((t) => ({ title: t.title, columns: t.columns, rows: t.rows })),
    });
  }

  // MoUs / industry collaborations
  if (content.mous?.length) {
    // Only show the "Since" column when at least one MoU records a date.
    const hasSince = content.mous.some((m) => m.since);
    sections.push({
      id: "mou",
      type: "tables",
      title: heading("mou", "MoUs & Collaborations"),
      icon: "handshake",
      tables: [
        {
          title: "Memoranda of Understanding",
          columns: hasSince
            ? ["Partner Organization", "Location", "Since"]
            : ["Partner Organization", "Location"],
          rows: content.mous.map((m) =>
            hasSince
              ? [m.partner, m.location ?? "", m.since ?? ""]
              : [m.partner, m.location ?? ""],
          ),
        },
      ],
      imageGroups: content.mouImages?.length
        ? [
            {
              title: "MoU Signings",
              images: content.mouImages.map((key) => ({
                src: asset(key),
                alt: `${content.name} — MoU signing`,
              })),
            },
          ]
        : undefined,
    });
  }

  // Infrastructure gallery (R2 photos)
  // Both loaders return nothing for a department with no asset folder of its
  // own, which is how a programme that shares its parent's building opts out.
  const galleryAll = getDepartmentGallery(
    content.infrastructureGallerySlug ?? content.assetSlug,
  );
  // Drop any stray portrait/staff shots the department asked to exclude.
  const excluded = (url: string) => content.galleryExclude?.some((k) => url.includes(k)) ?? false;
  // Curated photos from the department's gallery/ subfolder, appended in key
  // order after the auto-derived scene photos.
  const extraSlug = content.infrastructureGallerySlug ?? content.assetSlug;
  const galleryImages = [
    ...galleryAll,
    ...getDepartmentGalleryExtra(extraSlug),
  ]
    .filter((url) => !excluded(url))
    .map((src, i) => ({
      src,
      alt: `${content.name} — facilities photo ${i + 1}`,
    }));
  // Named labs (title + caption + images) render as content blocks. The loose
  // department photos go to a dedicated "Photo Gallery" section (added below,
  // after Newsletters), so Infrastructure keeps only the labs.
  if (content.infrastructureLabs?.length) {
    const groups: ContentGroup[] = content.infrastructureLabs.map((lab) => ({
      subtitle: lab.name,
      text: lab.description,
      images: labImages(lab),
      largeImages: true,
    }));
    sections.push({
      id: "infrastructure",
      type: "content",
      title: heading("infrastructure", "Infrastructure & Labs"),
      icon: "building-2",
      groups,
    });
  }

  // Newsletters (monthly department PDFs) — reuses the documents section.
  // Placed last, immediately before Contact.
  const newsletters = resolveDocuments(content.newsletters);
  if (newsletters.length) {
    sections.push({
      id: "newsletters",
      type: "documents",
      title: heading("newsletters", "Newsletters"),
      icon: "file-text",
      documents: newsletters,
    });
  }

  // Free-form custom sections (own tab) — intro copy plus inline-embedded PDFs
  // and/or download links (e.g. "Life at DOMS" showing the MBA Events booklet).
  if (content.customSections?.length) {
    for (const cs of content.customSections) {
      const embeds = resolveDocuments(cs.embeds);
      const attachments = resolveDocuments(cs.documents);
      const tables = cs.tables?.map((t) => ({
        title: t.title,
        columns: t.columns,
        rows: t.rows,
        collapsed: t.collapsed,
      }));
      const groups = cs.groups?.map((g) => ({
        subtitle: g.subtitle,
        text: g.text,
        items: g.items,
        images: g.images?.map((key) => ({ src: asset(key), alt: g.subtitle ?? cs.title })),
        featureImages: g.featureImages,
        largeImages: g.largeImages,
        table: g.table ? {
          title: g.table.title,
          columns: g.table.columns,
          rows: g.table.rows,
          collapsed: g.table.collapsed,
        } : undefined,
      }));
      const groupPhoto = sectionImage(cs.groupPhoto, cs.title);
      const redirectUrl = cs.redirectUrl ? asset(cs.redirectUrl) : undefined;

      if (!cs.content && !cs.items?.length && !embeds.length && !attachments.length && !tables && !groups && !cs.redirectUrl) continue;
      sections.push({
        id: cs.id,
        type: "content",
        title: heading(cs.id, cs.title),
        content: cs.content,
        items: cs.items,
        icon: cs.icon ?? "calendar",
        groups,
        tables,
        groupPhoto,
        redirectUrl,
        ...(embeds.length ? { embeds } : {}),
        ...(attachments.length ? { attachments } : {}),
      });
    }
  }

  // Photo Gallery (loose department scene photos) — own section, after
  // Newsletters and before Contact.
  if (galleryImages.length) {
    sections.push({
      id: "photo-gallery",
      type: "gallery",
      title: heading("photo-gallery", "Photo Gallery"),
      images: galleryImages,
    });
  }

  // Contact
  if (
    (content.contact && (content.contact.name || content.contact.email || content.contact.phone)) ||
    content.additionalContacts?.length
  ) {
    const c = content.contact;
    const people: { name?: string; designation?: string; phone?: string; email?: string; photo?: SectionImage }[] = [];
    if (c && (c.name || c.phone || c.email)) {
      people.push({
        name: c.name,
        designation: c.designation,
        phone: c.phone,
        email: c.email,
        photo: c.photo ? { src: asset(c.photo), alt: c.name ?? "Head of Department" } : undefined,
      });
    }
    if (content.additionalContacts?.length) people.push(...content.additionalContacts);
    sections.push({
      id: "contact",
      type: "contact",
      title: heading("contact", "Contact"),
      icon: "phone",
      people,
    });
  }

  // Attach extra PDFs to their sections (e.g. Research Centre Info under Research,
  // MoU Details under MoUs). The Curriculum tab keeps only scheme/syllabus, so
  // relocated documents surface alongside the section they belong to.
  if (content.sectionDocuments) {
    for (const section of sections) {
      if (!section.id) continue;
      if (section.type === "documents" || section.type === "stats" || section.type === "testimonials" || section.type === "contact") continue;
      const docs = resolveDocuments(content.sectionDocuments[section.id]);
      if (docs.length) section.attachments = docs;
    }
  }

  // Inline-embedded PDFs (rendered in a viewer, not a download link) under a section.
  if (content.sectionEmbeds) {
    for (const section of sections) {
      if (!section.id) continue;
      if (section.type === "documents" || section.type === "stats" || section.type === "testimonials" || section.type === "contact") continue;
      const docs = resolveDocuments(content.sectionEmbeds[section.id]);
      if (docs.length) section.embeds = docs;
    }
  }

  // Per-department section icon overrides (sidebar + heading), keyed by section id.
  if (content.layout?.sectionIcons) {
    for (const section of sections) {
      const override = section.id ? content.layout?.sectionIcons[section.id] : undefined;
      if (override) (section as { icon?: string }).icon = override;
    }
  }

  return sections;
}

export function getDepartmentData(type: string, slug: string): DepartmentData {
  const contentKey = getDepartmentContentKey(slug, type);
  const content = getDepartmentContent(slug, type);
  // The catalog and departments.json are 1:1, and both callers iterate the
  // catalog. A routed department with no content used to render invented
  // placeholders — a name derived from the slug, "overview will be updated
  // soon", four generic highlights — which is worse than not shipping the page.
  // Fail at the build, where the drift actually is.
  if (!content) {
    throw new Error(
      `No content for the "${slug}" department under "${type}". ` +
        `Add "${contentKey}" to content/departments.json, or drop the entry from src/data/departments-catalog.ts.`,
    );
  }
  const name = content.name;

  const sections = buildSections(contentKey, content);

  // Sidebar derived from the content that actually exists. The Home/About labels
  // accept per-department overrides (e.g. Mechanical relabels them
  // "About Department" / "Vision and Mission").
  const sidebar: DepartmentData["sidebar"] = [
    { id: "home", label: content.layout?.sectionNavLabels?.home ?? "Home", icon: content.layout?.sectionIcons?.home ?? "home" },
  ];
  if ((content.about || content.vision || content.mission?.length) && !content.layout?.hideAboutTab)
    sidebar.push({
      id: "about",
      label: content.layout?.sectionNavLabels?.about ?? "About Department",
      icon: content.layout?.sectionIcons?.about ?? "graduation-cap",
    });
  const sectionLabels: Record<string, { label: string; icon: string }> = {
    academics: { label: "Academics", icon: "file-text" },
    curriculum: { label: "Curriculum", icon: "file-text" },
    newsletters: { label: "Newsletters", icon: "file-text" },
    faculty: { label: "Teaching Faculty", icon: "users" },
    staff: { label: "Supporting Staff", icon: "users-round" },
    governance: { label: "Board Members", icon: "clipboard" },
    research: { label: "Research", icon: "clipboard" },
    "research-achievements": { label: "Research Achievements", icon: "clipboard" },
    publications: { label: "Publications", icon: "book" },
    patents: { label: "Patents", icon: "clipboard" },
    startups: { label: "Startups", icon: "briefcase" },
    achievements: { label: "Awards & Achievements", icon: "award" },
    "student-achievements": { label: "Student Achievements", icon: "award" },
    alumni: { label: "Alumni", icon: "users" },
    placements: { label: "Placements", icon: "briefcase" },
    facilities: { label: "Facilities", icon: "building-2" },
    activities: { label: "Activities", icon: "calendar" },
    association: {
      label: content.layout?.activitiesUnderAssociation && content.activities?.length ? "Association & Activities" : "Association",
      icon: "users",
    },
    "activity-programs": { label: "Activities", icon: "calendar" },
    mou: { label: "MoUs", icon: "handshake" },
    infrastructure: { label: "Infrastructure", icon: "building-2" },
    "photo-gallery": { label: "Photo Gallery", icon: "image" },
    contact: { label: "Contact", icon: "users-round" },
  };
  for (const cs of content.customSections ?? []) {
    sectionLabels[cs.id] = { label: cs.label ?? cs.title, icon: cs.icon ?? "calendar" };
  }
  for (const section of sections) {
    const meta = section.id ? sectionLabels[section.id] : undefined;
    if (meta) {
      const label = (section.id && content.layout?.sectionNavLabels?.[section.id]) || meta.label;
      const icon = (section.id && content.layout?.sectionIcons?.[section.id]) || meta.icon;
      const externalUrl = section.type === "content" && section.redirectUrl ? section.redirectUrl : undefined;
      const subItems = resolveDocuments(content.sectionNavDocuments?.[section.id!]).map((doc) => ({
        label: doc.title,
        externalUrl: doc.url,
      }));
      sidebar.push({ id: section.id!, label, icon, externalUrl, ...(subItems.length ? { subItems } : {}) });
    }
  }

  // sectionOrder is an explicit whitelist: only the listed ids survive, in the
  // order given. Without it the nav falls back to the order sections were built in.
  const order = content.layout?.sectionOrder;
  const rank = (id: string) => order!.indexOf(id);
  const orderedSidebar = order
    ? sidebar.filter((s) => rank(s.id) !== -1).sort((a, b) => rank(a.id) - rank(b.id))
    : sidebar;
  const orderedSections = order
    ? sections.filter((s) => s.id && rank(s.id) !== -1).sort((a, b) => rank(a.id!) - rank(b.id!))
    : sections;

  return {
    name,
    tagline: content.tagline,
    hero: content.hero?.map((key, i) => ({
      src: asset(key),
      // A lone hero is the building shot every department leads with; in a
      // carousel the photos are miscellaneous, so they are numbered instead.
      alt: content.hero!.length > 1 ? `${name} — photo ${i + 1}` : `${name} — department building`,
    })),
    chronicleImage: content.chronicleImage
      ? { src: asset(content.chronicleImage), alt: `Chronicle of the ${name} Department` }
      : undefined,
    quickStats: content && !content.layout?.hideQuickStats ? quickStats(contentKey, content) : undefined,
    quickFacts:
      content.quickFacts?.facts?.length || content.quickFacts?.researchAreas?.length
        ? {
            facts: content.quickFacts?.facts ?? [],
            researchAreas: content.quickFacts?.researchAreas ?? [],
          }
        : undefined,
    overview: {
      title: "Overview",
      content: content.overview,
      items: content.values,
      icon: "book",
      image: sectionImage(content.overviewPhoto, name),
    },
    about: content.about
      ? {
          title: "About the Department",
          content: content.about,
          icon: "graduation-cap",
          image: sectionImage(content.aboutPhoto, name),
        }
      : undefined,
    hodMessage: content.hodMessage
      ? {
          title: content.hodMessage.title,
          message: content.hodMessage.message,
          name: content.hodMessage.name,
          designation: content.hodMessage.designation,
          image: content.hodMessage.image
            ? { src: asset(content.hodMessage.image), alt: content.hodMessage.name ?? "Head of Department" }
            : undefined,
        }
      : undefined,
    vision: content.vision ? { title: "Vision", content: content.vision, icon: "eye" } : undefined,
    mission: content.mission?.length
      ? { title: "Mission", items: content.mission, icon: "target" }
      : undefined,
    highlights: content.highlights,
    milestones: content.milestones?.items?.length
      ? {
          title: content.milestones.title ?? "Milestones",
          items: content.milestones.items,
          icon: "award",
        }
      : undefined,
    milestonesOnHome: content.layout?.milestonesOnHome,
    academicGroups: content.layout?.academicsOnHome ? academicsGroups(content) : undefined,
    bestPractices: content ? resolveDocuments(content.bestPractices) : undefined,
    bestPracticesList: content.bestPracticesList,
    bestPracticesUnderAbout: content.layout?.bestPracticesUnderAbout,
    hodMessageUnderAbout: content.layout?.hodMessageUnderAbout,
    visionMissionOnHome: content.layout?.visionMissionOnHome || content.layout?.hideAboutTab,
    groupPhotosUnderAbout: content.layout?.groupPhotosUnderAbout,
    overviewPhotoOnHome: content.layout?.overviewPhotoOnHome,
    hideAboutTab: content.layout?.hideAboutTab,
    alumniMentorship: content.alumniMentorship,
    facultyGroupPhoto: sectionImage(content.facultyGroupPhoto, `${name} — teaching faculty`),
    staffGroupPhoto: sectionImage(content.staffGroupPhoto, `${name} — supporting staff`),
    homeGroupPhoto: sectionImage(content.homeGroupPhoto, `${name} — graduating batch`),
    slug: contentKey,
    sidebar: orderedSidebar,
    sections: orderedSections,
  };
}
