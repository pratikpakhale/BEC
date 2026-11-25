"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { endSession, startSession } from "@/lib/admin/session";
import { evaluateSignIn } from "@/lib/admin/sign-in";

export type SignInState = { error?: string };

/** Fixed cost on every attempt, so guessing is slow even before the throttle. */
const ATTEMPT_DELAY_MS = 500;

export async function signIn(
  _previous: SignInState,
  formData: FormData,
): Promise<SignInState> {
  const forwarded = (await headers()).get("x-forwarded-for");

  await new Promise((resolve) => setTimeout(resolve, ATTEMPT_DELAY_MS));

  const outcome = evaluateSignIn({
    name: String(formData.get("name") ?? ""),
    password: String(formData.get("password") ?? ""),
    clientKey: forwarded?.split(",")[0]?.trim() || "unknown",
  });

  if (!outcome.ok) return { error: outcome.error };

  await startSession(outcome.name);
  redirect("/admin");
}

export async function signOut(): Promise<void> {
  await endSession();
  redirect("/admin/login");
}
