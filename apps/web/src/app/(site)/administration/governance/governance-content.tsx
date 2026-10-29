"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { orgChartLevels } from "@/data/governance/org-chart";
import { asset } from "@/lib/assets";
import {
  BogMember,
  bogMembers,
  deans,
  hods,
  officers,
  principal,
  sangha,
} from "@/content/governance";
import { BogTable, bogCategoryLabels } from "@/components/governance/bog-table";
import { DeansGrid } from "@/components/governance/deans-grid";
import { DocumentDirectory, type DocumentGroup } from "@/components/common/document-directory";
import { FilterChips } from "@/components/common/filter-chips";
import { PersonCard, PersonGrid } from "@/components/common/person-card";
import { SectionHeading } from "@/components/common/section-heading";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const governanceLinks = [
  {
    label: "Mandatory Disclosure (PDF)",
    href: asset("documents/disclosures/mandatory-disclosure.pdf"),
    description: "Statutory disclosure including organization details.",
  },
  {
    label: "Academic Council Members (PDF)",
    href: asset("documents/governance/academic-council/ac-members-list-2026.pdf"),
    description: "Full Academic Council composition and members.",
  },
];

// Ordered top-down by governance hierarchy: parent trust → statutory board →
// principal → deans/officers → HODs → structure → documents.
const anchorNav = [
  { id: "overview", label: "Overview" },
  { id: "sangha", label: "B.V.V. Sangha" },
  { id: "director", label: "Director" },
  { id: "bog", label: "Board of Governors" },
  { id: "leadership", label: "Principal" },
  { id: "deans", label: "Deans" },
  { id: "hods", label: "HOD Directory" },
  { id: "org-chart", label: "Organization Chart" },
  { id: "documents", label: "Documents" },
];

// Build the Board-of-Governors filter chips from the categories actually present,
// so empty categories never show a chip that yields an empty grid.
const bogFilterOptions = [
  { value: "all" as const, label: "All", count: bogMembers.length },
  ...(Object.keys(bogCategoryLabels) as BogMember["category"][])
    .filter((category) => bogMembers.some((m) => m.category === category))
    .map((category) => ({
      value: category,
      label: bogCategoryLabels[category],
      count: bogMembers.filter((m) => m.category === category).length,
    })),
];

