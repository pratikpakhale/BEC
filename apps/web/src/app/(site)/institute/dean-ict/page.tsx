import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/link";

import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { PersonCard, PersonGrid } from "@/components/common/person-card";
import { PhotoGallery } from "@/components/common/photo-gallery";
import { BreadcrumbsJsonLd } from "@/components/seo/jsonld";
import { Card, CardContent } from "@/components/ui/card";
import { asset, assetsUnder } from "@/lib/assets";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Dean ICT",
  description:
    "Office of the Dean, Information and Communications Technology (ICT) at Basaveshwar Engineering College Bagalkote — message from Dr. Mahabaleshwar S. K., the ICT team and campus IT infrastructure highlights.",
  path: "/institute/dean-ict",
});

const deanEmail = "mahabaleshwar_sk@yahoo.co.in";

const messageParagraphs = [
  "It is a privilege to serve a community that is committed to education, innovation, and societal progress. The Department of Information and Communications Technology at Basaveshwar Engineering College strives not only to develop skilled engineers but also responsible citizens who contribute positively to society.",
  "To our students, I encourage you to embrace learning with curiosity, integrity, and determination. The opportunities available today in technology and communication are limitless, and your dedication can transform challenges into innovations that benefit humanity.",
  "To our community and stakeholders, thank you for your continued trust and support. Your partnership enables us to create meaningful learning experiences, promote research and entrepreneurship, and prepare graduates who are ready to address real-world challenges.",
  "Together, we are building a future driven by knowledge, technology, and service to society. I am confident that our students will continue to uphold the values of excellence, professionalism, and social responsibility wherever they go.",
  "I wish all our students success in their academic and professional endeavors and look forward to strengthening our connection with the community in the years ahead.",
];

const ictTeam = [
  {
    name: "Mr. Kupendrakumar H. B.",
    designation: "Foreman",
    photo: asset("administration/ict-team/kupendrakumar-h-b.webp"),
    tone: "outline" as const,
  },
  {
    name: "Mr. Prashant Kalhal",
    designation: "Network Administrator",
    photo: asset("administration/ict-team/prashant-kalhal.webp"),
    tone: "outline" as const,
  },
  {
    name: "Mr. Santosh Mani",
    designation: "Network Administrator",
    photo: asset("administration/ict-team/santosh-mani.webp"),
    tone: "outline" as const,
  },
  {
    name: "Mr. Kallappa Kumbar",
    designation: "Peon",
    photo: asset("administration/ict-team/kallappa-kumbar.webp"),
    tone: "outline" as const,
  },
];

const infrastructureHighlights = [
  "Protected campus network with advanced Firewall Security.",
  "1000 Mbps (1:1) Internet Leased Line connectivity ensuring high-speed and reliable internet access.",
  "More than 1200 computers connected across the campus network.",
  "Over 80 wireless access points providing seamless Wi-Fi connectivity throughout the campus.",
  "More than 1000 wireless devices connected to the campus network.",
  "Access to Microsoft DreamSpark (Microsoft Imagine) resources, including Microsoft operating systems and development tools for students.",
  "All classrooms equipped with Smart Boards and Multimedia Projectors to facilitate innovative teaching and interactive learning.",
  "Endpoint Antivirus Security deployed on desktops for enhanced cyber protection.",
  "Comprehensive CCTV surveillance system for campus security and monitoring.",
  "RFID-enabled Identity Cards for secure access and efficient campus management.",
  "More than 12 high-performance servers supporting academic, administrative, and research applications.",
  "Biometric Attendance System for faculty and staff attendance management.",
];

const infrastructureImages = assetsUnder("administration/dean-ict/").map(
  (src, index) => ({
    src,
    alt: `ICT infrastructure at Basaveshwar Engineering College ${index + 1}`,
  }),
);

export default function DeanIctPage() {
  return (
    <main className="bg-background text-foreground">
      <BreadcrumbsJsonLd items={[{ name: "Dean ICT", path: "/institute/dean-ict" }]} />

      <PageHero
        eyebrow="Information & Communications Technology"
        title="Dean ICT"
        description="The Office of the Dean, Information and Communications Technology (ICT) leads a technology-driven learning environment at Basaveshwar Engineering College, supporting academic, research and administrative activities across the campus."
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18 space-y-16">
        <div className="space-y-8">
          <SectionHeading eyebrow="Message" title="Dean (ICT)" />
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:items-start">
            <div className="space-y-6 lg:sticky lg:top-24">
              <div className="relative aspect-[2114/2400] w-full overflow-hidden rounded-sm border border-stone-200 bg-stone-100 shadow-sm">
                <Image
                  src={asset("governance/deans/dean-ict-dr-mahabaleshwar-s-k.webp")}
                  alt="Dr. Mahabaleshwar S. K., Dean ICT"
                  fill
                  sizes="(max-width: 1024px) 100vw, 36vw"
                  className="object-cover"
                  priority
                />
              </div>
              <Card className="rounded-sm border-stone-200 shadow-sm">
                <CardContent className="space-y-3 p-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Dr. Mahabaleshwar S. K.
                    </h2>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">
                      Dean, Information and Communications Technology (ICT)
                    </p>
                  </div>
                  {/* <Link
                    href={`mailto:${deanEmail}`}
                    className="inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    {deanEmail}
                  </Link> */}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <div className="space-y-5 text-base leading-relaxed text-gray-700">
                {messageParagraphs.map((paragraph, index) => (
                  <p key={index} className="text-justify">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="border-t border-stone-200 pt-6">
                <p className="text-sm text-gray-500">Warm regards,</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  Dr. Mahabaleshwar S. K.
                </p>
                <p className="text-sm text-gray-600">
                  Dean, Information and Communications Technology (ICT)
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  Contact:{" "}
                  <Link
                    href={`mailto:${deanEmail}`}
                    className="font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    {deanEmail}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <SectionHeading
            eyebrow="The Team"
            title="ICT Team"
            description="The team responsible for maintaining and administering the campus IT infrastructure."
          />
          <PersonGrid>
            {ictTeam.map((member) => (
              <PersonCard
                key={member.name}
                name={member.name}
                photo={member.photo}
                badges={[{ label: member.designation, tone: member.tone }]}
              />
            ))}
          </PersonGrid>
        </div>

        <div className="space-y-8">
          <SectionHeading
            eyebrow="Facilities"
            title="ICT Infrastructure Highlights"
            description="The institution is equipped with a robust and secure IT infrastructure to support academic, research, administrative, and learning activities across the campus."
          />
          <div className="rounded-md border border-stone-200 bg-white p-6 shadow-sm md:p-8">
            <ul className="grid gap-3 sm:grid-cols-2">
              {infrastructureHighlights.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-relaxed text-gray-700"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <p className="max-w-3xl text-base leading-relaxed text-gray-700 text-justify">
            This state-of-the-art IT ecosystem enables a technology-driven
            learning environment, ensuring seamless access to digital resources,
            secure communication, and enhanced academic excellence.
          </p>

          {infrastructureImages.length > 0 && (
            <PhotoGallery images={infrastructureImages} />
          )}
        </div>
      </section>
    </main>
  );
}
