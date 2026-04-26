import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getAuthenticatedUser } from "@/lib/auth";
import { z } from "zod";

const taskSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title is too long"),
  description: z.string().max(2000, "Description is too long").optional(),
});

export async function GET() {
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

  try {
    const result = await query(
      "SELECT * FROM tasks WHERE user_id = $1 AND deleted_at IS NULL ORDER BY created_at DESC",
      [userId],
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
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

  try {
    const body = await request.json();
    const validatedData = taskSchema.parse(body);

    const { title, description } = validatedData;
    const result = await query(
      "INSERT INTO tasks (user_id, title, description, status) VALUES ($1, $2, $3, 'todo') RETURNING *",
      [userId, title, description || ""],
    );
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 },
      );
    }
    console.error("Error creating task:", error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 },
    );
  }
}
