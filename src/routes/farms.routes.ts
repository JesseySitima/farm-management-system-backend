import { Router } from "express";
import {
  createFarm,
  getFarms,
} from "../services/farms.service.js";

const router = Router();

// CREATE FARM
router.post("/", async (req, res) => {
  try {
    const farm = await createFarm(req.body);

    res.status(201).json({
      success: true,
      message: "Farm created successfully",
      data: farm,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create farm",
    });
  }
});

// GET ALL FARMS
router.get("/", async (_req, res) => {
  try {
    const farms = await getFarms();

    res.status(200).json({
      success: true,
      message: "Farms retrieved successfully",
      data: farms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to retrieve farms",
    });
  }
});

export default router;