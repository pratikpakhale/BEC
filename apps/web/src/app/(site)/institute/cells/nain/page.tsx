import type { Metadata } from "next";

import { PageHero } from "@/components/common/page-hero";
import { documentGroups } from "@/content/documents";
import { pageMetadata } from "@/lib/seo";
import { NainTabs } from "./nain-tabs";

export const metadata: Metadata = pageMetadata({
  title: "NAIN 2.0 — New Age Innovation Network 2.0",
  description:
    "NAIN at BEC Bagalkote, a Government of Karnataka initiative, helps students, scholars and alumni turn locally-relevant ideas into working prototypes and enterprises — now in its NAIN 2.0 generation, hosted under IIIT Dharwad's Project Mentorship Unit with support from K-Tech.",
  path: "/institute/cells/nain",
});

export default function NainPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Innovation & Incubation"
        title="NAIN 2.0 — New Age Innovation Network 2.0"
        description={
          <>
            <p>
              The New Age Innovation Network 2.0 scheme of GoK is implemented to
              create an ecosystem that promotes innovation in educational
              institutions. Under this scheme, students are encouraged to identify
              local problems, address them using concepts of frugal innovation and
              also develop appropriate technology-based solutions and working
              prototypes. For this, mentors are assigned to students to help them
              formulate a business model and encourage them to think like
              entrepreneurs.
            </p>
            <p>
              Basaveshwar Engineering College, Bagalkote as a NAIN 2.0 Host
              Institute (NHI) under the Project Mentorship Unit (PMU) of IIIT,
              Dharwad established a NAIN 2.0 center in the campus with the support
              of K-Teck, Government of Karnataka.
            </p>
          </>
        }
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18">
        <NainTabs v1Documents={documentGroups("nain", "nain-1")} />
      </section>
    </main>
  );
}
