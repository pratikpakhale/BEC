import type React from "react";
import type { Metadata } from "next";

/**
 * Admin root. Deliberately outside the `(site)` group: no public Header or
 * Footer, no analytics, and never indexed (also disallowed in robots.txt and
 * skipped by the sitemap walker).
 */
export const metadata: Metadata = {
  title: { default: "BEC Admin", template: "%s · BEC Admin" },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="bg-muted/40 text-foreground min-h-screen">{children}</div>;
}
