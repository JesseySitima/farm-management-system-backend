
import { supabaseAdmin } from "../config/supabase.js";

// GET ALL USERS
export const getUsers = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;

  // Retrieve users with pagination
  const {
    data: users,
    error: usersError,
    count,
  } = await supabaseAdmin
    .from("users")
    .select(
      "id, first_name, last_name, email, phone, role_id, is_active, must_change_password, last_login_at, created_at",
      { count: "exact" }
    )
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (usersError) {
    throw new Error(usersError.message);
  }

  // Retrieve role names
  const roleIds = [...new Set(users.map((user) => user.role_id))];

  const { data: roles, error: rolesError } = await supabaseAdmin
    .from("roles")
    .select("id, name")
    .in("id", roleIds);

  if (rolesError) {
    throw new Error(rolesError.message);
  }

  // Attach role names to users
  const usersWithRoles = users.map((user) => ({
    ...user,
    role_name:
      roles.find((role) => role.id === user.role_id)?.name ?? null,
  }));

  return {
    users: usersWithRoles,
    pagination: {
      page,
      limit,
      total: count ?? 0,
      totalPages: Math.ceil((count ?? 0) / limit),
    },
  };
};
