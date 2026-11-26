import { Router } from "express";
import authRouter from "./auth.routes.js";
import rolesRouter from "./roles.routes.js";
import usersRouter from "./users.routes.js";

const router = Router();

router.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Farm Management API",
    version: "1.0.0",
  });
});

router.use("/auth", authRouter);
router.use("/roles", rolesRouter);
router.use("/users", usersRouter);

export default router;