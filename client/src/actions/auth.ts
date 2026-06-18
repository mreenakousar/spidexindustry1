"use server";

import { cookies } from "next/headers";
import { z } from "zod";
import { ensureAdminUser, getUsersCollection } from "../../database/db";
import { DEFAULT_ADMIN_EMAIL, hashPassword, signJwt, verifyPassword } from "../../database/auth";

const allowedEmail = z.string().trim().refine((value) => {
  return value === DEFAULT_ADMIN_EMAIL || z.string().email().safeParse(value).success;
}, "Invalid email address.");

const loginSchema = z.object({
  email: allowedEmail,
  password: z.string().min(6),
});

const signupSchema = z.object({
  name: z.string().min(2),
  email: allowedEmail,
  password: z.string().min(6),
});

type AuthResult =
  | { ok: true; role: "admin" | "client" }
  | { ok: false; error: string };

async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function loginAction(input: unknown): Promise<AuthResult> {
  await ensureAdminUser();

  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Invalid login details." };
  }

  const users = await getUsersCollection();
  const user = await users.findOne({ email: parsed.data.email });

  if (!user) {
    return { ok: false, error: "Invalid credentials." };
  }

  const isValid = await verifyPassword(parsed.data.password, user.passwordHash);
  if (!isValid) {
    return { ok: false, error: "Invalid credentials." };
  }

  const token = signJwt({
    sub: user._id?.toString() ?? user.email,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  await setAuthCookie(token);
  return { ok: true, role: user.role };
}

export async function signupAction(input: unknown): Promise<AuthResult> {
  await ensureAdminUser();

  const parsed = signupSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Invalid signup details." };
  }

  const users = await getUsersCollection();
  if (parsed.data.email.toLowerCase() === DEFAULT_ADMIN_EMAIL.toLowerCase()) {
    return {
      ok: false,
      error: "Use the admin login for this account.",
    };
  }

  const existing = await users.findOne({ email: parsed.data.email });
  if (existing) {
    return { ok: false, error: "A user with that email already exists." };
  }

  const passwordHash = await hashPassword(parsed.data.password);
  await users.insertOne({
    name: parsed.data.name,
    email: parsed.data.email,
    passwordHash,
    role: "client",
    createdAt: new Date(),
  });

  const token = signJwt({
    sub: parsed.data.email,
    email: parsed.data.email,
    name: parsed.data.name,
    role: "client",
  });

  await setAuthCookie(token);
  return { ok: true, role: "client" };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.set("token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return { ok: true };
}