export function GovernanceContent({
  academicCouncilDocuments,
}: {
  academicCouncilDocuments: DocumentGroup[];
}) {
  const [activeCategory, setActiveCategory] =
    useState<"all" | BogMember["category"]>("all");

  return (
    <main className="bg-background text-foreground">
      <section className="relative overflow-hidden border-b border-stone-200 bg-linear-to-br from-orange-50 via-white to-stone-50">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,color-mix(in_oklch,var(--primary)_14%,transparent)_0%,transparent_45%)]" />
        <div className="relative container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
            Administration · Governance
          </p>
          <div className="mt-4 space-y-4 max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-gray-900">
              Transparent, accountable governance that keeps BEC future-ready
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-gray-700">
              Oversight by the Board of Governors, leadership from the Principal and Deans,
              and quality stewardship by Heads of Department work together to uphold
              autonomy, accreditation, and academic excellence.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <Badge className="bg-primary text-white px-4 py-2 rounded-sm">
                Board of Governors
              </Badge>
              <Badge variant="secondary" className="rounded-sm">
                Organization chart
              </Badge>
              <Badge variant="outline" className="rounded-sm">
                Statutory oversight
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <nav className="sticky top-[72px] z-30 hidden border-b border-stone-200 bg-background/85 backdrop-blur md:block">
        <div className="container mx-auto max-w-6xl px-4 lg:px-6">
          <div className="flex flex-wrap items-center gap-3 py-3 text-sm font-medium">
            {anchorNav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-gray-600 hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section
        id="overview"
        className="py-14 md:py-18"
      >
        <div className="container mx-auto max-w-6xl px-4 lg:px-6">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Governance overview
            </h2>
            <p className="text-base leading-relaxed text-gray-700 text-justify">
              Basaveshwar Engineering College operates under the aegis of B.V.V. Sangha with
              statutory oversight by the Board of Governors. The Principal, as Member Secretary,
              leads day-to-day execution alongside Deans, Controllers, and Heads of Departments,
              ensuring policies, accreditation, and student outcomes remain aligned to mission.
            </p>
          </div>

          <dl className="mt-10 grid border-y border-stone-200 sm:grid-cols-3 sm:divide-x sm:divide-stone-200">
            {[
              {
                title: "Board of Governors",
                body: "Strategy, compliance, approvals, and statutory oversight.",
              },
              {
                title: "Principal & Deans",
                body: "Academic administration, examinations, placements, and development.",
              },
              {
                title: "Heads of Department",
                body: "Programme delivery, labs, BOS inputs, and student success.",
              },
            ].map((tier) => (
              <div
                key={tier.title}
                className="border-t border-stone-200 py-5 first:border-t-0 sm:border-t-0 sm:px-6 sm:py-6 sm:first:pl-0"
              >
                <dt className="font-semibold text-gray-900">{tier.title}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-gray-600">{tier.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section
        id="sangha"
        className="border-t border-stone-200 bg-stone-50/70 py-14 md:py-18"
      >
        <div className="container mx-auto max-w-6xl px-4 lg:px-6 space-y-8">
          <SectionHeading
            eyebrow="Parent Trust"
            title="B.V.V. Sangha leadership"
            description={sangha.intro}
          />

          <div className="grid items-center gap-6 rounded-sm border border-stone-200 bg-white p-5 shadow-sm md:grid-cols-[0.7fr_1.3fr] md:gap-8 md:p-7">
            <div className="relative mx-auto aspect-3/4 w-full max-w-[260px] overflow-hidden rounded-sm border border-stone-200 bg-stone-100 md:max-w-none">
              <Image
                src={sangha.chairman.photo}
                alt={sangha.chairman.name}
                fill
                sizes="(max-width: 768px) 80vw, 30vw"
                className="object-cover object-top"
              />
            </div>
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
                Chairman
              </p>
              <h3 className="text-2xl font-semibold text-gray-900">
                {sangha.chairman.name}
              </h3>
              <Badge className="rounded-sm bg-primary text-white">
                {sangha.chairman.role}
              </Badge>
              <p className="text-base leading-relaxed text-gray-700 text-justify">
                Chairman of B.V.V. Sangha since 1991, leading 190+ institutions from
                kindergarten to research and steering BEC&apos;s vision for quality technical
                education under the philosophy &ldquo;Work is Worship&rdquo;.
              </p>
              {sangha.chairman.messageHref ? (
                <Link
                  href={sangha.chairman.messageHref}
                  className="inline-flex text-primary text-sm font-semibold hover:underline underline-offset-4"
                >
                  Read the Chairman&apos;s message →
                </Link>
              ) : null}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
              Secretary
            </h3>
            <div className="max-w-xs">
              <PersonCard
                photo={sangha.secretary.photo}
                name={sangha.secretary.name}
                badges={[{ label: sangha.secretary.role, tone: "primary" }]}
              />
            </div>
          </div>

          <div className="relative aspect-video w-full overflow-hidden rounded-sm border border-stone-200 bg-stone-100 shadow-sm">
            <Image
              src={sangha.groupPhoto}
              alt="B.V.V. Sangha leadership"
              fill
              sizes="(max-width: 1152px) 100vw, 1152px"
              className="object-cover"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
              Office bearers
            </h3>
            <PersonGrid>
              {sangha.members.map((member) => (
                <PersonCard
                  key={member.name}
                  photo={member.photo}
                  name={member.name}
                  badges={[{ label: member.role, tone: "primary" }]}
                />
              ))}
            </PersonGrid>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
              Governing Council
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {sangha.council.map((member) => (
                <div
                  key={member.name}
                  className="flex items-start justify-between gap-3 rounded-sm border border-stone-200 bg-white px-4 py-3 shadow-sm"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                  {member.invitee ? (
                    <Badge variant="outline" className="shrink-0 rounded-sm text-xs">
                      Invitee
                    </Badge>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="director"
        className="border-t border-stone-200 py-14 md:py-18"
      >
        <div className="container mx-auto max-w-6xl px-4 lg:px-6 space-y-8">
          <SectionHeading
            eyebrow="B.V.V. Sangha"
            title="Director of Technical Education"
            description="The Director leads technical education across B.V.V. Sangha's institutes, steering BEC's growth, accreditation, and academic strategy on behalf of the parent trust."
          />

          <Card className="overflow-hidden rounded-sm border-stone-200 p-0 shadow-sm">
            <div className="grid gap-0 md:grid-cols-[1fr_300px]">
              <div className="flex flex-col justify-center gap-4 p-6 md:p-8">
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold text-gray-900">
                    Dr. R. N. Herkal
                  </h3>
                  <Badge className="rounded-sm bg-primary text-white">
                    Director of Technical Education, B.V.V. Sangha
                  </Badge>
                </div>
                <p className="text-base leading-relaxed text-gray-700 text-justify">
                  Under his leadership BEC has introduced BE-AIML and M.Tech Defence
                  Technology, secured an AICTE Idea Lab, and accredited all its UG
                  programmes — keeping the college ready for NEP-2020.
                </p>
                <Link
                  href="/administration/director"
                  className="inline-flex w-fit items-center gap-2 rounded-sm border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-primary transition-colors hover:border-primary/60"
                >
                  Read the Director&apos;s message →
                </Link>
              </div>
              <div className="relative order-first aspect-4/5 w-full bg-stone-100 md:order-last md:aspect-auto md:min-h-[340px]">
                <Image
                  src={asset("governance/director/cine9670.webp")}
                  alt="Dr. R. N. Herkal"
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section
        id="bog"
        className="border-t border-stone-200 py-14 md:py-18"
      >
        <div className="container mx-auto max-w-6xl px-4 lg:px-6 space-y-8">
          <SectionHeading
            title="Board of Governors"
            description="Official Board of Governors composition for the term 18 June 2026 – 17 June 2028. Filter by category to skim core members, nominees, invitees, and student representatives."
          />

          <div className="rounded-sm border border-stone-200 bg-white p-3 shadow-sm md:p-4">
            <FilterChips
              aria-label="Filter Board of Governors by category"
              options={bogFilterOptions}
              value={activeCategory}
              onChange={setActiveCategory}
            />
          </div>

          <BogTable
            members={
              activeCategory === "all"
                ? bogMembers
                : bogMembers.filter((member) => member.category === activeCategory)
            }
          />
        </div>
      </section>

      <section
        id="leadership"
        className="border-t border-stone-200 bg-stone-50/70 py-14 md:py-18"
      >
        <div className="container mx-auto max-w-6xl px-4 lg:px-6 space-y-8">
          <SectionHeading
            eyebrow="Leadership"
            title="Principal & Member Secretary"
            description="The Principal serves as Member Secretary to the Board of Governors and leads the institution's academic and administrative execution alongside the Deans, Controller of Examinations, and Heads of Department."
          />

          <Card className="overflow-hidden rounded-sm border-stone-200 p-0 shadow-sm">
            <div className="grid gap-0 md:grid-cols-[300px_1fr]">
              <div className="relative aspect-4/5 w-full bg-stone-100 md:aspect-auto md:min-h-[340px]">
                <Image
                  src={principal.photo}
                  alt={principal.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover object-top"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center gap-4 p-6 md:p-8">
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {principal.name}
                  </h3>
                  <Badge className="rounded-sm bg-primary text-white">
                    {principal.role}
                  </Badge>
                </div>
                <p className="text-base leading-relaxed text-gray-700 text-justify">
                  As Member Secretary to the Board of Governors, the Principal translates the
                  Board&apos;s policies into day-to-day execution — overseeing academics,
                  examinations, placements, research, and institutional development across all
                  departments.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href="/administration/principal"
                    className="inline-flex w-fit items-center gap-2 rounded-sm border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-primary transition-colors hover:border-primary/60"
                  >
                    Read the Principal&apos;s message →
                  </Link>
                  {principal.email ? (
                    <Link
                      href={`mailto:${principal.email}`}
                      className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                    >
                      {principal.email}
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section
        id="deans"
        className="border-t border-stone-200 py-14 md:py-18 container mx-auto max-w-6xl px-4 lg:px-6 space-y-10"
      >
        <div className="space-y-6">
          <SectionHeading
            title="Deans"
            description="Academic and administrative portfolios steering curriculum, placements, research, and quality."
          />
          <DeansGrid deans={deans} />
        </div>
      </section>

      <section
        id="hods"
        className="border-t border-stone-200 bg-stone-50/70 py-14 md:py-18"
      >
        <div className="container mx-auto max-w-6xl px-4 lg:px-6 space-y-8">
          <SectionHeading
            title="HOD directory"
            description="Heads of Department across all programmes."
          />

          <PersonGrid>
            {hods.map((hod) => (
              <PersonCard
                key={hod.department}
                photo={hod.photo}
                name={hod.name || hod.department}
                description={hod.name ? hod.department : undefined}
                email={hod.email}
                badges={[
                  hod.name
                    ? { label: "Head of Department", tone: "muted" }
                    : { label: "Awaiting update", tone: "outline" },
                ]}
              />
            ))}
            {officers.map((officer) => (
              <PersonCard
                key={officer.role}
                photo={officer.photo}
                name={officer.name || officer.role}
                description={officer.focus}
                email={officer.email}
                badges={
                  officer.name ? [{ label: officer.role, tone: "primary" }] : []
                }
              />
            ))}
          </PersonGrid>
        </div>
      </section>

      <section
        id="org-chart"
        className="border-t border-stone-200 py-14 md:py-18 container mx-auto max-w-6xl px-4 lg:px-6 space-y-6"
      >
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Organization chart
          </h2>
          <p className="text-base text-gray-700 leading-relaxed">
            A simplified view of BEC&apos;s governance hierarchy. Mobile users can scroll
            sideways to view all levels.
          </p>
        </div>

        <div className="overflow-x-auto">
          <div className="flex min-w-full gap-4 md:gap-6">
            {orgChartLevels.map((level) => (
              <Card
                key={level.title}
                className="min-w-[240px] flex-1 rounded-sm border-stone-200 shadow-sm"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {level.title}
                  </CardTitle>
                  {level.description ? (
                    <CardDescription className="text-sm text-gray-600">
                      {level.description}
                    </CardDescription>
                  ) : null}
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2 text-sm text-gray-800">
                    {level.nodes.map((node) => (
                      <li
                        key={node}
                        className="rounded-sm border border-dashed border-stone-200 bg-stone-50 px-3 py-2"
                      >
                        {node}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        id="documents"
        className="border-t border-stone-200 py-14 md:py-18 container mx-auto max-w-6xl px-4 lg:px-6 space-y-6"
      >
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Documents & links
          </h2>
          <p className="text-base text-gray-700 leading-relaxed">
            Official governance references and downloads.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {governanceLinks.map((item) => (
            <Card
              key={item.href}
              className="group rounded-sm border-stone-200 transition-shadow hover:shadow-md"
            >
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div className="space-y-1">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {item.label}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    {item.description}
                  </CardDescription>
                </div>
                <span className="text-primary opacity-80 group-hover:opacity-100">↗</span>
              </CardHeader>
              <CardContent>
                <Link
                  href={item.href}
                  className="text-primary font-semibold hover:underline underline-offset-4"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open link
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div id="academic-council" className="scroll-mt-24 space-y-6">
          <SectionHeading
            eyebrow="Academic Council"
            title="Resolutions & proceedings"
            description="Official Academic Council resolutions and proceedings."
          />
          <DocumentDirectory groups={academicCouncilDocuments} />
        </div>
      </section>
    </main>
  );
}
