import { NextResponse } from "next/server";
import { apiError, unauthorized } from "@/lib/admin/api";
import { deleteOrphans, readCleanupReport, unregisterOrphans } from "@/lib/admin/cleanup";
import { ReferenceScanTooSmallError } from "@/lib/admin/orphans";
import { getSession } from "@/lib/admin/session";

/** A bucket sweep, a GitHub read and a commit — all Node, none of it edge. */
export const runtime = "nodejs";

/** What is in storage, and what nothing points at any more. */
export async function GET() {
  const session = await getSession();
  if (!session) return unauthorized();

  try {
    return NextResponse.json(await readCleanupReport());
  } catch (error) {
    // The scan came back too small to trust, so it reported nothing rather than
    // calling live photographs unused. Say so — silence would read as "clean".
    if (error instanceof ReferenceScanTooSmallError) {
      console.error("[admin]", error.message);
      return NextResponse.json(
        {
          error:
            "The Admin could not work out which photos the site is using, so it will not suggest deleting anything. Ask the site administrator to look at it.",
        },
        { status: 500 },
      );
    }
    return apiError(error);
  }
}

function keys(value: unknown): string[] | null {
  if (!Array.isArray(value)) return null;
  return value.every((item) => typeof item === "string") ? (value as string[]) : null;
}

/**
 * The two halves of a delete ([10]'s two-phase delete):
 *
 *   { step: "unregister" }  take the keys out of the site's photo index (a commit)
 *   { step: "delete" }      remove the bytes — only once that change is live
 *
 * Both recompute the unused set from a fresh sweep; the request only says which
 * of the offered files to act on.
 */
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return unauthorized();

  try {
    const body = (await request.json()) as { step?: unknown; keys?: unknown };
    const wanted = keys(body?.keys);
    if (!wanted || (body?.step !== "unregister" && body?.step !== "delete")) {
      return NextResponse.json({ error: "That request could not be read." }, { status: 400 });
    }

    const result =
      body.step === "unregister"
        ? await unregisterOrphans({ keys: wanted, editorName: session.name })
        : await deleteOrphans({ keys: wanted });

    if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json({ commit: result.commit, deleted: result.deleted });
  } catch (error) {
    return apiError(error);
  }
}
