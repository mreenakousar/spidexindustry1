"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Activity,
  Clock,
  X,
  Calendar
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { PageHeader } from "@/components/ui/PageHeader";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/Button";
import { listOrdersAction, updateOrderAdminFieldsAction } from "@/actions/orders";

export default function AdminProductionPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal states
  const [timelineEditingOrder, setTimelineEditingOrder] = useState<any | null>(null);
  const [modalTimeline, setModalTimeline] = useState<any[]>([]);
  const [modalActiveStage, setModalActiveStage] = useState<string>("");

  const fetchOrders = async () => {
    try {
      const res = await listOrdersAction();
      if (res.ok) {
        setOrders(res.orders);
      }
    } catch (err) {
      console.error("Error loading production jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateTimeline = async (timeline: any[], stageName: string) => {
    if (!timelineEditingOrder) return;
    try {
      const res = await updateOrderAdminFieldsAction(timelineEditingOrder.id, {
        productionStatus: stageName,
        productionTimeline: timeline,
      });
      if (res.ok) {
        setTimelineEditingOrder(null);
        fetchOrders();
      } else {
        alert(`Error: ${res.error}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Helper to parse timeline and calculate progress
  const getTimelineStats = (order: any) => {
    const timeline =
      typeof order.productionTimeline === "string"
        ? JSON.parse(order.productionTimeline)
        : Array.isArray(order.productionTimeline)
        ? order.productionTimeline
        : [];
    
    if (timeline.length === 0) return { percent: 0, completedCount: 0, totalCount: 0, timeline };
    const completedCount = timeline.filter((t: any) => t.completed).length;
    const totalCount = timeline.length;
    const percent = Math.round((completedCount / totalCount) * 100);
    return { percent, completedCount, totalCount, timeline };
  };

  // Stats calculation
  const stats = useMemo(() => {
    const activeJobs = orders.filter((o) => o.status === "In Production");
    const activeCount = activeJobs.length;
    const completedCount = orders.filter((o) => o.status === "Completed").length;
    
    let totalPercent = 0;
    activeJobs.forEach((job) => {
      totalPercent += getTimelineStats(job).percent;
    });
    const avgProgress = activeCount > 0 ? Math.round(totalPercent / activeCount) : 0;

    return { activeCount, completedCount, avgProgress };
  }, [orders]);

  // Filters
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchSearch =
        o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (o.productionStatus || "").toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = o.status === "In Production";
      return matchSearch && matchStatus;
    });
  }, [orders, searchQuery]);

  // Table headers
  const tableHeaders = [
    { key: "id", label: "Job / Order ID" },
    { key: "clientName", label: "Client" },
    { key: "product", label: "Product SKU" },
    { key: "stage", label: "Current Phase" },
    { key: "progress", label: "Progress" },
    { key: "eta", label: "Est. Delivery" },
  ];

  // Table data mapping
  const tableData = filteredOrders.map((o) => {
    const { percent } = getTimelineStats(o);
    return {
      id: o.id,
      clientName: <span className="font-semibold text-slate-800">{o.clientName}</span>,
      product: <span className="font-mono text-xs text-slate-500">{o.product}</span>,
      stage: (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-800">
          <Clock className="h-3.5 w-3.5 text-slate-500 animate-spin" style={{ animationDuration: "3s" }} />
          {o.productionStatus || "Order Received"}
        </span>
      ),
      progress: (
        <div className="flex items-center gap-2 min-w-[120px]">
          <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                percent === 100 ? "bg-emerald-500" : "bg-sky-600"
              }`}
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="text-xs font-bold text-slate-700">{percent}%</span>
        </div>
      ),
      eta: (
        <span className="text-xs font-medium text-slate-600 flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5 text-slate-400" />
          {o.estimatedDelivery || "TBD"}
        </span>
      ),
    };
  });

  const handleOpenTimelineModal = (order: any) => {
    const { timeline } = getTimelineStats(order);
    const activeTimeline = timeline.length > 0 ? timeline : [
      { label: "Order Received", completed: true },
      { label: "Quotation Approved", completed: false },
      { label: "Payment Received", completed: false },
      { label: "Fabric Sourcing", completed: false },
      { label: "Cutting", completed: false },
      { label: "Stitching", completed: false },
      { label: "Printing / Embroidery", completed: false },
      { label: "Quality Control", completed: false },
      { label: "Packing", completed: false },
      { label: "Shipping", completed: false },
      { label: "Delivered", completed: false },
    ];
    setModalTimeline(activeTimeline);
    setModalActiveStage(order.productionStatus || "Order Received");
    setTimelineEditingOrder(order);
  };

  const tableButtons = [
    {
      icon: <Activity className="h-3.5 w-3.5" />,
      text: "Progress Stage",
      className: "bg-slate-950 text-white hover:bg-slate-800 transition-colors",
      onClick: (row: { id: string }) => {
        const found = orders.find((o) => o.id === row.id);
        if (found) handleOpenTimelineModal(found);
      },
    },
  ];

  const headerActions = (
    <div className="flex flex-wrap items-center gap-3">
      <input
        type="text"
        placeholder="Search active jobs..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-800 outline-none focus:border-sky-500 bg-white"
      />
    </div>
  );

  if (loading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-sky-600" />
        <p className="text-sm font-medium text-slate-500">Loading production queue...</p>
      </div>
    );
  }

  return (
    <div className="space-y-[clamp(1.5rem,3vw,2rem)]">
      {/* HEADER */}
      <PageHeader
        variant="dark"
        label="Production Line"
        title="Manufacturing Queue"
        description="Monitor active cutters, embroidery status, stitching completion, and logistics status."
      />

      {/* STATS */}
      <section className="grid gap-[clamp(1rem,2vw,1.5rem)] sm:grid-cols-3">
        <Card variant="primary" className="p-5 flex flex-col justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-300">Active Batches</p>
          <p className="text-2xl font-bold mt-2 text-white">{stats.activeCount} In Production</p>
        </Card>
        <Card variant="primary" className="p-5 flex flex-col justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-300">Mean Progress</p>
          <p className="text-2xl font-bold mt-2 text-white">{stats.avgProgress}% Completed</p>
        </Card>
        <Card variant="primary" className="p-5 flex flex-col justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-300">Completed Batches</p>
          <p className="text-2xl font-bold mt-2 text-white">{stats.completedCount} Shipped</p>
        </Card>
      </section>

      {/* TABLE */}
      <Card className="border border-slate-100 p-0 overflow-hidden bg-white">
        <DataTable
          heading="Factory Production Schedule"
          TableHeaders={tableHeaders}
          TableData={tableData}
          TableButtons={tableButtons}
          currentPage={1}
          totalPages={1}
          onPageChange={() => {}}
          pageSize={filteredOrders.length || 10}
          totalEntries={filteredOrders.length}
          headerActions={headerActions}
        />
      </Card>

      {/* TIMELINE EDIT MODAL */}
      <Modal
        isOpen={timelineEditingOrder !== null}
        onClose={() => setTimelineEditingOrder(null)}
        showHeader={false}
        className="w-full max-w-lg bg-white overflow-hidden"
      >
        {timelineEditingOrder && (
          <>
            <div className="flex items-center justify-between bg-slate-900 p-4">
              <span className="font-semibold text-white text-sm">
                Progress Manufacturing: {timelineEditingOrder.product}
              </span>
              <button onClick={() => setTimelineEditingOrder(null)} className="text-white/80 hover:text-white transition">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[85vh] overflow-y-auto">
              <p className="text-xs text-slate-400">
                Mark stages as completed. Clients track this progress live in the Production Tracker portal.
              </p>

              {/* Steps list */}
              <div className="space-y-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider font-semibold">
                    Active Phase Stage
                  </label>
                  <select
                    value={modalActiveStage}
                    onChange={(e) => setModalActiveStage(e.target.value)}
                    className="rounded-xl border border-slate-200 p-2.5 text-sm bg-slate-50 outline-none focus:border-sky-500 text-slate-800"
                  >
                    {modalTimeline.map((t: any) => (
                      <option key={t.label} value={t.label}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2 border-t border-slate-100 pt-4">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Stage Completion</p>
                  {modalTimeline.map((stage: any, index: number) => (
                    <label
                      key={index}
                      className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100 hover:bg-slate-100/50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={stage.completed}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setModalTimeline((prev) =>
                            prev.map((s, idx) =>
                              idx === index ? { ...s, completed: checked } : s
                            )
                          );
                        }}
                        className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                      />
                      <span className="text-sm font-semibold text-slate-800">{stage.label}</span>
                    </label>
                  ))}
                </div>

                <div className="flex gap-3 justify-end pt-4 border-t border-slate-100">
                  <Button variant="outline" onClick={() => setTimelineEditingOrder(null)}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleUpdateTimeline(modalTimeline, modalActiveStage);
                    }}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}
