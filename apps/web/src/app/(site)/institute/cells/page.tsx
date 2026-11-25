import type { Metadata } from "next";
import Link from "@/components/link";
import {
  ChevronRight,
  Lightbulb,
  Factory,
  Rocket,
  FlaskConical,
  Briefcase,
  FileText,
  HeartHandshake,
} from "lucide-react";

import { PageHero } from "@/components/common/page-hero";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Cells & Centres",
  description:
    "Innovation, incubation, industry-partnership and entrepreneurship cells at BEC Bagalkote — IIC, BEC-IEP, IIPC, NAIN, BEC-STEP and BEC-CED driving campus start-up culture.",
  path: "/institute/cells",
});

const cards = [
  {
    title: "Institution's Innovation Council (IIC)",
    href: "/institute/cells/iic",
    icon: Lightbulb,
    description:
      "MoE Innovation Cell council fostering a campus innovation and start-up ecosystem — workshops, hackathons and the BEC Innovation & Entrepreneurship Policy.",
  },
  {
    title: "Innovation & Entrepreneurship Policy (BEC-IEP)",
    href: "/institute/cells/iep",
    icon: FileText,
    description:
      "Standalone BEC policy page for student and faculty innovators, with BEC-IEP, NISP and Karnataka Startup Policy resources.",
  },
  {
    title: "Industry-Institute Partnership Cell (IIPC)",
    href: "/institute/cells/iipc",
    icon: Factory,
    description:
      "The college's interface with industry — guest lectures, internships, live projects, consultancy and industry-academia conclaves.",
  },
  {
    title: "NAIN — New Age Incubation Network",
    href: "/institute/cells/nain",
    icon: Rocket,
    description:
      "A Government of Karnataka (KBITS) incubation centre supporting students, scholars and alumni in turning ideas into enterprises.",
  },
  {
    title: "Science & Technology Entrepreneurs Park (BEC-STEP)",
    href: "/institute/cells/step",
    icon: FlaskConical,
    description:
      "A DST-recognised park, established 1999, nurturing entrepreneurs through training, technology transfer and incubation in food, textile and building technology.",
  },
  {
    title: "Centre for Entrepreneurship Development (BEC-CED)",
    href: "/institute/cells/ced",
    icon: Briefcase,
    description:
      "Coordinators and activity records of the college's entrepreneurship development centre.",
  },
  {
    title: "Universal Human Values (UHV) Cell",
    href: "/institute/cells/uhv",
    icon: HeartHandshake,
    description:
      "An institution-level cell established in 2025 that integrates human values and ethics into technical education through the Student Induction Programme, the AICTE UHV course and value-based development programmes.",
  },
];

export default function CellsPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Innovation & Outreach"
        title="Cells & Centres"
        description="Basaveshwar Engineering College is an autonomous college that runs a network of cells and centres that connect students with industry, government incubation support and the wider innovation and entrepreneurship ecosystem."
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18">
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
                  Explore
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
