import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { LoadFailed } from "@/components/admin/load-failed";
import type { DocumentsContent } from "@/content/schema/documents";
import { countDocuments } from "@/lib/admin/documents-doc";
import { loadFailure } from "@/lib/admin/github";
import { readContentFile } from "@/lib/admin/publish";

export const metadata = { title: "Page documents" };

export const dynamic = "force-dynamic";

/** The site's own top-level sections, in menu order, named as the menu names them. */
const SECTIONS: { prefix: string; label: string }[] = [
  { prefix: "/institute", label: "Institute" },
  { prefix: "/academics", label: "Academics" },
  { prefix: "/accreditation", label: "Accreditation" },
  { prefix: "/research", label: "Research" },
  { prefix: "/student-life", label: "Student life" },
  { prefix: "/administration", label: "Administration" },
];

export default async function AdminDocumentsPage() {
  let pages: DocumentsContent["pages"];
  try {
    const file = await readContentFile("documents.json");
    if (!file) throw new Error("documents.json is not a registered content file.");
    pages = (file.data as DocumentsContent).pages;
  } catch (error) {
    console.error("[admin] could not load documents.json", error);
    return <LoadFailed what="page documents" reason={loadFailure(error)} />;
  }

  const entries = Object.entries(pages);
  const sectionOf = (path: string) =>
    SECTIONS.find(({ prefix }) => path === prefix || path.startsWith(`${prefix}/`))?.label ?? "Other";
  const sections = [...SECTIONS.map(({ label }) => label), "Other"]
    .map((label) => ({ label, pages: entries.filter(([, page]) => sectionOf(page.path) === label) }))
    .filter((section) => section.pages.length > 0);

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-2xl font-semibold tracking-tight">Page documents</h1>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
        The downloadable PDFs listed on the site&rsquo;s own pages — accreditation, calendars,
        cells and reports. Department documents are edited on the Departments screen. Pick a page to
        begin; only the one you open is saved when you publish.
      </p>

      {sections.map((section) => (
        <section key={section.label} className="mt-8">
          <h2 className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
            {section.label}
          </h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {section.pages.map(([id, page]) => {
              const count = countDocuments(page);
              return (
                <li key={id}>
                  <Link
                    href={`/admin/documents/${id}`}
                    className="bg-background hover:border-primary/40 hover:bg-accent/40 flex h-full items-start gap-3 rounded-lg border p-4 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{page.title}</p>
                      <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                        {count === 1 ? "1 document" : `${count} documents`} · {page.path}
                      </p>
                    </div>
                    <ChevronRight className="text-muted-foreground mt-0.5 size-4 shrink-0" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
