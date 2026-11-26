
import { Router } from "express";
import { getUsers } from "../services/users.service.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";

const router = Router();

// GET ALL USERS
router.get(
  "/",
  authenticateToken,
  requireRole("System Administrator"),
  async (req, res) => {
    try {
      const page = Math.max(1, Number(req.query.page) || 1);
      const limit = Math.min(
        100,
        Math.max(1, Number(req.query.limit) || 10)
      );

      const result = await getUsers(page, limit);

      res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        data: result.users,
        pagination: result.pagination,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to retrieve users",
      });
    }
  }
);

export default router;
