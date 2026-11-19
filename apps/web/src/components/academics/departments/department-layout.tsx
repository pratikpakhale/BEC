"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import DepartmentSidebar from "@/components/academics/departments/sidebar";
import type {
  DataTable,
  DepartmentData,
  DepartmentSection,
  DocLink,
  SectionImage,
} from "@/data/department/department";
import type { PhotoWidth } from "@/content/schema/shared";
import ContentSection from "@/components/academics/departments/content";
import ContactSection from "@/components/academics/departments/contact-section";
import TestimonialsSection from "@/components/academics/departments/testimonials";
import { CheckCircle2, ChevronDown, FileText, Download } from "lucide-react";
import { FacultyCard } from "@/components/academics/faculty/faculty-card";
import { PhotoGallery } from "@/components/common/photo-gallery";
import { QuickFacts } from "@/components/academics/departments/quick-facts";
import { PlacementOffersChart } from "@/components/academics/departments/placement-offers-chart";

interface DepartmentLayoutProps {
  /**
   * Everything but the section list. This is a client component, so whatever it
   * receives is serialized into every prerendered page; the full list is ~95% of
   * a department's data and would ride along on each of its section URLs.
   */
  dept: Omit<DepartmentData, "sections">;
  /** Sidebar id of the section the URL resolves to. */
  activeSectionId: string;
  /** The section `activeSectionId` names, when it is one of `dept.sections`. */
  activeSection?: DepartmentSection;
  /** Department root, e.g. /departments/ug/civil-engg. */
  basePath: string;
}

