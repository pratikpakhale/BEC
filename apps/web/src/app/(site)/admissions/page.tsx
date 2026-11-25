import Link from "@/components/link";
import {
  GraduationCap,
  BookOpen,
  Microscope,
  Briefcase,
  Code2,
  ArrowRight,
  ClipboardCheck,
  FileCheck2,
  Landmark,
  BadgeCheck,
  type LucideIcon,
} from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { AdmissionsHeader } from "@/components/admissions/admissions-header";
import { ApplyCallout, CollegeCodes, RelatedLinks, SectionHeader } from "@/components/admissions/sections";
import { BreadcrumbsJsonLd } from "@/components/seo/jsonld";
import { admissionProgrammes } from "@/data/admissions";

export const metadata = pageMetadata({
  title: "Admissions",
  description:
    "Admissions at Basaveshwar Engineering College, Bagalkote — B.E., M.Tech, Ph.D/M.Sc.(Engg.), MBA and MCA. Eligibility, entrance exams, fee structure, sanctioned intake and contacts.",
  path: "/admissions",
});

const programmeIcons: Record<string, LucideIcon> = {
  ug: GraduationCap,
  pg: BookOpen,
  phd: Microscope,
  mba: Briefcase,
  mca: Code2,
};

const quickFacts = [
  { label: "B.E. Disciplines", value: "10", detail: "990 sanctioned seats" },
  { label: "M.Tech Specializations", value: "1", detail: "College Code T810" },
  { label: "Research Centres", value: "9", detail: "Ph.D / M.Sc. (Engg.)" },
  { label: "Autonomous Institute", value: "Since 1963", detail: "VTU-affiliated" },
];

const steps = [
  {
    icon: BadgeCheck,
    title: "Appear for the entrance exam",
    desc: "Qualify the relevant test — CET/COMED-K/JEE for B.E., PGCET/GATE for M.Tech, PGCET/KMAT for MBA & MCA, or the institute entrance for management seats.",
  },
  {
    icon: ClipboardCheck,
    title: "Apply & attend counselling",
    desc: "Register through KEA/COMED-K counselling for Government/COMED-K quota, or contact the Admission Section directly for management-quota seats.",
  },
  {
    icon: FileCheck2,
    title: "Document verification",
    desc: "Report to the college with your originals and three sets of copies as per the admission documents checklist.",
  },
  {
    icon: Landmark,
    title: "Fee payment & confirmation",
    desc: "Pay the applicable KEA/COMED-K/Management, VTU and College fees to confirm your admission.",
  },
];

export default function AdmissionsOverviewPage() {
  return (
    <>
      <BreadcrumbsJsonLd items={[{ name: "Admissions", path: "/admissions" }]} />
      <AdmissionsHeader
        title="Admissions at BEC Bagalkote"
        description="Join a NAAC 'A'-graded, NBA-accredited autonomous institute. Explore programme-wise eligibility, entrance exams, fee structure and sanctioned intake, and apply online."
      />

      <div className="space-y-16">
        {/* College codes — top-of-page quick reference */}
        <CollegeCodes />

        {/* Quick facts */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickFacts.map((fact) => (
            <div
              key={fact.label}
              className="rounded-2xl bg-white border border-gray-100 shadow-xs p-6 text-center"
            >
              <div className="text-3xl font-bold text-primary tracking-tight">{fact.value}</div>
              <div className="mt-1 text-sm font-semibold text-gray-900">{fact.label}</div>
              <div className="text-xs text-gray-500 mt-0.5">{fact.detail}</div>
            </div>
          ))}
        </section>

        {/* Programmes */}
        <section>
          <SectionHeader icon={GraduationCap} title="Programmes & Admission Details" />
          <div className="grid sm:grid-cols-2 gap-4">
            {admissionProgrammes.map((programme) => {
              const Icon = programmeIcons[programme.slug];
              return (
                <Link
                  key={programme.slug}
                  href={`/admissions/${programme.slug}`}
                  className="group flex flex-col rounded-2xl bg-white border border-gray-200 p-6 shadow-xs hover:border-primary/40 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                      {programme.tab}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed grow">{programme.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary">
                    View admission details
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* How to apply */}
        <section>
          <SectionHeader icon={ClipboardCheck} title="How to Apply" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="relative rounded-2xl bg-white border border-gray-100 p-6 shadow-xs"
                >
                  <span className="absolute top-4 right-5 text-4xl font-bold text-orange-100 select-none">
                    {idx + 1}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        <ApplyCallout />
        <RelatedLinks />
      </div>
    </>
  );
}
