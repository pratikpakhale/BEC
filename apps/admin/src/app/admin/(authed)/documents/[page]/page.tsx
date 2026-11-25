import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { DocumentsEditor } from "@/components/admin/documents-editor";
import { GuardedLink } from "@/components/admin/guarded-link";
import { LoadFailed } from "@/components/admin/load-failed";
import type { DocumentPage, DocumentsContent } from "@/content/schema/documents";
import { loadFailure } from "@/lib/admin/github";
import { readContentFile } from "@/lib/admin/publish";

export const dynamic = "force-dynamic";

/** One site page's document lists. Only this page crosses to the browser. */
export default async function AdminDocumentPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page: id } = await params;

  let pages: DocumentsContent["pages"];
  try {
    const file = await readContentFile("documents.json");
    if (!file) throw new Error("documents.json is not a registered content file.");
    pages = (file.data as DocumentsContent).pages;
  } catch (error) {
    console.error("[admin] could not load documents.json", error);
    return <LoadFailed what="page documents" reason={loadFailure(error)} />;
  }

  // `hasOwnProperty`, not `pages[id]`: `constructor` is not a page.
  if (!Object.prototype.hasOwnProperty.call(pages, id)) notFound();
  const content = pages[id] as DocumentPage;

  return (
    <div className="mx-auto max-w-4xl">
      <GuardedLink
        href="/admin/documents"
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm"
      >
        <ChevronLeft className="size-4" /> All pages
      </GuardedLink>

      <h1 className="mt-3 text-2xl font-semibold tracking-tight">{content.title}</h1>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
        The documents listed on{" "}
        <a href={content.path} target="_blank" rel="noreferrer" className="underline underline-offset-2">
          {content.path}
        </a>
        . Publishing saves this page only — every other page is left exactly as it is.
      </p>

      <div className="mt-8">
        <DocumentsEditor pageId={id} content={content} />
      </div>
    </div>
  );
}
