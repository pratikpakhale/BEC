import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/login-form";
import { getSession } from "@/lib/admin/session";

export const metadata: Metadata = { title: "Sign in" };

/**
 * Reads the session cookie to bounce an Editor who is already signed in, so it
 * can never be prerendered — a static copy would show the form to everybody,
 * for ever.
 */
export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await getSession()) redirect("/admin");

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="bg-background w-full max-w-sm rounded-xl border p-6 shadow-sm sm:p-8">
        <h1 className="text-xl font-semibold tracking-tight">BEC Admin</h1>
        <p className="text-muted-foreground mt-1.5 text-sm">
          Edit the content of becbgk.edu.
        </p>
        <div className="mt-7">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
