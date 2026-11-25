import Link from "next/link";
import { BRANCH, isProductionBranch } from "@/lib/admin/github";
import { ADMIN_SECTIONS } from "@/lib/admin/sections";
import { requireSession } from "@/lib/admin/session";
import { cn } from "@/lib/utils";

/**
 * The four things an Editor has to know that no hint next to a field can tell
 * them, because none of them is about a field. This block is deliberately the
 * whole of the training material: a one-page guide handed out once is read once,
 * goes stale the first time a screen changes, and is not in the room at the
 * moment somebody is about to replace a paragraph they cannot get back.
 */
const HOW_IT_WORKS = [
  // Replaced wholesale in practice mode: the sentence that matters most is the
  // one that would be a lie there, and the rest still hold.
  "Publishing puts your change on the live site — becbgk.edu, not a draft. It appears about two minutes later, and it is recorded under your name.",
  "There is no undo here. Once a change is published, restoring what was there before is a job for the site administrator, so read what you are about to replace.",
  "Photos and PDFs you upload are kept for good. Replacing one means uploading the new file and pointing at it — the old file stays where it is, in case another page still uses it.",
  "If a change has not appeared after a few minutes, or something looks wrong, tell the site administrator. Publishing the same thing again does not help.",
];

export default async function AdminDashboardPage() {
  const session = await requireSession();
  const firstName = session.name.split(" ")[0];
  // Optional: a deployment that has not been told who to ask simply does not
  // say. Better silence than a name that has moved on.
  const contact = process.env.ADMIN_CONTACT?.trim();
  const howItWorks = isProductionBranch
    ? HOW_IT_WORKS
    : [
        `This is a practice copy. Publishing writes to the ${BRANCH} branch, where you can safely get it wrong — the live site is not touched, and nothing you do here is seen by anyone outside.`,
        ...HOW_IT_WORKS.slice(1),
      ];

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-2xl font-semibold tracking-tight">
        Welcome, {firstName}
      </h1>

      <div className="bg-muted/40 mt-6 rounded-lg border p-4">
        <h2 className="text-sm font-medium">How this works</h2>
        <ul className="text-muted-foreground mt-2 space-y-2 text-sm leading-relaxed">
          {howItWorks.map((line) => (
            <li key={line} className="flex gap-2">
              <span aria-hidden className="select-none">
                •
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
        {contact ? (
          <p className="text-muted-foreground mt-3 text-sm">
            Site administrator:{" "}
            <a
              href={`mailto:${contact}`}
              className="underline underline-offset-2"
            >
              {contact}
            </a>
          </p>
        ) : null}
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {ADMIN_SECTIONS.map(({ href, label, description, icon: Icon, status }) => {
          const planned = status === "planned";
          const className = cn(
            "bg-background flex gap-4 rounded-lg border p-4 transition-colors",
            planned
              ? "text-muted-foreground/70"
              : "hover:border-primary/40 hover:bg-accent/40",
          );
          const body = (
            <>
              <Icon className="mt-0.5 size-5 shrink-0" />
              <div className="min-w-0">
                <p className="flex items-center gap-2 text-sm font-medium">
                  {label}
                  {planned && (
                    <span className="text-muted-foreground bg-muted rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide">
                      Soon
                    </span>
                  )}
                </p>
                <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                  {description}
                </p>
              </div>
            </>
          );

          return planned ? (
            <div key={href} className={className}>
              {body}
            </div>
          ) : (
            <Link key={href} href={href} className={className}>
              {body}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
