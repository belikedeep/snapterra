import { Router } from "express";
import { login, getMe } from "./auth.controller";
import { authProtect } from "../../middleware/auth.middleware";

const router = Router();

router.post("/login", login);

// testing middleware
router.get("/me", authProtect, getMe as any);

export default router;
