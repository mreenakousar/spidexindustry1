import React from "react";
import AdminShell from "../../components/admin/AdminShell";

export const metadata = {
  title: "Admin Dashboard",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Bypass authentication check to allow direct access
  return <AdminShell>{children}</AdminShell>;
}
