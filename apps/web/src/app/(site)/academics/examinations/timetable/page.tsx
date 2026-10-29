import { pageMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/animations/fade-in";
import { DocumentDirectory } from "@/components/common/document-directory";
import { documentGroups } from "@/content/documents";

export const metadata = pageMetadata({
    title: "SEE Examination Time Table",
    description:
        "Download Semester End Examination (SEE) time tables for BEC Bagalkote's UG and PG programmes, including the latest 2024-25 even, odd and make-up semester schedules.",
    path: "/academics/examinations/timetable",
});

export default function TimeTablePage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">SEE Time Table</h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                    Semester End Examination schedules.
                </p>
            </div>

            <div className="h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent my-8" />

            <section className="space-y-6">
                <FadeIn>
                    <DocumentDirectory groups={documentGroups("exam-timetable", "documents")} />
                </FadeIn>
            </section>
        </div>
    );
}
