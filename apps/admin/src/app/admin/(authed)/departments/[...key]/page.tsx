import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { DepartmentsEditor } from "@/components/admin/departments-editor";
import { GuardedLink } from "@/components/admin/guarded-link";
import { LoadFailed } from "@/components/admin/load-failed";
import type { DepartmentContent } from "@/content/schema/departments";
import { loadFailure } from "@/lib/admin/github";
import { readContentFile } from "@/lib/admin/publish";

export const dynamic = "force-dynamic";

/**
 * One department, addressed by its content key.
 *
 * A catch-all rather than `[key]` because five of the keys have a slash in them
 * (`pg/structural-engg`), and because the key is the same string the file uses —
 * inventing a second spelling for the address would mean a table mapping one to
 * the other that nobody would remember to update.
 *
 * Only this department crosses to the browser. The whole file is 750 KB; a
 * department is a few tens of KB, and the publish path merges it back into the
 * file it came from rather than resending the rest.
 */
export default async function AdminDepartmentPage({
  params,
}: {
  params: Promise<{ key: string[] }>;
}) {
  const { key: segments } = await params;
  const contentKey = segments.map(decodeURIComponent).join("/");

  let departments: Record<string, DepartmentContent>;
  try {
    const file = await readContentFile("departments.json");
    if (!file) throw new Error("departments.json is not a registered content file.");
    departments = (file.data as { departments: Record<string, DepartmentContent> }).departments;
  } catch (error) {
    console.error("[admin] could not load departments.json", error);
    return <LoadFailed what="departments" reason={loadFailure(error)} />;
  }

  // `hasOwnProperty`, not `departments[key]`: a request for `constructor` would
  // otherwise hand the editor a function to publish.
  if (!Object.prototype.hasOwnProperty.call(departments, contentKey)) notFound();
  const content = departments[contentKey] as DepartmentContent;

  return (
    <div className="mx-auto max-w-4xl">
      <GuardedLink
        href="/admin/departments"
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm"
      >
        <ChevronLeft className="size-4" /> All departments
      </GuardedLink>

      <h1 className="mt-3 text-2xl font-semibold tracking-tight">{content.name}</h1>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
        Publishing saves this department only — every other department is left exactly as it is.
      </p>

      <div className="mt-8">
        <DepartmentsEditor contentKey={contentKey} content={content} />
      </div>
    </div>
  );
}
