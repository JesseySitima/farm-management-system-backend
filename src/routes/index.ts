import { Router } from "express";
import authRouter from "./auth.routes.js";

const router = Router();

router.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Farm Management API",
    version: "1.0.0",
  });
});

// Authentication routes
router.use("/auth", authRouter);

export default router;