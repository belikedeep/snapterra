import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getAuthenticatedUser } from "@/lib/auth";
import { query, getClient } from "@/lib/db";
import { z } from "zod";

const f = createUploadthing();

export const ourFileRouter = {
  screenshotUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .input(
      z.object({
        title: z.string().optional(),
        tags: z.string().optional(),
      }),
    )
    .middleware(async ({ req, input }) => {
      const user = await getAuthenticatedUser();
      if (!user) throw new Error("Unauthorized");
      if (!user.is_pro) throw new Error("Subscription required");

      return {
        userId: Number(user.id),
        title: input.title,
        tags: input.tags,
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const client = await getClient();
      try {
        await client.query("BEGIN");
        const finalTitle = metadata.title || file.name;

        const res = await client.query(
          "INSERT INTO screenshots (user_id, filename, title) VALUES ($1, $2, $3) RETURNING id",
          [metadata.userId, file.ufsUrl, finalTitle],
        );
        const screenshotId = res.rows[0].id;

        // Handle tags if provided
        if (metadata.tags && typeof metadata.tags === "string") {
          const tagList = metadata.tags
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
        console.log("DATABASE SUCCESS: Saved row ID:", screenshotId);
      } catch (error) {
        await client.query("ROLLBACK");
        console.error("DATABASE ERROR in onUploadComplete:", error);
      } finally {
        client.release();
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
