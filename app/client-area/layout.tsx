import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyJwt } from "../../database/auth";
import Sidebar from "../../components/ui/Sidebar";

export const metadata = {
  title: "Client Portal | Speedx Industry",
  description:
    "Premium B2B client portal for apparel manufacturing, orders, production tracking, invoices, and support.",
};

const clientLinks = [
  { href: "/client-area", label: "Dashboard", iconName: "dashboard" },
  { href: "/client-area/my-orders", label: "My Orders", iconName: "box" },
  {
    href: "/client-area/production-tracker",
    label: "Production Tracker",
    iconName: "package",
  },
  {
    href: "/client-area/product-library",
    label: "Product Library",
    iconName: "products",
  },
  { href: "/client-area/invoices", label: "Invoices", iconName: "invoices" },
  { href: "/client-area/payments", label: "Payments", iconName: "payments" },
  {
    href: "/client-area/shipment-tracking",
    label: "Shipment Tracking",
    iconName: "shipments",
  },
  { href: "/client-area/messages", label: "Messages", iconName: "messages" },
];

export default async function ClientAreaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user = token ? verifyJwt(token) : null;

  if (!user) {
    redirect("/login");
  }

  const clientUser = {
    name: user.name || "Client User",
    email: user.email || "client@speedxindustry.com",
    role: "Premium Buyer",
  };

  return (
    <div className="flex h-screen overflow-hidden ">
      <Sidebar
        links={clientLinks}
        brandName="Speedx Portal"
        brandSubtitle="Client Center"
        user={clientUser}
      />

      {/* Main Content Pane */}
      <div className="flex-1 h-full overflow-y-auto">
        <main className="p-6 md:p-8 pt-16 md:pt-8 flex-1">{children}</main>
      </div>
    </div>
  );
}


