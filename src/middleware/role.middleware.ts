
import type { Request, Response, NextFunction } from "express";

export const requireRole = (...allowedRoles: string[]) => {
  return (_req: Request, res: Response, next: NextFunction) => {
    const authenticatedUser = res.locals.authenticatedUser;

    if (!authenticatedUser) {
      res.status(401).json({
        success: false,
        message: "Authentication is required",
      });
      return;
    }

    if (!allowedRoles.includes(authenticatedUser.role_name)) {
      res.status(403).json({
        success: false,
        message: "You do not have permission to perform this action",
      });
      return;
    }

    next();
  };
};
