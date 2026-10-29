"use client";

import Image from "next/image";
import { CalendarDays } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeading } from "@/components/common/section-heading";
import { PersonCard, PersonGrid } from "@/components/common/person-card";
import { PhotoGallery } from "@/components/common/photo-gallery";
import { DocumentDirectory, type DocumentGroup } from "@/components/common/document-directory";
import { asset, assetsUnder } from "@/lib/assets";

const v2Highlights = [
  { value: "10", label: "Student projects selected for incubation" },
  { value: "16", label: "Faculty guides mentoring the cohort" },
  { value: "IIIT Dharwad", label: "Project Mentorship Unit (PMU) host" },
];

const v2Timeline = [
  {
    date: "1 April 2026",
    title: "Ideathon & Pitching Design Workshop",
    detail: "Campus-wide ideation and pitch-design workshop to seed project ideas.",
  },
  {
    date: "15 April 2026",
    title: "Institute-level selection of Top 15 projects",
    detail: "Shortlisting of the 15 strongest projects at the institute level.",
  },
  {
    date: "1 May 2026",
    title: "Final pitching — Top 10 selection",
    detail: "Final pitching before the IIIT Dharwad team to select the Top 10 projects.",
  },
  {
    date: "12 May 2026",
    title: "NAIN 2.0 Kickoff at IIIT Dharwad",
    detail: "Official kickoff of the incubation programme at IIIT Dharwad.",
  },
];

const v2Guides = [
  { name: "Mr. Basavaraj Meti", slug: "basavaraj-meti", industryMentor: true },
  { name: "Mr. Girish Badragond", slug: "girish-badragond", industryMentor: true },
  { name: "Prof. Praveen C. Kolur", slug: "praveen-c-kolur" },
  { name: "Prof. Somalingappa S. Davanageri", slug: "somalingappa-s-davanageri" },
  { name: "Dr. Poornima M. Chanal", slug: "poornima-m-chanal" },
  { name: "Dr. Basavaraj Endigeri", slug: "basavaraj-endigeri" },
  { name: "Dr. Bharati S. Meti", slug: "bharati-s-meti" },
  { name: "Dr. Manjula Sutagundar", slug: "manjula-sutagundar" },
  { name: "Dr. Vishwanath Kagwade", slug: "vishwanath-kagwade" },
  { name: "Dr. Bharati Reshmi", slug: "bharati-reshmi" },
  { name: "Dr. Sangamesh Goudappanavar", slug: "sangamesh-goudappanavar" },
  { name: "Dr. Suryakanth", slug: "suryakanth" },
  { name: "Dr. S. M. Malkapur", slug: "s-m-malkapur" },
  { name: "Dr. Krishnamurthy Bhat", slug: "krishnamurthy-bhat" },
  { name: "Dr. Jayalatha N. A.", slug: "jayalatha-n-a" },
  { name: "Dr. Shilpa K. Jigajinni", slug: "shilpa-k-jigajinni" },
];

type Project = {
  no: number;
  title: string;
  description?: string;
  team: string[];
};

const v2Projects: Project[] = [
  {
    no: 1,
    title: "Gravity Store",
    team: [
      "Vijaykumar Gaddenagouda Patil",
      "Chetan Gangaram Bhandawalakar",
      "Gururaj Kammar",
      "Bhoomika Parashuram Naik",
      "Sneha Suresh Kumbar",
    ],
  },
  {
    no: 2,
    title: "On-site Management of Agricultural Residue by Pelletization",
    team: [
      "Mahalaxmi V. Ingalagi",
      "Ritika B. K.",
      "Aishwarya S. K.",
      "Manisha P. Joshi",
      "Ravishankar Nilegar",
    ],
  },
  {
    no: 3,
    title: "Forge Arm — personalised & non-invasive pain relief",
    team: [
      "Poorvi N. Goudar",
      "A. Nandita",
      "Kiran Timmapur",
      "Ashwini Lokare",
      "Honawad Ankit",
    ],
  },
  {
    no: 4,
    title: "SafePrint — privacy-first, AI-powered print platform",
    team: ["Rohan Dangi", "Rushab Pattar", "Anajana Pujari", "Varsha K.", "Amruta B."],
  },
  {
    no: 5,
    title: "Explainable Early Patient Deterioration Device (EEPD)",
    description:
      "An AI-powered smart healthcare monitoring system designed to predict patient health deterioration before visible symptoms appear.",
    team: ["Chinmay R. M.", "Poorvi I. H.", "Vaishnavi Bidnoor"],
  },
  {
    no: 6,
    title: "Smart Hybrid SPV-Based Sustainable Cooking Stove",
    team: [
      "Varsha Naik",
      "Manish Budihal",
      "Arunkumar Patil",
      "Sandhya Hugar",
      "Rakesh Patil",
    ],
  },
  {
    no: 7,
    title: "Smart Ventilated Onion Storage System",
    team: [
      "Vikas Somanath Madagi",
      "Pratik Rajesh Dabade",
      "Avinash Pradeep Jadhav",
      "Sahana Anand Math",
      "Pallavi Veerappa Sudi",
    ],
  },
  {
    no: 8,
    title: "Biotech solution for lemon-peel-based pectin",
    team: [
      "Soundarya Lamani",
      "Vaishnavi Rajput",
      "Sanjana Policepatil",
      "Prashant Mirji",
      "Ashutosh Kumar",
    ],
  },
  {
    no: 9,
    title: "Breathe Easy Bio Blocks",
    description:
      "Eco-friendly biochar tiles/blocks that remove harmful odour from the air.",
    team: [
      "Vaishnavi Nagari",
      "Vishwala Hosakoti",
      "Sushmita Goni",
      "Bhagyashree Nayakodi",
      "Nihal Utagi",
    ],
  },
  {
    no: 10,
    title: "Microwave-assisted amla-blended pomegranate honey",
    team: ["Rohini Sarwad", "Sneha V.", "Irava", "Shreedhar", "Shivaleela V. B."],
  },
];

