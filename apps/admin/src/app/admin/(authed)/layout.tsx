import type React from "react";
import { AdminNav } from "@/components/admin/admin-nav";
import { AdminMobileNav } from "@/components/admin/admin-mobile-nav";
import { GuardedLink } from "@/components/admin/guarded-link";
import { SignOutButton } from "@/components/admin/sign-out-button";
import { BRANCH, isProductionBranch } from "@/lib/admin/github";
import { requireSession } from "@/lib/admin/session";
import { UnsavedChangesProvider } from "@/lib/admin/unsaved-changes";

/**
 * Everything under this layout requires a session. The login screen sits
 * outside the group so it does not redirect to itself. This guard covers pages;
 * route handlers under /api/admin guard themselves with `getSession()`.
 */

/**
 * Declared here rather than on each page: segment config applies to the whole
 * subtree, so a screen added later cannot forget it. Every page under this
 * layout reads the session cookie, and none of them may be prerendered.
 */
export const dynamic = "force-dynamic";
export default async function AuthedAdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await requireSession();

  return (
    <UnsavedChangesProvider>
      <div className="flex min-h-screen">
        <aside className="bg-background hidden w-64 shrink-0 flex-col border-r md:flex">
          <div className="border-b px-5 py-4">
            <GuardedLink href="/admin" className="text-base font-semibold tracking-tight">
              BEC Admin
            </GuardedLink>
            <p className="text-muted-foreground mt-0.5 text-xs">becbgk.edu</p>
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            <AdminNav />
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="bg-background sticky top-0 z-10 flex h-14 items-center gap-2 border-b px-3 sm:px-5">
            <AdminMobileNav />
            <span className="md:hidden text-sm font-semibold">BEC Admin</span>
            <div className="ml-auto flex items-center gap-3">
              <span className="text-muted-foreground hidden text-sm sm:inline">
                Signed in as{" "}
                <span className="text-foreground font-medium">{session.name}</span>
              </span>
              <SignOutButton />
            </div>
          </header>

          {/*
            A rehearsal that looks exactly like the real thing is how somebody
            spends an afternoon fixing the site and never touches it. Loud, on
            every screen, and it names the branch — because the person who set
            `GITHUB_CONTENT_BRANCH` is the only one who can tell whether it is
            the branch they meant.
          */}
          {!isProductionBranch && (
            <div className="border-b border-amber-300 bg-amber-100 px-4 py-2 text-center text-sm font-medium text-amber-900 sm:px-6">
              Practice mode — publishing here writes to <code className="font-mono">{BRANCH}</code>,
              not to the live site. Nothing you do here reaches becbgk.edu.
            </div>
          )}

          <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </UnsavedChangesProvider>
  );
}
