import { createUploadthing, type FileRouter } from "uploadthing/express";
import { verifyToken } from "../../utils/auth";
import { query } from "../../config/db";

const f = createUploadthing();

export const screenshotUploadRouter = {
  screenshotUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) throw new Error("Unauthorized");

      const userId = verifyToken(token);
      if (!userId) throw new Error("Invalid token");

      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.ufsUrl);

      try {
        await query(
          "INSERT INTO screenshots (user_id, filename, title) VALUES ($1, $2, $3)",
          [metadata.userId, file.ufsUrl, file.name]
        );
        console.log("Screenshot record saved to DB");
      } catch (error) {
        console.error("Failed to save screenshot to DB:", error);
      }
    }),
} satisfies FileRouter;

export type ScreenshotFileRouter = typeof screenshotUploadRouter;
