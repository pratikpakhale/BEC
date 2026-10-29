import { pageMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/animations/fade-in";
import { DocumentDirectory } from "@/components/common/document-directory";
import { documentGroups } from "@/content/documents";

export const metadata = pageMetadata({
    title: "Service Rules",
    description:
        "Download the Karnataka State Civil Service (Conduct) Rules, 2021 (Kannada) published by the Department of Personnel and Administrative Reforms, Government of Karnataka.",
    path: "/administration/rules",
});

export default function ServiceRulesPage() {
    return (
        <main className="bg-background text-foreground">
            <section className="relative overflow-hidden border-b border-stone-200 bg-linear-to-br from-orange-50 via-white to-stone-50">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#f97316_0%,transparent_35%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,#0f172a_0%,transparent_28%)]" />
                </div>
                <div className="relative container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
                        Administration
                    </p>
                    <div className="mt-4 space-y-4 max-w-3xl">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-gray-900">
                            Service Rules
                        </h1>
                        <p className="text-base md:text-lg leading-relaxed text-gray-700">
                            Service and conduct rules issued by the Government of Karnataka.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-14 md:py-18 container mx-auto max-w-6xl px-4 lg:px-6">
                <FadeIn>
                    <DocumentDirectory groups={documentGroups("administration-rules", "documents")} />
                </FadeIn>
            </section>
        </main>
    );
}
