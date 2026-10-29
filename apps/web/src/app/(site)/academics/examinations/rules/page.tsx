import { pageMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/animations/fade-in";
import { DocumentDirectory } from "@/components/common/document-directory";
import { documentGroups } from "@/content/documents";

export const metadata = pageMetadata({
    title: "Rules and Regulations",
    description:
        "Download BEC Bagalkote's autonomous academic regulations for the B.E., M.Tech. and MCA programmes (2025-26 and 2026-27).",
    path: "/academics/examinations/rules",
});

export default function RulesPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">BEC Rules and Regulations</h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                    Academic regulations and guidelines for various programmes.
                </p>
            </div>

            <div className="h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent my-8" />

            <section className="space-y-6">
                <FadeIn>
                    <DocumentDirectory groups={documentGroups("exam-rules", "documents")} />
                </FadeIn>
            </section>
        </div>
    );
}
