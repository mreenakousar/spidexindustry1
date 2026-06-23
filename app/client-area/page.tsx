"use client";

import Link from "next/link";
import { Package, Box, CreditCard, Bell } from "lucide-react";
import { Card } from "../../components/ui/card";
import { DataTable } from "../../components/ui/data-table";
import {
  quickActions,
  notifications,
  productionStages,
} from "../../data/clientPortal";

export default function ClientAreaPage() {
  const tableHeaders = [
    { key: "title", label: "Stage" },
    { key: "date", label: "Date" },
    { key: "status", label: "Status" },
  ];

  const tableData = productionStages.slice(0, 5).map((stage, idx) => ({
    id: String(idx + 1),
    title: stage.title,
    date: stage.date,
    status: (
      <span
        className={`rounded-full px-2.5 py-1 text-xs font-semibold inline-block ${
          stage.completed
            ? "bg-emerald-50 text-emerald-700"
            : "bg-amber-50 text-amber-700"
        }`}
      >
        {stage.completed ? "Completed" : "Pending"}
      </span>
    ),
  }));

  const headerActions = (
    <Link
      href="/client-area/production-tracker"
      className="text-sm font-semibold text-sky-600 hover:text-sky-700"
    >
      View full tracker
    </Link>
  );

  return (
    <div className="space-y-[clamp(1.5rem,3vw,2rem)]">
      <Card className="p-[clamp(1.25rem,2.5vw,2rem)] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[clamp(11px,1vw,12px)] font-semibold uppercase tracking-[0.24em] text-sky-600">
              Dashboard
            </p>
            <h1 className="mt-3 text-[clamp(1.5rem,2.5vw,1.875rem)] font-semibold text-slate-900 dark:text-white">
              Welcome back, John.
            </h1>
            <p className="mt-2 text-[clamp(13px,1.1vw,14px)] text-slate-600 dark:text-slate-300">
              Your premium manufacturing portal is ready to manage orders,
              production, invoices and shipments.
            </p>
          </div>
          <Card className="bg-slate-950 border-none px-[clamp(1.25rem,2vw,1.5rem)] py-[clamp(1rem,1.5vw,1.25rem)] text-white shadow-lg">
            <p className="text-[clamp(11px,1vw,12px)] uppercase tracking-[0.24em] text-slate-400">
              Premium client access
            </p>
            <p className="mt-4 text-[clamp(1.25rem,2vw,1.5rem)] font-semibold">Global Apparel</p>
          </Card>
        </div>
      </Card>

      <section className="grid gap-[clamp(1rem,2vw,1.5rem)] xl:grid-cols-4">
        {[
          { icon: Package, title: "Total Orders", value: "1,248", change: "+8.2% from last month" },
          { icon: Box, title: "Active Orders", value: "67", change: "4 active projects" },
          { icon: CreditCard, title: "Pending Payments", value: "$34,800", change: "3 invoices overdue" },
          { icon: Bell, title: "Production Alerts", value: "12", change: "2 high-priority items" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card variant={"primary"} key={i} className="relative overflow-hidden p-[clamp(1.25rem,2vw,1.5rem)]">
              {/* Subtle background icon texture */}
              <div className="absolute -top-3 -right-3 h-24 w-24 text-white/[0.07] dark:text-white/[0.04] pointer-events-none transform rotate-12">
                <Icon className="h-full w-full" />
              </div>

              <div className="flex flex-col justify-between h-full">
                <div>
                  <p className="text-[clamp(10px,0.9vw,11px)] font-semibold uppercase tracking-[0.24em] text-slate-300 dark:text-slate-400">
                    {stat.title}
                  </p>
                  <div className="mt-4 text-[clamp(1.5rem,2.5vw,1.875rem)] font-semibold text-white">
                    {stat.value}
                  </div>
                </div>
                <p className="mt-4 text-[clamp(12px,1.1vw,13px)] text-slate-300 dark:text-slate-400">{stat.change}</p>
              </div>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-[clamp(1rem,2vw,1.5rem)] xl:grid-cols-[1.4fr_0.6fr]">
        <div className="overflow-hidden bg-white rounded-3xl shadow-sm border border-slate-100">
          <DataTable
            heading="Latest production updates"
            TableHeaders={tableHeaders}
            TableData={tableData}
            currentPage={1}
            totalPages={1}
            onPageChange={() => {}}
            pageSize={5}
            totalEntries={productionStages.length}
            headerActions={headerActions}
          />
        </div>

        <div className="space-y-6">
          <Card className="p-[clamp(1.25rem,2.5vw,2rem)] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
            <h2 className="text-[clamp(15px,1.3vw,17px)] font-semibold text-slate-900 dark:text-white">
              Recent notifications
            </h2>
            <div className="mt-[clamp(1rem,1.5vw,1.25rem)] space-y-[clamp(0.75rem,1vw,1rem)]">
              {notifications.map((item) => (
                <Card
                  key={item.id}
                  className="border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-[clamp(0.875rem,1.2vw,1rem)]"
                >
                  <p className="text-[clamp(13px,1.2vw,14px)] font-semibold text-slate-900 dark:text-slate-100">{item.title}</p>
                  <p className="mt-1 text-[clamp(12px,1.1vw,13px)] text-slate-600 dark:text-slate-300">
                    {item.description}
                  </p>
                  <p className="mt-2 text-[clamp(10px,0.9vw,11px)] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                    {item.date}
                  </p>
                </Card>
              ))}
            </div>
          </Card>

          <Card className="p-[clamp(1.25rem,2.5vw,2rem)] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-[clamp(15px,1.3vw,17px)] font-semibold text-slate-900 dark:text-white">
                  Quick actions
                </h2>
                <p className="mt-2 text-[clamp(12px,1.1vw,13px)] text-slate-500 dark:text-slate-400">
                  Launch common tasks in one click.
                </p>
              </div>
            </div>
            <div className="mt-[clamp(1rem,1.5vw,1.25rem)] grid gap-[clamp(0.75rem,1vw,1rem)]">
              {quickActions.map((action) => (
                <Link
                  key={action.title}
                  href={action.href}
                  className="block"
                >
                  <Card className="border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-[clamp(0.875rem,1.2vw,1rem)] hover:bg-slate-100 dark:hover:bg-slate-800/80 transition duration-150">
                    <p className="text-[clamp(13px,1.2vw,14px)] font-semibold text-slate-900 dark:text-slate-100">{action.title}</p>
                    <p className="mt-1 text-[clamp(12px,1.1vw,13px)] font-normal text-slate-500 dark:text-slate-400">
                      {action.description}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
