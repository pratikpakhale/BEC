import Link from "@/components/link";
import {
  Info,
  ScrollText,
  Sparkles,
  Building2,
  Users,
  FileDown,
  Phone,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { placementContent } from "@/data/placements/content";
import { RollingStats } from "@/components/placements/rolling-stats";
import { SectionHeader } from "@/components/admissions/sections";
import { BreadcrumbsJsonLd } from "@/components/seo/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Placements & Recruiters",
  description:
    "Placement statistics, policy, facilities and contacts of the Training & Placement Cell, Basaveshwar Engineering College, Bagalkote — 130+ recruiters and year-wise placement records.",
  path: "/placements",
});

const navCards: { label: string; href: string; desc: string; icon: LucideIcon }[] = [
  {
    label: "Placement Policy",
    href: "/placements/policy",
    desc: "Slot-wise recruitment process, CTC bands and general rules.",
    icon: ScrollText,
  },
  {
    label: "Why Recruit Us",
    href: "/placements/why-recruit",
    desc: "What makes BEC students industry-ready hires.",
    icon: Sparkles,
  },
  {
    label: "Facilities",
    href: "/placements/facilities",
    desc: "Seminar halls, computer centres and interview rooms for drives.",
    icon: Building2,
  },
  {
    label: "2027 Eligible Students",
    href: "/placements/eligible-2027",
    desc: "Department-wise list of students available for the 2027 batch.",
    icon: Users,
  },
  {
    label: "Placement Brochure",
    href: "/placements/brochure",
    desc: "Download the complete recruiter brochure.",
    icon: FileDown,
  },
  {
    label: "Contact the Cell",
    href: "/placements/contact",
    desc: "Register your interest and reach the placement officers.",
    icon: Phone,
  },
];

export default function PlacementsOverviewPage() {
  const { home, accreditation, stats } = placementContent;

  return (
    <>
      <BreadcrumbsJsonLd items={[{ name: "Placements", path: "/placements" }]} />

      <div className="space-y-16">
        {/* Statistics — first thing on the page */}
        <section>
          <RollingStats />
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-orange-100 bg-white/80 p-5 text-center shadow-xs backdrop-blur-sm"
              >
                <div className="text-2xl font-bold tracking-tight text-primary md:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 text-xs font-semibold text-gray-600 md:text-sm">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* About the cell */}
        <section>
          <SectionHeader icon={Info} title="About the Training & Placement Cell" />
          <div className="space-y-4 text-base leading-relaxed text-gray-600 md:text-lg">
            {home.about.map((p, i) => (
              <p key={i} className="text-justify">
                {p}
              </p>
            ))}
          </div>

          <div className="mt-10">
            <p className="mb-5 text-xs font-bold uppercase tracking-widest text-gray-400">
              Accreditation &amp; Rankings
            </p>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {accreditation.map((a) => (
                <div
                  key={a.label}
                  className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-xs"
                >
                  <div className="text-xs font-bold uppercase tracking-widest text-primary">
                    {a.label}
                  </div>
                  <div className="mt-2 text-2xl font-bold text-gray-900">{a.value}</div>
                  <div className="mt-1 text-xs leading-snug text-gray-500">{a.note}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Explore */}
        <section>
          <SectionHeader icon={ArrowRight} title="Explore" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {navCards.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-xs transition-all hover:border-primary/40 hover:shadow-md"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-gray-900 transition-colors group-hover:text-primary">
                    {card.label}
                  </h3>
                  <p className="mt-1 grow text-sm leading-relaxed text-gray-600">{card.desc}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary">
                    View
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
