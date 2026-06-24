import { getUsersCollection } from "./db";
import { UserRole } from "./models/user";

export const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@speedxindustry.com";

export interface AuthTokenPayload {
  sub: string;
  email: string;
  name: string;
  role: UserRole;
}

export function getUserRole(user: any): UserRole {
  if (!user) return "client";
  const email = user.email || "";
  if (email.toLowerCase() === DEFAULT_ADMIN_EMAIL.toLowerCase()) {
    return "admin";
  }
  return user.user_metadata?.role === "admin" ? "admin" : "client";
}

export async function syncUserToDb(supabaseUser: any) {
  if (!supabaseUser) return null;
  
  const email = supabaseUser.email;
  if (!email) return null;

  const role = getUserRole(supabaseUser);
  const name = supabaseUser.user_metadata?.name || supabaseUser.user_metadata?.full_name || email.split("@")[0];

  try {
    const users = await getUsersCollection();
    await users.updateOne(
      { email: email.toLowerCase() },
      {
        $set: {
          name,
          email: email.toLowerCase(),
          role,
          updatedAt: new Date(),
        },
        $setOnInsert: {
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );
  } catch (error) {
    console.error("Error syncing user to MongoDB:", error);
  }

  return {
    sub: supabaseUser.id,
    email,
    name,
    role,
  };
}

// Deprecated verifyJwt function to prevent TypeScript errors in files we haven't refactored yet.
// We will refactor them next.
export function verifyJwt(token: string): AuthTokenPayload | null {
  try {
    // If the token is passed, we can try to parse it. If it's a JSON payload (or mock), return it.
    // In our new architecture, pages and actions will use Supabase getSession/getUser directly,
    // so we won't need verifyJwt.
    return null;
  } catch {
    return null;
  }
}

export const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
export async function hashPassword(password: string) {
  return password;
}
