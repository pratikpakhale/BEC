# AGENTS.md — BEC Website

Routing guide for anyone (human or AI) working on this repo. **Find your change below, read the linked doc, then edit the named file.** Don't guess — the docs encode conventions that keep 100+ pages consistent.

> Full docs live in [`docs/`](docs/index.md). Start there if you're new: [`docs/context.md`](docs/context.md) (why) → [`docs/content-model.md`](docs/content-model.md) (where) → [`docs/conventions.md`](docs/conventions.md) (how).

## What is this

Marketing/info website for **Basaveshwar Engineering College, Bagalkote (BEC)** — `becbgk.edu`.
Next.js 16 (App Router) + React 19, Turborepo + pnpm monorepo. App lives in `apps/web`.
**All content is hardcoded in typed TypeScript files under `apps/web/src/data/`.** No CMS.

## Commands (run from repo root)

```bash
pnpm install        # install deps
pnpm dev            # dev server → http://localhost:3000
pnpm build          # production build (also type-checks data files)
pnpm lint           # eslint
```

## "I want to change X" → read this, edit that

| Change | Edit | Read first |
|--------|------|-----------|
| Top nav / menu items | `apps/web/src/data/navigation.ts` (+ `src/types/navigation.ts`) | [content-model](docs/content-model.md#navigation) |
| HoD / Dean / BoG / leadership person | `apps/web/src/data/governance/*` (renders with `PersonCard`) | [content-model](docs/content-model.md#people--governance) |
| PDF lists on NBA, NAAC, NIRF, IQAC, calendars, cells… | `apps/web/content/documents.json` (rendered via `documentGroups(page, block)`; editable in `/admin/documents`) | `src/content/schema/documents.ts` |
| Department faculty (photo + CV PDF) | `apps/web/content/faculty.json` (keyed by dept slug) | [faculty-extraction](docs/faculty-extraction.md) |
| A department page | `apps/web/src/data/department/department.ts` (section-based) | [conventions](docs/conventions.md#departments) |
| Home page sections | `apps/web/src/data/home/*` | [content-model](docs/content-model.md#home) |
| Placements page | `apps/web/src/data/placements/content.ts` | [content-model](docs/content-model.md#placements) |
| Alumni section | `apps/web/src/data/alumni/*`, page `app/alumni/page.tsx` | [content-model](docs/content-model.md#alumni--community-gallery) |
| Community gallery (NSS, Red Cross…) | `apps/web/src/data/community/*` | [content-model](docs/content-model.md#alumni--community-gallery) |
| **Any image or PDF** | Never hardcode a URL. Use the asset pipeline + `asset()` helper | [asset-pipeline](docs/asset-pipeline.md) |
| Adding a new route/page | `apps/web/src/app/<section>/...` | [conventions](docs/conventions.md#pages--routes) |

## Hard rules

1. **No raw external asset URLs.** Images/PDFs go through R2 + the manifest. Referencing `becbgk.edu/...` directly is a bug. See [asset-pipeline](docs/asset-pipeline.md).
2. **Keep the typed data-file model.** Add content by editing `src/data/*.ts`, not by inventing JSON loaders or a CMS.
3. **Reuse components.** Cards, carousels, grids already exist in `src/components/` and `src/components/ui/`. Check before building new.
4. `pnpm build` must stay green — it type-checks every data file.

## Current project

10-day content-population + revamp sprint, deadline **2026-06-15**. See [`docs/plan.md`](docs/plan.md).
