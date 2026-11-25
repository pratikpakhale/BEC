import { NextResponse } from "next/server";
import { apiError, unauthorized } from "@/lib/admin/api";
import { readAssetIndex } from "@/lib/admin/asset-index";
import { mintAssetKey, normalizeFolder } from "@/lib/admin/asset-key";
import { assetExists, presignPut } from "@/lib/admin/r2";
import { getSession } from "@/lib/admin/session";

/**
 * Where a PDF upload starts. The file itself never touches this
 * function — Vercel's 4.5 MB body cap makes that impossible for scanned
 * notices, and a PDF is stored as-is anyway, so there is nothing a server-side
 * pass would do to it. This route decides the key and hands back a URL the
 * browser PUTs straight to R2.
 *
 * The manifest entry is not written here. As with images, the Publish that
 * references the key registers it (see lib/admin/manifest-sync.ts).
 */
export const runtime = "nodejs";

/** Policy, not a platform limit — direct-to-R2 has no ceiling of its own. */
export const MAX_PDF_BYTES = 15 * 1024 * 1024;

const CONTENT_TYPE = "application/pdf";

function badRequest(error: string, status = 400): NextResponse {
  return NextResponse.json({ error }, { status });
}

export async function POST(request: Request) {
  if (!(await getSession())) return unauthorized();

  let body: { fileName?: unknown; folder?: unknown; bytes?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return badRequest("That request could not be read. Please try again.");
  }

  const fileName = typeof body.fileName === "string" ? body.fileName : "";
  const bytes = typeof body.bytes === "number" ? body.bytes : NaN;
  const folder = normalizeFolder(typeof body.folder === "string" ? body.folder : "");

  if (!fileName.toLowerCase().endsWith(".pdf")) {
    return badRequest("Only PDF files can be attached.");
  }
  if (!folder) return badRequest("There is nowhere to file this document.");
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return badRequest("That file appears to be empty.");
  }
  if (bytes > MAX_PDF_BYTES) {
    return badRequest(
      `That file is ${Math.round(bytes / 1024 / 1024)} MB. Attachments have to be under 15 MB.`,
      413,
    );
  }

  try {
    const index = await readAssetIndex();

    const [top] = folder.split("/");
    const known = new Set(index.keys.map((key) => key.split("/")[0]));
    if (!known.has(top)) {
      return badRequest(`There is no "${top}" section in the document library.`);
    }

    const registered = new Set(index.keys);
    let key = "";
    for (let attempt = 0; attempt < 5; attempt++) {
      const candidate = mintAssetKey({ folder, fileName, extension: "pdf" });
      if (!registered.has(candidate) && !(await assetExists(candidate))) {
        key = candidate;
        break;
      }
    }
    if (!key) {
      return badRequest("Could not find a free name for that file. Please try again.", 500);
    }

    return NextResponse.json({
      key,
      uploadUrl: await presignPut({ key, contentType: CONTENT_TYPE, bytes }),
      contentType: CONTENT_TYPE,
      url: `${index.base}/${key}`,
    });
  } catch (error) {
    return apiError(error);
  }
}
