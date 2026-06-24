"use client";
import React from "react";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white">
      <Sidebar />
      <div className="ml-64">
        <TopNav />
        <main className="p-6 pt-8">{children}</main>
      </div>
    </div>
  );
}
