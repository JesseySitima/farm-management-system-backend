
import { Router } from "express";
import { registerSchema, loginSchema, changePasswordSchema } from "../utils/auth.validation.js";
import { registerUser, loginUser, changePassword } from "../services/auth.service.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { supabaseAdmin } from "../config/supabase.js";

const router = Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    const user = await registerUser(validatedData);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Registration failed",
    });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const result = await loginUser(validatedData);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error instanceof Error ? error.message : "Login failed",
    });
  }
});

// GET CURRENT AUTHENTICATED USER
router.get("/me", authenticateToken, async (_req, res) => {
  try {
    const authenticatedUser = res.locals.authenticatedUser;

    // Retrieve user details
    const { data: user, error: userError } = await supabaseAdmin
      .from("users")
      .select("id, first_name, last_name, email, phone, role_id")
      .eq("id", authenticatedUser.id)
      .eq("is_active", true)
      .single();

    if (userError || !user) {
      res.status(404).json({
        success: false,
        message: "User not found or inactive",
      });
      return;
    }

    // Retrieve user's role
    const { data: role, error: roleError } = await supabaseAdmin
      .from("roles")
      .select("name")
      .eq("id", user.role_id)
      .single();

    if (roleError || !role) {
      res.status(404).json({
        success: false,
        message: "User role could not be found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        role_id: user.role_id,
        role_name: role.name,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error
        ? error.message
        : "Failed to retrieve user",
    });
  }
});

// CHANGE PASSWORD
router.post("/change-password", authenticateToken, async (req, res) => {
  try {
    const validatedData = changePasswordSchema.parse(req.body);
    const authenticatedUser = res.locals.authenticatedUser;

    const result = await changePassword(
      authenticatedUser.id,
      validatedData.current_password,
      validatedData.new_password
    );

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error
        ? error.message
        : "Password change failed",
    });
  }
});

export default router;
