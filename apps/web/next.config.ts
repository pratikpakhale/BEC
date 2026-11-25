import type { NextConfig } from "next";

import legacyRedirects from "./src/data/legacy-redirects.json";

const r2Host = process.env.NEXT_PUBLIC_R2_BASE_URL
  ? new URL(process.env.NEXT_PUBLIC_R2_BASE_URL).hostname
  : undefined;


const toSource = (path: string) => encodeURI(path).replace(/[()[\]{}*+?^$|\\]/g, "\\$&");

const LEGACY_DOCUMENT = ":path(.*\\.(?:php|html?))";

/** Pages that moved within the new site. */
const MOVED_PAGES = {
  "/institute/governance": "/administration/governance",
  "/student-life/council": "/student-life/gymkhana",
  "/student-life/sports": "/student-life/gymkhana",
};

/**
 * The Admin is a separate deployment (apps/admin) because a static export
 * cannot run a server. These paths are handed to it so it stays at
 * becbgk.edu/admin.
 */
const ADMIN_ORIGIN =
  process.env.ADMIN_ORIGIN ??
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://becbgk-admin.vercel.app");
const ADMIN_PATHS = ["/admin", "/admin/:path*", "/api/admin/:path*", "/admin-assets/:path*"];

const nextConfig: NextConfig = {
  // Every public page is plain HTML on the CDN. Served through Next's server
  // they went through the host's ISR cache, which bills per read; as files
  // they do not. Vercel still applies the redirects and rewrites below.
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      ...(r2Host
        ? [{ protocol: "https" as const, hostname: r2Host, pathname: "/**" }]
        : []),
      {
        protocol: "https",
        hostname: "utexas.edu",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      }
    ],
  },
  async headers() {
    // The share cards are exported as files with no extension, which a static
    // host would otherwise serve as a download rather than an image.
    return [
      {
        source: "/:card(opengraph-image.*|twitter-image.*)",
        headers: [{ key: "Content-Type", value: "image/png" }],
      },
    ];
  },
  async rewrites() {
    return ADMIN_PATHS.map((source) => ({
      source,
      destination: `${ADMIN_ORIGIN}${source}`,
    }));
  },
  async redirects() {
    return [
      ...Object.entries(MOVED_PAGES).map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
      ...Object.entries(legacyRedirects.exact).map(([source, destination]) => ({
        source: toSource(source),
        destination,
        permanent: true,
      })),
      ...Object.entries(legacyRedirects.prefixes).map(([prefix, destination]) => ({
        source: `${toSource(prefix)}/${LEGACY_DOCUMENT}`,
        destination,
        permanent: true,
      })),
    ];
  }
};

export default nextConfig;
