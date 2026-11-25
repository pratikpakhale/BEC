import { LoadFailed } from "@/components/admin/load-failed";
import { PlacementsEditor } from "@/components/admin/placements-editor";
import { listDepartments } from "@/content/departments";
import type { PlacementsContent } from "@/content/schema/placements";
import { loadFailure } from "@/lib/admin/github";
import { readContentFile } from "@/lib/admin/publish";

export const metadata = { title: "Placements" };

export const dynamic = "force-dynamic";

export default async function AdminPlacementsPage() {
  let content: PlacementsContent;
  try {
    const file = await readContentFile("placements.json");
    if (!file) throw new Error("placements.json is not a registered content file.");
    content = file.data as PlacementsContent;
  } catch (error) {
    console.error("[admin] could not load placements.json", error);
    return <LoadFailed what="placements" reason={loadFailure(error)} />;
  }

  const options = listDepartments();

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-semibold tracking-tight">Placements</h1>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
        The placement figures printed on each department&rsquo;s own pages. Long lists can be
        pasted straight in from a spreadsheet.
      </p>

      <div className="mt-8">
        <PlacementsEditor content={content} options={options} />
      </div>
    </div>
  );
}
