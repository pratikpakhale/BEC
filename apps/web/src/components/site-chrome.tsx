import type React from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { OrganizationJsonLd } from "@/components/seo/organization-jsonld";

/**
 * Everything a public page carries besides its own content: the header and
 * footer, the Organization schema, and the analytics script.
 *
 * It is a component rather than just the site layout's body because
 * `not-found.tsx` has to sit at the app root — above the `(site)` group — so it
 * can catch URLs matching no segment at all. That puts it outside the site
 * layout, and the first time round it silently lost the analytics and the
 * schema along with the chrome. Sharing one component is what stops the 404
 * page drifting away from every other page again.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <OrganizationJsonLd />
      <div className="min-h-screen">
        <Header />
        {children}
        <Footer />
      </div>
      {process.env.NODE_ENV === "production" && <GoogleAnalytics gaId="G-6F6X7N6R73" />}
    </>
  );
}
