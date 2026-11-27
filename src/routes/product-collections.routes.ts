import { Router } from "express";
import {
  createProductCollection,
  getProductCollections,
} from "../services/product-collections.service.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", authenticateToken, async (_req, res) => {
  try {
    const collections = await getProductCollections();

    res.status(200).json({
      data: collections,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch product collections",
    });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  try {
    const collection = await createProductCollection(req.body);

    res.status(201).json({
      message: "Product collection recorded successfully",
      data: collection,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to record product collection";

    res.status(400).json({ message });
  }
});

export default router;