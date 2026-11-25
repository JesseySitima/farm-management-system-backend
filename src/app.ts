
import express from "express";
import cors from "cors";
import helmet from "helmet";
import apiRouter from "./routes/index.js";
import { Scalar } from "@scalar/express-api-reference";
import { openApiDocument } from "./docs/openapi.js";

const app = express();

// Security middleware
app.use(helmet());

// Request handling
app.use(cors());
app.use(express.json());

// API Documentation
app.use(
  "/api-docs",
  (_req, res, next) => {
    res.removeHeader("Content-Security-Policy");
    next();
  },
  Scalar({
    spec: {
      content: openApiDocument,
    },
  })
);

// Health check
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Farm Management API is running",
  });
});

// API routes
app.use("/api", apiRouter);

export default app;
