import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import { authorizeAuthor, authorizeCollaborator } from "../middleware/authorize";

const router = Router();

// Delete story → only author
router.delete("/:storyId", authenticateToken, authorizeAuthor, async (req, res) => {
  // delete logic here
  res.json({ message: "Story deleted successfully." });
});

// Edit story → author or collaborators
router.put("/:storyId", authenticateToken, authorizeCollaborator, async (req, res) => {
  // edit logic here
  res.json({ message: "Story updated successfully." });
});

export default router;
