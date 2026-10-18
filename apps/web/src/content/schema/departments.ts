import { z } from "zod";
import { assetKey, dataTable, docRef, photo } from "./shared.ts";

/** A labelled statement, e.g. a PEO or PSO. */
export const codedItemSchema = z.strictObject({
  code: z.string().describe('Short label, e.g. "PSO1".'),
  text: z.string(),
});

/**
 * A two-part list entry — plain string, or primary label + muted detail +
 * optional photo. The plain string cannot be empty: the editor adds a row as a
 * blank one, and a blank that survives to the file is a bullet with nothing in
 * it on the live page. Requiring text makes the Publish bar say so instead.
 */
const groupItem = z.union([
  z.string().min(1),
  z.strictObject({
    label: z.string(),
    value: z.string().optional(),
    image: assetKey().optional(),
  }),
]);

const titledImages = z.strictObject({
  title: z.string().optional(),
  images: z.array(assetKey()),
});

/**
 * Where a department's blocks are placed. Every field here answers "which tab
 * does this land on / is it shown at all" — none of them changes the words. The
 * departments were built by different hands over several years, so the same
 * material sits under Home for one and About for the next; these keep that
 * variation out of the content itself.
 */
export const layoutSchema = z.strictObject({
  achievementsUnderResearch: z
    .boolean()
    .optional()
    .describe(
      'When true, the Ph.D.s/Scholars/Grants tables render inside the Research tab and no standalone "Research Achievements" tab is emitted.',
    ),
  hideResearchTab: z
    .boolean()
    .optional()
    .describe("When true, removes the Research / Research Achievements tab entirely."),
  labsUnderFacilities: z
    .boolean()
    .optional()
    .describe(
      "When true, `labs` render on the Facilities tab and the equipment/software tables move into the Research tab instead.",
    ),
  activitiesUnderAssociation: z
    .boolean()
    .optional()
    .describe(
      'When true, `activities` render at the end of the Association section and no standalone "Activities" tab is emitted.',
    ),
  bestPracticesUnderAbout: z
    .boolean()
    .optional()
    .describe('Move the Best Practices block out of the Home tab and under "About Department".'),
  hodMessageUnderAbout: z
    .boolean()
    .optional()
    .describe('Move the HoD message and lead photo out of the Home tab and under "About Department".'),
  groupPhotosUnderAbout: z
    .boolean()
    .optional()
    .describe("Move the teaching-faculty group photo to the About Department tab."),
  overviewPhotoOnHome: z
    .boolean()
    .optional()
    .describe("When true, keeps the overview photo on the Home tab even if the HOD message is moved to About."),
  hideAboutTab: z
    .boolean()
    .optional()
    .describe("When true, removes the About Department tab/sidebar link entirely."),
  sectionOrder: z
    .array(z.string())
    .optional()
    .describe(
      'Explicit whitelist + ordering of sidebar entries, by section id ("home" and "about" included). Ids absent from the list are dropped entirely; without it the nav falls back to the order sections happen to be built in.',
    ),
  sectionTitles: z
    .record(z.string(), z.string())
    .optional()
    .describe("Per-department section heading overrides, keyed by section id."),
  sectionNavLabels: z
    .record(z.string(), z.string())
    .optional()
    .describe("Per-department sidebar label overrides, keyed by section id."),
  sectionIcons: z
    .record(z.string(), z.string())
    .optional()
    .describe("Per-department section icon overrides (sidebar + heading), keyed by section id."),
  hideInfrastructureQuantity: z
    .boolean()
    .optional()
    .describe('Drop the "Quantity" column from the infrastructure/equipment table for this department.'),
  visionMissionOnHome: z
    .boolean()
    .optional()
    .describe(
      'Show Vision & Mission on the Home tab (after the overview) and move the HoD message, lead photo and Highlights under "About Department".',
    ),
  academicsOnHome: z
    .boolean()
    .optional()
    .describe(
      "Drop the Academics tab and render its groups (programs, PEOs, POs, WK, PSOs) under the Home overview instead.",
    ),
  hideQuickStats: z
    .boolean()
    .optional()
    .describe('Hide the "at a glance" stats row on Home (e.g. when the Quick Facts panel replaces it).'),
  milestonesOnHome: z
    .boolean()
    .optional()
    .describe('Show Milestones on the Home tab, in place of the Highlights block, instead of under "About Department".'),
  groupSupportingStaff: z
    .boolean()
    .optional()
    .describe('Split Supporting Staff into "Technical Staff" and "Supporting Staff", by each person\'s `role`.'),
  staffCards: z
    .boolean()
    .optional()
    .describe("Render Supporting Staff as photo cards (like teaching faculty) instead of tables."),
  facultyCompact: z
    .boolean()
    .optional()
    .describe("Render faculty/staff cards in a compact layout with a small portrait instead of the full-width photo."),
  placementsSummaryOnly: z
    .boolean()
    .optional()
    .describe("Placements: show only summary/recruiter tables, hide per-student name lists."),
});

