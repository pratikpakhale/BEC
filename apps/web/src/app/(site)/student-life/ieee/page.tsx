import Image from "next/image";
import Link from "next/link";

import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { DocumentDirectory } from "@/components/common/document-directory";
import { documentGroups } from "@/content/documents";
import { asset } from "@/lib/assets";
import {
  Award,
  MapPin,
  UserRound,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

export const metadata = pageMetadata({
  title: "IEEE Student Branch",
  description:
    "The BEC-IEEE Student Branch (STB35261), established January 1994 — an entity of the IEEE North Karnataka Sub-Section under the IEEE Bangalore Section, with active society chapters, affinity groups and the NKCon-24 international conference.",
  path: "/student-life/ieee",
});

const HERO_IMAGE = asset("student-life/clubs/ieee-student-branch-35261.webp");

const branchDetails = [
  { label: "Branch Code", value: "BEC-IEEE (STB35261)" },
  { label: "Established", value: "January 1994" },
  { label: "Branch Counsellor", value: "Dr. Sangamesh Y. Goudappanavar" },
  { label: "Chairperson", value: "Bharatesh Karbhari" },
  {
    label: "Affiliation",
    value: "IEEE North Karnataka Sub-Section · Bangalore Section · Region 10",
  },
  {
    label: "Location",
    value: "Vidyagiri, Bagalkote, Karnataka 587102",
  },
];

const journey = [
  "The IEEE Student Branch (STB35261) of Basaveshwar Engineering College, Bagalkot, was established in January 1994 by Dr. Suresh H. Jangamshetti, a Senior Member of IEEE and a visionary in engineering education. The branch, known as BEC-IEEE, was founded with the goal of fostering technical excellence, professional networking and innovation among students, and has since played a pivotal role in organising workshops, technical talks, and humanitarian and professional activities that have shaped the careers of countless students.",
  "In January 2020, the IEEE North Karnataka Sub-Section (NKSS) was officially established, strengthening IEEE's presence in northern Karnataka and providing a structured platform for innovation, collaboration and professional development in the region. BEC-IEEE became one of its affiliated entities under the IEEE Bangalore Section, enabling participation in cross-institutional initiatives, joint events and broader networking opportunities while bringing global IEEE resources closer to its members.",
  "In September 2024, BEC-IEEE successfully organised NKCon-24, an international conference that attracted participants and experts from across the globe, showcasing cutting-edge research and innovative solutions. The event also celebrated 30 years of the branch's dedication to IEEE's mission of advancing technology for humanity.",
  "Today, the IEEE BEC Student Branch is a thriving community driven by a shared mission — to empower students to pursue their passions, cultivate meaningful connections and make a lasting impact.",
];

type TeamMember = { name: string; role: string };

const teams: { title: string; members: TeamMember[] }[] = [
  {
    title: "Core Committee",
    members: [
      { name: "Bharatesh Karbhari", role: "Chairperson" },
      { name: "Sangamesh Kanabur", role: "Vice Chairperson" },
      { name: "Swayam Nandagaon", role: "Secretary" },
      { name: "Panchakshari Jogi", role: "Treasurer" },
      { name: "Pooja Rathi", role: "Joint Secretary" },
      { name: "Aditya Vantagodi", role: "Joint Treasurer" },
    ],
  },
  {
    title: "Operating Committee",
    members: [
      { name: "Apoorva Joshi", role: "Operating Committee Chair" },
      { name: "Pranav Pattan", role: "Operating Committee Vice Chair" },
      { name: "Vishwanath Diggavi", role: "MDC Chair" },
      { name: "Ashwini Yakajanavar", role: "SAC Chair" },
      { name: "Shreya Halingali", role: "Meeting Coordinator" },
      { name: "Kartik Emmi", role: "Operating Committee Secretary" },
      { name: "Subramanya Math", role: "Operating Committee Secretary" },
      { name: "Sakshi Desai", role: "Membership Coordinator" },
      { name: "Triveni Venkatesh", role: "Membership Coordinator" },
    ],
  },
  {
    title: "Web Team",
    members: [
      { name: "Shreyas Rathod", role: "Webmaster" },
      { name: "Bhagyashri Kanade", role: "Joint Webmaster" },
      { name: "Sanju Hugar", role: "Joint Webmaster" },
    ],
  },
  {
    title: "Content Team",
    members: [
      { name: "Omkar Sanjeev", role: "Design Head" },
      { name: "Channamallikarjun Y", role: "Design Lead" },
      { name: "Soorabhi Aragi", role: "Editorial Head" },
      { name: "Siddharudha M B", role: "Social Media Head" },
      { name: "Honawad Ankit", role: "Social Media Lead" },
    ],
  },
];

const societies = [
  {
    tag: "PES",
    name: "Power & Energy Society",
    description:
      "Unites power and electrical engineers, academics and industry professionals, setting the standard for education and innovation in electric power and energy.",
  },
  {
    tag: "CS",
    name: "Computer Society",
    description:
      "Connects computer engineers, scientists, academics and industry professionals, driving global technological advancement.",
  },
  {
    tag: "RAS",
    name: "Robotics and Automation Society",
    description:
      "Advances innovation, education and research in robotics and automation for intelligent, adaptable systems.",
  },
  {
    tag: "AESS",
    name: "Aerospace and Electronic Systems Society",
    description:
      "Focuses on the organisation, design, development and operation of complex systems across space, air, ocean and ground environments.",
  },
  {
    tag: "ComSoc",
    name: "Communications Society",
    description:
      "Advances global communications and networking technology, fostering innovation and setting industry standards.",
  },
  {
    tag: "CIS",
    name: "Computational Intelligence Society",
    description:
      "Focuses on biologically and linguistically motivated computational paradigms such as neural networks, genetic algorithms and fuzzy systems.",
  },
  {
    tag: "RS",
    name: "Reliability Society",
    description:
      "Focuses on ensuring the dependability, safety and performance of systems throughout their lifecycle.",
  },
  {
    tag: "VTS",
    name: "Vehicular Technology Society",
    description:
      "Advances technologies related to wireless communications, transportation systems and mobile services.",
  },
  {
    tag: "CASS",
    name: "Circuits and Systems Society",
    description:
      "Advances the theory, design and implementation of circuits and systems across a wide range of applications.",
  },
  {
    tag: "PELS",
    name: "Power Electronics Society",
    description:
      "Advances technologies related to power conversion, energy systems and electronic control of electric power.",
  },
];

const affinityGroups = [
  {
    tag: "WIE",
    name: "Women in Engineering",
    description:
      "Promotes diversity, inclusion and the advancement of women in engineering and technology through networking, mentorship and professional development.",
  },
  {
    tag: "SIGHT",
    name: "Special Interest Group on Humanitarian Technology",
    description:
      "Applies technology for social good and sustainable development in areas such as healthcare, education, clean energy and community development.",
  },
];

const memberBenefits = [
  "IEEE Standards",
  "IEEE Xplore Digital Library",
  "IEEE Resume Lab",
  "Student Competitions",
  "Scholarships, Grants & Fellowships",
  "IEEE Collabratec",
  "IEEE Student Travel Grants",
  "IEEE SIGHT",
  "IEEE TV",
];

const usefulLinks = [
  { label: "BEC-IEEE Website", href: "https://www.becieee.org" },
  { label: "IEEE", href: "https://www.ieee.org" },
  { label: "IEEE Region 10", href: "https://www.ieeer10.org" },
  { label: "IEEE Bangalore Section", href: "https://ieeebangalore.org" },
  { label: "IEEE Collabratec", href: "https://ieee-collabratec.ieee.org" },
];

export default function IEEEPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Professional Body"
        title="IEEE Student Branch"
        description="Advancing technology for humanity — the BEC-IEEE Student Branch (STB35261), established in January 1994 and an entity of the IEEE North Karnataka Sub-Section under the IEEE Bangalore Section, IEEE Region 10."
        badges={[
          { label: "STB35261" },
          { label: "Since 1994", tone: "outline" },
          { label: "30 Years · NKCon-24", tone: "outline" },
        ]}
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18 space-y-16">
        <div className="relative aspect-3/2 w-full overflow-hidden rounded-md border border-stone-200 bg-stone-100 shadow-sm">
          <Image
            src={HERO_IMAGE}
            alt="Members and office-bearers of the BEC-IEEE Student Branch at Basaveshwar Engineering College, Bagalkote"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover object-center"
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <div className="space-y-6">
            <SectionHeading eyebrow="About" title="Our Journey" />
            <div className="space-y-4 text-base leading-relaxed text-gray-700">
              {journey.map((para) => (
                <p key={para.slice(0, 32)} className="text-justify">
                  {para}
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-md border border-stone-200 bg-white p-6 shadow-sm md:p-8">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <Award className="h-5 w-5 text-primary" />
              Branch Information
            </h3>
            <dl className="mt-4 divide-y divide-stone-100">
              {branchDetails.map((d) => (
                <div key={d.label} className="py-3">
                  <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    {d.label}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-gray-900">
                    {d.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="space-y-8">
          <SectionHeading
            eyebrow="Executive Team"
            title="Office-Bearers (2025–26)"
          />

          <div className="flex items-center gap-4 rounded-md border border-stone-200 bg-orange-50/60 p-5 shadow-sm sm:p-6">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-white text-primary shadow-sm">
              <UserRound className="h-6 w-6" />
            </span>
            <div>
              <p className="text-base font-semibold text-gray-900">
                Dr. Sangamesh Y. Goudappanavar
              </p>
              <p className="mt-0.5 text-sm text-gray-600">Branch Counsellor</p>
            </div>
          </div>

          <div className="space-y-8">
            {teams.map((team) => (
              <div key={team.title} className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                  {team.title}
                </h3>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {team.members.map((m) => (
                    <div
                      key={m.name}
                      className="rounded-md border border-stone-200 bg-white p-4 shadow-sm"
                    >
                      <p className="text-sm font-semibold text-gray-900">
                        {m.name}
                      </p>
                      <p className="mt-0.5 text-xs text-gray-500">{m.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <SectionHeading
            eyebrow="Chapters"
            title="IEEE Societies & Affinity Groups"
            description="BEC-IEEE hosts active chapters and groups under the following IEEE Societies and Affinity Groups, connecting professionals and advancing technology for the benefit of humanity."
          />

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
              Societies
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {societies.map((s) => (
                <div
                  key={s.tag}
                  className="flex h-full flex-col rounded-md border border-stone-200 bg-white p-5 shadow-sm"
                >
                  <span className="inline-flex w-fit items-center rounded-sm bg-orange-50 px-2.5 py-1 text-xs font-bold tracking-wide text-primary">
                    {s.tag}
                  </span>
                  <h4 className="mt-3 text-sm font-semibold text-gray-900">
                    {s.name}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
              Affinity Groups
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {affinityGroups.map((g) => (
                <div
                  key={g.tag}
                  className="flex h-full flex-col rounded-md border border-stone-200 bg-white p-5 shadow-sm"
                >
                  <span className="inline-flex w-fit items-center rounded-sm bg-orange-50 px-2.5 py-1 text-xs font-bold tracking-wide text-primary">
                    {g.tag}
                  </span>
                  <h4 className="mt-3 text-sm font-semibold text-gray-900">
                    {g.name}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {g.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div className="space-y-6">
            <SectionHeading eyebrow="Membership" title="IEEE Member Benefits" />
            <div className="grid gap-3 sm:grid-cols-2">
              {memberBenefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-3 rounded-md border border-stone-200 bg-white p-4 text-sm font-medium text-gray-800 shadow-sm"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <SectionHeading eyebrow="Connect" title="Useful Links" />
            <div className="rounded-md border border-stone-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-3 border-b border-stone-100 pb-4">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p className="text-sm leading-relaxed text-gray-700">
                  Basaveshwar Engineering College, Vidyagiri, Bagalkote,
                  Karnataka 587102
                </p>
              </div>
              <ul className="mt-2 divide-y divide-stone-100">
                {usefulLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between gap-3 py-3 text-sm font-medium text-gray-900 hover:text-primary"
                    >
                      {link.label}
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-stone-400 transition-colors group-hover:text-primary" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <SectionHeading eyebrow="Records" title="Reports" />
          <DocumentDirectory
            groups={documentGroups("ieee", "documents")}
          />
        </div>
      </section>
    </main>
  );
}
