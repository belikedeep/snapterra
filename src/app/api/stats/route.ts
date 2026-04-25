import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getUserIdFromRequest } from "@/lib/auth";

export async function GET() {
  const userId = await getUserIdFromRequest();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // 1. Get task counts
    const taskResult = await query(
      "SELECT status, COUNT(*) as count FROM tasks WHERE user_id = $1 GROUP BY status",
      [userId]
    );
    
    // 2. Get link count
    const linkResult = await query(
      "SELECT COUNT(*) as count FROM links WHERE user_id = $1",
      [userId]
    );

    // 3. Get screenshot count
    const screenshotResult = await query(
      "SELECT COUNT(*) as count FROM screenshots WHERE user_id = $1",
      [userId]
    );

    // 4. Get recent activity (last 5 items)
    const recentLinks = await query(
      "SELECT 'link' as type, title, created_at, url as description FROM links WHERE user_id = $1 ORDER BY created_at DESC LIMIT 3",
      [userId]
    );
    
    const recentScreenshots = await query(
      "SELECT 'screenshot' as type, title, created_at, filename as description FROM screenshots WHERE user_id = $1 ORDER BY created_at DESC LIMIT 3",
      [userId]
    );

    const activity = [...recentLinks.rows, ...recentScreenshots.rows]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5);

    return NextResponse.json({
      tasks: taskResult.rows,
      linksCount: parseInt(linkResult.rows[0]?.count || "0"),
      screenshotsCount: parseInt(screenshotResult.rows[0]?.count || "0"),
      activity
    });
  } catch (error) {
    console.error("Stats Error:", error);
    return NextResponse.json({ error: "Failed to fetch dashboard stats" }, { status: 500 });
  }
}
