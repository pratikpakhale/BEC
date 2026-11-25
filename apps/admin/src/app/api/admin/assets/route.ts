import { NextResponse } from "next/server";
import { apiError, unauthorized } from "@/lib/admin/api";
import { filterByKind, readAssetIndex, type AssetKind } from "@/lib/admin/asset-index";
import { getSession } from "@/lib/admin/session";

const KINDS = new Set<string>(["image", "document", "all"]);

/**
 * The picker's catalogue: every asset key of the requested kind, plus the R2
 * base to build URLs from. Keys only — sending the manifest's full URLs would
 * roughly quadruple a payload that is already ~2,950 entries, for a string the
 * client can assemble itself.
 */
export async function GET(request: Request) {
  if (!(await getSession())) return unauthorized();

  const requested = new URL(request.url).searchParams.get("kind") ?? "image";
  if (!KINDS.has(requested)) {
    return NextResponse.json(
      { error: `Unknown asset kind "${requested}".` },
      { status: 400 },
    );
  }

  try {
    const index = await readAssetIndex();
    const keys = filterByKind(index.keys, requested as AssetKind | "all");
    return NextResponse.json({ base: index.base, keys });
  } catch (error) {
    return apiError(error);
  }
}
