import Image from "next/image";
import Link from "@/components/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type PersonBadgeTone = "primary" | "muted" | "outline";

export type PersonBadge = {
  label: string;
  tone?: PersonBadgeTone;
  /** Optional link that turns this specific badge into a CTA. */
  link?: { href: string; label: string };
};

export type PersonCardProps = {
  /** Resolved image URL (already through asset()); falls back to initials. */
  photo?: string;
  name: string;
  /** Supporting line under the name (department, affiliation, focus…). */
  description?: string;
  badges?: PersonBadge[];
  email?: string;
  /** Optional call-to-action link rendered under the details. */
  link?: { href: string; label: string };
  className?: string;
};

function initials(name: string): string {
  const words = name.replace(/[^a-zA-Z\s.]/g, "").trim().split(/\s+/);
  return words
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function badgeProps(tone: PersonBadgeTone) {
  if (tone === "primary") {
    return { className: "rounded-sm bg-primary text-white" } as const;
  }
  if (tone === "muted") {
    return { variant: "secondary" as const, className: "rounded-sm text-xs" };
  }
  return { variant: "outline" as const, className: "rounded-sm text-xs" };
}

/**
 * The single card used for every person on the site — leadership, deans, HODs,
 * Board of Governors, Sangha, faculty. Uniform image ratio, type, and badge
 * treatment so every directory grid looks identical. Reuse this for any new
 * people listing instead of writing bespoke cards.
 */
export function PersonCard({
  photo,
  name,
  description,
  badges = [],
  email,
  link,
  className,
}: PersonCardProps) {
  const linkBadgeIndex = link
    ? (() => {
        const primary = badges.findIndex((b) => b.tone === "primary");
        return primary === -1 ? 0 : primary;
      })()
    : -1;

  return (
    <Card
      className={cn(
        "overflow-hidden rounded-sm border-stone-200 p-0 shadow-sm",
        className,
      )}
    >
      <div className="relative aspect-4/3 w-full bg-stone-100">
        {photo ? (
          <Image
            src={photo}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-4xl font-semibold tracking-wide text-stone-300">
              {initials(name)}
            </span>
          </div>
        )}
      </div>
      <CardHeader className="gap-2 px-5 pt-4 pb-5">
        <CardTitle className="text-lg font-semibold leading-snug text-gray-900">
          {name}
        </CardTitle>
        {description ? (
          <p className="text-sm leading-relaxed text-gray-600">{description}</p>
        ) : null}
        {badges.length ? (
          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            {badges.map((badge, index) => {
              const badgeLink =
                badge.link ?? (index === linkBadgeIndex ? link : undefined);
              const isLinked = Boolean(badgeLink);
              const badgeEl = (
                <Badge
                  {...badgeProps(badge.tone ?? "muted")}
                  className={cn(
                    badgeProps(badge.tone ?? "muted").className,
                    isLinked &&
                      "gap-1 pr-2 ring-1 ring-inset ring-white/25 transition-colors group-hover/badge:bg-primary/85",
                  )}
                >
                  {badge.label}
                  {isLinked ? (
                    <ArrowUpRight className="h-3 w-3 opacity-90 transition-transform group-hover/badge:translate-x-0.5 group-hover/badge:-translate-y-0.5" />
                  ) : null}
                </Badge>
              );

              return badgeLink ? (
                <Link
                  key={`${badge.label}-${index}`}
                  href={badgeLink.href}
                  aria-label={badgeLink.label}
                  title={badgeLink.label}
                  className="group/badge inline-flex rounded-sm underline decoration-white/40 decoration-dotted underline-offset-4 hover:decoration-white/70"
                >
                  {badgeEl}
                </Link>
              ) : (
                <span key={`${badge.label}-${index}`} className="inline-flex">
                  {badgeEl}
                </span>
              );
            })}
          </div>
        ) : null}
        {email ? (
          <Link
            href={`mailto:${email}`}
            className="pt-1 text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            {email}
          </Link>
        ) : null}
      </CardHeader>
    </Card>
  );
}

/** Standard responsive grid for PersonCard listings. */
export function PersonGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {children}
    </div>
  );
}
