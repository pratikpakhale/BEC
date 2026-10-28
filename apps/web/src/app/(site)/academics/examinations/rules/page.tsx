import { pageMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/animations/fade-in";
import { asset } from "@/lib/assets";
import { FileText, Download } from "lucide-react";
import Link from "next/link";

export const metadata = pageMetadata({
    title: "Rules and Regulations",
    description:
        "Download BEC Bagalkote's autonomous academic regulations for the B.E., M.Tech. and MCA programmes (2025-26 and 2026-27).",
    path: "/academics/examinations/rules",
});

const regulations = [
    { title: "BEC B.E. Regulations 2026-27", link: asset("documents/regulations/bec-regulations-2026-27.pdf") },
    { title: "BEC MCA Regulations 2026-27 (Draft)", link: asset("documents/regulations/mca-regulations-2026-27.pdf") },
    { title: "BEC M.Tech. Regulations 2026-27", link: asset("documents/regulations/mtech-regulations-2026-27.pdf") },
    { title: "BEC M.Tech. Regulations 2025-26", link: asset("documents/regulations/mtech-regulations-2025-26.pdf") },
    { title: "BEC Regulations 2025-26", link: asset("documents/regulations/bec-regulations-2025-26.pdf") },
];

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
                    <div className="grid gap-3">
                        {regulations.map((item, idx) => (
                            <Link
                                key={idx}
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-4 bg-white rounded-xl border border-stone-200 hover:border-primary hover:shadow-md transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 text-primary rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <span className="font-medium text-gray-700 group-hover:text-primary transition-colors">{item.title}</span>
                                </div>
                                <Download className="w-4 h-4 text-gray-400 group-hover:text-primary" />
                            </Link>
                        ))}
                    </div>
                </FadeIn>
            </section>
        </div>
    );
}
