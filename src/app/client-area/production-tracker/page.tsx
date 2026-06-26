"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getClientOrdersAction } from "@/actions/client";
import type { Order } from "@/types/order";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/PageHeader";

export default function ProductionTrackerPage() {
  const [ordersList, setOrdersList] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState<string>("");

  useEffect(() => {
    getClientOrdersAction().then((res) => {
      setOrdersList(res);
      if (res.length > 0) setSelectedOrderId(res[0].id);
      setLoading(false);
    });
  }, []);

  const selectedOrder = ordersList.find((o) => o.id === selectedOrderId);

  if (loading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-sky-600" />
        <p className="text-sm font-medium text-slate-500">Loading production timelines...</p>
      </div>
    );
  }

  return (
    <div className="space-y-[clamp(1.5rem,3vw,2rem)]">
      {/* HEADER */}
      <PageHeader
        variant="dark"
        label="Production Tracker"
        title="Manufacturing Progress"
        description="Real-time tracking of every production stage for your custom manufactured apparel."
      />

      {ordersList.length === 0 ? (
        <Card className="p-8 text-center bg-white border border-slate-100">
          <p className="text-slate-500 font-medium">No manufacturing orders in progress.</p>
          <p className="mt-1 text-sm text-slate-400">Submit an order to start tracking production stages.</p>
          <Link
            href="/client-area/my-orders"
            className="mt-4 inline-block rounded-xl bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-sky-700 transition"
          >
            Create New Order
          </Link>
        </Card>
      ) : (
        <div className="space-y-[clamp(1rem,2vw,1.5rem)]">
          {/* ORDER SELECTOR */}
          <Card className="border border-slate-100 bg-white p-[clamp(1rem,2vw,1.25rem)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-sm font-semibold text-slate-700">Select order to track:</p>
              <select
                value={selectedOrderId}
                onChange={(e) => setSelectedOrderId(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 outline-none focus:border-sky-500"
              >
                {ordersList.map((order) => (
                  <option key={order.id} value={order.id}>
                    {order.product} (#{order.id}) — {order.status}
                  </option>
                ))}
              </select>
            </div>
          </Card>

          {/* TIMELINE */}
          {selectedOrder && (
            <Card className="border border-slate-100 bg-white p-[clamp(1.25rem,3vw,2rem)]">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <h2 className="text-[clamp(1rem,2vw,1.25rem)] font-bold text-slate-900">
                  {selectedOrder.product} — Timeline
                </h2>
                <div className="mt-2 flex flex-wrap gap-4 text-[clamp(12px,1.1vw,13px)] text-slate-500">
                  <span><b>Order ID:</b> {selectedOrder.id}</span>
                  <span><b>Quantity:</b> {selectedOrder.quantity} pcs</span>
                  <span><b>Current Stage:</b>{" "}
                    <span className="text-sky-600 font-semibold">{selectedOrder.productionStatus}</span>
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {selectedOrder.productionTimeline.map((stage, index) => {
                  const isActive = selectedOrder.productionStatus === stage.label;
                  return (
                    <div key={index} className="flex items-start gap-5">
                      {/* Step indicator */}
                      <div className="flex flex-col items-center shrink-0">
                        <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                          stage.completed
                            ? "bg-emerald-500 text-white"
                            : isActive
                            ? "bg-sky-500 text-white animate-pulse"
                            : "bg-slate-100 text-slate-400 border-2 border-slate-200"
                        }`}>
                          {index + 1}
                        </div>
                        {index < selectedOrder.productionTimeline.length - 1 && (
                          <div className={`mt-1 h-10 w-px ${stage.completed ? "bg-emerald-200" : "bg-slate-200"}`} />
                        )}
                      </div>

                      {/* Stage card */}
                      <div className={`flex-1 rounded-xl border p-4 ${
                        stage.completed
                          ? "bg-emerald-50/30 border-emerald-100"
                          : isActive
                          ? "bg-sky-50/30 border-sky-100"
                          : "bg-slate-50 border-slate-200"
                      }`}>
                        <div className="flex items-center justify-between gap-3">
                          <p className={`text-sm font-semibold ${
                            stage.completed ? "text-emerald-900" : isActive ? "text-sky-900" : "text-slate-500"
                          }`}>
                            {stage.label}
                          </p>
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            stage.completed
                              ? "bg-emerald-100 text-emerald-700"
                              : isActive
                              ? "bg-sky-100 text-sky-700"
                              : "bg-slate-100 text-slate-500"
                          }`}>
                            {stage.completed ? "Completed" : isActive ? "In Progress" : "Pending"}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-slate-400">
                          {stage.completed
                            ? "Successfully completed and verified."
                            : isActive
                            ? "Currently undergoing active processing."
                            : "Awaiting preceding phase completion."}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
