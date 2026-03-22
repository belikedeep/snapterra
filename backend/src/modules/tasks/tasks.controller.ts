import type { Request, Response } from "express";
import { query } from "../../config/db";

interface AuthRequest extends Request {
  userId?: number;
}

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(
      "SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC",
      [req.userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

export const createOneTask = async (req: AuthRequest, res: Response) => {
  const { title, description } = req.body;
  try {
    const result = await query(
      "INSERT INTO tasks (user_id, title, description, status) VALUES ($1, $2, $3, 'todo') RETURNING *",
      [req.userId, title, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
};

export const updateTaskStatus = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const result = await query(
      "UPDATE tasks SET status = $1 WHERE id = $2 AND user_id = $3 RETURNING *",
      [status, id, req.userId]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({ error: "Failed to update task status" });
  }
};

export const deleteOneTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    const result = await query(
      "DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, req.userId]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
};
