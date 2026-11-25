import { NextResponse } from "next/server";
import { apiError, unauthorized } from "@/lib/admin/api";
import { getDeployStatus } from "@/lib/admin/github";
import { getSession } from "@/lib/admin/session";

/**
 * "Is my change live yet?" — Vercel's commit status for a published commit,
 * polled by the Publish banner until it settles.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ sha: string }> },
) {
  if (!(await getSession())) return unauthorized();

  try {
    const { sha } = await params;
    if (!/^[0-9a-f]{7,40}$/.test(sha)) {
      return NextResponse.json({ error: "Not a commit reference." }, { status: 400 });
    }
    return NextResponse.json(await getDeployStatus(sha));
  } catch (error) {
    return apiError(error);
  }
}
