import { Request, Response, NextFunction } from "express";
import { query } from "../db/pool";

// Check if current user is the author of the story
export async function authorizeAuthor(req: Request, res: Response, next: NextFunction) {
  const userId = (req as any).user?.userId;
  const { storyId } = req.params;

  try {
    const sql = `SELECT author_id FROM stories WHERE id = $1 LIMIT 1;`;
    const { rows } = await query(sql, [storyId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Story not found." });
    }

    if (rows[0].author_id !== userId) {
      return res.status(403).json({ message: "You are not authorized to perform this action." });
    }

    next();
  } catch (err) {
    console.error("Authorization error:", err);
    return res.status(500).json({ message: "Something went wrong." });
  }
}

// Check if user is author OR collaborator
export async function authorizeCollaborator(req: Request, res: Response, next: NextFunction) {
  const userId = (req as any).user?.userId;
  const { storyId } = req.params;

  try {
    const sql = `
      SELECT 1
      FROM stories s
      LEFT JOIN story_collaborators sc ON s.id = sc.story_id
      WHERE s.id = $1
        AND (s.author_id = $2 OR sc.user_id = $2)
      LIMIT 1;
    `;
    const { rows } = await query(sql, [storyId, userId]);

    if (rows.length === 0) {
      return res.status(403).json({ message: "You are not authorized to perform this action." });
    }

    next();
  } catch (err) {
    console.error("Authorization error:", err);
    return res.status(500).json({ message: "Something went wrong." });
  }
}
