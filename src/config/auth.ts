
const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error("Missing JWT_SECRET environment variable");
}

export const authConfig = {
  jwtSecret,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "15m",
};
