import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { PersonCard, PersonGrid } from "@/components/common/person-card";
import { PhotoGallery } from "@/components/common/photo-gallery";
import { DocumentDirectory } from "@/components/common/document-directory";
import { documentGroups } from "@/content/documents";
import { asset, assetsUnder } from "@/lib/assets";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Institution's Innovation Council (IIC)",
  description:
    "BEC Bagalkote's Institution's Innovation Council (IIC), a MoE Innovation Cell body fostering innovation, entrepreneurship and start-up culture — a 4.0-star, South West Zone best-performing council.",
  path: "/institute/cells/iic",
});

const focusAreas = [
  "Creating vibrant local innovation ecosystems on campus",
  "Establishing start-up–supporting mechanisms within the institution",
  "Preparing the institution for the Atal Ranking of Institutions on Innovation Achievements (ARIIA)",
  "Developing the cognitive abilities of technology students",
  "Establishing a functional ecosystem for scouting and pre-incubating ideas",
];

const functions = [
  "Conduct innovation and entrepreneurship activities as per Central MIC guidelines",
  "Identify and reward innovations and share success stories",
  "Organise workshops, seminars and interactions with entrepreneurs and mentors",
  "Network with peers and national entrepreneurship organisations",
  "Maintain an institutional innovation portal highlighting faculty and student projects",
  "Organise hackathons, idea competitions and mini-challenges with industry involvement",
];

const achievements = [
  {
    image: asset(
      "cells/iic/achievements/1-iic-bec-bagalkot-is-recognized-as-one-of-the-three-best-performing-institution-innovation-council-from-south-west-zone-swro.webp",
    ),
    title: "Best Performing IIC — South West Zone",
    description:
      "IIC-BEC, Bagalkote is recognised as one of the three Best Performing Institution Innovation Councils from the South West Zone (SWRO).",
  },
  {
    image: asset(
      "cells/iic/achievements/iic-certificate-2023-24.webp",
    ),
    title: "4.0★ Rating (IIC 2023-24)",
    description:
      "Secured a 4.0 star rating on the 5-star scale for activities undertaken during the IIC calendar year 2023-24.",
  },
  {
    image: asset(
      "cells/iic/achievements/3-team-we-asclepius-won-smart-india-hackathon-2020-in-software-edition.webp",
    ),
    title: "Smart India Hackathon 2020 — Winner",
    description:
      "Team We_ASCLEPIUS won the Smart India Hackathon 2020 (Software Edition).",
  },
];

const council = [
  {
    name: "Dr. B. R. Hiremath",
    photo: asset("governance/principal/dr-b-r-hiremath.webp"),
    description: "Head of Institute",
    badges: [{ label: "IIC President", tone: "primary" as const }],
  },
  {
    name: "Dr. Santhosh M. Malkapur",
    photo: asset("cells/iic/santhosh-malkapur.webp"),
    description: "Professor, Dept. of Civil Engg.",
    badges: [
      { label: "Convener & Startup Coordinator (IIC 8.0)", tone: "primary" as const },
    ],
  },
  {
    name: "Dr. Krishnamurthy Bhat",
    photo: asset("departments/ecs/faculty/krishnamurthy-bhat.webp"),
    description: "Professor & Head, Electronics & Instrumentation Engg.",
    badges: [{ label: "Innovation Activities", tone: "outline" as const }],
  },
  {
    name: "Dr. Bharati S. Meti",
    photo: asset("cells/iic/bharati-meti.webp"),
    description: "Professor & Head, Biotechnology",
    badges: [
      { label: "Vice President", tone: "primary" as const },
      { label: "IPR Activities", tone: "outline" as const },
    ],
  },
  {
    name: "Dr. Mamata Sataraddi",
    photo: asset("departments/ece/faculty/mamata-j-sataraddi.webp"),
    description: "Assistant Professor, Electronics & Communication Engg.",
    badges: [{ label: "Social Media Coordinator", tone: "outline" as const }],
  },
  {
    name: "Dr. Santosh Kumbalavathi",
    photo: asset("cells/iic/santhosh-kumbalavathi.webp"),
    description: "Assistant Professor, Electronics & Instrumentation Engg.",
    badges: [{ label: "Internship Coordinator", tone: "outline" as const }],
  },
  {
    name: "Dr. Vijayalakshmi S. Jigajinni",
    photo: asset("cells/iic/vijayalakshmi-jigajinni.webp"),
    description: "Assistant Professor, Electronics & Communication Engg.",
    badges: [{ label: "Innovation Coordinator", tone: "outline" as const }],
  },
  {
    name: "Shri. R. S. Hiremath",
    photo: asset("cells/iic/rs-hiremath.webp"),
    description: "Managing Director, Flexitron, Bangalore",
    badges: [{ label: "Patent Expert", tone: "muted" as const }],
  },
  {
    name: "Mrs. Ankita Puranik",
    photo: asset("cells/iic/ankita-puranik.webp"),
    description: "ICAR-NIVEDI AgriBusiness Incubator, Bangalore",
    badges: [{ label: "External Expert (Incubation)", tone: "muted" as const }],
  },
  {
    name: "Mr. Ravi Neelegar",
    photo: asset("cells/iic/ravi-neelagar.webp"),
    description: "External Expert & Alumni Entrepreneur",
    badges: [{ label: "Alumni Entrepreneur", tone: "muted" as const }],
  },
];

