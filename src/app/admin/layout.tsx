import React from "react";
import { redirect } from "next/navigation";
import { getCurrentUserAction } from "@/actions/users";
import Sidebar from "@/components/ui/Sidebar";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Dashboard",
};

const adminLinks = [
  { href: "/admin", label: "Dashboard", iconName: "dashboard" },
  { href: "/admin/orders", label: "Orders", iconName: "orders" },
  { href: "/admin/clients", label: "Clients", iconName: "clients" },
  { href: "/admin/production", label: "Production", iconName: "production" },
  { href: "/admin/products", label: "Products", iconName: "products" },
  { href: "/admin/invoices", label: "Invoices", iconName: "invoices" },
  { href: "/admin/payments", label: "Payments", iconName: "payments" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUserAction();

  if (!user || user.role !== "admin") {
    redirect("/login");
  }

  const adminUser = {
    name: user.name || "Admin User",
    email: user.email || "admin@speedxindustry.com",
    role: "Administrator",
    avatarUrl: user.avatarUrl,
  };

  return (
    <div className="flex h-screen overflow-hidden ">
      <Sidebar
        links={adminLinks}
        brandName="Speedx Admin"
        brandSubtitle="ERP Console"
        user={adminUser}
      />

      {/* Main Content Pane */}
      <div className="flex-1 h-full overflow-y-auto">
        <main className="p-6 md:p-8 pt-16 md:pt-8 flex-1">{children}</main>
      </div>
    </div>
  );
}


