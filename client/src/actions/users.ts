"use server";

import { cookies } from "next/headers";
import { getUsersCollection } from "../../database/db";
import { verifyJwt } from "../../database/auth";

function requireAdminCookie(token?: string) {
  const user = token ? verifyJwt(token) : null;
  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized");
  }
  return user;
}

export async function getCurrentUserAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  return token ? verifyJwt(token) : null;
}

export async function listUsersAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  requireAdminCookie(token);

  const users = await getUsersCollection();
  const items = await users.find().toArray();

  return items.map((item: any) => {
    const { passwordHash, ...user } = item;
    return user;
  });
}
