import Link from "@/components/link";
import Image from "next/image";

import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { PhotoGallery } from "@/components/common/photo-gallery";
import { Button } from "@/components/ui/button";
import { asset } from "@/lib/assets";
import {
  Users,
  Trophy,
  Building2,
  Wifi,
  Radio,
  Heart,
  Cpu,
  Leaf,
  ArrowRight,
} from "lucide-react";

export const metadata = pageMetadata({
  title: "Life at BEC",
  description:
    "Explore student life at BEC Bagalkote — a 93-acre green campus with hostels, BEC Dhwani 90.4 FM, sports, and student clubs like BEC Creative Spectrum, NSS and IEEE.",
  path: "/student-life/overview",
});

const highlights = [
  { title: "93+ Acres", subtitle: "Green Campus", icon: Leaf },
  { title: "4 Blocks", subtitle: "Hostel Accommodation", icon: Building2 },
  { title: "BEC Dhwani", subtitle: "90.4 FM Community Radio", icon: Radio },
  { title: "WiFi", subtitle: "Enabled Campus", icon: Wifi },
];

const clubs = [
  {
    name: "BEC Creative Spectrum",
    description:
      "A unified student club initiative bringing together ten distinct clubs under Cultural, Technical, and Holistic wings.",
    icon: Users,
    href: "/student-life/bec-creative-spectrum",
  },
  {
    name: "Sports & Gymkhana",
    description:
      "The student sports body — a 5-acre playground and indoor stadium under a full-time Physical Director.",
    icon: Trophy,
    href: "/student-life/gymkhana",
  },
  {
    name: "NSS",
    description:
      "Community service wing engaging in social welfare, blood donation camps and rural development.",
    icon: Heart,
    href: "/student-life/nss",
  },
  {
    name: "IEEE Student Branch",
    description:
      "Professional body chapter organising technical workshops, seminars and networking events.",
    icon: Cpu,
    href: "/student-life/ieee",
  },
];

const galleryImages = [
  {
    src: asset("student-life/cultural/cine0189.webp"),
    alt: "Student performing a classical dance at a BEC cultural event",
  },
  {
    src: asset("student-life/cultural/cine0228.webp"),
    alt: "Student music band rehearsing in the BEC cultural hall",
  },
  {
    src: asset("student-life/cultural/cine0160.webp"),
    alt: "Cultural club dance practice at Basaveshwar Engineering College",
  },
  {
    src: asset("student-life/clubs/cine1910.webp"),
    alt: "Student club members gathered for a group photograph at BEC",
  },
  {
    src: asset("student-life/clubs/ieee-student-branch-35261.webp"),
    alt: "Members of the IEEE Student Branch at Basaveshwar Engineering College",
  },
  {
    src: asset("student-life/youth-red-cross/cine0856.webp"),
    alt: "Youth Red Cross volunteers at a BEC community service activity",
  },
  {
    src: asset("student-life/youth-red-cross/cine0860.webp"),
    alt: "Youth Red Cross unit members at Basaveshwar Engineering College",
  },
  {
    src: asset("student-life/engineers-arena/cine1060.webp"),
    alt: "Students at an Engineers' Arena activity in the campus hall",
  },
  {
    src: asset("student-life/engineers-arena/cine1074.webp"),
    alt: "Engineers' Arena event hosted by student volunteers at BEC",
  },
];

export default function StudentLifeOverviewPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Culture · Clubs · Community"
        title="Life at BEC"
        description="A vibrant ecosystem of learning, culture and community in the heart of Bagalkote — where students thrive in every aspect of life, not just the classroom."
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18 space-y-16">
        <div className="relative aspect-16/9 w-full overflow-hidden rounded-md border border-stone-200 bg-stone-100 shadow-sm md:aspect-21/9">
          <Image
            src={asset("student-life/cultural/cine0157.webp")}
            alt="BEC students performing a synchronised group dance during a cultural event"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-stone-900/70 via-stone-900/10 to-transparent" />
          <div className="absolute bottom-0 left-0 p-5 md:p-8 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">
              Where talent finds its stage
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5">
            <SectionHeading
              eyebrow="More than academics"
              title="A home away from home"
            />
            <p className="text-base leading-relaxed text-gray-700 text-justify">
              Basaveshwar Engineering College provides a holistic environment
              where students thrive not just in classrooms but in every aspect of
              life — from a sprawling green campus to recreational facilities,
              hostels and a community radio station.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/hostel">
                <Button>Explore Hostels</Button>
              </Link>
              <Link href="/student-life/activities">
                <Button variant="outline">Student Activities</Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-md border border-stone-200 bg-white p-6 text-center shadow-sm"
                >
                  <span className="mx-auto mb-3 inline-flex h-11 w-11 items-center justify-center rounded-md bg-orange-50 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="text-xl font-semibold text-gray-900">{item.title}</div>
                  <div className="text-sm text-gray-500">{item.subtitle}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-8">
          <SectionHeading
            eyebrow="Vibrant Community"
            title="Student clubs & bodies"
            description="Discover your passions and build lifelong friendships through diverse student organisations."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {clubs.map((club) => {
              const Icon = club.icon;
              return (
                <Link
                  key={club.name}
                  href={club.href}
                  className="group flex h-full flex-col rounded-md border border-stone-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                >
                  <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-md bg-orange-50 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-base font-semibold text-gray-900 group-hover:text-primary">
                    {club.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                    {club.description}
                  </p>
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-primary">
                    Learn More
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="space-y-8">
          <SectionHeading
            eyebrow="Campus Moments"
            title="Glimpses of campus life"
            description="Cultural performances, club gatherings, the Youth Red Cross and the Engineers' Arena — a few moments from everyday life at BEC."
          />
          <PhotoGallery images={galleryImages} />
        </div>

        <div className="rounded-md border border-stone-200 bg-stone-900 p-6 text-white shadow-sm md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold md:text-3xl">Campus Amenities</h2>
              <p className="max-w-xl text-sm leading-relaxed text-stone-300 text-justify">
                A comfortable, convenient living experience with support
                facilities right on campus — a clinic, banks, a co-operative
                store, a post office, a canteen and more.
              </p>
            </div>
            <Link
              href="/institute/campus/amenities"
              className="group inline-flex shrink-0 items-center gap-2 rounded-md bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-400"
            >
              Explore Campus Amenities
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
