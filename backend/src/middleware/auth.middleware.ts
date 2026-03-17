import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/auth";

export interface AuthRequest extends Request {
  userId?: number;
}

export const authProtect = (
  req: AuthRequest, 
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const userId = verifyToken(token);
  
  if (!userId) {
    return res.status(401).json({ message: "Token is not valid" });
  }

  req.userId = userId;
  next();
};
