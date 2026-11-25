"use client";

import { LogOut } from "lucide-react";
import { signOut } from "@/lib/admin/actions";
import { Button } from "@/components/ui/button";
import { useConfirmDiscard } from "@/lib/admin/unsaved-changes";

/**
 * Signing out is a route change like any other, so it loses unpublished work
 * the same way — and unlike the sidebar it cannot be undone by pressing Back.
 */
export function SignOutButton() {
  const confirmDiscard = useConfirmDiscard();

  return (
    <form
      action={signOut}
      onSubmit={(event) => {
        if (!confirmDiscard()) event.preventDefault();
      }}
    >
      <Button variant="ghost" size="sm" type="submit" className="gap-2">
        <LogOut className="size-4" />
        <span className="hidden sm:inline">Sign out</span>
      </Button>
    </form>
  );
}
