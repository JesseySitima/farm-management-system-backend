import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { authConfig } from "../config/auth.js";

export interface AuthenticatedRequestUser {
  id: string;
  role_id: string;
  role_name: string;
  must_change_password: boolean;
}

export const authenticateToken = (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = _req.headers.authorization;

    // Check for Authorization header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "Authentication token is required",
      });
      return;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Invalid authentication token",
      });
      return;
    }

    // Verify JWT
    const decoded = jwt.verify(token, authConfig.jwtSecret);
    if (
      typeof decoded === "string" ||
      !decoded.sub ||
      typeof decoded.role_id !== "string" ||
      typeof decoded.role_name !== "string" ||
      typeof decoded.must_change_password !== "boolean"
    ) {
      res.status(401).json({
        success: false,
        message: "Invalid authentication token",
      });
      return;
    }

    // Store authenticated user information for subsequent handlers
    res.locals.authenticatedUser = {
  id: decoded.sub,
  role_id: decoded.role_id,
  role_name: decoded.role_name,
  must_change_password: decoded.must_change_password,
} satisfies AuthenticatedRequestUser;

    next();
  } catch {
    res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token",
    });
  }
};
