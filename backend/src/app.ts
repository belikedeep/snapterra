import express from "express";
import cors from "cors";
import "dotenv/config";
import authRoutes from "./modules/auth/auth.routes";
import screenshotRoutes from "./modules/screenshots/screenshots.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/screenshots", screenshotRoutes);

export default app;
