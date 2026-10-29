import { PageHero } from "@/components/common/page-hero";
import { DocumentDirectory } from "@/components/common/document-directory";
import { documentGroups } from "@/content/documents";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "VTU Affiliation",
  description:
    "Visvesvaraya Technological University (VTU), Belagavi affiliation orders for BEC Bagalkote, including affiliation orders for 2018, 2019–20, 2020–21, 2021–22, 2022–23, 2023-24 & 2024-25, and 2025–26.",
  path: "/accreditation/vtu",
});

export default function VtuPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Affiliation"
        title="VTU Affiliation"
        description="Basaveshwar Engineering College is affiliated to Visvesvaraya Technological University (VTU), Belagavi. The affiliation orders issued by the University are published below."
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18">
        <DocumentDirectory
          groups={documentGroups("vtu", "documents")}
        />
      </section>
    </main>
  );
}
