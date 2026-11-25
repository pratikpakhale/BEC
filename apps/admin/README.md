# BEC Admin

The content Admin served at `becbgk.edu/admin`.

It is its own Next.js app because the public site (`apps/web`) is a static
export and cannot run a server, and the Admin needs one: sessions, Server
Actions, GitHub and R2 calls.

## What lives where

- **Here:** only the routes, `src/app/admin/**` and `src/app/api/admin/**`.
- **In `apps/web/src`:** everything they render and call:
  `components/admin`, `lib/admin`, the content schemas and the UI kit. Both
  path aliases (`@/*`, `@content/*`) point there. That code shares types and
  relative imports with the site's content layer and build scripts, so it stays
  beside them.

Keep `next`, `react` and `react-dom` on the same versions as `apps/web`. Both
apps must resolve to one copy of each.

## How it is reached

The site rewrites `/admin`, `/api/admin` and `/admin-assets` to this
deployment (`ADMIN_ORIGIN` in `apps/web/next.config.ts`). `assetPrefix` keeps
this app's build files off the site's `/_next`.

## Running it

```bash
pnpm dev          # from the repo root: site on :3000, Admin on :3001
```

`http://localhost:3000/admin` forwards to the Admin in development too.

Environment (`.env.local` here, and on the Vercel project):
`ADMIN_PASSWORD`, `ADMIN_CONTACT`, `GITHUB_CONTENT_TOKEN`,
`GITHUB_CONTENT_BRANCH`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`,
`R2_BUCKET`, `R2_S3_ENDPOINT`, `NEXT_PUBLIC_R2_BASE_URL`.
