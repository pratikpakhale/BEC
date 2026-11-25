import { FacultyEditor } from "@/components/admin/faculty-editor";
import { LoadFailed } from "@/components/admin/load-failed";
import { listDepartments } from "@/content/departments";
import type { FacultyContent } from "@/content/schema/faculty";
import { loadFailure } from "@/lib/admin/github";
import { readContentFile } from "@/lib/admin/publish";

export const metadata = { title: "Faculty" };

export const dynamic = "force-dynamic";

export default async function AdminFacultyPage() {
  let content: FacultyContent;
  try {
    const file = await readContentFile("faculty.json");
    if (!file) throw new Error("faculty.json is not a registered content file.");
    content = file.data as FacultyContent;
  } catch (error) {
    console.error("[admin] could not load faculty.json", error);
    return <LoadFailed what="faculty" reason={loadFailure(error)} />;
  }

  // Names and asset slugs only — the catalogue itself is 900 KB and has no
  // business crossing to the browser for the sake of a dropdown.
  const options = listDepartments();

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-semibold tracking-tight">Faculty</h1>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
        Everyone listed on a department&rsquo;s Faculty page, with their photograph and profile
        PDF. Pick a department, then edit its list.
      </p>

      <div className="mt-8">
        <FacultyEditor content={content} options={options} />
      </div>
    </div>
  );
}
