import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getUserIdFromRequest } from "@/lib/auth";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string; tagName: string }> }
) {
  const userId = await getUserIdFromRequest();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id, tagName } = await params;

  try {
    const tagRes = await query("SELECT id FROM tags WHERE name = $1", [tagName]);
    if (tagRes.rowCount === 0) {
      return NextResponse.json({ error: "Tag not found" }, { status: 404 });
    }
    const tagId = tagRes.rows[0].id;

    await query("DELETE FROM link_tags WHERE link_id = $1 AND tag_id = $2", [
      id,
      tagId,
    ]);

    return NextResponse.json({ message: "Tag removed from link" });
  } catch (error) {
    console.error("Error removing tag: ", error);
    return NextResponse.json({ error: "Failed to remove tag" }, { status: 500 });
  }
}
