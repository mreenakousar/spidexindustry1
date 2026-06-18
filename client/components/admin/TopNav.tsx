"use client";
import React from "react";
import LogoutButton from "../../src/components/ui/LogoutButton";

export default function TopNav() {
  return (
    <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <button className="text-slate-600 dark:text-slate-200">☰</button>
        <div className="relative">
          <input
            placeholder="Search..."
            className="px-3 py-2 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-slate-600 dark:text-slate-200">🔔</button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-300" />
          <div className="text-sm text-slate-700 dark:text-slate-200">
            Admin
          </div>
        </div>
        <LogoutButton className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800" />
      </div>
    </header>
  );
}