/** A responsive grid of downloadable PDF links, reused across sections. */
function DocGrid({ documents }: { documents: DocLink[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {documents.map((doc, i) => (
        <a
          key={i}
          href={doc.url}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-3 rounded-md border border-stone-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-orange-50 text-primary">
            <FileText className="h-5 w-5" />
          </span>
          <span className="min-w-0 flex-1 text-sm font-medium text-gray-900 group-hover:text-primary">
            {doc.title}
          </span>
          <Download className="h-4 w-4 shrink-0 text-stone-400 group-hover:text-primary" />
        </a>
      ))}
    </div>
  );
}

/** Documents tab — flat grid, or labelled sub-tabs when `groups` is provided. */
function DocumentsSection({
  title,
  documents,
  groups,
}: {
  title: string;
  documents: DocLink[];
  groups?: {
    title: string;
    documents: DocLink[];
    sections?: { title: string; documents: DocLink[] }[];
  }[];
}) {
  const [active, setActive] = useState(0);
  const activeGroup = groups?.[active];
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      {groups?.length ? (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2 border-b border-stone-200">
            {groups.map((g, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                  i === active
                    ? "border-primary text-primary"
                    : "border-transparent text-stone-500 hover:text-gray-900"
                }`}
              >
                {g.title}
              </button>
            ))}
          </div>
          {activeGroup?.sections?.length ? (
            <div className="space-y-8">
              {activeGroup.sections.map((s, i) => (
                <div key={i} className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">{s.title}</h3>
                  <DocGrid documents={s.documents} />
                </div>
              ))}
            </div>
          ) : (
            <DocGrid documents={activeGroup?.documents ?? []} />
          )}
        </div>
      ) : (
        <DocGrid documents={documents} />
      )}
    </div>
  );
}

/** Department Highlights card — shown on Home or (per-department) under "About". */
function HighlightsBlock({ highlights }: { highlights?: string[] }) {
  if (!highlights?.length) return null;
  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Department Highlights</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {highlights.map((h, i) => (
          <li
            key={i}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-orange-50 transition-colors"
          >
            <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <span className="text-gray-700 font-medium">{h}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Best Practices card — shown on Home or (per-department) under "About".
 *  Renders a text list (practice + year) and/or downloadable PDFs. */
function BestPracticesBlock({
  documents,
  list,
}: {
  documents?: DepartmentData["bestPractices"];
  list?: DepartmentData["bestPracticesList"];
}) {
  if (!documents?.length && !list?.length) return null;
  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Best Practices</h2>
      {list?.length ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {list.map((b, i) => (
            <li
              key={i}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-orange-50 transition-colors"
            >
              <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <span className="text-gray-700 font-medium">
                {b.practice}
                {b.year && <span className="ml-1 font-normal text-gray-500">· {b.year}</span>}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
      {documents?.length ? (
        <div className={list?.length ? "mt-6" : ""}>
          <DocGrid documents={documents} />
        </div>
      ) : null}
    </div>
  );
}

/** Message from the Head of Department — shown on the Home tab with an optional portrait. */
function HodMessageBlock({ hodMessage }: { hodMessage: NonNullable<DepartmentData["hodMessage"]> }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900">
        {hodMessage.title ?? "Head of the Department"}
      </h2>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
        {hodMessage.image && (
          <div className="relative mx-auto aspect-[900/777] w-56 shrink-0 overflow-hidden rounded-xl bg-stone-100 shadow-sm ring-1 ring-stone-200 sm:mx-0 sm:w-64">
            <Image
              src={hodMessage.image.src}
              alt={hodMessage.image.alt}
              fill
              sizes="(min-width: 640px) 256px, 224px"
              className="object-cover object-top"
            />
          </div>
        )}
        <div className="min-w-0 flex-1">
          {hodMessage.message && (
            <p className="whitespace-pre-line leading-relaxed text-gray-700 text-justify">{hodMessage.message}</p>
          )}
          {hodMessage.name && (
            <div className={hodMessage.message ? "mt-5" : undefined}>
              <p className="font-semibold text-gray-900">{hodMessage.name}</p>
              {hodMessage.designation && (
                <p className="mt-0.5 text-sm text-gray-500">{hodMessage.designation}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** Highlighted pill caption shown under a photo (e.g. "Teaching Faculty"). */
function PhotoCaption({ children }: { children: string }) {
  return (
    <figcaption className="mt-4 flex justify-center">
      <span className="inline-flex items-center rounded-full bg-orange-50 px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary ring-1 ring-primary/20">
        {children}
      </span>
    </figcaption>
  );
}

/**
 * The max-width a photo can ask for. Departments whose group shots are
 * panoramas set `width` in content; "full" and the absence of a width both mean
 * "as wide as the column".
 */
const PHOTO_WIDTH: Record<PhotoWidth, string> = {
  narrow: "max-w-xl mx-auto",
  medium: "max-w-3xl mx-auto",
  wide: "max-w-4xl mx-auto",
  full: "",
};

const widthClass = (width: PhotoWidth | undefined, fallback: PhotoWidth = "full") =>
  PHOTO_WIDTH[width ?? fallback];

/** Department lead photo (e.g. the group photo) — shown on Home or, per-department, under "About". */
function OverviewPhoto({
  image,
  className,
}: {
  image: SectionImage;
  className?: string;
}) {
  return (
    <figure className={[className, widthClass(image.width)].filter(Boolean).join(" ") || undefined}>
      <div className="relative aspect-3/2 w-full overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="(min-width: 1024px) 900px, 100vw"
          className="object-cover"
        />
      </div>
      {image.caption && <PhotoCaption>{image.caption}</PhotoCaption>}
    </figure>
  );
}

/** Renders a section's relocated/attached PDFs below its main content. */
function SectionAttachments({ documents }: { documents?: DocLink[] }) {
  if (!documents?.length) return null;
  return (
    <div className="mt-8 space-y-3">
      <h3 className="text-base font-semibold text-gray-900">Related Documents</h3>
      <DocGrid documents={documents} />
    </div>
  );
}

/** Inline PDF viewers rendered under a section, with an open-in-new-tab fallback. */
function SectionEmbeds({ documents }: { documents?: DocLink[] }) {
  if (!documents?.length) return null;
  return (
    <div className="mt-8 space-y-8">
      {documents.map((doc, i) => (
        <div key={i} className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-gray-900">{doc.title}</h3>
            <a
              href={doc.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              <Download className="h-4 w-4" />
              Download
            </a>
          </div>
          <div className="overflow-hidden rounded-md border border-stone-200 bg-stone-50 shadow-sm">
            <object
              data={doc.url}
              type="application/pdf"
              className="h-[75vh] max-h-[900px] min-h-[420px] w-full"
              aria-label={doc.title}
            >
              <div className="flex flex-col items-center gap-3 p-8 text-center">
                <FileText className="h-8 w-8 text-primary" />
                <p className="text-sm text-stone-600">
                  Your browser can&rsquo;t display this PDF inline.
                </p>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                >
                  <Download className="h-4 w-4" />
                  Open {doc.title}
                </a>
              </div>
            </object>
          </div>
        </div>
      ))}
    </div>
  );
}

/** A group-photo banner shown above a section's content (faculty / staff).
 *  Renders at the image's natural aspect ratio so no one gets cropped, regardless
 *  of the source photo's dimensions. */
function GroupPhotoBanner({ image }: { image: { src: string; alt: string; caption?: string } }) {
  return (
    <figure className="w-full">
      <div className="w-full overflow-hidden rounded-2xl border border-gray-100 bg-stone-100 shadow-sm">
        <Image
          src={image.src}
          alt={image.alt}
          width={0}
          height={0}
          sizes="(min-width: 1024px) 900px, 100vw"
          className="h-auto w-full"
        />
      </div>
      {image.caption && <PhotoCaption>{image.caption}</PhotoCaption>}
    </figure>
  );
}

/** Captioned photo galleries (e.g. Facilities: classrooms / labs / library / campus). */
function ImageGroups({ groups }: { groups: { title?: string; images: { src: string; alt: string }[]; natural?: boolean }[] }) {
  return (
    <div className="space-y-8">
      {groups.map((group, i) => (
        <div key={i} className="space-y-3">
          {group.title && (
            <h3 className="text-base font-semibold uppercase tracking-wide text-secondary">
              {group.title}
            </h3>
          )}
          {group.natural ? (
            <PhotoGallery images={group.images} natural />
          ) : (
            <PhotoGallery images={group.images} centered large />
          )}
        </div>
      ))}
    </div>
  );
}

function DataGrid({ table, framed = true }: { table: DataTable; framed?: boolean }) {
  return (
    <div
      className={
        framed
          ? "overflow-x-auto rounded-md border border-stone-200 bg-white shadow-sm"
          : "overflow-x-auto border-t border-stone-200"
      }
    >
      <table className="min-w-full divide-y divide-stone-200 text-sm">
        <thead className="bg-primary/5">
          <tr>
            {table.columns.map((column) => (
              <th
                key={column}
                scope="col"
                className="min-w-[160px] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-primary"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100 bg-white">
          {table.rows.map((row, rowIndex) => (
            <tr key={`${table.title}-${rowIndex}`} className="align-top">
              {row.map((cell, cellIndex) => (
                <td
                  key={`${table.title}-${rowIndex}-${cellIndex}`}
                  className="min-w-[180px] px-4 py-3 leading-relaxed text-stone-700 first:font-medium first:text-gray-900 whitespace-pre-line"
                >
                  {cell || "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DepartmentTables({ title, tables }: { title?: string; tables: DataTable[] }) {
  return (
    <section className="space-y-6">
      {title ? <h2 className="text-2xl font-bold text-gray-900">{title}</h2> : null}
      <div className="space-y-8">
        {tables.map((table) =>
          table.collapsed ? (
            <details key={table.title} className="group/table rounded-md border border-stone-200 bg-white shadow-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-base font-semibold text-primary hover:bg-primary/5">
                <span>{table.title}</span>
                <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open/table:rotate-180" />
              </summary>
              <DataGrid table={table} framed={false} />
            </details>
          ) : (
            <div key={table.title} className="space-y-3">
              <h3 className="text-base font-semibold text-primary">{table.title}</h3>
              <DataGrid table={table} />
            </div>
          ),
        )}
      </div>
    </section>
  );
}

export function DepartmentLayout({
  dept,
  activeSectionId,
  activeSection,
  basePath,
}: DepartmentLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInitialRender = useRef(true);

  // Arriving on a shared section link should leave the page at the top, so only a
  // section switch adjusts scroll — and only when the section start has already
  // scrolled out of reach, since jumping from deep inside a long section is
  // disorienting.
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    const el = containerRef.current;
    if (!el) return;
    const headerHeight =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--header-h"),
      ) || 0;
    if (el.getBoundingClientRect().top < headerHeight) {
      el.scrollIntoView({ block: "start", behavior: "instant" });
    }
  }, [activeSectionId]);

  const renderContent = () => {
    // 1. HOME tab (Overview + Highlights)
    if (activeSectionId === "home") {
        return (
            <div className="space-y-4">
                {dept.chronicleImage && (
                    <GroupPhotoBanner image={dept.chronicleImage} />
                )}
                <ContentSection
                    title={dept.overview.title}
                    content={dept.overview.content}
                    icon={dept.overview.icon}
                    justify
                    wide
                />
                {dept.quickStats && dept.quickStats.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {dept.quickStats.map((stat, i) => (
                            <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
                                <p className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</p>
                                <p className="text-xs uppercase tracking-wider text-gray-500 mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                )}
                {/* Vision & Mission directly after the overview (per-department) */}
                {dept.visionMissionOnHome && (dept.vision || dept.mission) && (
                    <div className="grid grid-cols-1 gap-4">
                        {dept.vision && (
                            <ContentSection
                                title={dept.vision.title}
                                content={dept.vision.content}
                                icon={dept.vision.icon}
                            />
                        )}
                        {dept.mission && (
                            <ContentSection
                                title={dept.mission.title}
                                content={dept.mission.content}
                                items={dept.mission.items}
                                icon={dept.mission.icon}
                            />
                        )}
                    </div>
                )}
                {dept.quickFacts && <QuickFacts quickFacts={dept.quickFacts} />}
                {/* Programs / PEOs / POs / WK / PSOs — relocated here when there is no Academics tab */}
                {dept.academicGroups && dept.academicGroups.length > 0 && (
                    <ContentSection
                        title="Academics"
                        groups={dept.academicGroups}
                        icon="book"
                    />
                )}
                {/* HoD message + lead photo — relocated under About when Vision & Mission are on Home or hodMessageUnderAbout is true */}
                {((!dept.visionMissionOnHome && !dept.hodMessageUnderAbout) || dept.hideAboutTab) && dept.hodMessage && (
                    <HodMessageBlock hodMessage={dept.hodMessage} />
                )}
                {((!dept.visionMissionOnHome && (!dept.hodMessageUnderAbout || dept.overviewPhotoOnHome)) || dept.hideAboutTab) && dept.overview.image && (
                    <OverviewPhoto
                        image={dept.overview.image}
                        className={(dept.hodMessage && !dept.hodMessageUnderAbout) ? "mt-8 mb-12" : "-mt-4 mb-12"}
                    />
                )}
                {/* Milestones stand in for Highlights on Home when milestonesOnHome is set */}
                {dept.milestonesOnHome && dept.milestones && (
                    <ContentSection
                        title={dept.milestones.title}
                        items={dept.milestones.items}
                        icon={dept.milestones.icon}
                    />
                )}
                {/* Highlights — hidden on Home when moved under About */}
                {(!dept.visionMissionOnHome || dept.hideAboutTab) && !dept.milestonesOnHome && (
                    <HighlightsBlock highlights={dept.highlights} />
                )}
                {!dept.bestPracticesUnderAbout &&
                    (dept.bestPractices?.length || dept.bestPracticesList?.length) && (
                        <BestPracticesBlock documents={dept.bestPractices} list={dept.bestPracticesList} />
                    )}
                {dept.homeGroupPhoto && (
                    <div className="pt-4">
                        <GroupPhotoBanner image={dept.homeGroupPhoto} />
                    </div>
                )}
            </div>
        )
    }

    // 2. VISION/MISSION (Often mapped to 'about' or separate tabs)
    // Let's assume 'about' shows Vision + Mission
    if (activeSectionId === "about") {
        return (
             <div className="grid grid-cols-1 gap-8">
                {dept.hodMessageUnderAbout && dept.hodMessage && (
                    <HodMessageBlock hodMessage={dept.hodMessage} />
                )}
                {dept.hodMessageUnderAbout && !dept.overviewPhotoOnHome && dept.overview.image && (
                    <OverviewPhoto image={dept.overview.image} />
                )}

                {dept.about?.content && (
                    <ContentSection
                        title={dept.about.title}
                        content={dept.about.content}
                        icon={dept.about.icon}
                    />
                )}

                {dept.about?.image && <OverviewPhoto image={dept.about.image} className="-mt-2" />}

                {dept.visionMissionOnHome ? (
                    <>
                        {!dept.hodMessageUnderAbout && dept.hodMessage && <HodMessageBlock hodMessage={dept.hodMessage} />}
                        {dept.overview.image && <OverviewPhoto image={dept.overview.image} />}
                        <HighlightsBlock highlights={dept.highlights} />
                    </>
                ) : (
                    <>
                        {dept.vision && (
                            <ContentSection
                                title={dept.vision.title}
                                content={dept.vision.content}
                                icon={dept.vision.icon}
                            />
                        )}

                        {dept.mission && (
                            <ContentSection
                                title={dept.mission.title}
                                content={dept.mission.content}
                                items={dept.mission.items}
                                icon={dept.mission.icon}
                            />
                        )}

                        {dept.groupPhotosUnderAbout && dept.facultyGroupPhoto && (
                            <div className="pt-4">
                                <div className={widthClass(dept.facultyGroupPhoto.width, "narrow")}>
                                    <GroupPhotoBanner image={dept.facultyGroupPhoto} />
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* Milestones — bullet list directly under Vision & Mission */}
                {!dept.milestonesOnHome && dept.milestones && (
                    <ContentSection
                        title={dept.milestones.title}
                        items={dept.milestones.items}
                        icon={dept.milestones.icon}
                    />
                )}

                {/* Core values (per-department, e.g. IPE) — bullet list after the mission */}
                {dept.overview.items && dept.overview.items.length > 0 && (
                    <ContentSection
                        title="Our Core Values"
                        items={dept.overview.items}
                        icon="target"
                    />
                )}

                {dept.about?.groups && dept.about.groups.length > 0 && (
                    <ContentSection groups={dept.about.groups} justify />
                )}

                {dept.bestPracticesUnderAbout &&
                    (dept.bestPractices?.length || dept.bestPracticesList?.length) && (
                        <BestPracticesBlock documents={dept.bestPractices} list={dept.bestPracticesList} />
                    )}

                {dept.groupPhotosUnderAbout && dept.facultyGroupPhoto && dept.visionMissionOnHome && (
                    <div className="space-y-8 pt-4">
                        <div className={widthClass(dept.facultyGroupPhoto.width, "narrow")}>
                            <GroupPhotoBanner image={dept.facultyGroupPhoto} />
                        </div>
                    </div>
                )}
            </div>
        )
    }

    // 3. DYNAMIC SECTIONS
    if (activeSection) {
         if (activeSection.type === "content") {
             return (
                 <div>
                    <ContentSection
                        title={activeSection.title}
                        content={activeSection.content}
                        items={activeSection.items}
                        groups={activeSection.groups}
                        icon={activeSection.icon || "file-text"}
                    />
                    <SectionEmbeds documents={activeSection.embeds} />
                    <SectionAttachments documents={activeSection.attachments} />
                    {activeSection.tables && activeSection.tables.length > 0 && (
                        <div className="mt-10">
                            <DepartmentTables tables={activeSection.tables} />
                        </div>
                    )}
                    {activeSection.groupPhoto && (
                        <div className="mt-10">
                            <GroupPhotoBanner image={activeSection.groupPhoto} />
                        </div>
                    )}
                 </div>
             )
         }
         if (activeSection.type === "faculty-list") {
             return (
                 <div className="space-y-6">
                     <h2 className="text-2xl font-bold text-gray-900">{activeSection.title}</h2>
                     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                         {activeSection.faculty.map((member, fIndex) => (
                             <FacultyCard key={fIndex} member={member} compact={activeSection.compact} />
                         ))}
                     </div>
                     {activeSection.groupPhoto && <GroupPhotoBanner image={activeSection.groupPhoto} />}
                     <SectionAttachments documents={activeSection.attachments} />
                 </div>
             )
         }
         if (activeSection.type === "documents") {
             return (
                 <DocumentsSection
                     title={activeSection.title}
                     documents={activeSection.documents}
                     groups={activeSection.groups}
                 />
             )
         }
         if (activeSection.type === "tables") {
             return (
                  <div className="space-y-8">
                      {activeSection.placementChart && (
                          <PlacementOffersChart chart={activeSection.placementChart} />
                      )}
                      <DepartmentTables title={activeSection.title} tables={activeSection.tables} />
                      {activeSection.imageGroups && activeSection.imageGroups.length > 0 && (
                          <ImageGroups groups={activeSection.imageGroups} />
                      )}
                      {activeSection.groupPhoto && <GroupPhotoBanner image={activeSection.groupPhoto} />}
                     <SectionEmbeds documents={activeSection.embeds} />
                     <SectionAttachments documents={activeSection.attachments} />
                 </div>
             )
         }
         if (activeSection.type === "contact") {
             return (
                 <ContactSection
                     title={activeSection.title}
                     icon={activeSection.icon}
                     people={activeSection.people}
                 />
             )
         }
         if (activeSection.type === "testimonials") {
             return (
                 <TestimonialsSection
                     title={activeSection.title}
                     icon={activeSection.icon}
                     testimonials={activeSection.testimonials}
                     distinguished={activeSection.distinguished}
                     alumniMentorship={dept.alumniMentorship}
                 />
             )
         }
         if (activeSection.type === "gallery") {
             return (
                 <div className="space-y-6">
                     <h2 className="text-2xl font-bold text-gray-900">{activeSection.title}</h2>
                     <PhotoGallery images={activeSection.images} />
                     <SectionAttachments documents={activeSection.attachments} />
                 </div>
             )
         }
         if (activeSection.type === "stats") {
             return (
                 <div className="space-y-6">
                     <h2 className="text-2xl font-bold text-gray-900">{activeSection.title}</h2>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                         {activeSection.stats.map((stat, i) => (
                             <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
                                 <p className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</p>
                                 <p className="text-xs uppercase tracking-wider text-gray-500 mt-1">{stat.label}</p>
                             </div>
                         ))}
                     </div>
                 </div>
             )
         }
    }

    // 4. FALLBACK
    return (
        <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-500">Content for <span className="font-semibold text-gray-700">&ldquo;{activeSectionId}&rdquo;</span> will be updated soon.</p>
        </div>
    )
  }

  return (
        <div
            ref={containerRef}
            className="flex flex-col lg:flex-row gap-8 lg:gap-12 scroll-mt-[var(--header-h)]"
        >
            {/* Sidebar — each section is a link to its own URL */}
            <DepartmentSidebar
                items={dept.sidebar}
                activeId={activeSectionId}
                basePath={basePath}
                defaultId={dept.sidebar[0]?.id ?? "home"}
            />

            {/* Main Content Area */}
            <main className="flex-1 min-w-0">
                {renderContent()}
            </main>
        </div>
  );
}
