import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { DocumentDirectory } from "@/components/common/document-directory";
import { documentGroups } from "@/content/documents";
import { Globe, GraduationCap, Briefcase, HeartHandshake, Mail, Phone, Users } from "lucide-react";

export const metadata = pageMetadata({
  title: "Alumni Association (BECAA)",
  description:
    "BEC Alumni Association (BECAA), established 2001 — 500+ members, 11 directors and 5 office bearers driving mentorship, career support and networking for graduates.",
  path: "/student-life/alumni",
});

const contactDetails = {
  name: "Prof. Basavaraj Endigeri",
  role: "Alumni Secretary",
  org: "BECAA, Basaveshwar Engineering College (A)",
  address: "Bagalkote - 587 102",
  mobile: "+91 9845657310",
  email: "nammabecalumni@gmail.com",
};

const objectives = [
  {
    title: "Networking",
    description:
      "Foster and strengthen the bond between the college and its global community of alumni.",
    icon: Globe,
  },
  {
    title: "Mentorship",
    description:
      "Provide technical guidance and career counselling to current students through alumni experts.",
    icon: GraduationCap,
  },
  {
    title: "Career Support",
    description:
      "Help graduates and students secure better job opportunities and internships through the alumni network.",
    icon: Briefcase,
  },
];

const committeeMembers = [
  { name: "Dr. B. R. Hiremath", role: "President", designation: "Principal" },
  { name: "Shri. B. R. Endigeri", role: "Secretary", designation: "Asst. Prof." },
  { name: "Dr. C. M. Veerendra Kumar", role: "Member", designation: "Assoc. Prof." },
  { name: "Shri. S. M. Pharsiyawar", role: "Member", designation: "Assoc. Prof." },
  { name: "Smt. Shardha P.", role: "Member", designation: "Assoc. Prof." },
  { name: "Shri. M. G. Kambalimath", role: "Member", designation: "Asst. Prof." },
  { name: "Shri. S. F. Chitragar", role: "Member", designation: "Asst. Prof." },
  { name: "Smt. Sunita S. Tambakad", role: "Member", designation: "Asst. Prof." },
  { name: "Smt. Smita Gour", role: "Member", designation: "Asst. Prof." },
  { name: "Shri. Brijmohan A. Vyas", role: "Member", designation: "Asst. Prof." },
  { name: "Shri. C. M. Jangin", role: "Member", designation: "Asst. Prof." },
  { name: "Shri. Kiran B. Balavalad", role: "Member", designation: "Asst. Prof." },
  { name: "Shri. Sandeep Kugali", role: "Member", designation: "Asst. Prof." },
];

export default function AlumniPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Registered Society · Est. 2001"
        title="Alumni Association (BECAA)"
        description="The Basaveshwar Engineering College Alumni Association bridges the institute and its global community of graduates, with a body of 11 directors and 5 office bearers and over 500 active members."
        badges={[{ label: "Est. 2001" }, { label: "500+ Members", tone: "outline" }]}
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18 space-y-16">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <div className="space-y-6">
            <SectionHeading eyebrow="About" title="Building a lifelong bond" />
            <div className="space-y-4 text-base leading-relaxed text-gray-700">
              <p className="text-justify">
                BECAA serves as a bridge between the institute and its global
                community of graduates. Governed by a dedicated body of 11
                directors and 5 office bearers, it is committed to strengthening
                the relationship between industry and academia.
              </p>
              <p className="text-justify">
                The network of over 500 active members contributes to the college
                ecosystem through mentorship, technical knowledge sharing and
                creating career opportunities for current students.
              </p>
            </div>
            <div className="grid gap-4 border-t border-stone-200 pt-6 sm:grid-cols-3">
              {objectives.map((obj) => {
                const Icon = obj.icon;
                return (
                  <div key={obj.title} className="space-y-2">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-orange-50 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-base font-semibold text-gray-900">{obj.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {obj.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-md border border-stone-200 bg-white p-6 shadow-sm md:p-8">
            <h3 className="text-lg font-semibold text-gray-900">Contact</h3>
            <p className="mt-3 text-base font-semibold text-primary">
              {contactDetails.name}
            </p>
            <p className="text-sm text-gray-500">{contactDetails.role}</p>
            <p className="mt-2 text-xs leading-relaxed text-gray-500">
              {contactDetails.org}
              <br />
              {contactDetails.address}
            </p>
            <div className="mt-5 space-y-2">
              <a
                href={`tel:${contactDetails.mobile.replace(/\s/g, "")}`}
                className="flex items-center gap-3 rounded-md bg-stone-50 p-3 text-sm text-gray-700 transition-colors hover:text-primary"
              >
                <Phone className="h-4 w-4 text-primary" />
                {contactDetails.mobile}
              </a>
              <a
                href={`mailto:${contactDetails.email}`}
                className="flex items-center gap-3 rounded-md bg-stone-50 p-3 text-sm text-gray-700 transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4 text-primary" />
                {contactDetails.email}
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-md border border-stone-200 bg-stone-900 p-6 text-white shadow-sm md:p-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">
            <HeartHandshake className="h-4 w-4" />
            Alumni Impact
          </div>
          <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
            Global support during crisis
          </h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-stone-300 text-justify">
            During the COVID-19 pandemic, BEC alumni residing in the USA donated
            six 10-litre oxygen concentrators to S. Nijalingappa Medical College
            and HSK Hospital, Bagalkote (June 2021) — a reflection of the enduring
            spirit of service instilled at BEC.
          </p>
        </div>

        <div className="space-y-8">
          <SectionHeading
            eyebrow="Reports"
            title="Association Activity Report"
            description="A consolidated record of alumni achievements, placement contributions, reunions, technical talks and campus visits."
          />
          <DocumentDirectory
            groups={documentGroups("alumni", "documents")}
          />
        </div>

        <div className="space-y-8">
          <SectionHeading eyebrow="Leadership" title="Committee Members" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {committeeMembers.map((member) => (
              <div
                key={member.name}
                className="rounded-md border border-stone-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-orange-50 text-primary">
                    <Users className="h-4 w-4" />
                  </span>
                  <span className="rounded-sm border border-stone-200 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                    {member.role}
                  </span>
                </div>
                <h3 className="mt-3 text-sm font-semibold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-xs text-gray-500">{member.designation}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
