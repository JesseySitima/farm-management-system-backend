
import { Router, Request, Response } from "express";
import {
  createSupplier,
  getSuppliers,
} from "../services/suppliers.service.js";

const router = Router();

// Create supplier
router.post("/", async (req: Request, res: Response) => {
  try {
    const supplier = await createSupplier(req.body);

    return res.status(201).json({
      success: true,
      message: "Supplier created successfully",
      data: supplier,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create supplier",
    });
  }
});

// Get all suppliers
router.get("/", async (_req: Request, res: Response) => {
  try {
    const suppliers = await getSuppliers();

    return res.status(200).json({
      success: true,
      message: "Suppliers retrieved successfully",
      data: suppliers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to retrieve suppliers",
    });
  }
});

export default router;