/**
 * One department's content. Faithful to the current content/departments.json
 * shape: every field the loader declared stays (even the never-set layout
 * flags), plus the handful of authored-but-undeclared fields found in the data
 * (committee member email/phone, phdsAwarded usn/status, nullable publication
 * years). Shape improvements are ticket 21's job — this schema only validates.
 */
export const departmentSchema = z.strictObject({
  name: z.string(),
  tagline: z.string().optional(),
  assetSlug: z.string().optional().describe("R2 folder slug under departments/ for photos (not an asset key)."),
  hero: z
    .array(assetKey())
    .min(1)
    .optional()
    .describe(
      "Full-bleed hero at the top of the department page. One image renders it still; two or more render a rolling carousel with arrows and autoplay.",
    ),
  chronicleImage: assetKey(
    'Asset key for a "Department Chronicle" timeline graphic shown as a full-width banner at the top of the Home tab, before the overview.',
  ).optional(),
  infrastructureGallerySlug: z.string().optional(),
  established: z.string().optional(),
  degree: z
    .enum(["B.E.", "M.Tech.", "MCA", "MBA"])
    .optional()
    .describe(
      'The degree this department admits to. Labels the Intake quick-stat ("B.E. Intake"); the Science & Humanities departments award none and leave it unset.',
    ),
  intake: z.string().optional(),
  quickFacts: z
    .strictObject({
      facts: z.array(z.strictObject({ label: z.string(), value: z.string() })).optional(),
      researchAreas: z.array(z.string()).optional(),
    })
    .optional()
    .describe('Department-specific "Quick Facts" panel shown on the Home tab. Only rendered when set.'),
  nbaAccredited: z
    .boolean()
    .optional()
    .describe('When true, surfaces an "NBA Accredited" card in the Home quick-stats row.'),
  overview: z.string().optional(),
  overviewPhoto: photo(
    "Lead image shown above the Home overview (e.g. the department group photo).",
  ).optional(),
  hodMessage: z
    .strictObject({
      title: z.string().optional(),
      message: z.string().optional(),
      name: z.string().optional(),
      designation: z.string().optional(),
      image: assetKey().optional(),
    })
    .optional()
    .describe("Message from the Head of Department, shown on the Home tab."),
  about: z.string().optional(),
  aboutPhoto: photo(
    'Lead image shown above the "About Department" body (e.g. the teaching-faculty group photo).',
  ).optional(),
  vision: z.string().optional(),
  mission: z.array(z.string()).optional(),
  programsOffered: z.array(z.string()).optional(),
  programsOfferedCount: z
    .number()
    .optional()
    .describe(
      'Overrides the "Programs Offered" stat count when the listed bullets expand a single programme into multiple recognition tracks (e.g. one Ph.D. shown as its VTU and AICTE-QIP variants). Defaults to programsOffered.length when unset.',
    ),
  coursesOffered: z
    .array(z.string())
    .optional()
    .describe(
      'Courses taught by the department (distinct from degree programmes), shown as a separate "Courses Offered" list under Academics.',
    ),
  programStructure: z
    .array(z.string())
    .optional()
    .describe("Programme structure facts (duration, semesters, total credits) shown under Academics."),
  peos: z.array(codedItemSchema).optional(),
  psos: z.array(codedItemSchema).optional(),
  pos: z
    .array(codedItemSchema)
    .optional()
    .describe("Programme Outcomes — rendered alongside PEOs/PSOs in the Academics section."),
  wk: z
    .array(codedItemSchema)
    .optional()
    .describe("Knowledge and Attitude Profile (WK) — rendered alongside PEOs/PSOs/POs."),
  values: z
    .array(z.string())
    .optional()
    .describe("Core values shown as a bullet list under the Home overview (e.g. IPE)."),
  newsletters: z
    .array(docRef)
    .optional()
    .describe("Monthly department newsletters, rendered as a documents section."),
  highlights: z.array(z.string()).optional(),
  milestones: z
    // `items` is optional so that typing the heading before the first milestone
    // is not a publish-blocking error. A block with no milestones in it renders
    // nothing at all — see the guard in data/department/department.ts.
    .strictObject({ title: z.string().optional(), items: z.array(z.string()).optional() })
    .optional()
    .describe('Department milestones, shown under Vision & Mission on the About tab.'),
  researchAreas: z
    .array(
      z.strictObject({
        supervisor: z.string(),
        area: z.string(),
        university: z.string().optional(),
      }),
    )
    .optional(),
  researchAchievements: z
    .array(z.string())
    .optional()
    .describe(
      'Achievements that do not fit a table — patents granted, best-paper awards. Rendered as bullets under "Research Achievements".',
    ),
  publications: z
    .array(
      z.strictObject({
        category: z.string(),
        years: z.array(
          z.strictObject({
            year: z.string().nullable().optional(),
            items: z.array(z.string()),
          }),
        ),
      }),
    )
    .optional()
    .describe("Year-wise research output grouped by category (journals, books, chapters, conferences)."),
  achievementTables: z
    .array(dataTable)
    .optional()
    .describe(
      "Free-form awards/achievements tables (faculty awards, student projects, participations, chapter awards).",
    ),
  studentAchievements: z
    .strictObject({
      months: z.array(z.strictObject({ title: z.string(), items: z.array(z.string()) })).optional(),
      bestOutgoing: z.array(z.strictObject({ name: z.string(), year: z.string() })).optional(),
      entrepreneurs: z
        .array(
          z.strictObject({
            name: z.string(),
            role: z.string().optional(),
            organization: z.string().optional(),
          }),
        )
        .optional(),
    })
    .optional()
    .describe(
      "Student achievements — month-wise narrative highlights, plus optional Best Outgoing Students and alumni-entrepreneur tables.",
    ),
  startups: z
    .strictObject({
      companies: z
        .array(
          z.strictObject({
            name: z.string(),
            founders: z.string(),
            domain: z.string(),
            established: z.string(),
          }),
        )
        .optional(),
      grants: z
        .array(
          z.strictObject({
            startup: z.string(),
            project: z.string(),
            year: z.string(),
            agency: z.string(),
            amount: z.string(),
          }),
        )
        .optional(),
    })
    .optional()
    .describe("Incubated startups — companies registered and grants received."),
  distinguishedAlumni: z
    .array(
      z.strictObject({
        name: z.string(),
        designation: z.string().optional(),
        organization: z.string().optional(),
        photo: assetKey().optional(),
      }),
    )
    .optional()
    .describe(
      "Distinguished alumni — gallery of name + designation + organization, with an optional portrait (initials shown when absent).",
    ),
  testimonials: z
    .array(
      z.strictObject({
        name: z.string(),
        quote: z.string(),
        designation: z.string().optional(),
        organization: z.string().optional(),
        photo: assetKey().optional(),
      }),
    )
    .optional()
    .describe('Alumni testimonials — rendered as quote cards under an "Alumni" section.'),
  alumniRecords: z
    .array(docRef)
    .optional()
    .describe('Alumni record PDFs — rendered as a downloadable "Alumni Records" section.'),
  patents: z
    .array(
      z.strictObject({
        title: z.string(),
        applicationNumber: z.string().optional(),
        inventors: z.string().optional(),
        area: z.string().optional(),
        filed: z.string().optional(),
        published: z.string().optional(),
        awarded: z.string().optional(),
        awardNumber: z.string().optional(),
        status: z.string().optional(),
      }),
    )
    .optional()
    .describe("Patents filed/published/granted — rendered as a table on the Research page."),
  phdsAwarded: z
    .array(
      z.strictObject({
        scholar: z.string(),
        guide: z.string(),
        title: z.string(),
        year: z.string().optional(),
        usn: z.string().optional(),
        status: z.string().optional(),
      }),
    )
    .optional(),
  researchScholars: z
    .array(
      z.strictObject({
        scholar: z.string(),
        usn: z.string().optional(),
        guide: z.string(),
        title: z.string().optional(),
        status: z.string(),
      }),
    )
    .optional(),
  researchGrants: z
    .array(
      z.strictObject({
        title: z.string(),
        agency: z.string(),
        year: z.string(),
        amount: z.string(),
        investigators: z.string(),
      }),
    )
    .optional(),
  labs: z
    .array(
      z.strictObject({
        name: z.string(),
        description: z.string().optional(),
        features: z.array(z.string()).optional(),
        images: z.array(assetKey()).optional(),
        feature: z.boolean().optional(),
        items: z.array(groupItem).optional(),
        table: dataTable.optional(),
      }),
    )
    .optional(),
  infrastructureLabs: z
    .array(
      z.strictObject({
        name: z.string(),
        description: z.string().optional(),
        images: z.array(assetKey()).optional(),
      }),
    )
    .optional()
    .describe(
      "Labs shown under the Infrastructure tab (title + caption + images), separate from `labs` which render under Research.",
    ),
  facultyGroupPhoto: photo(
    "Group photo of the teaching faculty, shown as a banner above the Faculty grid.",
  ).optional(),
  staffGroupPhoto: photo(
    "Group photo of the supporting staff, shown as a banner above the Supporting Staff tables.",
  ).optional(),
  placementsPhoto: photo(
    "Group photo of placed students, shown as a captioned banner at the end of the Placements section.",
  ).optional(),
  placementImages: z
    .array(titledImages)
    .optional()
    .describe(
      "Placement infographics (e.g. year-wise placement data, training structure) shown above the Placements tables.",
    ),
  homeGroupPhoto: photo(
    "Group photo shown as a captioned banner at the very end of the department Home tab (e.g. the graduating batch).",
  ).optional(),
  facilitiesGallery: z
    .array(titledImages)
    .optional()
    .describe(
      "Categorised facility photos (classrooms, labs, library, campus), shown as captioned galleries on the Facilities tab.",
    ),
  supportingStaff: z
    .array(
      z.strictObject({
        name: z.string(),
        designation: z.string(),
        photo: assetKey().optional(),
        role: z
          .enum(["technical", "supporting"])
          .optional()
          .describe(
            "Which table this person appears in when `groupSupportingStaff` splits the roster. Ignored otherwise.",
          ),
      }),
    )
    .optional(),
  committeeGroups: z
    .array(
      z.strictObject({
        title: z.string(),
        members: z.array(
          z.strictObject({
            name: z.string(),
            position: z.string().describe('The seat held, e.g. "Chairman" or "Member".'),
            affiliation: z
              .string()
              .optional()
              .describe(
                "Designation and institution, shown as a third column. A group where nobody has one renders two columns.",
              ),
            email: z.string().optional(),
            phone: z.string().optional(),
          }),
        ),
      }),
    )
    .optional(),
  infrastructureItems: z
    .array(
      z.strictObject({
        name: z.string(),
        specification: z.string().optional(),
        quantity: z.string().optional(),
      }),
    )
    .optional(),
  facilitiesTables: z
    .array(dataTable)
    .optional()
    .describe("Free-form tables shown under the Facilities tab (Infrastructure Details)."),
  laboratories: z
    .array(z.strictObject({ name: z.string(), area: z.string().optional() }))
    .optional(),
  researchLaboratories: z
    .array(z.string())
    .optional()
    .describe("Plain list of research-laboratory names shown as a leading table in the Facilities section."),
  softwareItems: z
    .array(
      z.strictObject({
        name: z.string(),
        version: z.string().optional(),
        usage: z.string().optional(),
      }),
    )
    .optional(),
  activities: z
    .array(
      z.strictObject({
        title: z.string(),
        date: z.string().optional(),
        description: z.string().optional(),
        details: z
          .array(z.string())
          .optional()
          .describe("Labelled facts (resource person, participants, budget, outcomes…) shown as bullets."),
        images: z
          .array(z.strictObject({ key: assetKey(), caption: z.string().optional() }))
          .optional()
          .describe("Captioned event photos rendered as a gallery under the activity."),
      }),
    )
    .optional(),
  activityTables: z
    .array(dataTable)
    .optional()
    .describe(
      'Department activity programmes (SDPs, FDPs, workshops) rendered as titled tables under an "Activities" section.',
    ),
  associations: z
    .array(
      z.strictObject({
        name: z.string(),
        about: z.string().optional(),
        photo: photo(
          "Group photo of the association's office bearers, shown as a captioned banner at the end of the section.",
        ).optional(),
        coordinators: z
          .array(
            // A bare name, or the same person with details. Empty is neither —
            // see `groupItem` for why the plain string has a minimum.
            z.union([
              z.string().min(1),
              z.strictObject({
                name: z.string(),
                designation: z.string().optional(),
                email: z.string().optional(),
                phone: z.string().optional(),
                photo: assetKey().optional(),
              }),
            ]),
          )
          .optional(),
        exicom: z
          .array(
            z.strictObject({
              name: z.string(),
              position: z.string(),
              photo: assetKey().optional(),
            }),
          )
          .optional()
          .describe("Student executive committee (exicom) — office bearers and the positions they hold."),
        exicomGroups: z
          .array(
            z.strictObject({
              title: z.string(),
              members: z.array(groupItem).optional(),
              table: dataTable.optional(),
            }),
          )
          .optional()
          .describe("Coordinator teams listed by category (e.g. Technical, Program, Sports, Cultural, Media)."),
        gallery: z
          .array(assetKey())
          .optional()
          .describe("Asset keys for an activity-highlights photo gallery shown at the end of the section."),
        events: z
          .array(
            z.strictObject({
              title: z.string(),
              date: z.string().optional(),
              coordinators: z.string().optional(),
            }),
          )
          .optional()
          .describe("Events organised by the association (name + date + coordinators), shown as a list."),
        contact: z
          .strictObject({
            name: z.string(),
            designation: z.string().optional(),
            department: z.string().optional(),
            college: z.string().optional(),
            location: z.string().optional(),
            email: z.string().optional(),
            phone: z.string().optional(),
            photo: assetKey().optional(),
          })
          .optional(),
        documents: z.array(docRef).optional(),
      }),
    )
    .optional(),
  mous: z
    .array(
      z.strictObject({
        partner: z.string(),
        location: z.string().optional(),
        since: z.string().optional(),
      }),
    )
    .optional(),
  mouImages: z
    .array(assetKey())
    .optional()
    .describe("Asset keys for MoU signing photos, shown as a gallery under the MoUs section."),
  researchGallery: z
    .array(titledImages)
    .optional()
    .describe("Research-laboratory photo galleries shown under the Research section (title + asset keys)."),
  contact: z
    .strictObject({
      name: z.string().optional(),
      designation: z.string().optional(),
      phone: z.string().optional(),
      email: z.string().optional(),
      photo: assetKey().optional(),
    })
    .optional(),
  additionalContacts: z
    .array(
      z.strictObject({
        name: z.string(),
        designation: z.string().optional(),
        phone: z.string().optional(),
        email: z.string().optional(),
      }),
    )
    .optional(),
  documents: z.array(docRef).optional(),
  curriculumGroups: z
    .array(
      z.strictObject({
        title: z.string(),
        documents: z.array(docRef).optional(),
        sections: z
          .array(z.strictObject({ title: z.string(), documents: z.array(docRef) }))
          .optional(),
      }),
    )
    .optional()
    .describe(
      "Curriculum shown as labelled sub-tabs (e.g. Scheme of Teaching & Examinations / Syllabus). A tab holds either a flat `documents` grid, or `sections` — labelled blocks each with their own grid.",
    ),
  sectionDocuments: z
    .record(z.string(), z.array(docRef))
    .optional()
    .describe(
      "Extra PDFs attached to a specific section, keyed by section id (research, mou, facilities, faculty…).",
    ),
  sectionNavDocuments: z
    .record(z.string(), z.array(docRef))
    .optional()
    .describe(
      "PDFs linked straight from a section's sidebar entry (sub-links that open the file), keyed by section id — e.g. a faculty-on-roll sheet under Teaching Faculty.",
    ),
  sectionEmbeds: z
    .record(z.string(), z.array(docRef))
    .optional()
    .describe("PDFs embedded inline (rendered in a viewer) under a specific section, keyed by section id."),
  customSections: z
    .array(
      z.strictObject({
        id: z.string(),
        title: z.string(),
        label: z.string().optional().describe("Sidebar label; falls back to `title`."),
        icon: z.string().optional(),
        content: z.string().optional(),
        items: z.array(z.string()).optional(),
        groups: z
          .array(
            z.strictObject({
              subtitle: z.string().optional(),
              text: z.string().optional(),
              items: z.array(groupItem).optional(),
              images: z.array(assetKey()).optional(),
              featureImages: z.boolean().optional(),
              largeImages: z.boolean().optional(),
              table: dataTable.optional(),
            }),
          )
          .optional(),
        tables: z.array(dataTable).optional(),
        groupPhoto: photo().optional(),
        redirectUrl: z.string().optional(),
        embeds: z.array(docRef).optional(),
        documents: z.array(docRef).optional(),
      }),
    )
    .optional()
    .describe(
      "Free-form extra sections (own sidebar tab) with intro copy, inline-embedded PDFs and/or download links.",
    ),
  bestPractices: z
    .array(docRef)
    .optional()
    .describe("Best-practices PDFs surfaced on the department Home tab."),
  bestPracticesList: z
    .array(z.strictObject({ practice: z.string(), year: z.string().optional() }))
    .optional()
    .describe("Best practices shown as text (practice + year) on the Home tab, instead of a PDF link."),
  alumniMentorship: z
    .boolean()
    .optional()
    .describe(
      "Render the Alumni Mentorship Program block under Alumni. Its copy still lives in components/academics/departments/eee-mentorship.tsx — only the department that runs the programme is content-controlled.",
    ),
  layout: layoutSchema
    .optional()
    .describe(
      "Where this department's blocks appear. Nothing here changes what the department says — only which tab a block lands on, what a section is called, and which tabs exist at all.",
    ),
  galleryExclude: z
    .array(z.string())
    .optional()
    .describe("Asset-key substrings to drop from the infrastructure gallery (e.g. stray portrait shots)."),
});

/** Schema for content/departments.json — per-department content keyed by content key. */
export const departmentsContentSchema = z.strictObject({
  $schema: z.string().optional(),
  departments: z
    .record(z.string(), departmentSchema)
    .describe("Map of content key (URL slug, or type/slug for PG) -> department content."),
});

export type CodedItem = z.infer<typeof codedItemSchema>;
export type DepartmentContent = z.infer<typeof departmentSchema>;
export type DepartmentsContent = z.infer<typeof departmentsContentSchema>;
