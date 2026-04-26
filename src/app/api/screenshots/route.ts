import { NextResponse } from "next/server";
import { query, getClient } from "@/lib/db";
import { getAuthenticatedUser } from "@/lib/auth";
import { z } from "zod";

const screenshotSchema = z.object({
  filename: z.string().min(1, "Filename is required"),
  title: z.string().max(200, "Title is too long").optional(),
  tags: z.string().max(500, "Tags string is too long").optional(),
});

export async function GET(request: Request) {
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

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const offset = (page - 1) * limit;

  try {
    const result = await query(
      `SELECT s.*, STRING_AGG(t.name, ',') as tags 
       FROM screenshots s
       LEFT JOIN screenshot_tags st ON s.id = st.screenshot_id
       LEFT JOIN tags t ON st.tag_id = t.id
       WHERE s.user_id = $1 AND s.deleted_at IS NULL
       GROUP BY s.id
       ORDER BY s.created_at DESC
       LIMIT $2 OFFSET $3`,
      [userId, limit, offset],
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching screenshots: ", error);
    return NextResponse.json(
      { error: "Failed to fetch screenshots" },
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
  const client = await getClient();

  try {
    const body = await request.json();
    const validatedData = screenshotSchema.parse(body);
    const { title, filename, tags } = validatedData;

    await client.query("BEGIN");

    const screenshotRes = await client.query(
      "INSERT INTO screenshots (user_id, filename, title) VALUES ($1, $2, $3) RETURNING id",
      [userId, filename, title || ""],
    );
    const screenshotId = screenshotRes.rows[0].id;

    if (tags && typeof tags === "string") {
      const tagList = tags
        .split(",")
        .map((t: string) => t.trim().toLowerCase())
        .filter(Boolean);

      for (const tagName of tagList) {
        const tagRes = await client.query(
          "SELECT id FROM tags WHERE name = $1",
          [tagName],
        );
        let tagId;

        if (tagRes.rowCount === 0) {
          const newTagRes = await client.query(
            "INSERT INTO tags (name) VALUES ($1) RETURNING id",
            [tagName],
          );
          tagId = newTagRes.rows[0].id;
        } else {
          tagId = tagRes.rows[0].id;
        }

        await client.query(
          "INSERT INTO screenshot_tags (screenshot_id, tag_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
          [screenshotId, tagId],
        );
      }
    }

    await client.query("COMMIT");

    return NextResponse.json(
      { id: screenshotId, message: "Screenshot saved with tags" },
      { status: 201 },
    );
  } catch (error) {
    await client.query("ROLLBACK");
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 },
      );
    }
    console.error("Error creating screenshot: ", error);
    return NextResponse.json(
      { error: "Failed to create screenshot" },
      { status: 500 },
    );
  } finally {
    client.release();
  }
}
