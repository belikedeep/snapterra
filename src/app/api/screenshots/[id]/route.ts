import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getAuthenticatedUser } from "@/lib/auth";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (!user.is_pro) {
    return NextResponse.json(
      { message: "Subscription required" },
      { status: 403 },
    );
  }

  const userId = user.id;
  const { id } = await params;

  try {
    const result = await query(
      "UPDATE screenshots SET deleted_at = NOW() WHERE id = $1 AND user_id = $2 AND deleted_at IS NULL RETURNING *",
      [id, userId],
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { message: "Screenshot not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Screenshot moved to trash" });
  } catch (error) {
    console.error("Error deleting screenshot: ", error);
    return NextResponse.json(
      { error: "Failed to delete screenshot" },
      { status: 500 },
    );
  }
}
