import { NextResponse } from "next/server";
import { apiError, unauthorized } from "@/lib/admin/api";
import { publishContentFile, readContentFile } from "@/lib/admin/publish";
import { getSession } from "@/lib/admin/session";

/** Read a content file as it stands at repo HEAD, never from this bundle. */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ file: string }> },
) {
  if (!(await getSession())) return unauthorized();

  try {
    const { file } = await params;
    const content = await readContentFile(file);
    if (!content) {
      return NextResponse.json(
        { error: `"${file}" is not an editable content file.` },
        { status: 404 },
      );
    }
    return NextResponse.json(content);
  } catch (error) {
    return apiError(error);
  }
}

/** Publish: validate against the build's own schema, then commit to main. */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ file: string }> },
) {
  const session = await getSession();
  if (!session) return unauthorized();

  try {
    const { file } = await params;
    const body = (await request.json()) as { data?: unknown; scope?: unknown };
    if (body?.data === undefined) {
      return NextResponse.json({ error: "No content was submitted." }, { status: 400 });
    }
    if (body.scope !== undefined && typeof body.scope !== "string") {
      return NextResponse.json({ error: "That is not an entry of this file." }, { status: 400 });
    }

    const result = await publishContentFile({
      file,
      data: body.data,
      editorName: session.name,
      ...(body.scope === undefined ? {} : { scope: body.scope }),
    });

    if (!result.ok) {
      return NextResponse.json(
        { error: result.error, issues: result.issues },
        { status: 400 },
      );
    }

    return NextResponse.json({ commit: result.commit, unchanged: result.unchanged });
  } catch (error) {
    return apiError(error);
  }
}
