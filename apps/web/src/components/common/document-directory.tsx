import { FileText, Download, ExternalLink } from "lucide-react";

import { cn } from "@/lib/utils";

export type DocumentItem = {
  title: string;
  url: string;
  meta?: string;
  /** Shows a "New" badge beside the title. */
  isNew?: boolean;
};

export type DocumentGroup = {
  label?: string;
  description?: string;
  documents: DocumentItem[];
};

export function DocumentDirectory({
  groups,
  className,
}: {
  groups: DocumentGroup[];
  className?: string;
}) {
  const populated = groups.filter((group) => group.documents.length > 0);
  if (!populated.length) return null;

  return (
    <div className={cn("space-y-10", className)}>
      {populated.map((group, gIndex) => (
        <div key={group.label ?? gIndex} className="space-y-4">
          {group.label ? (
            <div className="space-y-1">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                {group.label}
              </h3>
              {group.description ? (
                <p className="text-sm leading-relaxed text-gray-600 text-justify">
                  {group.description}
                </p>
              ) : null}
            </div>
          ) : null}

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {group.documents.map((doc, i) => (
              <a
                key={`${doc.url}-${i}`}
                href={doc.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 rounded-md border border-stone-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-orange-50 text-primary">
                  <FileText className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-gray-900 group-hover:text-primary">
                    {doc.title}
                    {doc.isNew ? (
                      <span className="ml-2 inline-flex items-center rounded bg-red-100 px-2 py-0.5 align-middle text-xs font-medium text-red-800 motion-safe:animate-pulse">
                        New
                      </span>
                    ) : null}
                  </span>
                  {doc.meta ? (
                    <span className="mt-0.5 block text-xs text-gray-500">
                      {doc.meta}
                    </span>
                  ) : null}
                </span>
                {/\.(pdf|csv|docx?|xlsx?|rar|zip)$/i.test(doc.url.split("?")[0].split("#")[0]) ? (
                  <Download className="h-4 w-4 shrink-0 text-stone-400 group-hover:text-primary" />
                ) : doc.url.startsWith("http://") || doc.url.startsWith("https://") ? (
                  <ExternalLink className="h-4 w-4 shrink-0 text-stone-400 group-hover:text-primary" />
                ) : (
                  <Download className="h-4 w-4 shrink-0 text-stone-400 group-hover:text-primary" />
                )}
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
