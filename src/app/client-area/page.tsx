"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, Box, CreditCard, Bell, ArrowRight, RefreshCw, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { PageHeader } from "@/components/ui/PageHeader";
import { getClientDashboardData } from "@/actions/client";

export default function ClientAreaPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardData = async () => {
    try {
      const res = await getClientDashboardData();
      setData(res);
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-sky-600" />
        <p className="text-sm font-medium text-slate-500">
          Loading your dashboard…
        </p>
      </div>
    );
  }

  const tableHeaders = [
    { key: "product", label: "Product" },
    { key: "stage", label: "Current Stage" },
    { key: "date", label: "Est. Delivery" },
    { key: "status", label: "Status" },
  ];

  const tableData = (data?.productionUpdates || []).map((update: any) => ({
    id: update.id,
    product: update.product,
    stage: (
      <span className="font-semibold text-slate-900">{update.stage}</span>
    ),
    date: update.date,
    status: (
      <span
        className={`rounded-full px-2.5 py-1 text-xs font-semibold inline-block ${
          update.status === "Completed"
            ? "bg-emerald-50 text-emerald-700"
          : update.status === "Cancelled"
            ? "bg-rose-50 text-rose-700"
          : update.status === "In Production"
            ? "bg-sky-50 text-sky-700"
          : update.status === "Confirmed"
            ? "bg-violet-50 text-violet-700"
          : update.status === "Awaiting Quote"
            ? "bg-amber-50 text-amber-700"
          : "bg-slate-100 text-slate-600"
        }`}
      >
        {update.status}
      </span>
    ),
  }));

  const headerActions = (
    <Link
      href="/client-area/production-tracker"
      className="inline-flex items-center gap-1 text-sm font-semibold text-sky-600 hover:text-sky-700"
    >
      Track Production <ArrowRight className="h-4 w-4" />
    </Link>
  );

  const hasNoOrders = (data?.stats?.totalOrders ?? 0) === 0;

  return (
    <div className="space-y-[clamp(1.5rem,3vw,2rem)]">
      {/* HEADER */}
      <PageHeader
        variant="dark"
        label="Dashboard"
        title={`Welcome back, ${data?.user?.name || "Client"}.`}
        description="Your apparel manufacturing portal — track orders, invoices, and production in real time."
      >
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          title="Refresh"
          className="rounded-full bg-slate-800 p-2 text-slate-400 hover:bg-slate-700 hover:text-white transition"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
        </button>
      </PageHeader>


      {/* STATS */}
      <section className="grid gap-[clamp(1rem,2vw,1.5rem)] sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            icon: Package,
            title: "Total Orders",
            value: data?.stats?.totalOrders ?? 0,
            desc: "Lifetime orders submitted",
          },
          {
            icon: Box,
            title: "Active Orders",
            value: data?.stats?.activeOrders ?? 0,
            desc: "Currently in manufacturing",
          },
          {
            icon: CreditCard,
            title: "Pending Payments",
            value: data?.stats?.pendingPayments ?? "$0",
            desc: "Outstanding invoice balance",
          },
          {
            icon: Bell,
            title: "Pending Orders",
            value: data?.stats?.alerts ?? 0,
            desc: "Awaiting quotation / approval",
          },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card
              variant="primary"
              key={i}
              className="relative overflow-hidden p-[clamp(1.25rem,2vw,1.5rem)]"
            >
              <div className="absolute -top-3 -right-3 h-24 w-24 text-white/[0.07] pointer-events-none transform rotate-12">
                <Icon className="h-full w-full" />
              </div>
              <div className="flex flex-col justify-between h-full">
                <div>
                  <p className="text-[clamp(10px,0.9vw,11px)] font-semibold uppercase tracking-[0.24em] text-slate-300">
                    {stat.title}
                  </p>
                  <div className="mt-4 text-[clamp(1.5rem,2.5vw,1.875rem)] font-semibold text-white">
                    {stat.value}
                  </div>
                </div>
                <p className="mt-4 text-[clamp(12px,1.1vw,13px)] text-slate-300">
                  {stat.desc}
                </p>
              </div>
            </Card>
          );
        })}
      </section>

      {/* EMPTY STATE — no orders yet */}
      {hasNoOrders ? (
        <Card className="flex flex-col items-center justify-center gap-5 py-16 text-center border border-dashed border-slate-200 bg-white">
          <div className="rounded-full bg-sky-50 p-5">
            <Package className="h-10 w-10 text-sky-500" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              No orders yet
            </h2>
            <p className="mt-1 text-sm text-slate-500 max-w-sm">
              Submit your first manufacturing order to get started. Once
              placed, you can track production, invoices and shipments here.
            </p>
          </div>
          <Link
            href="/client-area/my-orders"
            className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-sky-700 transition"
          >
            <Plus className="h-4 w-4" /> Place your first order
          </Link>
        </Card>
      ) : (
        <section className="grid gap-[clamp(1rem,2vw,1.5rem)] xl:grid-cols-[1.4fr_0.6fr]">
          {/* PRODUCTION TABLE */}
          <Card className="border border-slate-100 p-0 overflow-hidden bg-white">
            <DataTable
              heading="Latest production updates"
              TableHeaders={tableHeaders}
              TableData={tableData}
              currentPage={1}
              totalPages={1}
              onPageChange={() => {}}
              pageSize={5}
              totalEntries={tableData.length}
              headerActions={headerActions}
            />
          </Card>

          {/* NOTIFICATIONS */}
          <div className="space-y-6">
            <Card className="p-[clamp(1rem,1.5vw,1.5rem)] bg-slate-50 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between border-b pb-3 mb-4">
                <h2 className="text-[clamp(15px,1.3vw,17px)] font-semibold text-slate-900">
                  Notifications
                </h2>
                <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-semibold text-sky-700">
                  {data?.notifications?.length ?? 0} new
                </span>
              </div>
              <div className="space-y-[clamp(0.75rem,1vw,1rem)] max-h-[400px] overflow-y-auto pr-1">
                {(data?.notifications || []).length > 0 ? (
                  data.notifications.map((item: any) => (
                    <Card
                      key={item.id}
                      className="border border-slate-200 bg-white p-[clamp(0.875rem,1.2vw,1rem)] shadow-2xs hover:shadow-xs transition"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-[clamp(13px,1.2vw,14px)] font-semibold text-slate-900">
                          {item.title}
                        </p>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded shrink-0">
                          {item.category}
                        </span>
                      </div>
                      <p className="mt-1 text-[clamp(12px,1.1vw,13px)] text-slate-600">
                        {item.description}
                      </p>
                      <p className="mt-2 text-[clamp(10px,0.9vw,11px)] text-slate-400 font-medium">
                        {item.date}
                      </p>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-6 text-sm text-slate-400">
                    No notifications yet.
                  </div>
                )}
              </div>
            </Card>
          </div>
        </section>
      )}
    </div>
  );
}
