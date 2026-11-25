
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { supabaseAdmin } from "../config/supabase.js";
import { authConfig } from "../config/auth.js";
import type {
  RegisterUserInput,
  LoginUserInput,
  AuthenticatedUser,
} from "../types/auth.types.js";

// REGISTER USER
export const registerUser = async (input: RegisterUserInput) => {
  const { first_name, last_name, email, phone, password, role_id } = input;

  // Check whether the email is already registered
  const { data: existingUser, error: existingUserError } = await supabaseAdmin
    .from("users")
    .select("id")
    .ilike("email", email)
    .maybeSingle();

  if (existingUserError) {
    throw new Error(existingUserError.message);
  }

  if (existingUser) {
    throw new Error("An account with this email already exists");
  }

  // Find requested role or default to Farm Worker
  let selectedRoleId: string;

  if (role_id) {
    const { data: role, error: roleError } = await supabaseAdmin
      .from("roles")
      .select("id")
      .eq("id", role_id)
      .eq("is_active", true)
      .maybeSingle();

    if (roleError) throw new Error(roleError.message);
    if (!role) throw new Error("Selected role does not exist or is inactive");

    selectedRoleId = role.id;
  } else {
    const { data: defaultRole, error: defaultRoleError } = await supabaseAdmin
      .from("roles")
      .select("id")
      .eq("name", "Farm Worker")
      .eq("is_active", true)
      .single();

    if (defaultRoleError || !defaultRole) {
      throw new Error("Default Farm Worker role was not found");
    }

    selectedRoleId = defaultRole.id;
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 12);

  // Create user
  const { data: newUser, error: createUserError } = await supabaseAdmin
    .from("users")
    .insert({
      first_name,
      last_name,
      email,
      phone: phone || null,
      password_hash: passwordHash,
      role_id: selectedRoleId,
    })
    .select("id, first_name, last_name, email, phone, role_id")
    .single();

  if (createUserError) {
    throw new Error(createUserError.message);
  }

  return newUser;
};

// LOGIN USER
export const loginUser = async (input: LoginUserInput) => {
  const { email, password } = input;

  // Find user by email
  const { data: user, error: userError } = await supabaseAdmin
    .from("users")
    .select("id, first_name, last_name, email, phone, password_hash, role_id, is_active")
    .ilike("email", email)
    .maybeSingle();

  if (userError) {
    throw new Error(userError.message);
  }

  if (!user) {
    throw new Error("Invalid email or password");
  }

  if (!user.is_active) {
    throw new Error("Your account is inactive");
  }

  // Verify password
  const passwordMatches = await bcrypt.compare(password, user.password_hash);

  if (!passwordMatches) {
    throw new Error("Invalid email or password");
  }

  // Retrieve role
  const { data: role, error: roleError } = await supabaseAdmin
    .from("roles")
    .select("name")
    .eq("id", user.role_id)
    .single();

  if (roleError || !role) {
    throw new Error("User role could not be found");
  }

  const authenticatedUser: AuthenticatedUser = {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    phone: user.phone,
    role_id: user.role_id,
    role_name: role.name,
  };

  // Generate JWT
  const token = jwt.sign(
    {
      sub: user.id,
      role_id: user.role_id,
      role_name: role.name,
    },
    authConfig.jwtSecret,
    {
      expiresIn: authConfig.jwtExpiresIn as jwt.SignOptions["expiresIn"],
    }
  );

  return {
    token,
    user: authenticatedUser,
  };
};
