import { Router } from "express";
import {
  createSpecies,
  getSpecies,
} from "../services/species.service.js";

const router = Router();

// CREATE SPECIES
router.post("/", async (req, res) => {
  try {
    const species = await createSpecies(req.body);

    res.status(201).json({
      success: true,
      message: "Species created successfully",
      data: species,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create species",
    });
  }
});

// GET ALL SPECIES
router.get("/", async (_req, res) => {
  try {
    const species = await getSpecies();

    res.status(200).json({
      success: true,
      message: "Species retrieved successfully",
      data: species,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to retrieve species",
    });
  }
});

export default router;