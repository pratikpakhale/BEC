import Link from "@/components/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  ArrowLeft, ArrowRight, Eye, Target, Award, CheckCircle2,
  Sparkles, Music, Drama, Radio, Code, Cpu, Lightbulb, Camera, BookOpen, Leaf
} from "lucide-react";
import { detailedClubs } from "../clubs-data";

export const dynamicParams = false;

export async function generateStaticParams() {
  return detailedClubs.map((club) => ({
    slug: club.id,
  }));
}

// Generate dynamic SEO metadata for each individual club page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const club = detailedClubs.find((c) => c.id === slug);
  if (!club) return {};
  return pageMetadata({
    title: `${club.name} | BEC Creative Spectrum`,
    description: `Detailed profile, 3-month action plan, week-wise schedule, and objectives of the ${club.name} student club under BEC Creative Spectrum.`,
    path: `/student-life/bec-creative-spectrum/${club.id}`,
  });
}

// Map color tokens for styling based on Wing
const colorStyles: Record<string, {
  text: string;
  bg: string;
  border: string;
  ring: string;
  barBg: string;
  bulletBg: string;
  timelineLine: string;
}> = {
  "Cultural Wing": {
    text: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-50 dark:bg-rose-950/20",
    border: "border-rose-200 dark:border-rose-900/30",
    ring: "ring-rose-500/20",
    barBg: "bg-rose-500 dark:bg-rose-600",
    bulletBg: "bg-rose-500/10 dark:bg-rose-400/10",
    timelineLine: "bg-rose-200/60 dark:bg-rose-900/30",
  },
  "Technical Wing": {
    text: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/20",
    border: "border-blue-200 dark:border-blue-900/30",
    ring: "ring-blue-500/20",
    barBg: "bg-blue-500 dark:bg-blue-600",
    bulletBg: "bg-blue-500/10 dark:bg-blue-400/10",
    timelineLine: "bg-blue-200/60 dark:bg-blue-900/30",
  },
  "Holistic Development Wing": {
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/20",
    border: "border-emerald-200 dark:border-emerald-900/30",
    ring: "ring-emerald-500/20",
    barBg: "bg-emerald-500 dark:bg-emerald-600",
    bulletBg: "bg-emerald-500/10 dark:bg-emerald-400/10",
    timelineLine: "bg-emerald-200/60 dark:bg-emerald-900/30",
  },
};

