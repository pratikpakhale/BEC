import Link from "@/components/link";

import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { ArrowRight, Code, Cpu, Star, Trophy, Activity } from "lucide-react";

export const metadata = pageMetadata({
  title: "Student Achievements",
  description:
    "Source-verified BEC student milestones — Smart India Hackathon 2020 win, a 4.0-star IIC rating, KSCST projects and VTU state sports titles in handball and cricket.",
  path: "/student-life/achievements",
});

const technicalAchievements = [
  {
    title: "Smart India Hackathon",
    category: "National Winner · 2020",
    description:
      "Team 'We_ASCLEPIUS' won the Software Edition of the Smart India Hackathon 2020.",
    icon: Code,
  },
  {
    title: "Institution Innovation Council — 4.0★",
    category: "MoE IIC · 2023-24",
    description:
      "BEC's Institution Innovation Council secured a 4.0-star rating on the 5-star scale for its activities in the 2023-24 calendar year.",
    icon: Star,
  },
  {
    title: "Best Performing IIC — South-West Zone",
    category: "MoE Innovation Cell (SWRO)",
    description:
      "Recognised as one of the three best-performing Institution Innovation Councils in the South-West Zone.",
    icon: Trophy,
  },
  {
    title: "Robotic Rehabilitation for Paralysed Arm",
    category: "KSCST 47th Series · 2024",
    description:
      "Student project selected for the KSCST 47th-series State-Level Exhibition.",
    icon: Cpu,
  },
];

const sportsAchievements = [
  {
    title: "VTU State Champions — Women's Handball",
    year: "2023-24",
    description: "State championship hosted at BEC.",
  },
  {
    title: "VTU State Champions — Men's Cricket",
    year: "2023-24",
    description: "Won at the VTU inter-collegiate tournament, RYMCE Bellary.",
  },
  {
    title: "National Bronze — Wushu Championship",
    year: "2020-21",
    description: "Medal won at the national-level Wushu championship, Mohali.",
  },
];

export default function AchievementsPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Hall of Fame"
        title="Student Achievements"
        description="A snapshot of source-verified milestones — from national hackathon wins and innovation-council recognition to state and national sporting titles."
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18 space-y-16">
        <div className="rounded-md border border-stone-200 bg-stone-900 p-6 text-white shadow-sm md:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
            <div className="flex-1 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-sm border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">
                <Trophy className="h-4 w-4" />
                Spotlight
              </div>
              <h2 className="text-3xl font-semibold leading-tight">
                National winners at the{" "}
                <span className="text-orange-400">Smart India Hackathon</span>
              </h2>
              <p className="max-w-xl leading-relaxed text-stone-300 text-justify">
                Team We_ASCLEPIUS won the 2020 Software Edition of the Smart India
                Hackathon, one of the country's largest open-innovation contests.
              </p>
            </div>
            <div className="lg:w-72">
              <div className="rounded-md border border-white/10 bg-white/5 p-6">
                <Code className="mb-3 h-8 w-8 text-orange-400" />
                <h3 className="text-lg font-semibold">We_ASCLEPIUS</h3>
                <p className="mt-1 text-sm text-stone-300">
                  Smart India Hackathon 2020 — Software Edition, National Winner.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <SectionHeading
            eyebrow="Technical & Research"
            title="Innovation and research milestones"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {technicalAchievements.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-md border border-stone-200 bg-white p-6 shadow-sm"
                >
                  <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-md bg-orange-50 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                    {item.category}
                  </p>
                  <h3 className="mt-1 text-base font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-8">
          <SectionHeading
            eyebrow="Sports & Games"
            title="State and national sporting titles"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sportsAchievements.map((item) => (
              <div
                key={item.title}
                className="rounded-md border border-stone-200 bg-white p-6 shadow-sm"
              >
                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-md bg-orange-50 text-primary">
                  <Activity className="h-5 w-5" />
                </span>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                  {item.year}
                </p>
                <h3 className="mt-1 text-base font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <Link
            href="/student-life/gymkhana"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            See all sports achievements & VTU Blues
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </main>
  );
}
