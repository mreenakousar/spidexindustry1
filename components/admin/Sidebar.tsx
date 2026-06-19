"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  "dashboard",
  "orders",
  "rfqs",
  "clients",
  "production",
  "inventory",
  "products",
  "tech-packs",
  "invoices",
  "payments",
  "shipments",
  "messages",
  "support-tickets",
  "employees",
  "reports",
  "website-leads",
  "notifications",
  "settings",
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          Admin ERP
        </h2>
      </div>
      <nav className="h-[calc(100vh-64px)] overflow-auto p-4">
        <ul className="space-y-1">
          {items.map((it) => {
            const href = it === "dashboard" ? "/admin" : `/admin/${it}`;
            const isActive =
              pathname === href || pathname?.startsWith(href + "/");
            return (
              <li key={it}>
                <Link
                  href={href}
                  className={
                    "block px-3 py-2 rounded " +
                    (isActive
                      ? "bg-slate-100 dark:bg-slate-800 font-semibold text-slate-900 dark:text-white"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200")
                  }
                  aria-current={isActive ? "page" : undefined}
                >
                  {it
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
