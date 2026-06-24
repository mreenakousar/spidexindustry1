"use server";

import { createClient } from "../../lib/supabase/server";
import { getUsersCollection } from "../../database/db";
import { getUserRole } from "../../database/auth";

export async function getCurrentUserAction() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const role = getUserRole(user);
    return {
      sub: user.id,
      email: user.email || "",
      name: user.user_metadata?.name || user.user_metadata?.full_name || user.email?.split("@")[0] || "",
      role,
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
    const users = await getUsersCollection();
    const items = await users.find().toArray();

    return items.map((item: any) => {
      const { passwordHash, ...user } = item;
      return user;
    });
  } catch (error) {
    console.error("Failed to list users:", error);
    return [];
  }
}
