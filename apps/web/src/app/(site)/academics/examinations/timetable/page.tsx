import { pageMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/animations/fade-in";
import { asset } from "@/lib/assets";
import { Clock, Download } from "lucide-react";
import Link from "next/link";

export const metadata = pageMetadata({
    title: "SEE Examination Time Table",
    description:
        "Download Semester End Examination (SEE) time tables for BEC Bagalkote's UG and PG programmes, including the latest 2024-25 even, odd and make-up semester schedules.",
    path: "/academics/examinations/timetable",
});

const timetables = [
    { title: "Summer Semester SEE Time Table 2025-26", link: asset("documents/exam/summer-sem-see-timetable-2025-26.pdf"), isNew: true },
    { title: "Supplementary Semester SEE Time Table 2025-26", link: asset("documents/exam/supplementary-sem-see-timetable-2025-26.pdf"), isNew: true },
    { title: "B.E. I Sem SEE Time Table 2025-26 (Odd)", link: asset("documents/exam/be-i-sem-see-timetable-2025-26-odd.pdf"), isNew: true },
    { title: "B.E. II Sem SEE Time Table 2025-26 (Even)", link: asset("documents/exam/be-ii-sem-see-timetable-2025-26-even.pdf"), isNew: true },
    { title: "B.E. III Sem SEE Time Table 2025-26 (Odd)", link: asset("documents/exam/be-iii-sem-see-timetable-2025-26-odd.pdf"), isNew: true },
    { title: "B.E. IV Sem SEE Time Table 2025-26 (Even)", link: asset("documents/exam/be-iv-sem-see-timetable-2025-26-even.pdf"), isNew: true },
    { title: "B.E. VI Sem SEE Time Table 2025-26 (Even)", link: asset("documents/exam/be-vi-sem-see-timetable-2025-26-even.pdf"), isNew: true },
    { title: "B.E. VIII Sem SEE Time Table 2025-26 (Even)", link: asset("documents/exam/be-viii-sem-see-timetable-2025-26-even.pdf"), isNew: true },
    { title: "PG I Sem SEE Time Table 2025-26 (Odd)", link: asset("documents/exam/pg-i-sem-see-timetable-2025-26-odd.pdf"), isNew: true },
    { title: "PG IV Sem SEE Time Table 2025-26 (Even)", link: asset("documents/exam/pg-iv-sem-see-timetable-2025-26-even.pdf"), isNew: true },
    { title: "1_2024-25 EVEN_4_ 6_ 8_SEMESTER TIME TABLE", link: asset("documents/exam/1-2024-25-even-4-6-8-semester-time-table.pdf"), isNew: false },
    { title: "2_2024-25 ODD_I SEM PG", link: asset("documents/exam/2-2024-25-odd-i-sem-pg.pdf"), isNew: false },
    { title: "3_2024-25 ODD_3 SEM PG", link: asset("documents/exam/3-2024-25-odd-3-sem-pg.pdf"), isNew: false },
    { title: "4_2024-25 ODD_MAKE UP_1_ 3_ 5_ 7 SEM", link: asset("documents/exam/4-2024-25-odd-make-up-1-3-5-7-sem.pdf"), isNew: false },
    { title: "Time Table for BE I/II Semester SEE Examinations, Feb/March - 2025", link: asset("documents/exam/be-i-sem-see-timetable.pdf"), isNew: false },
];

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
                    <div className="grid gap-3">
                        {timetables.map((item, idx) => (
                            <Link
                                key={idx}
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start md:items-center justify-between gap-4 p-4 bg-white rounded-xl border border-stone-200 hover:border-primary hover:shadow-md transition-all group w-full min-w-0"
                            >
                                <div className="flex items-start md:items-center gap-3 min-w-0 flex-1">
                                    <div className="p-2 bg-primary/10 text-primary rounded-lg group-hover:bg-primary group-hover:text-white transition-colors shrink-0 mt-0.5 md:mt-0">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div className="font-medium text-gray-700 group-hover:text-primary transition-colors flex flex-col md:flex-row md:items-center gap-2 min-w-0">
                                        <span className="break-words">{item.title}</span>
                                        {item.isNew && (
                                            <span className="inline-flex w-fit items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 animate-pulse">
                                                New
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <Download className="w-4 h-4 text-gray-400 group-hover:text-primary shrink-0 mt-1 md:mt-0" />
                            </Link>
                        ))}
                    </div>
                </FadeIn>
            </section>
        </div >
    );
}
