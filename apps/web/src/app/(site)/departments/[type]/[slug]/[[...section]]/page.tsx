import type { Metadata } from "next";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { DepartmentLayout } from "@/components/academics/departments/department-layout";
import { DepartmentHeroCarousel } from "@/components/academics/departments/hero-carousel";
import { getDepartmentData, type DepartmentData } from "@/data/department/department";
import { getDepartmentContent } from "@/content/departments";
import {
  DEFAULT_DEPARTMENT_SECTION,
  departmentCategories,
  departmentHref,
  type DepartmentType,
} from "@/data/departments-catalog";
import { pageMetadata } from "@/lib/seo";
import { BreadcrumbsJsonLd, ProgramJsonLd } from "@/components/seo/jsonld";

type DepartmentParams = { type: string; slug: string; section?: string[] };

function clampDescription(text: string, max = 158): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const slice = clean.slice(0, max);
  const lastSpace = slice.lastIndexOf(" ");
  return (lastSpace > 0 ? slice.slice(0, lastSpace) : slice).trim();
}

/**
 * Match the URL's section segment against the sections this department actually
 * has. Returns null for anything unroutable so the caller can 404 rather than
 * render the layout's "will be updated soon" placeholder at a real URL.
 */
function resolveSection(dept: DepartmentData, section?: string[]) {
  if (section && section.length > 1) return null;
  const defaultId = dept.sidebar[0]?.id ?? DEFAULT_DEPARTMENT_SECTION;
  const requested = section?.[0];
  if (!requested) return { id: defaultId, label: dept.sidebar[0]?.label, isDefault: true };
  const item = dept.sidebar.find((s) => s.id === requested);
  if (!item) return null;
  return { id: item.id, label: item.label, isDefault: item.id === defaultId };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return departmentCategories.flatMap((category) =>
    category.departments.flatMap((entry) => {
      const { sidebar } = getDepartmentData(category.key, entry.slug);
      const base = { type: category.key, slug: entry.slug };
      // The first sidebar entry lives at the base URL; its explicit segment is
      // still generated so the built page can redirect it there (dynamicParams
      // is false, so anything not listed here 404s without a server render).
      return [
        { ...base, section: [] as string[] },
        ...sidebar.map((item) => ({ ...base, section: [item.id] })),
      ];
    }),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<DepartmentParams>;
}): Promise<Metadata> {
  const { type, slug, section } = await params;
  const content = getDepartmentContent(slug, type);
  if (!content) return {};

  const dept = getDepartmentData(type, slug);
  const resolved = resolveSection(dept, section);
  if (!resolved) return {};

  const overview =
    content.overview ??
    content.tagline ??
    `${dept.name} at Basaveshwar Engineering College, Bagalkote.`;

  return pageMetadata({
    title: resolved.isDefault ? dept.name : `${resolved.label} — ${dept.name}`,
    description: clampDescription(
      resolved.isDefault
        ? overview
        : `${resolved.label} at the ${dept.name}, Basaveshwar Engineering College, Bagalkote. ${overview}`,
    ),
    path: departmentHref(type as DepartmentType, slug, resolved.id),
  });
}

// ⭐ SERVER COMPONENT (NO "use client")
export default async function DepartmentPage({
  params,
}: {
  params: Promise<DepartmentParams>;
}) {
  const { type, slug, section } = await params;

  const content = getDepartmentContent(slug, type);
  if (!content) {
    notFound();
  }

  const dept = getDepartmentData(type, slug);
  const resolved = resolveSection(dept, section);
  if (!resolved) {
    notFound();
  }

  // Check if this section has a redirectUrl configured
  // The layout is a client component: it gets this URL's section only, not the
  // department's whole section list (see DepartmentLayoutProps).
  const { sections, ...layoutDept } = dept;
  const resolvedSection = sections?.find((s) => s.id === resolved.id);
  if (resolvedSection && "redirectUrl" in resolvedSection && resolvedSection.redirectUrl) {
    redirect(resolvedSection.redirectUrl);
  }

  // The default section is reachable at the base URL; keep one URL per section.
  if (resolved.isDefault && section?.length) {
    redirect(departmentHref(type as DepartmentType, slug));
  }

  const basePath = departmentHref(type as DepartmentType, slug);
  const credential =
    type === "pg" ? "M.Tech" : type === "ug" ? "B.E." : undefined;

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-slate-50 relative">
      <BreadcrumbsJsonLd
        items={[
          { name: "Departments", path: "/departments" },
          { name: dept.name, path: basePath },
          ...(resolved.isDefault
            ? []
            : [
                {
                  name: resolved.label ?? resolved.id,
                  path: departmentHref(type as DepartmentType, slug, resolved.id),
                },
              ]),
        ]}
      />
      {/* The programme entity is the department itself — every section resolves
          to the one canonical URL rather than declaring a duplicate programme. */}
      <ProgramJsonLd
        name={dept.name}
        description={content.overview ?? dept.tagline}
        path={basePath}
        credential={credential}
      />

      {dept.hero && dept.hero.length > 1 ? (
        <DepartmentHeroCarousel
          images={dept.hero}
          name={dept.name}
          tagline={dept.tagline}
        />
      ) : dept.hero?.[0] ? (
        <section className="relative w-full overflow-hidden border-b border-stone-200 bg-stone-900">
          <div className="relative h-[300px] sm:h-[380px] md:h-[460px] lg:h-[520px]">
            <Image
              src={dept.hero[0].src}
              alt={dept.hero[0].alt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_38%]"
            />
            {/* Legibility scrims — dark base, lightening upward and to the right */}
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/10" />
            <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/10 to-transparent" />

            <div className="absolute inset-0 flex items-end">
              <div className="container mx-auto max-w-6xl px-4 lg:px-6 pb-8 md:pb-12">
                <div className="max-w-3xl space-y-3 animate-in fade-in slide-in-from-bottom-6 duration-700">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-white text-balance [text-shadow:0_2px_18px_rgba(0,0,0,0.65)]">
                    {dept.name}
                  </h1>
                  {dept.tagline && (
                    <p className="text-base md:text-lg leading-relaxed text-white/90 max-w-2xl [text-shadow:0_1px_12px_rgba(0,0,0,0.7)]">
                      {dept.tagline}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="relative overflow-hidden border-b border-stone-200 bg-linear-to-br from-orange-50 via-white to-stone-50 py-14 md:py-18">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#f97316_0%,transparent_35%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,#0f172a_0%,transparent_28%)]" />
          </div>

          <div className="relative container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18">
            <div className="mt-4 space-y-4 lg:w-fit">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-gray-900 text-balance lg:whitespace-nowrap">
                {dept.name}
              </h1>
              {dept.tagline && (
                <p className="text-base md:text-lg leading-relaxed text-gray-700 lg:whitespace-nowrap text-right">
                  {dept.tagline}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      <div className="container mx-auto px-4 py-12 lg:py-16 relative z-10">
        <DepartmentLayout
          dept={layoutDept}
          activeSectionId={resolved.id}
          activeSection={resolvedSection}
          basePath={basePath}
        />
      </div>
    </div>
  );
}
