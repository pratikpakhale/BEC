import type { NextConfig } from "next";

/**
 * The Admin is its own deployment because the public site is a static export
 * and cannot run a server. Visitors still reach it at becbgk.edu/admin: the
 * site rewrites /admin, /api/admin and /admin-assets to this app.
 */
const nextConfig: NextConfig = {
  // Both apps answer on one domain, so this app's build files need a prefix of
  // their own or they would collide with the site's /_next.
  assetPrefix: "/admin-assets",
  images: { unoptimized: true },
  async redirects() {
    return [{ source: "/", destination: "/admin", permanent: false }];
  },
};

export default nextConfig;
