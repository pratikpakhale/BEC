import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/placements/page-header";
import { FadeIn } from "@/components/animations/fade-in";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bosComposition, bosFunctions } from "@/data/academics/board-of-studies";

export const metadata = pageMetadata({
    title: "Board of Studies",
    description:
        "Composition and functions of the departmental Board of Studies (BoS) at BEC Bagalkote, which frames schemes and syllabi for approval by the Academic Council.",
    path: "/academics/board-of-studies",
});

export default function BoardOfStudiesPage() {
    return (
        <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-slate-50 relative pb-12">
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/20 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />
            </div>

            <div className="container mx-auto px-4 py-12 lg:py-16 relative z-10 space-y-12">
                <PageHeader
                    title="Board of Studies"
                    description="Each department's Board of Studies (BoS), chaired by its Head, frames the scheme and syllabi for approval by the Academic Council."
                />

                <section className="max-w-6xl mx-auto">
                    <FadeIn>
                        <div className="grid gap-6 lg:grid-cols-2">
                            <Card className="bg-white border-stone-200 shadow-sm">
                                <CardHeader>
                                    <CardTitle className="text-xl text-primary">Composition</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <dl className="divide-y divide-stone-100">
                                        {bosComposition.map((member) => (
                                            <div key={member.role} className="flex items-start justify-between gap-4 py-3">
                                                <dt className="text-gray-800">{member.role}</dt>
                                                <dd className="shrink-0">
                                                    <Badge variant="outline">{member.designation}</Badge>
                                                </dd>
                                            </div>
                                        ))}
                                    </dl>
                                </CardContent>
                            </Card>

                            <Card className="bg-white border-stone-200 shadow-sm">
                                <CardHeader>
                                    <CardTitle className="text-xl text-primary">Functions & Responsibilities</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <ol className="list-decimal space-y-3 pl-5 leading-relaxed text-gray-800 marker:font-semibold marker:text-primary">
                                        {bosFunctions.map((fn) => (
                                            <li key={fn}>{fn}</li>
                                        ))}
                                    </ol>
                                </CardContent>
                            </Card>
                        </div>
                    </FadeIn>
                </section>
            </div>
        </div>
    );
}
