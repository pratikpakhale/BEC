import { documentGroups } from "@/content/documents";
import { pageMetadata } from "@/lib/seo";
import { GovernanceContent } from "./governance-content";

export const metadata = pageMetadata({
  title: "Governance & Board of Governors",
  description:
    "Governance at BEC Bagalkote: oversight by the Board of Governors, leadership by the Principal, Deans and officers, B.V.V. Sangha, organization chart, HOD directory and statutory documents.",
  path: "/administration/governance",
});

export default function GovernancePage() {
  return (
    <GovernanceContent
      academicCouncilDocuments={documentGroups("governance", "academic-council")}
    />
  );
}
