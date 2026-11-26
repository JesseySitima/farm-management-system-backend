import { Router } from "express";
import {
  createLivestockFlock,
  getLivestockFlocks,
} from "../services/livestock-flocks.service.js";

const router = Router();

// CREATE LIVESTOCK FLOCK
router.post("/", async (req, res) => {
  try {
    const flock = await createLivestockFlock(req.body);

    res.status(201).json({
      success: true,
      message: "Livestock flock registered successfully",
      data: flock,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to register livestock flock",
    });
  }
});

// GET ALL LIVESTOCK FLOCKS
router.get("/", async (_req, res) => {
  try {
    const flocks = await getLivestockFlocks();

    res.status(200).json({
      success: true,
      message: "Livestock flocks retrieved successfully",
      data: flocks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to retrieve livestock flocks",
    });
  }
});

export default router;