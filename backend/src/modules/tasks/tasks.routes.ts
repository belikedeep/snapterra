import { Router } from "express";
import { getTasks, createOneTask, updateTaskStatus, deleteOneTask } from "./tasks.controller";
import { authProtect } from "../../middleware/auth.middleware";

const router = Router();

router.use(authProtect);

router.get("/", getTasks as any);
router.post("/", createOneTask as any);
router.patch("/:id/status", updateTaskStatus as any);
router.delete("/:id", deleteOneTask as any);

export default router;
