import React from "react";
import Sidebar from "../../components/ui/Sidebar";

export const metadata = {
  title: "Admin Dashboard",
};

const adminLinks = [
  { href: "/admin", label: "Dashboard", iconName: "dashboard" },
  { href: "/admin/orders", label: "Orders", iconName: "orders" },
  { href: "/admin/rfqs", label: "RFQs", iconName: "rfqs" },
  { href: "/admin/clients", label: "Clients", iconName: "clients" },
  { href: "/admin/production", label: "Production", iconName: "production" },
  { href: "/admin/inventory", label: "Inventory", iconName: "inventory" },
  { href: "/admin/products", label: "Products", iconName: "products" },
  { href: "/admin/tech-packs", label: "Tech Packs", iconName: "tech-packs" },
  { href: "/admin/invoices", label: "Invoices", iconName: "invoices" },
  { href: "/admin/payments", label: "Payments", iconName: "payments" },
  { href: "/admin/shipments", label: "Shipments", iconName: "shipments" },
  { href: "/admin/messages", label: "Messages", iconName: "messages" },
  { href: "/admin/support-tickets", label: "Support Tickets", iconName: "support-tickets" },
  { href: "/admin/employees", label: "Employees", iconName: "employees" },
  { href: "/admin/reports", label: "Reports", iconName: "reports" },
  { href: "/admin/website-leads", label: "Website Leads", iconName: "website-leads" },
  { href: "/admin/notifications", label: "Notifications", iconName: "notifications" },
  { href: "/admin/settings", label: "Settings", iconName: "settings" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white">
      <Sidebar
        links={adminLinks}
        brandName="Speedx Admin"
        brandSubtitle="ERP Console"
        user={{
          name: "Admin User",
          email: "admin@speedxindustry.com",
          role: "Administrator",
        }}
      />

      {/* Main Content Pane */}
      <div className="flex-1 h-full overflow-y-auto">
        <main className="p-6 md:p-8 pt-16 md:pt-8 flex-1">{children}</main>
      </div>
    </div>
  );
}


