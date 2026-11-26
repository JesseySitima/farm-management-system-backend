
import { z } from "zod";

export const registerSchema = z.object({
  first_name: z.string().trim().min(2),
  last_name: z.string().trim().min(2),
  email: z.string().trim().email().toLowerCase(),
  phone: z.string().trim().optional(),
  password: z.string().min(8),
  role_id: z.string().uuid().optional(),
});

export const loginSchema = z.object({
  email: z.string().trim().email().toLowerCase(),
  password: z.string().min(1),
});

export const changePasswordSchema = z.object({
  current_password: z.string().min(1, "Current password is required"),
  new_password: z
    .string()
    .min(8, "New password must be at least 8 characters"),
});
