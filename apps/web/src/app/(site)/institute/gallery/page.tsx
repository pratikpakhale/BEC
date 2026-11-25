import type { Metadata } from "next";
import Link from "@/components/link";
import { ChevronRight } from "lucide-react";

import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { PhotoGallery } from "@/components/common/photo-gallery";
import { assetsUnder } from "@/lib/assets";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Photo Gallery",
  description:
    "Photo gallery of BEC Bagalkote — explore campus events, festivals, everyday student life on the Vidyagiri campus, and industrial & educational field visits in pictures.",
  path: "/institute/gallery",
});

const albums = [
  {
    eyebrow: "Campus",
    title: "Campus in Pictures",
    description: "Moments from across the Vidyagiri campus — academics, events, festivals and everyday student life.",
    prefix: "gallery/life-at-bec/campus/",
    altBase: "Basaveshwar Engineering College campus",
    exclude: [
      "cine0091",
      "cine0894",
      "cine0899",
      "cine1063",
      "cine1149",
      "cine1229",
      "cine1250",
      "cine1456",
      "cine1515",
      "cine1524",
      "cine1540",
      "cine1555",
      "cine1708",
      "cine1731",
      "cine1734",
      "cine1735",
      "cine1830",
      "cine2007",
    ],
  },
];

const moreGalleries = [
  { label: "Gymkhana & Sports", href: "/student-life/gymkhana" },
  { label: "NSS", href: "/student-life/nss" },
  { label: "Cells & Centres", href: "/institute/cells" },
];

export default function GalleryPage() {
  const populated = albums
    .map((album) => ({
      ...album,
      images: assetsUnder(album.prefix)
        .filter((src) => !album.exclude?.some((key) => src.includes(key)))
        .map((src, index) => ({
          src,
          alt: `${album.altBase} ${index + 1}`,
        })),
    }))
    .filter((album) => album.images.length > 0);

  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Campus"
        title="Photo Gallery"
        description="Moments from across Basaveshwar Engineering College — campus events, student life and industrial & educational visits."
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18 space-y-16">
        {populated.map((album) => (
          <div key={album.prefix} className="space-y-8">
            <SectionHeading
              eyebrow={album.eyebrow}
              title={album.title}
              description={album.description}
            />
            <PhotoGallery images={album.images} />
          </div>
        ))}

        <div className="space-y-6">
          <SectionHeading eyebrow="Explore" title="More Galleries" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {moreGalleries.map((g) => (
              <Link
                key={g.href}
                href={g.href}
                className="group flex items-center justify-between rounded-md border border-stone-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
              >
                <span className="font-medium text-gray-900 transition-colors group-hover:text-primary">
                  {g.label}
                </span>
                <ChevronRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
