import prisma from "@/lib/prisma";
export type UserRole = "admin" | "client";

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
    await prisma.user.upsert({
      where: { email: email.toLowerCase() },
      update: {
        name,
        role,
        updatedAt: new Date(),
      },
      create: {
        name,
        email: email.toLowerCase(),
        role,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error("Error syncing user to PostgreSQL via Prisma:", error);
  }

  return {
    sub: supabaseUser.id,
    email,
    name,
    role,
  };
}

export function verifyJwt(token: string): AuthTokenPayload | null {
  return null;
}

export const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
export async function hashPassword(password: string) {
  return password;
}