const v2CentreKeys = [1, 2, 5, 11, 14, 16];

const v2Centre = v2CentreKeys.map((n, index) => ({
  src: asset(`cells/nain/v2/center/${n}.webp`),
  alt: `NAIN 2.0 incubation centre at Basaveshwar Engineering College ${index + 1}`,
}));

// ---------- NAIN 1.0 data ----------

const v1Objectives = [
  "Encourage students, research scholars and alumni to share ideas that solve locally-relevant problems, and to validate, refine and nurture them.",
  "Provide an ecosystem to convert ideas into proofs of concept and upgrade them to a level of commercial value.",
  "After successful incubation, encourage and lead teams towards setting up a business enterprise.",
];

const v1Highlights = [
  { value: "1 of 9", label: "Engineering colleges selected in Karnataka" },
  { value: "2013–14", label: "Launched under the Karnataka State Budget" },
  { value: "KBITS", label: "Administered by KBITS, Govt. of Karnataka" },
];

const v1Events = [
  "Pre-Hackathon (2014)",
  "Hackathon (2014)",
  "Pre-Hackathon (2016)",
  "Ideathon (2018)",
  "E-Step Bootcamp (2019)",
  "Belgavi IT Summit",
  "Pre-Hackathon by YOURSTORY",
  "Project Exhibition — 100 Days Celebration, Office of the Deputy Chief Minister, GoK",
];

const v1Mentors = [
  { name: "Dr. R. N. Herkal", domain: "Geo Technology & Structural Engineering" },
  { name: "Dr. S. S. Injaganeri", domain: "Geo Technology & Structural Engineering" },
  { name: "Dr. V. V. Kuppast", domain: "Design & Metallurgy" },
  { name: "Dr. S. H. Jangamshetti", domain: "Power Energy" },
  { name: "Dr. Veena Soragavi", domain: "Hydraulic & Water Resource" },
  { name: "Dr. P. N. Kulkarni", domain: "Signal Processing & Application" },
  { name: "Dr. Shridhar K", domain: "Signal Processing & Application" },
  { name: "Dr. C. M. Javalagi", domain: "Management" },
  { name: "Dr. B. G. Sheeparamatti", domain: "MSME, Embedded Systems, Biomedical Engg." },
  {
    name: "Dr. V. B. Pagi",
    domain: "Image Processing & Mobile Computing",
    photo: asset("departments/cse/faculty/veerappa-b-pagi.webp"),
  },
  { name: "Dr. Mahabaleshwar S. K", domain: "Wireless Sensor Network" },
  { name: "Dr. R. L. Naik", domain: "Power Energy" },
  { name: "Dr. S. G. Kambalimath", domain: "VLSI" },
  { name: "Dr. Bharati Meti", domain: "Bio-Fuels & Food Production" },
  {
    name: "Dr. Krishnamurthy Bhat",
    domain: "Sensor Design & Application",
    photo: asset("departments/ecs/faculty/krishnamurthy-bhat.webp"),
  },
  { name: "Dr. Sanjay Hanji", domain: "Marketing" },
];

const v1Gallery = assetsUnder("cells/nain/gallery/").map((src, index) => ({
  src,
  alt: `NAIN event at Basaveshwar Engineering College ${index + 1}`,
}));

