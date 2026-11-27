
import { Router, Request, Response } from "express";
import {
  getStockMovements,
  getStockBalances,
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

export default router;
