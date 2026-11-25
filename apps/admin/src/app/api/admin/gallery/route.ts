import { NextResponse } from "next/server";
import { apiError, unauthorized } from "@/lib/admin/api";
import { publishGalleryPhotos } from "@/lib/admin/publish-gallery";
import { getSession } from "@/lib/admin/session";

/** The manifest read and the commit both need Node, not the edge runtime. */
export const runtime = "nodejs";

function keys(value: unknown): string[] | null {
  if (value === undefined) return [];
  if (!Array.isArray(value)) return null;
  return value.every((item) => typeof item === "string") ? (value as string[]) : null;
}

/**
 * Publish a gallery: register the photos just uploaded to it, unregister the
 * ones taken out of it, in one commit. A gallery has no content file — the
 * manifest is what the page reads (see lib/admin/publish-gallery.ts).
 */
export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) return unauthorized();

  try {
    const body = (await request.json()) as {
      prefix?: unknown;
      add?: unknown;
      remove?: unknown;
    };

    const add = keys(body?.add);
    const remove = keys(body?.remove);
    if (typeof body?.prefix !== "string" || !add || !remove) {
      return NextResponse.json({ error: "That change could not be read." }, { status: 400 });
    }

    const result = await publishGalleryPhotos({
      prefix: body.prefix,
      add,
      remove,
      editorName: session.name,
    });

    if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json({ commit: result.commit, unchanged: result.unchanged });
  } catch (error) {
    return apiError(error);
  }
}
