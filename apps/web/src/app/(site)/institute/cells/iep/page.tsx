import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink, Mail, Phone } from "lucide-react";

import { DocumentDirectory } from "@/components/common/document-directory";
import { documentGroups } from "@/content/documents";
import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { asset } from "@/lib/assets";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Innovation & Entrepreneurship Policy",
  description:
    "BEC Bagalkote's Innovation and Entrepreneurship Policy — aligned with MoE and Karnataka start-up policies, with source documents and contacts for student and faculty innovators.",
  path: "/institute/cells/iep",
});

const contacts = [
  {
    name: "Dr. Santhosh M. Malkapur",
    role: "Convener and Startup Activity Coordinator, IIC 8.0 BEC Bagalkote",
    affiliation: "Professor, Dept. of Civil Engg., Basaveshwar Engineering College, Bagalkote - 587 102",
    phone: "+91-9945417886",
    email: "sm.malkapur@gmail.com",
    photo: asset("cells/iic/santhosh-malkapur.webp"),
  },
];

const governmentLinks = [
  {
    title: "NISP portal",
    href: "https://nisp.mic.gov.in",
  },
  {
    title: "Karnataka Startup portal",
    href: "https://eitbt.karnataka.gov.in/startup/public/41/vision-&-objectives-/en",
  },
];

const mission = [
  "Establish an incubation centre with a multidisciplinary environment.",
  "Nurture aspiring entrepreneurial minds to transform innovative ideas into feasible commercial entities.",
  "Provide a platform to engage in innovation and start-up activities — trainings, conferences, workshops, seminars and competitions.",
  "Promote business aligned with the region's unique areas of opportunity.",
  "Promote start-ups in the key thrust areas of engineering and technology by strengthening industry–institute collaboration.",
];

const provisions = [
  {
    title: "Governance & funding",
    points: [
      "A dedicated Technology & Business Incubation Cell (TBIC) drives the campus entrepreneurial ecosystem and serves as the Single Point of Contact (SPOC).",
      "A minimum 1% of the total annual institutional budget is allocated to a separate 'Entrepreneurship Fund' for innovation and start-up activities.",
      "Funds are raised from DST, DBT, AICTE, BIRAC, Startup India and other agencies, CSR (Sec. 135, Companies Act 2013), alumni and sponsorships.",
    ],
  },
  {
    title: "For student entrepreneurs",
    points: [
      "Students may set up start-ups (including social start-ups) or intern part-time while studying, and earn academic credits for innovative prototypes and business models.",
      "A start-up may be opted for in place of a mini/major project, seminar or summer training, with a semester/year academic break permitted under TBIC approval.",
      "Exam eligibility relaxations and campus accommodation are available to incubatees with due permission from the TBIC.",
    ],
  },
  {
    title: "Equity, IPR & faculty norms",
    points: [
      "For services, infrastructure, mentorship, seed funds and IPR use, the institute may take 2%–9.5% equity in a start-up, with a 3-month cooling period under the compulsory-equity model.",
      "IPR developed using institute facilities/funds is jointly owned by inventors and the institute; royalties are capped at 4% of sale price (1–2% for pure software) when licensed to an incubated company.",
      "Faculty start-ups may use only technologies originating within BEC; incubated faculty start-up revenue is shared 70% faculty / 30% institute, with sabbatical/leave provisions for executive roles held beyond three months.",
    ],
  },
];

export default function IepPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Institute · Cells & Centres"
        title="BEC Innovation & Entrepreneurship Policy"
        description="Basaveshwar Engineering College has framed an innovation and entrepreneurship policy for students and faculty, aligned with the National Innovation and Startup Policy framework."
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18 space-y-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_220px] lg:items-start">
          <div className="space-y-5">
            <SectionHeading eyebrow="About" title="About BEC-IEP" />
            <div className="max-w-3xl space-y-4 text-base leading-relaxed text-gray-700 text-justify">
              <p>
                Basaveshwar Engineering College (BEC), Bagalkote has framed the
                innovation and entrepreneurship policy for students and faculty
                of the college.
              </p>
              <p>
                The BEC innovation and entrepreneurship policy has been framed in
                line with guidelines given in the NISP 2019 policy document. The
                policy at BEC aims to provide services, support and facilities
                available for potential innovators and entrepreneurs to excel in
                the field of innovation and entrepreneurship. The current text
                reflects the revised 2026 edition of the policy.
              </p>
            </div>
          </div>

          <div className="relative mx-auto h-36 w-52 lg:mx-0">
            <Image
              src={asset("cells/iic/iic-logo.webp")}
              alt="Institution's Innovation Council logo"
              fill
              sizes="208px"
              className="object-contain"
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-md border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Vision</h3>
            <p className="mt-4 text-base leading-relaxed text-gray-700 text-justify">
              To develop an indigenous, innovative entrepreneurial ecosystem for
              sustainable start-ups that address societal needs.
            </p>
          </div>
          <div className="rounded-md border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Mission</h3>
            <ul className="mt-4 space-y-3">
              {mission.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-gray-700">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-8">
          <SectionHeading
            eyebrow="What the policy offers"
            title="Key provisions"
            description="Highlights from the BEC Innovation & Entrepreneurship Policy (Revised 2026) for student and faculty innovators."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {provisions.map((group) => (
              <div
                key={group.title}
                className="flex h-full flex-col rounded-md border border-stone-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-base font-semibold text-gray-900">{group.title}</h3>
                <ul className="mt-4 space-y-3">
                  {group.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-relaxed text-gray-700 text-justify">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <SectionHeading
            eyebrow="Documents"
            title="Policy documents"
            description="The legacy BEC-IEP page linked these policy documents and public resource portals."
          />
          <DocumentDirectory
            groups={documentGroups("iep", "documents")}
          />

          <div className="grid gap-3 sm:grid-cols-2">
            {governmentLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 rounded-md border border-stone-200 bg-white p-4 text-sm font-semibold text-gray-900 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary hover:shadow-md"
              >
                {item.title}
                <ExternalLink className="h-4 w-4 shrink-0 text-stone-400 group-hover:text-primary" />
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <SectionHeading
            eyebrow="Contact"
            title="Contact information"
            description="Contact details displayed on the legacy BEC-IEP page."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {contacts.map((person) => (
              <article
                key={person.email}
                className="grid gap-5 rounded-md border border-stone-200 bg-white p-5 shadow-sm sm:grid-cols-[128px_1fr]"
              >
                <div className="relative aspect-square overflow-hidden rounded-sm bg-stone-100">
                  <Image
                    src={person.photo}
                    alt={person.name}
                    fill
                    sizes="128px"
                    className="object-cover object-top"
                  />
                </div>
                <div className="min-w-0 space-y-3">
                  <div>
                    <h2 className="text-lg font-semibold leading-snug text-gray-900">
                      {person.name}
                    </h2>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">
                      {person.role}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">
                      {person.affiliation}
                    </p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <a
                      href={`tel:${person.phone}`}
                      className="flex items-center gap-2 font-medium text-gray-700 hover:text-primary"
                    >
                      <Phone className="h-4 w-4 text-primary" />
                      {person.phone}
                    </a>
                    <a
                      href={`mailto:${person.email}`}
                      className="flex items-center gap-2 font-medium text-gray-700 hover:text-primary"
                    >
                      <Mail className="h-4 w-4 text-primary" />
                      {person.email}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