function LogoRow() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <div className="relative h-16 w-28">
        <Image
          src={asset("cells/nain/nain-logo.webp")}
          alt="NAIN logo"
          fill
          sizes="112px"
          className="object-contain"
        />
      </div>
      <div className="relative h-16 w-16">
        <Image
          src={asset("cells/nain/gok-logo.webp")}
          alt="Government of Karnataka logo"
          fill
          sizes="64px"
          className="object-contain"
        />
      </div>
    </div>
  );
}

function Highlights({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map((h) => (
        <div
          key={h.label}
          className="rounded-md border border-stone-200 bg-white p-6 text-center shadow-sm"
        >
          <p className="text-2xl font-semibold text-primary md:text-3xl">{h.value}</p>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">{h.label}</p>
        </div>
      ))}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const photos = assetsUnder(`cells/nain/v2/projects/${project.no}/`);
  return (
    <article className="flex flex-col rounded-md border border-stone-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-orange-50 text-sm font-semibold text-primary">
          {project.no}
        </span>
        <div>
          <h3 className="text-base font-semibold leading-snug text-gray-900">
            {project.title}
          </h3>
          {project.description && (
            <p className="mt-1.5 text-sm leading-relaxed text-gray-600 text-justify">
              {project.description}
            </p>
          )}
        </div>
      </div>

      {photos.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {photos.map((src, i) => (
            <div
              key={src}
              className="relative h-16 w-16 overflow-hidden rounded-sm border border-stone-200 bg-stone-100"
            >
              <Image
                src={src}
                alt={`${project.title} — team member ${i + 1}`}
                fill
                sizes="64px"
                className="object-cover object-top"
              />
            </div>
          ))}
        </div>
      )}

      <div className="mt-5 border-t border-stone-100 pt-4">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
          Team
        </p>
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
          {project.team.map((member) => (
            <li key={member} className="text-sm text-gray-700">
              {member}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function NainV2() {
  return (
    <div className="space-y-16">
      <div className="space-y-6">
        <div className="relative w-full overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm">
          <Image
            src={asset("cells/nain/v2/banner.webp")}
            alt="New Age Innovation Network (NAIN 2.0) at Basaveshwar Engineering College, Bagalkote — an initiative of the Department of Electronics, IT & BT, Government of Karnataka, implemented by KITS"
            width={1600}
            height={533}
            sizes="(max-width: 1152px) 100vw, 1152px"
            className="h-auto w-full"
            priority
          />
        </div>
      </div>

      <Highlights items={v2Highlights} />

      {v2Centre.length > 0 && (
        <div className="space-y-8">
          <SectionHeading eyebrow="Facility" title="The NAIN 2.0 Centre" />
          <PhotoGallery images={v2Centre} />
        </div>
      )}

      <div className="space-y-6">
        <SectionHeading eyebrow="Timeline" title="How the 2026 cohort was formed" />
        <ol className="relative space-y-6 border-l border-stone-200 pl-6">
          {v2Timeline.map((item) => (
            <li key={item.title} className="relative">
              <span className="absolute -left-[1.65rem] mt-1 inline-flex h-3 w-3 items-center justify-center rounded-full border-2 border-primary bg-white" />
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <CalendarDays className="h-4 w-4" />
                {item.date}
              </div>
              <h3 className="mt-1 text-base font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">{item.detail}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="space-y-8">
        <SectionHeading
          eyebrow="Projects"
          title="Incubated Student Projects"
          description="The student teams and prototypes selected for the NAIN 2.0 cohort at BEC Bagalkote."
        />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {v2Projects.map((project) => (
            <ProjectCard key={project.no} project={project} />
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <SectionHeading
          eyebrow="Guidance"
          title="Faculty Guides"
          description="Faculty guides mentoring the NAIN 2.0 student teams through prototyping and business modelling."
        />
        <PersonGrid>
          {v2Guides.map((g) => (
            <PersonCard
              key={g.slug}
              name={g.name}
              photo={asset(`cells/nain/v2/guides/${g.slug}.webp`)}
              badges={
                g.industryMentor
                  ? [{ label: "Industry Mentor", tone: "primary" }]
                  : undefined
              }
            />
          ))}
        </PersonGrid>
      </div>

      <div className="space-y-8">
        <SectionHeading eyebrow="Contact" title="Coordinator" />
        <div className="max-w-sm">
          <PersonCard
            name="Dr. Bharati S. Meti"
            photo={asset("governance/hod/biotechnology/dr-bharati-s-meti.webp")}
            description="Coordinator — NAIN 2.0, BEC Bagalkote"
            badges={[{ label: "NAIN 2.0 Coordinator", tone: "primary" }]}
          />
        </div>
      </div>
    </div>
  );
}

function NainV1({ documents }: { documents: DocumentGroup[] }) {
  return (
    <div className="space-y-16">
      <div className="space-y-6">
        <LogoRow />
        <SectionHeading eyebrow="About" title="From idea to enterprise" />
        <div className="max-w-3xl space-y-4 text-base leading-relaxed text-gray-700 text-justify">
          <p>
            NAIN was established under the Department of Electronics, Information
            Technology, Biotechnology and Science &amp; Technology, Government of
            Karnataka. It emerged from the Karnataka ICT Group (KIG 2020) report —
            formed under the leadership of Mr. Mohandas Pai and Mr. B. V. Naidu — which set out a
            roadmap for Karnataka&rsquo;s leadership in ICT.
          </p>
          <p>
            In the State Budget 2013&ndash;14 the government proposed to establish
            incubation centres in the ICT sector in association with selected
            engineering colleges at district headquarters. The network operates
            through these colleges, prioritising their students, research scholars
            and alumni, and addressing locally-relevant problems. It is
            administered by KBITS (Karnataka Biotechnology and Information
            Technology Services), the nodal agency implementing the decisions of
            the Vision Groups on IT and Biotechnology.
          </p>
        </div>
      </div>

      <Highlights items={v1Highlights} />

      <div className="rounded-md border border-stone-200 bg-white p-6 shadow-sm md:p-8">
        <h3 className="text-lg font-semibold text-gray-900">Objectives</h3>
        <ul className="mt-4 space-y-3">
          {v1Objectives.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-gray-700">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-6">
        <SectionHeading eyebrow="Activities" title="Events & Programmes" />
        <div className="flex flex-wrap gap-2">
          {v1Events.map((e) => (
            <span
              key={e}
              className="rounded-sm border border-stone-200 bg-stone-50 px-3 py-1.5 text-sm text-gray-700"
            >
              {e}
            </span>
          ))}
        </div>
      </div>

      {v1Gallery.length > 0 && (
        <div className="space-y-8">
          <SectionHeading eyebrow="Gallery" title="In Action" />
          <PhotoGallery images={v1Gallery} />
        </div>
      )}

      <div className="space-y-8">
        <SectionHeading
          eyebrow="Guidance"
          title="Mentors"
          description="Faculty mentors associated with the BEC-NAIN centre, across engineering, science and management domains."
        />
        <PersonGrid>
          {v1Mentors.map((m) => (
            <PersonCard key={m.name} name={m.name} description={m.domain} photo={m.photo} />
          ))}
        </PersonGrid>
      </div>

      <div className="space-y-8">
        <SectionHeading eyebrow="Contact" title="Coordinators" />
        <PersonGrid className="lg:grid-cols-2">
          <PersonCard
            name="Ms. Shruti B. Hiregoudar"
            photo={asset("cells/nain/shruti-b-h.webp")}
            description="District Innovation Associate — NAIN, KITS, GoK · Mobile: 78999 12164"
            email="hiregoudarshruti@gmail.com"
            badges={[{ label: "District Innovation Associate", tone: "primary" }]}
          />
          <PersonCard
            name="Dr. Anil D. Devangavi"
            photo={asset("cells/nain/anil-devangavi.webp")}
            description="College Coordinator — NAIN · Mobile: 93421 86108"
            email="anildevangavi_s@yahoo.co.in"
            badges={[{ label: "College Coordinator", tone: "primary" }]}
          />
        </PersonGrid>
      </div>

      <div className="space-y-8">
        <SectionHeading eyebrow="Apply & Records" title="Forms, Projects & Reports" />
        <DocumentDirectory
          groups={documents}
        />
      </div>
    </div>
  );
}

export function NainTabs({ v1Documents }: { v1Documents: DocumentGroup[] }) {
  return (
    <Tabs defaultValue="v2" className="gap-0">
      <div className="flex justify-center">
        <TabsList className="h-auto gap-1 rounded-lg bg-stone-100 p-1">
          <TabsTrigger
            value="v2"
            className="h-auto flex-col items-center gap-0.5 rounded-md px-6 py-2.5"
          >
            <span className="text-sm font-semibold">NAIN 2.0</span>
            <span className="text-[11px] font-normal text-gray-500">2026 · Innovation Network</span>
          </TabsTrigger>
          <TabsTrigger
            value="v1"
            className="h-auto flex-col items-center gap-0.5 rounded-md px-6 py-2.5"
          >
            <span className="text-sm font-semibold">NAIN 1.0</span>
            <span className="text-[11px] font-normal text-gray-500">2013 · Incubation Network</span>
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="v2" className="mt-12">
        <NainV2 />
      </TabsContent>
      <TabsContent value="v1" className="mt-12">
        <NainV1 documents={v1Documents} />
      </TabsContent>
    </Tabs>
  );
}
