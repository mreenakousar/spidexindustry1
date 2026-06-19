import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PortalShell from "../../components/client-portal/PortalShell";
import { verifyJwt } from "../../database/auth";

export const metadata = {
  title: "Client Portal | Speedx Industry",
  description:
    "Premium B2B client portal for apparel manufacturing, orders, production tracking, invoices, and support.",
};

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

  return <PortalShell>{children}</PortalShell>;
}
