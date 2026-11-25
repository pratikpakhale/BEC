/**
 * The same card as `app/opengraph-image.tsx`, declared again inside the site
 * group. Next injects a file-convention image into the segment it sits in and
 * the ones below it, and `(site)/layout.tsx` declares its own `openGraph` —
 * which replaces whatever the root segment had resolved. Without this file the
 * root card never reaches a public page and every og:image tag disappears.
 *
 * The root copy stays because it owns the unsuffixed `/opengraph-image` URL,
 * which is what already-shared links point at; this one is served from
 * `/opengraph-image-<hash>`, the path Next gives a file inside a route group.
 */
export { default, alt, size, contentType } from "../opengraph-image";

// Required by the static export: a metadata route has to say it is built once.
export const dynamic = "force-static";
