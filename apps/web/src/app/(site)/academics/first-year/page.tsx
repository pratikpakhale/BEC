import { PageHero } from "@/components/common/page-hero";
import { DocumentDirectory } from "@/components/common/document-directory";
import { documentGroups } from "@/content/documents";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "BE First-Year Scheme & Syllabus",
  description:
    "Download BE first-year (I & II semester) scheme and syllabus PDFs at BEC Bagalkote, grouped by stream — Civil, CSE, EC, EE, Mechanical — across scheme years 2017-18 to 2023-24.",
  path: "/academics/first-year",
});

export default function FirstYearSyllabusPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Academics"
        title="First-Year Syllabus"
        description="Scheme and syllabus for the BE first year (I & II semester), grouped by stream and academic year."
        badges={[{ label: "BE I & II Semester" }]}
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18">
        <DocumentDirectory
          groups={documentGroups("first-year", "documents")}
        />
      </section>
    </main>
  );
}
