import { GovernanceEditor } from "@/components/admin/governance-editor";
import { LoadFailed } from "@/components/admin/load-failed";
import type { GovernanceContent } from "@/content/schema/governance";
import { loadFailure } from "@/lib/admin/github";
import { readContentFile } from "@/lib/admin/publish";

export const metadata = { title: "Governance" };

export const dynamic = "force-dynamic";

export default async function AdminGovernancePage() {
  let content: GovernanceContent;
  try {
    const file = await readContentFile("governance.json");
    if (!file) throw new Error("governance.json is not a registered content file.");
    content = file.data as GovernanceContent;
  } catch (error) {
    console.error("[admin] could not load governance.json", error);
    return <LoadFailed what="governance" reason={loadFailure(error)} />;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-semibold tracking-tight">Governance</h1>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
        Everyone shown on the Leadership, Heads of Department, B.V.V. Sangha and Board of Governors
        pages. Changing someone here changes them everywhere those pages appear.
      </p>

      <div className="mt-8">
        <GovernanceEditor content={content} />
      </div>
    </div>
  );
}
