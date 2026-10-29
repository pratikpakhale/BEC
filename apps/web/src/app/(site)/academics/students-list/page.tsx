import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/placements/page-header";
import { FadeIn } from "@/components/animations/fade-in";
import { DocumentDirectory } from "@/components/common/document-directory";
import { documentGroups } from "@/content/documents";

export const metadata = pageMetadata({
    title: "College Students List",
    description:
        "Download the list of students enrolled at BEC Bagalkote, covering the academic years 2021-22 to 2024-25.",
    path: "/academics/students-list",
});

export default function StudentsListPage() {
    return (
        <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-slate-50 relative pb-12">
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/20 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />
            </div>

            <div className="container mx-auto px-4 py-12 lg:py-16 relative z-10 space-y-12">
                <PageHeader
                    title="College Students List"
                    description="Details of students enrolled at the college, by academic year."
                />

                <section className="space-y-6">
                    <FadeIn>
                        <DocumentDirectory groups={documentGroups("students-list", "documents")} />
                    </FadeIn>
                </section>
            </div>
        </div>
    );
}
