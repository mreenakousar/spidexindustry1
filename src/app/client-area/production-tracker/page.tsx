"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getClientOrdersAction } from "@/actions/client";
import type { Order } from "@/types/order";
import { Card } from "@/components/ui/card";

export default function ProductionTrackerPage() {
  const [ordersList, setOrdersList] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState<string>("");

  useEffect(() => {
    getClientOrdersAction().then((res) => {
      setOrdersList(res);
      if (res.length > 0) {
        setSelectedOrderId(res[0].id);
      }
      setLoading(false);
    });
  }, []);

  const selectedOrder = ordersList.find((o) => o.id === selectedOrderId);

  if (loading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-sky-600"></div>
        <p className="text-sm font-medium text-slate-500">Loading production timelines...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">
          Production Tracker
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">
          Manufacturing progress
        </h1>
        <p className="mt-2 text-slate-600">
          Real-time tracking of every production stage for your custom manufactured apparel.
        </p>
      </div>

      {ordersList.length === 0 ? (
        <Card className="p-8 text-center bg-white border border-slate-200">
          <p className="text-slate-500 font-medium">No manufacturing orders in progress.</p>
          <Link
            href="/client-area/my-orders"
            className="mt-4 inline-block rounded-xl bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-sky-700 transition"
          >
            Create New Order
          </Link>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* SELECT ORDER DROPDOWN */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm border border-slate-100">
            <label className="text-sm font-semibold text-slate-700">
              Select order to track:
            </label>
            <select
              value={selectedOrderId}
              onChange={(e) => setSelectedOrderId(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 outline-none focus:border-sky-500"
            >
              {ordersList.map((order) => (
                <option key={order.id} value={order.id}>
                  {order.product} (#{order.id}) - {order.status}
                </option>
              ))}
            </select>
          </div>

          {selectedOrder && (
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
              <div className="border-b pb-4 mb-6">
                <h2 className="text-xl font-bold text-slate-900">
                  {selectedOrder.product} Timeline
                </h2>
                <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-500">
                  <p><b>Order ID:</b> {selectedOrder.id}</p>
                  <p><b>Quantity:</b> {selectedOrder.quantity} pcs</p>
                  <p><b>Current Stage:</b> {selectedOrder.productionStatus}</p>
                </div>
              </div>

              <div className="space-y-6">
                {selectedOrder.productionTimeline.map((stage, index) => {
                  const isActive = selectedOrder.productionStatus === stage.label;
                  return (
                    <div key={index} className="flex items-start gap-6">
                      <div className="flex flex-col items-center">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold ${
                            stage.completed
                              ? "bg-emerald-500 text-white"
                              : isActive
                              ? "bg-sky-500 text-white animate-pulse"
                              : "bg-slate-150 text-slate-400 border-2 border-slate-200"
                          }`}
                        >
                          {index + 1}
                        </div>
                        {index < selectedOrder.productionTimeline.length - 1 ? (
                          <div className="mt-2 h-12 w-px bg-slate-200" />
                        ) : null}
                      </div>
                      <div className={`flex-1 rounded-3xl border p-5 ${
                        stage.completed 
                          ? "bg-emerald-50/20 border-emerald-100" 
                          : isActive 
                          ? "bg-sky-50/20 border-sky-100" 
                          : "bg-slate-50 border-slate-200"
                      }`}>
                        <div className="flex items-center justify-between gap-4">
                          <p className={`text-base font-semibold ${
                            stage.completed 
                              ? "text-emerald-900" 
                              : isActive 
                              ? "text-sky-900" 
                              : "text-slate-500"
                          }`}>
                            {stage.label}
                          </p>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              stage.completed
                                ? "bg-emerald-100 text-emerald-700"
                                : isActive
                                ? "bg-sky-100 text-sky-700"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {stage.completed
                              ? "Completed"
                              : isActive
                              ? "In progress"
                              : "Pending"}
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-slate-400">
                          {stage.completed 
                            ? "Manufacturing stage successfully completed and verified by quality inspectors." 
                            : isActive 
                            ? "Currently undergoing active processing in our manufacturing division." 
                            : "Awaiting preceding phase completion."}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