export default async function ClubDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const currentIndex = detailedClubs.findIndex((c) => c.id === slug);
  if (currentIndex === -1) {
    notFound();
  }

  const club = detailedClubs[currentIndex];
  const style = colorStyles[club.wing] || colorStyles["Cultural Wing"];
  const ClubIcon = club.icon;

  // Pagination navigation slugs
  const prevIndex = (currentIndex - 1 + detailedClubs.length) % detailedClubs.length;
  const nextIndex = (currentIndex + 1) % detailedClubs.length;
  const prevClub = detailedClubs[prevIndex];
  const nextClub = detailedClubs[nextIndex];

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-stone-950/50 py-12 md:py-16">
      <div className="container mx-auto max-w-4xl px-4 space-y-8">
        
        {/* Navigation & Pagination Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-200 dark:border-stone-800 pb-5">
          <Link 
            href="/student-life/bec-creative-spectrum"
            className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 hover:text-primary dark:text-stone-400 dark:hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Creative Spectrum
          </Link>
          
          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link 
              href={`/student-life/bec-creative-spectrum/${prevClub.id}`}
              className="inline-flex items-center gap-1.5 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white transition-colors"
            >
              &larr; {prevClub.name}
            </Link>
            <span className="text-stone-300 dark:text-stone-700">|</span>
            <Link 
              href={`/student-life/bec-creative-spectrum/${nextClub.id}`}
              className="inline-flex items-center gap-1.5 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white transition-colors"
            >
              {nextClub.name} &rarr;
            </Link>
          </div>
        </div>

        {/* Club Main Header */}
        <div className="flex items-start gap-4">
          <span className={`inline-flex h-14 w-14 items-center justify-center rounded-xl ring-4 ${style.bg} ${style.text} ${style.ring} shrink-0`}>
            <ClubIcon className="h-7 w-7" />
          </span>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">{club.name}</h1>
            <p className="text-sm font-semibold text-stone-500 mt-1">
              <span className={`inline-block px-2.5 py-0.5 rounded text-xs font-bold tracking-wider uppercase mr-2 ${style.bg} ${style.text}`}>
                {club.wing}
              </span>
              {club.clubType}
            </p>
          </div>
        </div>

        {/* Club Details Content Panel */}
        <div className="space-y-8 bg-white dark:bg-stone-900/10 p-6 md:p-8 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm">
          
          {/* Club Description */}
          {club.description && (
            <p className="text-sm md:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-medium text-justify">
              {club.description}
            </p>
          )}

          {/* Vision Statement Quote */}
          <div className="bg-stone-55/40 dark:bg-stone-900/20 border border-stone-200/50 dark:border-stone-800/40 rounded-xl p-5 italic text-gray-700 dark:text-gray-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 text-stone-200/10 pointer-events-none translate-x-4 -translate-y-4 font-serif text-8xl select-none">“</div>
            <span className={`font-bold not-italic text-xxs uppercase tracking-widest ${style.text} block mb-1.5`}>Club Vision</span>
            "{club.vision}"
          </div>

          {/* Mission & Objectives Grid */}
          <div className="grid gap-6 md:grid-cols-2 items-stretch">
            {/* Mission */}
            <Card className="border-stone-200 dark:border-stone-800 dark:bg-stone-900/20 shadow-xs flex flex-col h-full">
              <CardHeader className="flex flex-row items-center gap-2.5 pb-2">
                <span className={`p-1.5 rounded-lg ${style.bg} ${style.text}`}>
                  <Target className="w-4 h-4" />
                </span>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Mission Core</h4>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2">
                  {club.mission.map((item, idx) => (
                    <li key={idx} className="flex gap-2 text-xs text-gray-650 dark:text-gray-400 leading-relaxed items-start">
                      <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${style.text} ${style.bg}`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Objectives */}
            <Card className="border-stone-200 dark:border-stone-800 dark:bg-stone-900/20 shadow-xs flex flex-col h-full">
              <CardHeader className="flex flex-row items-center gap-2.5 pb-2">
                <span className={`p-1.5 rounded-lg ${style.bg} ${style.text}`}>
                  <Award className="w-4 h-4" />
                </span>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Objectives & Focus</h4>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2">
                  {club.objectives.map((obj, idx) => (
                    <li key={idx} className="flex gap-2 text-xs text-gray-655 dark:text-gray-400 leading-relaxed items-start">
                      <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${style.text} ${style.bg}`} />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Expected Outcomes (If Available) */}
          {club.expectedOutcomes && club.expectedOutcomes.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-bold text-gray-900 dark:text-white text-base flex items-center gap-2">
                <CheckCircle2 className={`w-4.5 h-4.5 ${style.text}`} />
                Expected Outcomes
              </h4>
              <div className="bg-orange-50/20 border border-orange-100 dark:bg-orange-950/5 dark:border-orange-900/20 rounded-xl p-5 shadow-xs">
                <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                  {club.expectedOutcomes.map((out, idx) => (
                    <li key={idx} className="flex gap-2 text-xs text-gray-700 dark:text-gray-300 leading-relaxed items-start">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      <span>{out}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* 3-Month Action Plan (Timeline) */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800/80 pb-4">
              <h4 className="font-bold text-gray-900 dark:text-white text-base flex items-center gap-2">
                <Award className={`w-5 h-5 ${style.text}`} />
                3-Month Action Plan
              </h4>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${style.bg} ${style.text}`}>
                Roadmap
              </span>
            </div>
            
            <div className="relative ml-2 md:ml-4">
              {/* Timeline Connector Line */}
              <div className={`absolute left-[9px] top-4 bottom-4 w-[2px] ${style.timelineLine}`} />

              <div className="space-y-6">
                {club.actionPlan.map((plan) => (
                  <div key={plan.month} className="relative group">
                    {/* Timeline Node */}
                    <div className={`absolute left-[9px] -translate-x-1/2 top-[22px] z-10 flex h-[16px] w-[16px] items-center justify-center rounded-full bg-white dark:bg-stone-900 border-2 ${style.border} shadow-sm transition-all duration-300 group-hover:scale-110`}>
                      <span className={`h-2 w-2 rounded-full ${style.barBg} opacity-80`} />
                    </div>
                    
                    {/* Card container */}
                    <div className="relative ml-8 bg-gradient-to-br from-white to-stone-50/40 dark:from-stone-900/40 dark:to-stone-950/20 p-5 md:p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 shadow-[0_1px_3px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_24px_-10px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_12px_24px_-10px_rgba(0,0,0,0.3)] hover:border-stone-300/80 dark:hover:border-stone-700/80 transition-all duration-300 overflow-hidden">
                      {/* Left accent color bar */}
                      <div className={`absolute left-0 top-0 bottom-0 w-[4px] ${style.barBg}`} />
                      
                      {/* Card Content */}
                      <div className="space-y-4">
                        {/* Month / Title Header */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-800/50 pb-3">
                          <div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider ${style.bg} ${style.text}`}>
                              {plan.month}
                            </span>
                            <h5 className="font-bold text-base text-stone-900 dark:text-white mt-1.5 leading-snug tracking-tight">
                              {plan.title}
                            </h5>
                          </div>
                        </div>

                        {/* Subtitle */}
                        {plan.subtitle && (
                          <div className="text-xs md:text-sm text-stone-605 dark:text-stone-300 font-medium leading-relaxed bg-stone-50/50 dark:bg-stone-900/25 p-3 rounded-lg border border-stone-150/40 dark:border-stone-800/30">
                            {plan.subtitle}
                          </div>
                        )}

                        {/* Bullet points */}
                        <div className="space-y-2.5">
                          <h6 className="text-[10px] font-bold tracking-wider uppercase text-stone-400 dark:text-stone-500">
                            Planned Activities
                          </h6>
                          <ul className="grid gap-3 sm:grid-cols-2">
                            {plan.bullets.map((bullet, bIdx) => (
                              <li key={bIdx} className="flex gap-2.5 text-xs text-stone-600 dark:text-stone-400 leading-relaxed items-start group/item">
                                <span className={`mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-md ${style.bulletBg} ${style.text} border border-stone-100 dark:border-stone-800 transition-colors group-hover/item:bg-primary/5 group-hover/item:text-primary`}>
                                  <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
                                </span>
                                <span className="group-hover/item:text-stone-900 dark:group-hover/item:text-stone-200 transition-colors duration-200">{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Expected Outcome */}
                        {plan.outcome && (
                          <div className="mt-4 pt-3.5 border-t border-stone-100 dark:border-stone-800/60 flex flex-col sm:flex-row sm:items-start md:items-center gap-1.5">
                            <span className={`inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider ${style.text} shrink-0`}>
                              <Target className="w-3.5 h-3.5 stroke-[2.5]" />
                              Expected Outcome:
                            </span>
                            <span className="text-xs text-stone-600 dark:text-stone-400 leading-normal">
                              {plan.outcome}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Week-wise Planning Overview */}
          <div className="space-y-4">
            <h4 className="font-bold text-primary dark:text-white text-base flex items-center gap-2">
              <Award className={`w-4.5 h-4.5 ${style.text}`} />
              Week-wise Planning Overview
            </h4>
            <Card className="border border-stone-200 dark:border-stone-800 dark:bg-stone-900/30 overflow-hidden shadow-xxs">
              <Table>
                <TableHeader className="bg-primary/5 dark:bg-stone-900/50">
                  <TableRow>
                    <TableHead className="w-[120px] font-semibold text-primary">Period</TableHead>
                    <TableHead className="font-semibold text-primary">Activities / Focus</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {club.weekWise.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-semibold text-xs text-stone-700 dark:text-stone-300">{row.period}</TableCell>
                      <TableCell className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">{row.activities}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>

        </div>

        {/* Sticky Footer Navigation */}
        <div className="flex justify-between items-center border-t border-stone-200 dark:border-stone-800 pt-5">
          <Link 
            href={`/student-life/bec-creative-spectrum/${prevClub.id}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 hover:text-primary dark:text-stone-400 dark:hover:text-white transition-colors"
          >
            &larr; Prev: {prevClub.name}
          </Link>
          <Link 
            href={`/student-life/bec-creative-spectrum/${nextClub.id}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 hover:text-primary dark:text-stone-400 dark:hover:text-white transition-colors"
          >
            Next: {nextClub.name} &arr;
          </Link>
        </div>

      </div>
    </main>
  );
}
