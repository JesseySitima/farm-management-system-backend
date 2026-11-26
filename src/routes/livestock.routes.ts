import { Router } from "express";
import {
  createLivestock,
  getLivestock,
} from "../services/livestock.service.js";

const router = Router();

// REGISTER LIVESTOCK
router.post("/", async (req, res) => {
  try {
    const livestock = await createLivestock(req.body);

    res.status(201).json({
      success: true,
      message: "Livestock registered successfully",
      data: livestock,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to register livestock",
    });
  }
});

// GET ALL LIVESTOCK
router.get("/", async (_req, res) => {
  try {
    const livestock = await getLivestock();

    res.status(200).json({
      success: true,
      message: "Livestock retrieved successfully",
      data: livestock,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to retrieve livestock",
    });
  }
});

export default router;