"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LogoutButton from "../../src/components/ui/LogoutButton";
import {
  LayoutDashboard,
  Box,
  Package,
  FileText,
  CreditCard,
  Truck,
  MessageCircle,
  Bell,
  LifeBuoy,
  Building2,
  Settings,
  Search,
  Menu,
  ChevronDown,
} from "lucide-react";

const portalNav = [
  { href: "/client-area", label: "Dashboard", icon: LayoutDashboard },
  { href: "/client-area/my-orders", label: "My Orders", icon: Box },
  {
    href: "/client-area/production-tracker",
    label: "Production Tracker",
    icon: Package,
  },
  {
    href: "/client-area/quotations",
    label: "Quotations (RFQs)",
    icon: FileText,
  },
  {
    href: "/client-area/product-library",
    label: "Product Library",
    icon: FileText,
  },
  { href: "/client-area/tech-packs", label: "Tech Packs", icon: FileText },
  { href: "/client-area/invoices", label: "Invoices", icon: FileText },
  { href: "/client-area/payments", label: "Payments", icon: CreditCard },
  {
    href: "/client-area/shipment-tracking",
    label: "Shipment Tracking",
    icon: Truck,
  },
  { href: "/client-area/messages", label: "Messages", icon: MessageCircle },
  { href: "/client-area/notifications", label: "Notifications", icon: Bell },

  {
    href: "/client-area/company-profile",
    label: "Company Profile",
    icon: Building2,
  },
  { href: "/client-area/settings", label: "Settings", icon: Settings },
];

export default function PortalShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="md:flex">
        <aside className="hidden md:flex md:w-72 md:flex-col md:fixed md:h-screen md:bg-slate-950 md:text-slate-200">
          <div className="flex h-20 items-center px-6 border-b border-slate-800">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                Speedx Industry
              </p>
              <h1 className="text-xl font-semibold">Client Portal</h1>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <div className="rounded-3xl bg-slate-900 p-5 shadow-lg shadow-slate-950/10">
              <p className="text-xs uppercase tracking-[0.24em] text-sky-300">
                Account
              </p>
              <p className="mt-3 text-sm text-slate-100">Premium Buyer</p>
              <p className="text-sm text-slate-400">john.doe@speedx.com</p>
            </div>
            <nav className="mt-8 space-y-1">
              {portalNav.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                      active
                        ? "bg-slate-800 text-white shadow-sm shadow-slate-950/10"
                        : "text-slate-300 hover:bg-slate-900 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        <div className="flex-1 md:ml-72">
          <div className="sticky top-0 z-40 flex items-center justify-between gap-3 bg-slate-100 px-4 py-4 shadow-sm md:px-8">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen((prev) => !prev)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-300 bg-white text-slate-700 shadow-sm md:hidden"
                aria-label="Open sidebar"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="relative hidden md:flex md:items-center md:rounded-2xl md:border md:border-slate-300 md:bg-white md:px-4 md:py-3">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  type="search"
                  placeholder="Search portal..."
                  className="ml-3 w-full bg-transparent text-sm text-slate-700 outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button className="hidden rounded-2xl bg-slate-950 px-4 py-2 text-sm text-white md:inline-flex">
                Quick Actions
              </button>
              <button
                aria-label="View notifications"
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-300 bg-white text-slate-700"
              >
                <Bell className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setProfileMenuOpen((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 sm:gap-3"
              >
                <div className="h-9 w-9 rounded-full bg-slate-700 text-white grid place-items-center">
                  JD
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold">John Doe</p>
                  <p className="text-xs text-slate-500">Buyer</p>
                </div>
                <ChevronDown className="h-4 w-4 text-slate-500" />
              </button>
              <LogoutButton className="hidden rounded-2xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-500 md:inline-flex" />
            </div>
          </div>

          {sidebarOpen ? (
            <div className="md:hidden">
              <div
                className="fixed inset-0 z-50 bg-slate-900/60"
                onClick={() => setSidebarOpen(false)}
              />
              <aside className="fixed inset-y-0 left-0 z-50 w-72 overflow-y-auto bg-slate-950 p-6 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                      Portal
                    </p>
                    <p className="text-lg font-semibold text-white">
                      Client area
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="rounded-2xl border border-slate-800 bg-slate-900 px-3 py-2 text-slate-300"
                  >
                    Close
                  </button>
                </div>

                <nav className="mt-8 space-y-1">
                  {portalNav.map((item) => {
                    const Icon = item.icon;
                    const active = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                          active
                            ? "bg-slate-800 text-white"
                            : "text-slate-300 hover:bg-slate-900 hover:text-white"
                        }`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
                <LogoutButton className="mt-8 w-full rounded-2xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-500" />
              </aside>
            </div>
          ) : null}

          <main className="px-4 py-6 md:px-8 md:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
