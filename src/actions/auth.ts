"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { syncUserToDb, DEFAULT_ADMIN_EMAIL } from "@/database/auth";

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

export async function loginAction(input: unknown): Promise<AuthResult> {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Invalid login details." };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
    });

    if (error) {
      return { ok: false, error: error.message };
    }

    if (!data?.user) {
      return { ok: false, error: "Invalid credentials." };
    }

    const user = data.user;
    
    // Assign admin role if email matches system admin email
    const isSystemAdmin = user.email?.toLowerCase() === DEFAULT_ADMIN_EMAIL.toLowerCase();
    if (isSystemAdmin && user.user_metadata?.role !== "admin") {
      await supabase.auth.updateUser({
        data: { role: "admin" }
      });
      user.user_metadata = { ...user.user_metadata, role: "admin" };
    }

    await syncUserToDb(user);
    const role = isSystemAdmin ? "admin" : (user.user_metadata?.role || "client");

    return { ok: true, role };
  } catch (err: any) {
    return { ok: false, error: err?.message || "Unable to login at this time." };
  }
}

export async function signupAction(input: unknown): Promise<AuthResult> {
  const parsed = signupSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Invalid signup details." };
  }

  try {
    const supabase = await createClient();
    
    // Default role is client unless they are the system admin email
    const isSystemAdmin = parsed.data.email.toLowerCase() === DEFAULT_ADMIN_EMAIL.toLowerCase();
    const role = isSystemAdmin ? "admin" : "client";

    const { data, error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/callback`,
        data: {
          name: parsed.data.name,
          role,
        },
      },
    });

    if (error) {
      return { ok: false, error: error.message };
    }

    if (!data?.user) {
      return { ok: false, error: "Unable to create account." };
    }

    await syncUserToDb(data.user);

    return { ok: true, role };
  } catch (err: any) {
    return { ok: false, error: err?.message || "Unable to create account at this time." };
  }
}

export async function logoutAction() {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      return { ok: false, error: error.message };
    }
    return { ok: true };
  } catch (error: any) {
    return { ok: false, error: error?.message || "Unable to logout." };
  }
}
