"use client";
import React from "react";
import StatsCard from "./StatsCard";
import { stats } from "../../data/adminMock";

export default function DashboardWidgets() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard title="Total Clients" value={stats.totalClients} />
        <StatsCard title="Total Orders" value={stats.totalOrders} />
        <StatsCard
          title="Orders In Production"
          value={stats.ordersInProduction}
        />
        <StatsCard title="Pending Quotations" value={stats.pendingQuotations} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
          <h3 className="text-lg font-semibold">Revenue Analytics</h3>
          <div className="mt-4 text-sm text-slate-500">(Chart placeholder)</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
          <h3 className="text-lg font-semibold">Top Products</h3>
          <div className="mt-4 text-sm text-slate-500">(List placeholder)</div>
        </div>
      </div>
    </div>
  );
}
