import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRole } from "./models/user";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const JWT_EXPIRATION = "7d";
export const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@email";
export const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export interface AuthTokenPayload {
  sub: string;
  email: string;
  name: string;
  role: UserRole;
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}

export function signJwt(payload: AuthTokenPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
}

export function verifyJwt(token: string): AuthTokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
  } catch {
    return null;
  }
}
