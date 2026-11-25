import Link from "@/components/link";
import { Construction, ArrowUpRight } from "lucide-react";
import { PlacementsHeader } from "@/components/placements/placements-header";
import { BreadcrumbsJsonLd } from "@/components/seo/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "2027 Eligible Students",
  description:
    "Department-wise list of students graduating in 2027 and available for recruitment at Basaveshwar Engineering College, Bagalkote — being compiled.",
  path: "/placements/eligible-2027",
});

export default function Eligible2027Page() {
  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Placements", path: "/placements" },
          { name: "2027 Eligible Students", path: "/placements/eligible-2027" },
        ]}
      />
      <PlacementsHeader
        title="2027 Eligible Students"
        description="Students graduating in 2027 and available for campus recruitment, by department."
      />

      <div className="flex flex-col items-center rounded-2xl border border-dashed border-gray-300 bg-white/60 px-6 py-16 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Construction className="h-7 w-7" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Coming soon</h2>
        <p className="mt-2 max-w-md text-sm text-gray-500">
          The department-wise list of students graduating in 2027 is being compiled and will be
          published here shortly.
        </p>
        <Link
          href="/placements/contact"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          Register your interest to be notified
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
