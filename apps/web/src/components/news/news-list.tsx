import Image from "next/image";
import Link from "@/components/link";
import { Pin, ExternalLink, FileText } from "lucide-react";

import type { NewsListItem } from "@/content/news";
import { cn } from "@/lib/utils";

function ItemRow({ item }: { item: NewsListItem }) {
  const title = (
    <span className="text-[15px] md:text-base font-semibold leading-snug text-gray-800">
      {item.title}
      {item.attachment ? (
        <FileText className="ml-1.5 inline h-3.5 w-3.5 -translate-y-px text-primary" />
      ) : item.external ? (
        <ExternalLink className="ml-1.5 inline h-3.5 w-3.5 -translate-y-px text-primary" />
      ) : null}
    </span>
  );

  return (
    <li
      className={cn(
        "border-b border-gray-100 py-5 last:border-b-0",
        item.pinned && "bg-orange-50/40 -mx-4 px-4 md:-mx-6 md:px-6",
      )}
    >
      <div className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        {item.date}
      </div>
      <div className="flex items-start gap-2.5">
        {item.pinned ? (
          <Pin className="mt-1 h-4 w-4 shrink-0 rotate-[45deg] fill-green-600 text-green-600" />
        ) : null}
        {item.href ? (
          <Link
            href={item.href}
            {...(item.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="transition-colors hover:text-primary"
          >
            {title}
          </Link>
        ) : (
          title
        )}
      </div>
      {item.images?.length ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {item.images.map((image) => (
            <a
              key={image.src}
              href={image.src}
              target="_blank"
              rel="noopener noreferrer"
              className="overflow-hidden rounded-md border border-stone-200 bg-stone-50"
            >
              {/* Scans arrive at whatever size the college sent; the intrinsic
                  size is unknown here, so these are declared at a portrait-ish
                  ratio and left to scale to the column. */}
              <Image
                src={image.src}
                alt={image.alt}
                width={1600}
                height={1236}
                className="h-auto w-full transition-transform hover:scale-[1.02]"
              />
            </a>
          ))}
        </div>
      ) : null}
    </li>
  );
}

export function NewsList({ items }: { items: NewsListItem[] }) {
  const pinned = items.filter((item) => item.pinned);
  const rest = items.filter((item) => !item.pinned);
  const ordered = [...pinned, ...rest];

  if (ordered.length === 0) {
    return (
      <p className="py-16 text-center text-sm font-medium text-muted-foreground">
        Nothing to show at the moment. Please check back soon.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-transparent">
      {ordered.map((item, index) => (
        <ItemRow key={`${item.date}-${item.title}-${index}`} item={item} />
      ))}
    </ul>
  );
}
