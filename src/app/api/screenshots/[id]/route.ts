import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getUserIdFromRequest } from "@/lib/auth";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getUserIdFromRequest();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const result = await query(
      "DELETE FROM screenshots WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, userId],
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ message: "Screenshot not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Screenshot deleted successfully" });
  } catch (error) {
    console.error("Error deleting screenshot: ", error);
    return NextResponse.json({ error: "Failed to delete screenshot" }, { status: 500 });
  }
}
