import { pageMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/animations/fade-in";
import { GraduationCap, ArrowRight } from "lucide-react";
import Link from "@/components/link";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = pageMetadata({
  title: "Examination Results Portal",
  description:
    "Access BEC Bagalkote examination results through the Autonomous Results Portal — view outcomes for Regular, Re-appear and Makeup semester end examinations.",
  path: "/academics/examinations/results",
});

export default function ResultsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">
          Examination Results
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Check your examination results.
        </p>
      </div>

      <div className="h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent my-8" />

      <section className="space-y-6">
        <FadeIn>
          <Card className="bg-linear-to-br from-orange-50 to-white border-orange-100 overflow-hidden">
            <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
              <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200">
                <GraduationCap className="w-8 h-8" />
              </div>

              <div className="space-y-2 max-w-lg">
                <h3 className="text-2xl font-bold text-gray-900">
                  Examination Results portal
                </h3>
                <p className="text-gray-600">
                  Visit the external results portal to view Regular, Reregister
                  and Reappear Results, etc.
                </p>
                <p className="text-xs text-gray-400">
                  Opens an external college portal in a new tab.
                </p>
              </div>

              <Link
                href="http://119.161.97.238:8080/Autonomous/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-all shadow-md shadow-orange-200"
              >
                Go to Results Portal <ArrowRight className="w-4 h-4" />
              </Link>
            </CardContent>
          </Card>
        </FadeIn>
      </section>
    </div>
  );
}
