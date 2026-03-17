import type { Response } from "express";
import { query } from "../../config/db";
import type { AuthRequest } from "../../middleware/auth.middleware";

export const getScreenshots = async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(
      "SELECT * FROM screenshots WHERE user_id = $1 ORDER BY created_at DESC",
      [req.userId],
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching screenshots: ", error);
    res.status(500).json({ error: "Failed to fetch screenshots" });
  }
};

// export const deleteScreenshot = async (req: AuthRequest, res: Response) => {
//   const { id } = req.params;
//   try {
//     const result = await query(
//       "DELETE FROM screenshots WHERE id = $1 AND user_id = $2 RETURNING *",
//       [id, req.userId]
//     );

//     if (result.rowCount === 0) {
//       return res.status(404).json({ message: "Screenshot not found" });
//     }

//     res.json({ message: "Screenshot deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting screenshot: ", error);
//     res.status(500).json({ error: "Failed to delete screenshot" });
//   }
// };
