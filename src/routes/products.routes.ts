import { Router } from "express";
import {
  createProduct,
  getProducts,
} from "../services/products.service.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", authenticateToken, async (_req, res) => {
  try {
    const products = await getProducts();

    res.status(200).json({
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "Failed to fetch products",
    });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  try {
    const product = await createProduct(req.body);

    res.status(201).json({
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "Failed to create product",
    });
  }
});

export default router;