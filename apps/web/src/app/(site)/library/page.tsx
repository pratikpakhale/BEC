// File: src/app/library/page.tsx
import {
  BookOpen,
  Users,
  Building2,
  Globe,
  Link as LinkIcon,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
} from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { PhotoGallery } from "@/components/common/photo-gallery";
import { asset } from "@/lib/assets";
import Image from "next/image";
import Link from "@/components/link";
import { BreadcrumbsJsonLd } from "@/components/seo/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Central Library",
  description:
    "BEC Bagalkote Central Library, serving since 1963: 1,45,874 volumes, 46,532 titles, 10,300+ e-journals and 34,446 e-books across modern facilities.",
  path: "/library",
});

const libraryStats = [
  { value: "1,45,874", label: "Volumes" },
  { value: "46,532", label: "Titles" },
  { value: "10,300+", label: "E-Journals" },
  { value: "34,446", label: "E-Books" },
];

const libraryServices = [
  {
    icon: BookOpen,
    title: "About Library",
    description:
      "Learn about our rich collection, history, and mission to support academic excellence.",
    href: "/library/about",
  },
  {
    icon: Users,
    title: "Staff Profile",
    description:
      "Meet our dedicated team of library professionals committed to serving you.",
    href: "/library/staff",
  },
  {
    icon: Users,
    title: "Supporting Staff",
    description:
      "Our support team ensuring smooth library operations and services.",
    href: "/library/supporting-staff",
  },
  {
    icon: Building2,
    title: "Infrastructure Facility",
    description:
      "Explore our modern facilities designed for optimal learning and research.",
    href: "/library/infrastructure",
  },
  {
    icon: Globe,
    title: "E-Resources (Paid)",
    description:
      "Access premium digital databases, journals, and research materials.",
    href: "/library/e-resources-paid",
  },
  {
    icon: Globe,
    title: "E-Resources (Free)",
    description:
      "Discover free online resources and open-access academic materials.",
    href: "/library/e-resources-free",
  },
  {
    icon: LinkIcon,
    title: "Useful Links",
    description:
      "Quick access to important library resources and external databases.",
    href: "/library/useful-links",
  },
  {
    icon: Phone,
    title: "Contact Information",
    description:
      "Get in touch with our library team for assistance and inquiries.",
    href: "/library/contact",
  },
];

const galleryImages = [
  { src: asset("facilities/library/cine1128.webp"), alt: "Central Library reading area" },
  { src: asset("facilities/library/cine1145.webp"), alt: "Book stacks in the Central Library" },
  { src: asset("facilities/library/cine1235.webp"), alt: "Reading hall with study tables" },
  { src: asset("facilities/library/cine1239.webp"), alt: "Students studying in the reading hall" },
  { src: asset("facilities/library/cine1207.webp"), alt: "Students reading at a library table" },
  { src: asset("facilities/library/cine1131.webp"), alt: "Digital library section with computer terminals" },
  { src: asset("facilities/library/cine1216.webp"), alt: "Student browsing newspapers at the periodicals stand" },
];

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <BreadcrumbsJsonLd items={[{ name: "Library", path: "/library" }]} />
      {/* Hero Section */}

      <section className="relative overflow-hidden border-b border-stone-200 bg-linear-to-br from-orange-50 via-white to-stone-50">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#f97316_0%,transparent_35%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,#0f172a_0%,transparent_28%)]" />
        </div>
        <div className="relative container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
                Campus · Library
              </p>
              <div className="mt-4 space-y-4 max-w-3xl">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-gray-900">
                  Central Library
                </h1>
                <p className="text-base md:text-lg leading-relaxed text-gray-700">
                  A gateway to knowledge and innovation, supporting academic
                  excellence since 1963
                </p>
              </div>
            </div>
            <div className="relative aspect-4/3 overflow-hidden rounded-lg border border-stone-200 shadow-sm">
              <Image
                src={asset("facilities/library/cine1141.webp")}
                alt="BEC Central Library interior"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-stone-200">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {libraryStats.map((stat, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Explore Library Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Access comprehensive resources and services designed to support
              your academic journey
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {libraryServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <FadeIn key={index} delay={index * 0.05}>
                  <Link href={service.href}>
                    <div className="group h-full bg-white rounded-lg border border-stone-200 hover:border-primary hover:shadow-md transition-all duration-300 overflow-hidden">
                      <div className="bg-stone-50 border-b border-stone-100 p-6 flex items-center justify-center">
                        <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-50 text-primary transition-transform duration-300 group-hover:scale-110">
                          <Icon className="h-7 w-7" />
                        </span>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                          {service.description}
                        </p>
                        <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                          Learn More
                          <ChevronRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              );
            })}
          </div>

          {/* Quick Access Section */}
          <FadeIn delay={0.4}>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Library Hours */}
              <div className="bg-white rounded-lg border border-stone-200 p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-primary mb-5">
                  <Clock className="h-6 w-6" />
                </span>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Library Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Monday - Friday</span>
                    <span className="font-semibold text-gray-900">8:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Saturday</span>
                    <span className="font-semibold text-gray-900">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Sunday</span>
                    <span className="font-semibold text-gray-900">Closed</span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-lg border border-stone-200 p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-primary mb-5">
                  <Phone className="h-6 w-6" />
                </span>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Us</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-2.5">
                    <Phone className="h-4 w-4 mt-0.5 shrink-0 text-gray-400" />
                    <span>+91 94485 14872</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Mail className="h-4 w-4 mt-0.5 shrink-0 text-gray-400" />
                    <span>becbgklibrary@gmail.com</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-gray-400" />
                    <span>Central Library Building, BEC Campus</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white rounded-lg border border-stone-200 p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-primary mb-5">
                  <LinkIcon className="h-6 w-6" />
                </span>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Access</h3>
                <div className="space-y-2.5 text-sm">
                  {[
                    { href: "/library/e-resources-paid", label: "E-Resources (Paid)" },
                    { href: "/library/e-resources-free", label: "E-Resources (Free)" },
                    { href: "/library/useful-links", label: "Useful Links" },
                    { href: "/library/infrastructure", label: "Infrastructure" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
                    >
                      <ChevronRight className="h-4 w-4 text-primary" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Librarian */}
          <FadeIn delay={0.45}>
            <div className="mt-12 bg-white rounded-lg border border-stone-200 overflow-hidden md:flex">
              <div className="relative md:w-2/5 aspect-4/3 md:aspect-auto">
                <Image
                  src={asset("facilities/library/dr-shreekant-g-karkun.webp")}
                  alt="Dr. Shreekant G. Karkun, Librarian"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                />
              </div>
              <div className="p-8 md:w-3/5 flex flex-col justify-center">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary mb-2">
                  From the Librarian
                </p>
                <h3 className="text-2xl font-bold text-gray-900">
                  Dr. Shreekant G. Karkun
                </h3>
                <p className="text-primary font-semibold mb-4">Librarian</p>
                <p className="text-gray-600 leading-relaxed text-justify">
                  The Central Library is committed to supporting the teaching,
                  learning, and research needs of our students, faculty, and
                  researchers through a rich collection of print and digital
                  resources, modern infrastructure, and dedicated professional
                  services.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Gallery */}
          <FadeIn delay={0.5}>
            <div className="mt-12">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-6">
                Inside the Library
              </h2>
              <PhotoGallery images={galleryImages} />
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
