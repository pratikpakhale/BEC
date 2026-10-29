import { BreadcrumbsJsonLd } from "@/components/seo/jsonld";
import { documentGroups } from "@/content/documents";
import { pageMetadata } from "@/lib/seo";

import { ResearchContent } from "./research-content";

export const metadata = pageMetadata({
  title: "Research & Development",
  description:
    "Ten VTU-recognized research centres, Centres of Excellence in Robotics, IoT and Computer Vision, industry-partnered labs (Intel, Nokia, Bosch Rexroth), 23+ patents and funded research driving innovation at BEC Bagalkote.",
  path: "/research",
});

export default function ResearchPage() {
  return (
    <>
      <BreadcrumbsJsonLd items={[{ name: "Research", path: "/research" }]} />
      <ResearchContent
        documents={{
          scopus: documentGroups("research", "scopus"),
          policies: documentGroups("research", "policies"),
        }}
      />
    </>
  );
}
