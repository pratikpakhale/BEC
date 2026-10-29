import { PageHero } from "@/components/common/page-hero";
import { DocumentDirectory } from "@/components/common/document-directory";
import { documentGroups } from "@/content/documents";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "TEQIP-III Programme",
  description:
    "TEQIP-III records at BEC Bagalkote, the World Bank-assisted quality programme: institutional development plan, performance audit reports, academic calendars, AQARs and MoUs.",
  path: "/accreditation/teqip",
});

export default function TeqipPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Quality Improvement"
        title="TEQIP"
        description="The Technical Education Quality Improvement Programme (TEQIP-III), a World Bank-assisted initiative of the Government of India, supported infrastructure, research and academic quality at the college. The programme's plans, audit reports, calendars and agreements are published below."
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18">
        <DocumentDirectory
          groups={documentGroups("teqip", "documents")}
        />
      </section>
    </main>
  );
}
