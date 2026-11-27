
import { Router, Request, Response } from "express";
import {
  createInventoryCategory,
  getInventoryCategories,
} from "../services/inventory-categories.service.js";

const router = Router();

// Create inventory category
router.post("/", async (req: Request, res: Response) => {
  try {
    const category = await createInventoryCategory(req.body);

    return res.status(201).json({
      success: true,
      message: "Inventory category created successfully",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create inventory category",
    });
  }
});

// Get all inventory categories
router.get("/", async (_req: Request, res: Response) => {
  try {
    const categories = await getInventoryCategories();

    return res.status(200).json({
      success: true,
      message: "Inventory categories retrieved successfully",
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to retrieve inventory categories",
    });
  }
});

export default router;
