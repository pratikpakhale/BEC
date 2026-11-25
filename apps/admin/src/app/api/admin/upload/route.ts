import { NextResponse } from "next/server";
import { apiError, unauthorized } from "@/lib/admin/api";
import { readAssetIndex } from "@/lib/admin/asset-index";
import { mintAssetKey, normalizeFolder } from "@/lib/admin/asset-key";
import { toWebp, UnsupportedImageError } from "@/lib/admin/image-convert";
import { assetExists, putAsset } from "@/lib/admin/r2";
import { getSession } from "@/lib/admin/session";

/**
 * Image upload — images come through the function, PDFs go presigned.
 * sharp needs the Node runtime, and a large photo through convert
 * plus a bucket PUT can outlast the default 10s.
 */
export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * Vercel hard-caps request bodies at 4.5 MB and it is not configurable, so the
 * browser shrinks anything larger before it gets here. This limit exists to
 * turn "413 from the platform" — which reaches the Editor as an unexplained
 * failure — into a sentence they can act on.
 */
const MAX_BYTES = 4 * 1024 * 1024;

function badRequest(error: string, status = 400): NextResponse {
  return NextResponse.json({ error }, { status });
}

export async function POST(request: Request) {
  if (!(await getSession())) return unauthorized();

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return badRequest("That upload could not be read. Please try again.");
  }

  const file = form.get("file");
  if (!(file instanceof File)) return badRequest("No photo was attached.");

  const folder = normalizeFolder(String(form.get("folder") ?? ""));
  if (!folder) {
    return badRequest("There is nowhere to file this photo. Open a folder first.");
  }

  if (file.size === 0) return badRequest("That file is empty.");
  if (file.size > MAX_BYTES) {
    return badRequest(
      "That photo is too large to send. Please choose one under 4 MB.",
      413,
    );
  }

  try {
    const index = await readAssetIndex();

    // Uploads go into the library that already exists, not a new top level: a
    // typo like "depatments/" would file the photo somewhere nobody looks.
    const [top] = folder.split("/");
    const known = new Set(index.keys.map((key) => key.split("/")[0]));
    if (!known.has(top)) {
      return badRequest(`There is no "${top}" section in the photo library.`);
    }

    const converted = await toWebp(Buffer.from(await file.arrayBuffer()));

    const registered = new Set(index.keys);
    let key = "";
    for (let attempt = 0; attempt < 5; attempt++) {
      const candidate = mintAssetKey({
        folder,
        fileName: file.name || "photo",
        extension: "webp",
      });
      // Keys are immutable — a collision must never overwrite
      // someone else's picture, so re-roll the suffix rather than proceed.
      if (!registered.has(candidate) && !(await assetExists(candidate))) {
        key = candidate;
        break;
      }
    }
    if (!key) {
      return badRequest("Could not find a free name for that photo. Please try again.", 500);
    }

    await putAsset(key, converted.data, "image/webp");

    // Deliberately no commit here. The Publish that references this key
    // registers it in the manifest, so uploading ten gallery photos costs one
    // deploy instead of ten (see lib/admin/manifest-sync.ts).
    return NextResponse.json({
      key,
      url: `${index.base}/${key}`,
      width: converted.width,
      height: converted.height,
      bytes: converted.bytes,
    });
  } catch (error) {
    if (error instanceof UnsupportedImageError) {
      return badRequest(error.message, 415);
    }
    return apiError(error);
  }
}
