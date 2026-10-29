"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Award,
  Building2,
  ExternalLink,
  FileText,
  FlaskConical,
  Lightbulb,
  Mail,
  Quote,
  ScrollText,
  Sparkles,
  Target,
} from "lucide-react";

import { DocumentDirectory, type DocumentGroup } from "@/components/common/document-directory";
import { PhotoGallery } from "@/components/common/photo-gallery";
import { SectionHeading } from "@/components/common/section-heading";
import { Badge } from "@/components/ui/badge";
import { asset } from "@/lib/assets";
import {
  IRINS_URL,
  dean,
  flagshipCentres,
  patentsByYear,
  researchCentres,
  researchStats,
  specialOfficers,
  specializedLabs,
  sponsoredProjects,
  type PatentStatus,
} from "@/data/research/content";

const heroImage = asset("research/labs/robotics/cine0876.webp");

const anchorNav = [
  { id: "message", label: "Dean's Message" },
  { id: "officers", label: "Research Office" },
  { id: "centres-of-excellence", label: "Centres of Excellence" },
  { id: "overview", label: "Overview" },
  { id: "centres", label: "Research Centres" },
  { id: "patents", label: "Patents" },
  { id: "sponsored", label: "Sponsored Research" },
  { id: "resources", label: "Resources" },
];

const overviewStats = [
  { value: "89", label: "Faculty with Ph.D." },
  { value: "855", label: "Journal Publications" },
  { value: "355", label: "Conference Papers" },
  { value: "₹43 Cr", label: "Grants incl. TEQIP" },
];

const patentStatusStyles: Record<PatentStatus, string> = {
  Granted: "bg-green-100 text-green-800 border-green-200",
  Published: "bg-blue-100 text-blue-800 border-blue-200",
  Filed: "bg-amber-100 text-amber-800 border-amber-200",
  "Under Review": "bg-stone-100 text-stone-700 border-stone-200",
};

const totalPatents = patentsByYear.reduce((n, y) => n + y.patents.length, 0);
const grantedPatents = patentsByYear.reduce(
  (n, y) => n + y.patents.filter((p) => p.status === "Granted").length,
  0,
);
const publishedPatents = patentsByYear.reduce(
  (n, y) => n + y.patents.filter((p) => p.status === "Published").length,
  0,
);

const patentFilters = [
  { key: "all", label: "All", count: totalPatents },
  { key: "Granted", label: "Granted", count: grantedPatents },
  { key: "Published", label: "Published", count: publishedPatents },
  {
    key: "pending",
    label: "Pending",
    count: totalPatents - grantedPatents - publishedPatents,
  },
] as const;

type PatentFilter = (typeof patentFilters)[number]["key"];

function matchesFilter(status: PatentStatus, filter: PatentFilter) {
  if (filter === "all") return true;
  if (filter === "pending") return status === "Filed" || status === "Under Review";
  return status === filter;
}

const ongoingProjects = sponsoredProjects.filter((p) => p.status === "Ongoing").length;

