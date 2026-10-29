import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/placements/page-header";
import { FadeIn } from "@/components/animations/fade-in";
import { DocumentDirectory } from "@/components/common/document-directory";
import { documentGroups } from "@/content/documents";

export const metadata = pageMetadata({
    title: "Academic Calendar of Events",
    description:
        "Download BEC Bagalkote's academic calendar of events for BE programmes across all semesters, including the latest 2025-26 schedules.",
    path: "/academics/calendar",
});

export default function CalendarPage() {
    return (
        <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-slate-50 relative pb-12">
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/20 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />
            </div>

            <div className="container mx-auto px-4 py-12 lg:py-16 relative z-10 space-y-12">
                <PageHeader
                    title="Academic Calendar of Events"
                    description="Schedule of academic events and milestones for BE programmes across all semesters."
                />

                <section className="space-y-6">
                    <FadeIn>
                        <DocumentDirectory groups={documentGroups("academic-calendar", "documents")} />
                    </FadeIn>
                </section>
            </div>
        </div>
    );
}
