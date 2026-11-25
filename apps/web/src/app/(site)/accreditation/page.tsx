import Link from "@/components/link";
import {
  Award,
  BadgeCheck,
  BarChart3,
  ChevronRight,
  ClipboardCheck,
  ScrollText,
  BookOpenCheck,
} from "lucide-react";

import { PageHero } from "@/components/common/page-hero";
import { BreadcrumbsJsonLd } from "@/components/seo/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Accreditation & Quality",
  description:
    "Accreditation and quality-assurance records for autonomous BEC Bagalkote: NAAC and NBA accreditation, NIRF rankings, IQAC reports, VTU affiliation and TEQIP documents.",
  path: "/accreditation",
});

const cards = [
  {
    title: "NAAC Accreditation",
    href: "/accreditation/naac",
    icon: Award,
    description:
      "Self-Study Report, criterion-wise metrics, DVV clarifications and the accreditation certificate.",
  },
  {
    title: "NBA Accreditation",
    href: "/accreditation/nba",
    icon: BadgeCheck,
    description:
      "Programme-level accreditation grants, extensions and compliance letters.",
  },
  {
    title: "NIRF Rankings",
    href: "/accreditation/nirf",
    icon: BarChart3,
    description:
      "Engineering, Overall and Innovation ranking submissions, year on year.",
  },
  {
    title: "IQAC",
    href: "/accreditation/iqac",
    icon: ClipboardCheck,
    description:
      "Internal Quality Assurance Cell — AQARs, action-taken reports, academic calendars and meeting records.",
  },
  {
    title: "VTU Affiliation",
    href: "/accreditation/vtu",
    icon: ScrollText,
    description:
      "Visvesvaraya Technological University affiliation orders.",
  },
  {
    title: "TEQIP",
    href: "/accreditation/teqip",
    icon: BookOpenCheck,
    description:
      "Technical Education Quality Improvement Programme — plans, audit reports and quality records.",
  },
];

export default function AccreditationPage() {
  return (
    <main className="bg-background text-foreground">
      <BreadcrumbsJsonLd items={[{ name: "Accreditation", path: "/accreditation" }]} />
      <PageHero
        eyebrow="Quality Assurance"
        title="Accreditation & Quality"
        description="Basaveshwar Engineering College is an autonomous institution accredited by NAAC and NBA, ranked under NIRF and affiliated to VTU, Belagavi. Explore the college's accreditation and quality-assurance records below."
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18">
        <div className="max-w-3xl space-y-4 text-base leading-relaxed text-gray-700 mb-12">
          <p className="text-justify">
            Basaveshwar Engineering College is committed to maintaining the
            standards of academic excellence and institutional quality through
            continuous assessment, accreditation, and quality assurance
            initiatives. As an autonomous institution affiliated with
            Visvesvaraya Technological University (VTU), Belagavi, Karnataka, the
            college is accredited by NAAC (valid up to 16 January 2029).
          </p>
          <p className="text-justify">
            The undergraduate programmes in Biotechnology Engineering, Civil
            Engineering, Computer Science and Engineering, Electronics and
            Communication Engineering, Electrical and Electronics Engineering,
            Mechanical Engineering, and Information Science and Engineering are
            currently accredited by the National Board of Accreditation (NBA),
            reflecting their compliance with Outcome-Based Education (OBE)
            standards. The institution actively participates in the National
            Institutional Ranking Framework (NIRF) and strengthens its quality
            processes through the Internal Quality Assurance Cell (IQAC). The
            college has also benefited from the Technical Education Quality
            Improvement Programme (TEQIP), fostering excellence in teaching,
            research, innovation, infrastructure, governance, and student
            outcomes.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className="group flex h-full flex-col rounded-md border border-stone-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
              >
                <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-md bg-orange-50 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-primary">
                  {card.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600 text-justify">
                  {card.description}
                </p>
                <span className="mt-5 inline-flex items-center text-sm font-medium text-primary">
                  View documents
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
