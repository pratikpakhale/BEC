import { PageHero } from "@/components/common/page-hero";
import { DocumentDirectory } from "@/components/common/document-directory";
import { documentGroups } from "@/content/documents";
import { pageMetadata } from "@/lib/seo";
import { Mail } from "lucide-react";

export const metadata = pageMetadata({
  title: "NIRF Rankings",
  description:
    "National Institutional Ranking Framework (NIRF) submissions for BEC Bagalkote — Engineering, Overall and Innovation data filed year on year from 2018-19 to 2026.",
  path: "/accreditation/nirf",
});

export default function NirfPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Rankings"
        title="NIRF Rankings"
        description="Data submitted to the National Institutional Ranking Framework (NIRF), Ministry of Education, Government of India. Engineering, Overall and Innovation submissions are published year on year below."
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18">
        <div className="mb-14 md:mb-18">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
            Ranking Journey
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-relaxed text-gray-600 text-justify">
            BEC Bagalkot has consistently demonstrated excellence at the national
            level through its notable performance in the National Institutional
            Ranking Framework (NIRF) rankings. The institute was placed in the
            201–250 rank band in India during 2019–2020, followed by the 251–300
            rank band during 2021–2022. Further strengthening its reputation for
            fostering creativity and entrepreneurship, BEC Bagalkot secured the
            151st rank in the Innovation Category in 2023.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { period: "2019–2020", value: "201–250", label: "Rank Band, India" },
              { period: "2021–2022", value: "251–300", label: "Rank Band, India" },
              { period: "2023", value: "151", label: "Innovation Category" },
            ].map((item) => (
              <div
                key={item.period}
                className="rounded-xl border border-muted bg-stone-50/50 p-6"
              >
                <p className="text-sm font-medium text-gray-500">{item.period}</p>
                <p className="mt-2 text-3xl font-bold tracking-tight text-primary">
                  {item.value}
                </p>
                <p className="mt-1 text-sm text-gray-600">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <DocumentDirectory
          groups={documentGroups("nirf", "documents")}
        />

        <div className="mt-16 border-t pt-10">
          <div className="rounded-xl border border-muted bg-stone-50/50 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                Comments & Feedback
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed text-justify">
                As per the NIRF guidelines, we welcome comments, feedback, and suggestions regarding the published Data Capturing System (DCS) reports. Please feel free to reach out to us at our official email address:{" "}
                <a
                  href="mailto:becprincipal@yahoo.com?subject=Comments%20%26%20Feedback%20on%20NIRF%20Data"
                  className="font-semibold text-primary hover:underline"
                >
                  becprincipal@yahoo.com
                </a>
              </p>
            </div>
            <a
              href="mailto:becprincipal@yahoo.com?subject=Comments%20%26%20Feedback%20on%20NIRF%20Data&body=Dear%20Principal%2C%0A%0AI%20would%20like%20to%20provide%20the%20following%20comments%2Ffeedback%20regarding%20the%20published%20NIRF%20DCS%20data%3A%0A%0A%5BYour%20Feedback%20Here%5D%0A%0ARegards%2C%0A%5BYour%20Name%5D"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/95 px-6 text-sm font-semibold tracking-wide shadow-sm shrink-0"
            >
              Send Feedback
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
