"use server";

import { createClient } from "@/lib/supabase/server";
import prisma from "@/lib/prisma";

export async function getCurrentUserAction() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    // Role source of truth: app_metadata.role (set server-side / SQL only)
    const role: string = user.app_metadata?.role || "client";
    const name: string =
      user.user_metadata?.name ||
      user.user_metadata?.full_name ||
      user.email?.split("@")[0] ||
      "";
    const avatarUrl: string =
      user.user_metadata?.avatar_url ||
      user.user_metadata?.picture ||
      "";

    return {
      sub: user.id,
      email: user.email || "",
      name,
      role,
      avatarUrl,
    };
  } catch (error) {
    console.error("Failed to get current user:", error);
    return null;
  }
}

export async function listUsersAction() {
  const currentUser = await getCurrentUserAction();
  if (!currentUser || currentUser.role !== "admin") {
    throw new Error("Unauthorized");
  }

  try {
    const items = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });

    return items.map((item: any) => {
      const { passwordHash, ...user } = item;
      return user;
    });
  } catch (error) {
    console.error("Failed to list users:", error);
    return [];
  }
}
