
import { Router, Request, Response } from "express";
import {
  createInventoryItem,
  getInventoryItems,
} from "../services/inventory-items.service.js";

const router = Router();

// Create inventory item
router.post("/", async (req: Request, res: Response) => {
  try {
    const item = await createInventoryItem(req.body);

    return res.status(201).json({
      success: true,
      message: "Inventory item created successfully",
      data: item,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create inventory item",
    });
  }
});

// Get all inventory items
router.get("/", async (_req: Request, res: Response) => {
  try {
    const items = await getInventoryItems();

    return res.status(200).json({
      success: true,
      message: "Inventory items retrieved successfully",
      data: items,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to retrieve inventory items",
    });
  }
});

export default router;
