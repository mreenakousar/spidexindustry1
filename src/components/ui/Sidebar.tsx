"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Menu, X, LogOut,
  LayoutDashboard, ShoppingCart, FileSpreadsheet, Users, Factory, 
  Warehouse, Shirt, FileCode, Receipt, CreditCard, Truck, 
  MessageSquare, LifeBuoy, Users2, BarChart3, Globe, Bell, Settings,
  Box, Package, FileText, Building2
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  dashboard: LayoutDashboard,
  orders: ShoppingCart,
  rfqs: FileSpreadsheet,
  clients: Users,
  production: Factory,
  inventory: Warehouse,
  products: Shirt,
  "tech-packs": FileCode,
  invoices: Receipt,
  payments: CreditCard,
  shipments: Truck,
  messages: MessageSquare,
  "support-tickets": LifeBuoy,
  employees: Users2,
  reports: BarChart3,
  "website-leads": Globe,
  notifications: Bell,
  settings: Settings,
  box: Box,
  package: Package,
  fileText: FileText,
  building: Building2,
};

interface SidebarLink {
  href: string;
  label: string;
  iconName?: string;
}

interface SidebarProps {
  links: SidebarLink[];
  brandName?: string;
  brandSubtitle?: string;
  user?: {
    name: string;
    email: string;
    role?: string;
    avatarUrl?: string;
  };
}

export default function Sidebar({
  links,
  brandName = "Speedx ERP",
  brandSubtitle = "Control Panel",
  user,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <>
      {/* Mobile Toggle Hamburger Button (hidden when sidebar is open) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-50 md:hidden flex items-center justify-center h-9 w-9 bg-slate-900 text-slate-300"
          aria-label="Open menu"
        >
          <Menu className="h-[clamp(1rem,4vw,1.25rem)] w-[clamp(1rem,4vw,1.25rem)]" />
        </button>
      )}

      {/* Backdrop overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm md:hidden transition-opacity duration-300"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen w-[min(78vw,18rem)] md:w-72 flex flex-col bg-slate-950 text-slate-200 border-r border-slate-900 transition-transform duration-300 ease-in-out shadow-2xl md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 md:h-20 items-center justify-between px-4 md:px-6 border-b border-slate-900 bg-slate-950/80">
          <div className="flex items-center gap-3 min-w-0">
            
            <Link href="/" className="min-w-0">
              
              <h2 className="text-[clamp(0.8rem,2.2vw,0.95rem)] font-bold text-white tracking-wider uppercase leading-none truncate">
                {brandName}
              </h2>
              <span className="text-[clamp(0.55rem,1.4vw,0.625rem)] text-slate-500 uppercase tracking-widest mt-1 block truncate">
                {brandSubtitle}
              </span>
            </Link>
          </div>
          
          {/* Close button inside sidebar (visible only on mobile) */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition active:scale-95 shrink-0"
            aria-label="Close menu"
          >
            <X className="h-[clamp(1rem,4vw,1.25rem)] w-[clamp(1rem,4vw,1.25rem)]" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav
          className="flex-1 overflow-y-auto px-3 md:px-4 py-5 md:py-6 space-y-1 md:space-y-1.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {links.map((item) => {
            const Icon = item.iconName ? iconMap[item.iconName] : undefined;
            // Check if active: exact match or starts with (excluding dashboard root)
            const active =
              pathname === item.href ||
              (item.href !== "/admin" &&
                item.href !== "/client-area" &&
                pathname?.startsWith(item.href + "/"));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 md:px-4 py-2.5 md:py-3 text-[clamp(0.75rem,1.9vw,0.875rem)] font-medium transition-all duration-200 group ${
                  active
                    ? "bg-blue-600/10 text-blue-400 font-semibold shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                {Icon && (
                  <Icon
                    className={`h-[clamp(0.95rem,2.4vw,1.125rem)] w-[clamp(0.95rem,2.4vw,1.125rem)] shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                      active ? "text-blue-500" : "text-slate-400 group-hover:text-slate-200"
                    }`}
                  />
                )}
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User profile & Logout footer */}
        {user && (
          <div className="p-3 md:p-4 border-t border-slate-900 bg-slate-950/40">
            <div className="flex items-center justify-between gap-2 md:gap-3 p-2.5 md:p-3  bg-slate-900/50 border border-slate-900/80 shadow-lg">
              <div className="flex items-center gap-2.5 md:gap-3 min-w-0">
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="h-9 w-9 md:h-10 md:w-10 rounded-full object-cover shadow-md shrink-0 border border-slate-800"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="h-9 w-9 md:h-10 md:w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-bold text-[clamp(0.65rem,1.6vw,0.8rem)] flex items-center justify-center shadow-md shrink-0">
                    {getInitials(user.name)}
                  </div>
                )}
                <div className="min-w-0 text-left">
                  <p className="text-[clamp(0.65rem,1.7vw,0.75rem)] font-semibold text-white truncate leading-tight">
                    {user.name}
                  </p>
                  <p className="text-[clamp(0.55rem,1.4vw,0.625rem)] text-slate-500 truncate mt-0.5 leading-none">
                    {user.email}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition shrink-0"
                title="Log out"
              >
                <LogOut className="h-[clamp(0.95rem,2.4vw,1.125rem)] w-[clamp(0.95rem,2.4vw,1.125rem)]" />
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}