const galleryImages = assetsUnder("cells/iic/gallery/").map((src, index) => ({
  src,
  alt: `IIC activity at Basaveshwar Engineering College ${index + 1}`,
}));

export default function IicPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Innovation"
        title="Institution's Innovation Council (IIC)"
        description="Established under the Ministry of Education's Innovation Cell (MIC), the IIC at Basaveshwar Engineering College systematically fosters an innovation and start-up culture across the campus."
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18 space-y-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
          <div className="space-y-4">
            <SectionHeading eyebrow="About" title="A campus-wide innovation ecosystem" />
            <p className="text-base leading-relaxed text-gray-700 text-justify">
              The Ministry of Education (MoE), Government of India established the
              MoE&rsquo;s Innovation Cell (MIC) to systematically foster a culture
              of innovation across higher education. The IIC initiative encourages
              institutions to set up councils that promote innovation through
              multiple mechanisms, building a vibrant, campus-based innovation
              ecosystem that scouts, mentors and pre-incubates new ideas.
            </p>
          </div>
          <div className="relative h-28 w-44 shrink-0 self-center lg:self-start">
            <Image
              src={asset("cells/iic/iic-logo.webp")}
              alt="Institution's Innovation Council logo"
              fill
              sizes="176px"
              className="object-contain"
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-md border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Major focus areas</h3>
            <ul className="mt-4 space-y-3">
              {focusAreas.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-gray-700">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Functions of the IIC</h3>
            <ul className="mt-4 space-y-3">
              {functions.map((item) => (
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
            eyebrow="Recognition"
            title="Achievements"
            description="National recognition for the council's work in innovation and entrepreneurship."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((a) => (
              <div
                key={a.title}
                className="flex h-full flex-col overflow-hidden rounded-sm border border-stone-200 bg-white shadow-sm"
              >
                <div className="relative aspect-4/3 w-full bg-stone-100">
                  <Image
                    src={a.image}
                    alt={a.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <h3 className="text-base font-semibold text-gray-900">{a.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600 text-justify">{a.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <SectionHeading
            eyebrow="The Council"
            title="IIC Members"
            description="The Institution's Innovation Council brings together faculty coordinators, industry experts, alumni entrepreneurs and incubation partners."
          />
          <PersonGrid>
            {council.map((m) => (
              <PersonCard
                key={m.name}
                name={m.name}
                photo={m.photo}
                description={m.description}
                badges={m.badges}
              />
            ))}
          </PersonGrid>
        </div>

        <div id="iep" className="space-y-8 scroll-mt-24">
          <SectionHeading
            eyebrow="Policy"
            title="Innovation & Entrepreneurship Policy (BEC-IEP)"
            description="BEC-IEP now has a standalone page with the policy text, resource links and contact information from the legacy page."
          />
          <Link
            href="/institute/cells/iep"
            className="group inline-flex items-center gap-2 rounded-md border border-stone-200 bg-white px-4 py-3 text-sm font-semibold text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
          >
            Open BEC-IEP page
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="space-y-8">
          <SectionHeading eyebrow="Records" title="Policy & Activity Reports" />
          <DocumentDirectory
            groups={documentGroups("iic", "documents")}
          />
        </div>

        {galleryImages.length > 0 && (
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Gallery"
              title="Activities & Events"
              description="Workshops, hackathons and sessions hosted by the council."
            />
            <PhotoGallery images={galleryImages} />
          </div>
        )}
      </section>
    </main>
  );
}
