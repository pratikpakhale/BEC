import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { LoadFailed } from "@/components/admin/load-failed";
import type { DepartmentContent } from "@/content/schema/departments";
import { missingEssentials } from "@/lib/admin/department-doc";
import { orderedKeys } from "@/lib/admin/departments";
import { listDepartments } from "@/content/departments";
import { loadFailure } from "@/lib/admin/github";
import { readContentFile } from "@/lib/admin/publish";

export const metadata = { title: "Departments" };

export const dynamic = "force-dynamic";

export default async function AdminDepartmentsPage() {
  let departments: Record<string, DepartmentContent>;
  try {
    const file = await readContentFile("departments.json");
    if (!file) throw new Error("departments.json is not a registered content file.");
    departments = (file.data as { departments: Record<string, DepartmentContent> }).departments;
  } catch (error) {
    console.error("[admin] could not load departments.json", error);
    return <LoadFailed what="departments" reason={loadFailure(error)} />;
  }

  // The catalogue's order first, so the list reads the way the site's menu
  // does; anything the file has that the catalogue does not still appears.
  const keys = orderedKeys(Object.keys(departments), listDepartments());

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-2xl font-semibold tracking-tight">Departments</h1>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
        Everything on a department&rsquo;s own pages — the overview, the labs, the research, the
        activities. Faculty profiles and placement figures are edited on their own screens. Pick a
        department to begin; only the one you open is saved when you publish.
      </p>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {keys.map((key) => {
          const department = departments[key];
          if (!department) return null;
          const missing = missingEssentials(department);

          return (
            <li key={key}>
              <Link
                href={`/admin/departments/${key}`}
                className="bg-background hover:border-primary/40 hover:bg-accent/40 flex h-full items-start gap-3 rounded-lg border p-4 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{department.name}</p>
                  <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                    {missing.length === 0
                      ? (department.tagline ?? key)
                      : `Nothing written yet for ${listSentence(missing)}.`}
                  </p>
                </div>
                <ChevronRight className="text-muted-foreground mt-0.5 size-4 shrink-0" />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** "Vision, Mission and Contact" — a list a person would read aloud. */
function listSentence(items: readonly string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}
