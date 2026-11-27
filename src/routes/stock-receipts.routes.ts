
import { Router, Request, Response } from "express";
import {
  createStockReceipt,
  getStockReceipts,
} from "../services/stock-receipts.service.js";

const router = Router();

// Create stock receipt
router.post("/", async (req: Request, res: Response) => {
  try {
    const receipt = await createStockReceipt(req.body);

    return res.status(201).json({
      success: true,
      message: "Stock receipt created successfully",
      data: receipt,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create stock receipt",
    });
  }
});

// Get all stock receipts
router.get("/", async (_req: Request, res: Response) => {
  try {
    const receipts = await getStockReceipts();

    return res.status(200).json({
      success: true,
      message: "Stock receipts retrieved successfully",
      data: receipts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to retrieve stock receipts",
    });
  }
});

export default router;
