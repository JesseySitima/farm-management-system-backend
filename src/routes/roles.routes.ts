
import { Router } from "express";
import { supabaseAdmin } from "../config/supabase.js";

const router = Router();

// GET ACTIVE ROLES
router.get("/", async (_req, res) => {
  try {
    const { data: roles, error } = await supabaseAdmin
      .from("roles")
      .select("id, name, description")
      .eq("is_active", true)
      .order("name", { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    res.status(200).json({
      success: true,
      message: "Roles retrieved successfully",
      data: roles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to retrieve roles",
    });
  }
});

export default router;