export function ResearchContent({
  documents,
}: {
  documents: { scopus: DocumentGroup[]; policies: DocumentGroup[] };
}) {
  const [activeCentre, setActiveCentre] = useState(flagshipCentres[0].key);
  const [patentFilter, setPatentFilter] = useState<PatentFilter>("all");

  const centre =
    flagshipCentres.find((c) => c.key === activeCentre) ?? flagshipCentres[0];

  const filteredPatentYears = useMemo(
    () =>
      patentsByYear
        .map((group) => ({
          ...group,
          patents: group.patents.filter((p) => matchesFilter(p.status, patentFilter)),
        }))
        .filter((group) => group.patents.length > 0),
    [patentFilter],
  );

  return (
    <main className="bg-background text-foreground">
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-stone-200 bg-linear-to-br from-orange-50 via-white to-stone-50">
        <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#f97316_0%,transparent_38%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,#0f172a_0%,transparent_32%)]" />
        </div>
        <div className="relative container mx-auto max-w-6xl px-4 py-16 lg:px-6 md:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
            <div className="animate-in fade-in-50 slide-in-from-bottom-3 duration-700">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Research &amp; Development
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                Turning curiosity into{" "}
                <span className="text-primary">real-world impact</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-600 md:text-lg">
                Ten VTU-recognized research centres, flagship Centres of
                Excellence in Robotics, IoT and Computer Vision, and
                industry-partnered labs advancing engineering, science and
                management at BEC Bagalkote.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={IRINS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-200/60 transition-all hover:bg-primary/90 hover:shadow-orange-200"
                >
                  Explore BEC IRINS Portal
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href="#centres-of-excellence"
                  className="inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-gray-800 transition-colors hover:border-primary/50 hover:text-primary"
                >
                  Centres of Excellence
                </a>
              </div>
            </div>

            <div className="animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
              <figure className="group relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 shadow-2xl shadow-stone-900/10">
                <Image
                  src={heroImage}
                  alt="Articulated robotic arm in the BEC Centre of Excellence in Robotics"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-5 text-sm font-semibold text-white">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  Centre of Excellence · Robotics
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* ── Dark stat band ─────────────────────────────────── */}
      <section className="bg-secondary text-white">
        <div className="container mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-12 lg:px-6 md:grid-cols-4">
          {researchStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-accent md:text-5xl">
                {stat.value}
              </div>
              <div className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-white/55 sm:text-xs">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Anchor nav ─────────────────────────────────────── */}
      <nav className="sticky top-[72px] z-30 hidden border-b border-stone-200 bg-background/85 backdrop-blur md:block">
        <div className="container mx-auto max-w-6xl px-4 lg:px-6">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 py-3.5 text-sm font-medium">
            {anchorNav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-gray-600 transition-colors hover:text-primary"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Dean's message (the only dean portrait) ────────── */}
      <section id="message" className="scroll-mt-28 py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-4 lg:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.4fr] lg:items-start lg:gap-14">
            <div className="lg:sticky lg:top-28">
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 shadow-lg shadow-stone-900/5">
                <Image
                  src={dean.photo}
                  alt={dean.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/25 to-transparent p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
                    Dean, Research &amp; Development
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    {dean.name}
                  </p>
                  <Link
                    href={`mailto:${dean.email}`}
                    className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-medium text-white/80 underline-offset-4 hover:text-white hover:underline"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    {dean.email}
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <SectionHeading
                eyebrow="Message from the Dean (R&D)"
                title="Fostering a vibrant, impact-driven research ecosystem"
              />
              <Quote className="mt-6 h-10 w-10 text-primary/20" aria-hidden />
              <div className="mt-2 space-y-5 text-base leading-relaxed text-gray-700 md:text-[17px]">
                {dean.message.map((para, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? "text-justify first-letter:float-left first-letter:mr-2.5 first-letter:text-5xl first-letter:font-bold first-letter:leading-[0.8] first-letter:text-primary"
                        : "text-justify"
                    }
                  >
                    {para}
                  </p>
                ))}
              </div>
              <div className="mt-8 border-t border-stone-200 pt-5">
                <p className="text-lg font-semibold text-gray-900">{dean.name}</p>
                <p className="text-sm text-gray-600">{dean.role}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Research office / special officers ─────────────── */}
      <section id="officers" className="scroll-mt-28 py-16 md:py-20">
        <div className="container mx-auto max-w-6xl space-y-10 px-4 lg:px-6">
          <div className="space-y-3">
            <SectionHeading
              eyebrow="Research Office"
              title="Special Officers"
            />
            <p className="text-base leading-relaxed text-gray-700 text-justify">
              Faculty officers who coordinate research administration, scholar
              registration, funded projects and the college&apos;s research
              committees.
            </p>
          </div>
          <div className="flex flex-wrap justify-around gap-10 py-2">
            {specialOfficers.map((officer) => (
              <div
                key={officer.email}
                className="flex w-full max-w-xs flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-shadow hover:shadow-md sm:w-72"
              >
                <div className="relative aspect-3/4 w-full overflow-hidden bg-stone-100">
                  <Image
                    src={officer.photo}
                    alt={officer.name}
                    fill
                    sizes="(min-width: 640px) 20rem, 90vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex flex-1 flex-col items-center p-5 text-center">
                  <h3 className="text-lg font-semibold leading-snug text-gray-900">
                    {officer.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">{officer.role}</p>
                  <Link
                    href={`mailto:${officer.email}`}
                    className="mt-3 inline-flex max-w-full items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    <Mail className="h-4 w-4 shrink-0" />
                    <span className="truncate">{officer.email}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Centres of Excellence ──────────────────────────── */}
      <section
        id="centres-of-excellence"
        className="scroll-mt-28 border-y border-stone-200 bg-stone-50/70 py-16 md:py-20"
      >
        <div className="container mx-auto max-w-6xl space-y-8 px-4 lg:px-6">
          <SectionHeading
            eyebrow="Flagship Initiatives"
            title="Centres of Excellence"
            description="Purpose-built centres where students, researchers and industry partners work with cutting-edge infrastructure to solve real-world problems."
          />

          <div className="flex flex-wrap gap-3">
            {flagshipCentres.map((c) => {
              const Icon = c.icon;
              const active = c.key === activeCentre;
              return (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setActiveCentre(c.key)}
                  aria-pressed={active}
                  className={`inline-flex items-center gap-2.5 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-all ${
                    active
                      ? "border-primary bg-primary text-white shadow-md shadow-orange-200/50"
                      : "border-stone-200 bg-white text-gray-700 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  CoE in {c.title}
                </button>
              );
            })}
          </div>

          <div
            key={centre.key}
            className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm animate-in fade-in-50 slide-in-from-bottom-2 duration-500"
          >
            <div className="border-b border-stone-200 bg-linear-to-br from-orange-50 to-white px-6 py-6 md:px-8">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
                  <centre.icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 md:text-2xl">
                    Centre of Excellence in {centre.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">{centre.tagline}</p>
                </div>
              </div>
            </div>

            <div className="space-y-8 px-6 py-7 md:px-8 md:py-8">
              <p className="text-base leading-relaxed text-gray-700 text-justify">
                {centre.about}
              </p>

              {centre.gallery?.length ? (
                <PhotoGallery images={centre.gallery} />
              ) : null}

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-6">
                  <div className="mb-3 flex items-center gap-2.5">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    <h4 className="text-base font-bold text-gray-900">Vision</h4>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-700">
                    {centre.vision}
                  </p>
                </div>
                <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-6">
                  <div className="mb-3 flex items-center gap-2.5">
                    <Target className="h-5 w-5 text-primary" />
                    <h4 className="text-base font-bold text-gray-900">Mission</h4>
                  </div>
                  <ul className="space-y-2">
                    {centre.mission.map((m, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-gray-700"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-base font-bold text-gray-900">
                  Key Focus Areas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {centre.focusAreas.map((area) => (
                    <span
                      key={area}
                      className="inline-flex items-center rounded-full border border-stone-200 bg-white px-3 py-1.5 text-sm text-gray-700 transition-colors hover:border-primary/40 hover:text-primary"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Overview ───────────────────────────────────────── */}
      <section id="overview" className="scroll-mt-28 py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-4 lg:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-14">
            <div>
              <SectionHeading eyebrow="At a glance" title="Research at BEC" />
              <div className="mt-5 space-y-4 text-base leading-relaxed text-gray-600">
                <p className="text-justify">
                  Basaveshwar Engineering College operates 10 research centres
                  recognized by VTU, Belagavi and functions as a QIP centre for
                  doctoral admissions. Its well-qualified faculty — 87 members
                  holding Ph.D. degrees from IITs and NITs — are actively engaged
                  in quality teaching–learning and research.
                </p>
                <p className="text-justify">
                  Over the last five years the college secured research grants of
                  about Rs. 3.00 crores, in addition to Rs. 40 crores through the
                  World Bank–assisted TEQIP programme across its three phases —
                  producing 855 peer-reviewed journal publications and 355
                  conference papers.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {overviewStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-stone-200 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="text-3xl font-bold text-primary">
                    {item.value}
                  </div>
                  <div className="mt-1.5 text-xs leading-snug text-gray-600">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recognized research centres */}
          <div id="centres" className="scroll-mt-28 pt-16">
            <h2 className="mb-6 text-2xl font-bold text-primary md:text-3xl">
              Recognized Research Centres
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-sm">
              <table className="min-w-full divide-y divide-stone-200 text-sm">
                <thead className="bg-primary/5">
                  <tr>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-primary">
                      Research Centre
                    </th>
                    <th className="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-primary">
                      Recognized
                    </th>
                    <th className="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-primary">
                      Guides
                    </th>
                    <th className="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-primary">
                      Scholars
                    </th>
                    <th className="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-primary">
                      Ph.D.s Awarded
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {researchCentres.map((row) => (
                    <tr
                      key={row.centre}
                      className="transition-colors hover:bg-orange-50/40"
                    >
                      <td className="px-5 py-3.5 font-medium text-gray-900">
                        {row.centre}
                      </td>
                      <td className="px-5 py-3.5 text-center text-gray-700">
                        {row.year}
                      </td>
                      <td className="px-5 py-3.5 text-center text-gray-700">
                        {row.guides}
                      </td>
                      <td className="px-5 py-3.5 text-center text-gray-700">
                        {row.scholars}
                      </td>
                      <td className="px-5 py-3.5 text-center text-gray-700">
                        {row.phds}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-stone-50 font-semibold text-gray-900">
                    <td className="px-5 py-3.5">Total</td>
                    <td className="px-5 py-3.5 text-center">—</td>
                    <td className="px-5 py-3.5 text-center">64</td>
                    <td className="px-5 py-3.5 text-center">123</td>
                    <td className="px-5 py-3.5 text-center">140</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── Specialized labs ───────────────────────────────── */}
      <section className="border-y border-stone-200 bg-stone-50/70 py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-4 lg:px-6">
          <div className="mb-8 flex items-center gap-3">
            <FlaskConical className="h-7 w-7 text-primary" />
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Specialized Research Laboratories
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {specializedLabs.map((lab) => {
              const Icon = lab.icon;
              return (
                <div
                  key={lab.title}
                  className="group flex h-full gap-4 rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold leading-snug text-gray-900">
                      {lab.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-gray-600">
                      {lab.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Patents ────────────────────────────────────────── */}
      <section
        id="patents"
        className="scroll-mt-28 border-y border-stone-200 bg-stone-50/70 py-16 md:py-20"
      >
        <div className="container mx-auto max-w-6xl space-y-8 px-4 lg:px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Intellectual Property"
              title="Patents Filed & Granted"
              description="A growing portfolio spanning structural engineering, AI, IoT, agriculture and biotechnology."
            />
            <div className="flex gap-3">
              <div className="rounded-2xl border border-stone-200 bg-white px-5 py-3 text-center shadow-sm">
                <div className="text-2xl font-bold text-gray-900">{totalPatents}</div>
                <div className="text-xs text-gray-500">Total</div>
              </div>
              <div className="rounded-2xl border border-green-200 bg-green-50 px-5 py-3 text-center shadow-sm">
                <div className="text-2xl font-bold text-green-700">
                  {grantedPatents}
                </div>
                <div className="text-xs text-green-700/80">Granted</div>
              </div>
            </div>
          </div>

          {/* Status filter */}
          <div className="flex flex-wrap gap-2">
            {patentFilters.map((f) => {
              const active = f.key === patentFilter;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setPatentFilter(f.key)}
                  aria-pressed={active}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    active
                      ? "border-primary bg-primary text-white"
                      : "border-stone-200 bg-white text-gray-700 hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {f.label}
                  <span
                    className={`text-xs ${active ? "text-white/80" : "text-gray-400"}`}
                  >
                    {f.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div key={patentFilter} className="space-y-10 animate-in fade-in-50 duration-300">
            {filteredPatentYears.map((group) => (
              <div key={group.year}>
                <div className="mb-4 flex items-center gap-3">
                  <h3 className="text-lg font-bold text-gray-900">{group.year}</h3>
                  <span className="h-px flex-1 bg-stone-200" />
                  <span className="text-xs font-medium text-gray-500">
                    {group.patents.length}{" "}
                    {group.patents.length === 1 ? "patent" : "patents"}
                  </span>
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  {group.patents.map((patent) => (
                    <div
                      key={patent.title}
                      className="flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="mb-2 flex items-start justify-between gap-3">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-secondary">
                          {patent.inventors.join(" · ")}
                        </p>
                        <Badge
                          className={`shrink-0 rounded-sm border ${patentStatusStyles[patent.status]}`}
                        >
                          {patent.status}
                        </Badge>
                      </div>
                      <h4 className="text-sm font-semibold leading-snug text-gray-900">
                        {patent.title}
                      </h4>
                      <dl className="mt-3 space-y-1.5 border-t border-stone-100 pt-3 text-xs text-gray-600">
                        {patent.application ? (
                          <div className="flex gap-2">
                            <dt className="w-24 shrink-0 font-medium text-gray-500">
                              Application
                            </dt>
                            <dd className="min-w-0 break-words">
                              {patent.application}
                            </dd>
                          </div>
                        ) : null}
                        {patent.publication ? (
                          <div className="flex gap-2">
                            <dt className="w-24 shrink-0 font-medium text-gray-500">
                              Publication
                            </dt>
                            <dd className="min-w-0 break-words">
                              {patent.publication}
                            </dd>
                          </div>
                        ) : null}
                        {patent.award ? (
                          <div className="flex gap-2">
                            <dt className="w-24 shrink-0 font-medium text-gray-500">
                              Award / Grant
                            </dt>
                            <dd className="min-w-0 break-words">{patent.award}</dd>
                          </div>
                        ) : null}
                        {patent.remarks ? (
                          <div className="flex gap-2">
                            <dt className="w-24 shrink-0 font-medium text-gray-500">
                              Remarks
                            </dt>
                            <dd className="min-w-0 break-words italic">
                              {patent.remarks}
                            </dd>
                          </div>
                        ) : null}
                      </dl>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sponsored research ─────────────────────────────── */}
      <section id="sponsored" className="scroll-mt-28 py-16 md:py-20">
        <div className="container mx-auto max-w-6xl space-y-8 px-4 lg:px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Funded Projects"
              title="Sponsored Research"
              description="Completed and ongoing projects funded by external agencies over the last three years."
            />
            <div className="flex gap-3">
              <div className="rounded-2xl border border-stone-200 bg-white px-5 py-3 text-center shadow-sm">
                <div className="text-2xl font-bold text-gray-900">
                  {sponsoredProjects.length}
                </div>
                <div className="text-xs text-gray-500">Projects</div>
              </div>
              <div className="rounded-2xl border border-blue-200 bg-blue-50 px-5 py-3 text-center shadow-sm">
                <div className="text-2xl font-bold text-blue-700">
                  {ongoingProjects}
                </div>
                <div className="text-xs text-blue-700/80">Ongoing</div>
              </div>
            </div>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {sponsoredProjects.map((project) => (
              <div
                key={project.title}
                className="flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                    <Building2 className="h-3.5 w-3.5" />
                    {project.agency}
                  </span>
                  <Badge
                    className={`shrink-0 rounded-sm border ${
                      project.status === "Ongoing"
                        ? "border-blue-200 bg-blue-100 text-blue-800"
                        : "border-green-200 bg-green-100 text-green-800"
                    }`}
                  >
                    {project.status}
                  </Badge>
                </div>
                <h3 className="text-base font-semibold leading-snug text-gray-900">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {project.leaders.join(", ")}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-stone-100 pt-4 text-xs text-gray-600">
                  <span>
                    <span className="font-medium text-gray-500">Period:</span>{" "}
                    {project.started} – {project.completion}
                  </span>
                  {project.duration ? (
                    <span>
                      <span className="font-medium text-gray-500">Duration:</span>{" "}
                      {project.duration}
                    </span>
                  ) : null}
                  <span className="ml-auto rounded-full bg-orange-50 px-3 py-1 font-semibold text-primary">
                    {project.funding}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Resources ──────────────────────────────────────── */}
      <section
        id="resources"
        className="scroll-mt-28 border-t border-stone-200 bg-stone-50/70 py-16 md:py-20"
      >
        <div className="container mx-auto max-w-6xl space-y-12 px-4 lg:px-6">
          <SectionHeading
            eyebrow="Publications & Downloads"
            title="Research Resources"
            description="Faculty publication profiles, year-wise Scopus indices, and official policies, patents and committee documents."
          />

          <a
            href={IRINS_URL}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col gap-4 rounded-2xl border border-stone-200 bg-linear-to-br from-orange-50 to-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md sm:flex-row sm:items-center sm:justify-between md:p-8"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
                <ScrollText className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  BEC IRINS Research Portal
                </h3>
                <p className="mt-1 max-w-xl text-sm leading-relaxed text-gray-600">
                  Explore verified faculty research profiles, publications,
                  projects and citations on BEC&apos;s Indian Research Information
                  Network System (IRINS).
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-primary group-hover:underline">
              becbgk.irins.org
              <ExternalLink className="h-4 w-4" />
            </span>
          </a>

          <div>
            <div className="mb-6 flex items-center gap-3">
              <FileText className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold text-gray-900 md:text-2xl">
                Scopus-Indexed Publications
              </h3>
            </div>
            <p className="mb-6 max-w-2xl text-sm text-gray-600">
              Year-wise lists of the college&apos;s research output indexed in
              Scopus.
            </p>
            <DocumentDirectory
              groups={documents.scopus}
            />
          </div>

          <div>
            <div className="mb-6 flex items-center gap-3">
              <Award className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold text-gray-900 md:text-2xl">
                Policies, Patents &amp; Committees
              </h3>
            </div>
            <DocumentDirectory
              groups={documents.policies}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
