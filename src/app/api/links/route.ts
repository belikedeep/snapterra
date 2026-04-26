import { NextResponse } from "next/server";
import { query, getClient } from "@/lib/db";
import { getAuthenticatedUser } from "@/lib/auth";
import { z } from "zod";

const linkSchema = z.object({
  url: z.string().url("Invalid URL format"),
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
      `SELECT l.*, STRING_AGG(t.name, ',') as tags 
       FROM links l
       LEFT JOIN link_tags lt ON l.id = lt.link_id
       LEFT JOIN tags t ON lt.tag_id = t.id
       WHERE l.user_id = $1 AND l.deleted_at IS NULL
       GROUP BY l.id
       ORDER BY l.created_at DESC
       LIMIT $2 OFFSET $3`,
      [userId, limit, offset],
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching links: ", error);
    return NextResponse.json(
      { error: "Failed to fetch links" },
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
    const validatedData = linkSchema.parse(body);
    const { title, url, tags } = validatedData;

    await client.query("BEGIN");

    const linkRes = await client.query(
      "INSERT INTO links (user_id, url, title) VALUES ($1, $2, $3) RETURNING id",
      [userId, url, title || ""],
    );
    const linkId = linkRes.rows[0].id;

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
          "INSERT INTO link_tags (link_id, tag_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
          [linkId, tagId],
        );
      }
    }

    await client.query("COMMIT");

    return NextResponse.json(
      { id: linkId, message: "Link saved with tags" },
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
    console.error("Error creating link: ", error);
    return NextResponse.json(
      { error: "Failed to create link" },
      { status: 500 },
    );
  } finally {
    client.release();
  }
}
