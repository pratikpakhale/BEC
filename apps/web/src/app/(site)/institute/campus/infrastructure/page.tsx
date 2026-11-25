import Image from "next/image";
import Link from "@/components/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wifi, Monitor, BookOpen, Warehouse, Building, Stethoscope, Store, Podcast, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { asset } from "@/lib/assets";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Campus Infrastructure",
  description:
    "BEC Bagalkote's 93-acre campus — 1 Gbps connectivity, 1,500 computers, a 1.40-lakh-volume RFID library, a 1,651-seat auditorium, hostels for 1,500 students and specialised research labs.",
  path: "/institute/campus/infrastructure",
});

export default function InfrastructurePage() {
  const facilities = [
    {
      icon: <Building className="h-5 w-5" />,
      title: "Campus Area",
      description: "93.18 acres of green campus with 60,000 sq.m built-up area.",
    },
    {
      icon: <Wifi className="h-5 w-5" />,
      title: "Connectivity",
      description: "WiFi enabled campus with 1 Gbps Internet Leased Line 1:1 ILL connectivity.",
    },
    {
      icon: <Monitor className="h-5 w-5" />,
      title: "Computing & Labs",
      description: "1,500 computers and state-of-art laboratories established with TEQIP and other sponsored Research Projects.",
    },
    {
      icon: <Warehouse className="h-5 w-5" />,
      title: "Auditoriums & Halls",
      description: "1,651 capacity Auditorium, 420 capacity Gallery hall, 240 capacity Multi-media seminar hall, and 2 indoor covered quadrangles (1200 & 600 capacity).",
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      title: "Library & Information Centre",
      description: "RFID secured system, 1.40 lakh volumes, 46,000+ print titles, 34,000+ e-books, and 15,000+ journals",
    },
    {
      icon: <Building className="h-5 w-5" />,
      title: "Hostels & Quarters",
      description: "2 boys and 3 girls hostels accommodating 1500 students, plus 50 Staff quarters.",
    },
    {
      icon: <Stethoscope className="h-5 w-5" />,
      title: "Sports & Fitness",
      description: "5.00 acres of playground and an Indoor stadium.",
    },
    {
      icon: <Store className="h-5 w-5" />,
      title: "Amenities",
      description: "Campus clinic, Banks, Cooperative store, Canteen, and Power back up.",
    },
    {
      icon: <Podcast className="h-5 w-5" />,
      title: "Community Radio",
      description: "BEC Dhwani 90.4 FM Community Radio Station.",
    },
  ];

  const specializedLabs = [
    "Bosch Rexroth Centre for Industrial Automation",
    "SCADA Laboratory",
    "Renewable Energy Research Centre",
    "Biodiesel Centre",
    "Intel Intelligent Systems Laboratory",
    "Nokia Research Centre",
    "MEMS Design Centre",
    "Centre for Advanced Materials Research Studies",
    "Smart Composite Structures Research Centre",
    "Geotechnical Engineering and Structural Engineering Laboratory",
    "Robotics Lab"
  ];

  return (
    <main className="bg-background text-foreground">
      <section className="relative overflow-hidden border-b border-stone-200 bg-linear-to-br from-orange-50 via-white to-stone-50 py-14 md:py-18">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#f97316_0%,transparent_35%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,#0f172a_0%,transparent_28%)]" />
        </div>
        <div className="relative container mx-auto max-w-6xl px-4 lg:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
               Institute · Campus
            </p>
          <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
            World-class Infrastructure
          </h1>
          <p className="mt-4 text-lg text-gray-700 max-w-2xl leading-relaxed text-justify">
            A 93-acre green campus equipped with modern laboratories, digital classrooms, and comprehensive amenities to support holistic learning and research.
          </p>

          <div className="mt-10 overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 shadow-sm">
            <div className="relative aspect-16/9">
              <Image
                src={asset("institute/campus/campus-front.webp")}
                alt="The main building of Basaveshwar Engineering College on its 93-acre campus"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1152px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-18 container mx-auto max-w-6xl px-4 lg:px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {facilities.map((item, index) => (
            <Card key={index} className="rounded-sm border-stone-200 shadow-sm transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {item.icon}
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 leading-relaxed text-justify">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

       <section className="bg-stone-50 py-14 md:py-18 border-t border-stone-200">
        <div className="container mx-auto max-w-6xl px-4 lg:px-6">
            <div className="mb-8">
             <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                Specialized Laboratories
            </h2>
            <p className="mt-2 text-gray-600 text-justify">
                 Industry-collaborated and research-focused centers of excellence.
            </p>
            </div>
          
          <div className="flex flex-wrap gap-3">
            {specializedLabs.map((lab, index) => (
              <Badge key={index} variant="secondary" className="px-4 py-2 text-sm font-medium rounded-sm">
                {lab}
              </Badge>
            ))}
          </div>
        </div>
      </section>

       <section className="py-14 md:py-18 container mx-auto max-w-6xl px-4 lg:px-6">
        <div className="flex flex-col gap-6 rounded-sm border border-stone-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Campus Amenities
            </h2>
            <p className="mt-2 text-gray-600 text-justify">
              Everyday conveniences within the campus — a clinic, banks, a cooperative store, a post office, and more.
            </p>
          </div>
          <Link
            href="/institute/campus/amenities"
            className="inline-flex shrink-0 items-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
          >
            View Campus Amenities
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

       <section className="py-14 md:py-18 container mx-auto max-w-6xl px-4 lg:px-6">
        <div className="rounded-sm border border-stone-200 bg-white p-6 shadow-sm md:p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Digital Campus</h3>
            <p className="text-gray-700 leading-relaxed text-justify">
                We pride ourselves on being a digital campus with lecture capture facilities. All classrooms are equipped with audio-visual facilities, including 20 classrooms featuring 65” smart digital boards for an enhanced interactive learning experience. All departments are housed in separate buildings, each with its own air-conditioned seminar hall.
            </p>
        </div>
      </section>
    </main>
  );
}
