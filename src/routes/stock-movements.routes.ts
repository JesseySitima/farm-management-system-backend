
import { Router, Request, Response } from "express";
import {
  getStockMovements,
  getStockBalances,
  createStockIssue,
  createStockAdjustment
} from "../services/stock-movement.service";

const router = Router();

// Get stock movement history
router.get("/", async (_req: Request, res: Response) => {
  try {
    const movements = await getStockMovements();

    return res.status(200).json({
      success: true,
      message: "Stock movements retrieved successfully",
      data: movements,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to retrieve stock movements",
    });
  }
});

// Get current stock balances
router.get("/balances", async (_req: Request, res: Response) => {
  try {
    const balances = await getStockBalances();

    return res.status(200).json({
      success: true,
      message: "Stock balances retrieved successfully",
      data: balances,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to retrieve stock balances",
    });
  }
});


 // Create a stock issue
router.post("/issues", async (req: Request, res: Response) => {
  try {
    const movement = await createStockIssue(req.body);

    return res.status(201).json({
      success: true,
      message: "Stock issued successfully",
      data: movement,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to issue stock";

    const isInsufficientStock = message.includes("Insufficient stock");

    return res.status(isInsufficientStock ? 400 : 500).json({
      success: false,
      message,
    });
  }
});

router.post("/adjustments", async (req, res) => {
  try {
    const adjustment = await createStockAdjustment(req.body);

    res.status(201).json({
      message: "Stock adjustment created successfully",
      data: adjustment,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create stock adjustment";

    const isBadRequest =
      message.includes("Insufficient stock") ||
      message.includes("Adjustment") ||
      message.toLowerCase().includes("reason");

    res.status(isBadRequest ? 400 : 500).json({
      message,
    });
  }
});


export default router;
