import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminShell from "../../components/admin/AdminShell";
import { verifyJwt } from "../../database/auth";

export const metadata = {
  title: "Admin Dashboard",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user = token ? verifyJwt(token) : null;

  if (!user || user.role !== "admin") {
    redirect("/login");
  }

  return <AdminShell>{children}</AdminShell>;
}
