import type { Metadata } from "next";

import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { PersonCard, PersonGrid } from "@/components/common/person-card";
import { DocumentDirectory } from "@/components/common/document-directory";
import { documentGroups } from "@/content/documents";
import { asset } from "@/lib/assets";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Centre for Entrepreneurship Development (BEC-CED)",
  description:
    "The Centre for Entrepreneurship Development (BEC-CED) at BEC Bagalkote fosters an entrepreneurial mindset among students through its coordinators, activities and activity reports.",
  path: "/institute/cells/ced",
});

const coordinators = [
  {
    name: "Dr. V. S. Puranik",
    description: "Department of Industrial & Production Engineering",
    badges: [{ label: "Chief Coordinator", tone: "primary" as const }],
  },
  {
    name: "Dr. C. M. Javalagi",
    description: "Department of Industrial & Production Engineering",
    badges: [{ label: "Coordinator", tone: "muted" as const }],
  },
  {
    name: "Dr. K. Bhat",
    photo: asset("departments/ecs/faculty/krishnamurthy-bhat.webp"),
    description: "Department of Information Technology",
    badges: [{ label: "Coordinator", tone: "muted" as const }],
  },
  {
    name: "Prof. H. R. Patil",
    description: "Department of Mechanical Engineering",
    badges: [{ label: "Coordinator", tone: "muted" as const }],
  },
];

export default function CedPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Entrepreneurship"
        title="Centre for Entrepreneurship Development (BEC-CED)"
        description="The college's Centre for Entrepreneurship Development promotes entrepreneurial skills among students and faculty, coordinated by a team drawn from the Industrial & Production, Information Technology and Mechanical Engineering departments."
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18 space-y-16">
        <div className="space-y-8">
          <SectionHeading eyebrow="The Centre" title="Coordinators" />
          <PersonGrid>
            {coordinators.map((c) => (
              <PersonCard
                key={c.name}
                name={c.name}
                photo={"photo" in c ? c.photo : undefined}
                description={c.description}
                badges={c.badges}
              />
            ))}
          </PersonGrid>
        </div>

        <div className="space-y-8">
          <SectionHeading eyebrow="Records" title="Documents" />
          <DocumentDirectory
            groups={documentGroups("ced", "documents")}
          />
        </div>
      </section>
    </main>
  );
}
