import React from "react";
import DashboardWidgets from "@/components/admin/DashboardWidgets";
import { recentOrders } from "@/data/adminMock";
import OrdersTable from "@/components/admin/OrdersTable";
import CountUpNumber from "@/components/ui/CountUpNumber";

const quickInsights = [
  {
    title: "Live Production Queue",
    value: "48",
    detail: "Active batches currently in stitching and finishing.",
  },
  {
    title: "Pending RFQs",
    value: "12",
    detail: "Quotes waiting for client approval.",
  },
  {
    title: "Incoming Shipments",
    value: "7",
    detail: "Fabric and trims arriving within 5 days.",
  },
];

const topClients = [
  { name: "Arcadia Apparel", value: "$132K", trend: "+18%" },
  { name: "Summit Sportswear", value: "$97K", trend: "+12%" },
  { name: "Velocity Streetwear", value: "$84K", trend: "+9%" },
];

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-[1.4fr,0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
                Admin Dashboard
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
                Monitor apparel production, order health, client performance,
                and shipment activity in one place.
              </p>
            </div>
            <button className="inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700">
              Create New Batch
            </button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {quickInsights.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950"
              >
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {item.title}
                </p>
                <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">
                  <CountUpNumber value={item.value} />
                </p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Top Clients
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                Revenue leaders
              </h2>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
              Updated daily
            </span>
          </div>
          <div className="mt-6 space-y-4">
            {topClients.map((client) => (
              <div
                key={client.name}
                className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-950"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {client.name}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Annual contract value
                    </p>
                  </div>
                  <span className="rounded-full bg-slate-200 px-3 py-1 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    {client.trend}
                  </span>
                </div>
                <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">
                  <CountUpNumber value={client.value} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DashboardWidgets />

      <section className="rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="border-b border-slate-200 px-4 py-4 dark:border-slate-700 sm:px-6 sm:py-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Recent Apparel Orders
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Latest submitted orders for performance wear, uniforms, and
                custom garments.
              </p>
            </div>
            <button className="inline-flex items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200">
              View full pipeline
            </button>
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <OrdersTable rows={recentOrders} />
        </div>
      </section>
    </div>
  );
}
