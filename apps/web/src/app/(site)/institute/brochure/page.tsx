import type { Metadata } from "next";

import { PageHero } from "@/components/common/page-hero";
import { DocumentDirectory } from "@/components/common/document-directory";
import { documentGroups } from "@/content/documents";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Institute Brochure",
  description:
    "Download the BEC Bagalkote institute brochure — an overview of programmes, scheme of study, prospectus and admission information for the college established in 1963.",
  path: "/institute/brochure",
});

export default function BrochurePage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="About Us"
        title="Institute Brochure"
        description="An overview of Basaveshwar Engineering College — its programmes, scheme of study and admission information. Download the brochure below."
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18">
        <DocumentDirectory
          groups={documentGroups("brochure", "documents")}
        />
      </section>
    </main>
  );
}
