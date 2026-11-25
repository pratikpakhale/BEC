# Context — Why this project

## What the site is

The public website for **Basaveshwar Engineering College, Bagalkote (BEC)** — a 63-year-old (est. 1963) autonomous engineering college in north Karnataka, India. Live reference: <https://www.becbgk.edu/>.

> ⚠️ The root `README.md` mislabels the project "Bangkok Education Center" — that's wrong/legacy. It is **Basaveshwar Engineering College**. (Fix the README when convenient.)

## Tech at a glance

- **Next.js 16** (App Router) + **React 19**, TypeScript strict.
- **Turborepo + pnpm** monorepo. `apps/web` is the public site, built as a static export. `apps/admin` holds the Admin's routes and is deployed separately (see its README).
- **Tailwind CSS v4** + **shadcn/ui** (Radix primitives), Lucide icons, Motion for animation.
- **Content is hardcoded** in typed TS files under `apps/web/src/data/`. No CMS, no MDX, no DB.
- Assets currently in `apps/web/public/`; migrating to **Cloudflare R2** (see [asset-pipeline.md](asset-pipeline.md)).

## The sprint (deadline 2026-06-15)

Taking the site from "scaffolded with placeholders" to "content-complete". Four must-have workstreams:

1. **Content repopulation** — replace placeholder data with real content from a scraped dataset (delivered as a local zip/folder), keeping the typed-TS-data model. Department coordinators will later edit their own files via PRs.
2. **Asset pipeline → R2** — a script ingests scraped PDFs/images, uploads to Cloudflare R2, and emits a manifest; the site references assets through an `asset()` helper instead of external/bloated URLs.
3. **Placements finalize** — the page is already a single-page doc; wire the real brochure PDF + live embedded Google Form and real stats.
4. **Alumni + community gallery** — a new top-level **Alumni** section, and a photo gallery of community initiatives (Red Cross, NSS, NCC…) with profiles of the faculty members who lead them.

Deferred (NOT in this window): a code formatter (Prettier/Biome).

## Stakeholders / source of truth

- Content is supplied to the Website Development Team (WDT); per-department links get shared with **Department Coordinators** after launch for review/updates.
- High-res photos (leadership, deans, HoDs, faculty group/infra) come from Prof. Prashanth & Prof. Sangmesh, with captions. Department faculty are shown as a photo + their provided profile/CV PDF (converted to PDF if needed, linked from R2) — we no longer transcribe individual faculty detail.

## Sitemap decisions already made

- **Research** is removed from the top nav (routes kept under `app/research/`, just unlinked). Its menu slot is taken by **Alumni**.
- **Academics → "Programs"** (already renamed).
- Former Principals/Directors consolidated into a single **History & Milestones** (63-year legacy) → `/institute/history`.
- Statutory/governance items (BoG, Senate/Academic Council, RTI/public disclosures, grievances incl. internal complaints/POSH) stay, following the existing structure.

## Known gotchas

- Department faculty are minimal records in `content/faculty.json` (`{ name, designation, photo?, cv? }` — R2 asset keys), resolved to `FacultyMember` (`photoUrl`/`cvUrl`) in `src/content/faculty.ts`. See [faculty-extraction.md](faculty-extraction.md).
- Many routes are `[[...slug]]` catch-alls rendering "content coming soon" — they prevent 404s but aren't real pages. Replace with a real `page.tsx` only where content exists; leave the catch-all otherwise.
- `next.config.ts` uses `images.unoptimized: true` and only allow-lists a few remote hosts — add the R2 host before referencing R2 images.
