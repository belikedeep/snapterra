import { Router } from "express";
import { createRouteHandler } from "uploadthing/express";
import { getScreenshots } from "./screenshots.controller";
import { authProtect } from "../../middleware/auth.middleware";
import { screenshotUploadRouter } from "./screenshots.upload";

const router = Router();

// Public facing uploadthing endpoint
// Handled via its own internal auth
router.use(
  "/uploadthing",
  createRouteHandler({
    router: screenshotUploadRouter,
  }),
);

// Protected routes
router.use(authProtect);

router.get("/", getScreenshots);
// router.delete("/:id", deleteScreenshot);

export default router;
