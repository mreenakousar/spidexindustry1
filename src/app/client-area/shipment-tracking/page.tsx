"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getClientOrdersAction } from "@/actions/client";
import type { Order } from "@/types/order";
import { Card } from "@/components/ui/card";

export default function ShipmentTrackingPage() {
  const [ordersList, setOrdersList] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getClientOrdersAction().then((res) => {
      // Show shipments for orders that have been paid or are in production
      setOrdersList(res.filter(o => o.paymentStatus === "Paid" || o.status === "In Production" || o.status === "Completed"));
      setLoading(false);
    });
  }, []);

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename || "receipt.jpg";

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Receipt download failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-sky-600"></div>
        <p className="text-sm font-medium text-slate-500">Loading shipment status...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">
          Shipment Receipt
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">
          Your Delivery Receipts
        </h1>
        <p className="mt-2 text-slate-600">
          Track active shipments and download shipping receipts uploaded for your orders.
        </p>
      </div>

      {ordersList.length === 0 ? (
        <Card className="p-8 text-center bg-white border border-slate-200">
          <p className="text-slate-500 font-medium">No active shipments found.</p>
          <p className="text-slate-400 text-xs mt-1">Once your orders start production and shipping, tracking will appear here.</p>
          <Link
            href="/client-area/my-orders"
            className="mt-4 inline-block rounded-xl bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-sky-700 transition"
          >
            Go to Orders
          </Link>
        </Card>
      ) : (
        /* Cards */
        <div className="grid gap-6 lg:grid-cols-2">
          {ordersList.map((order) => {
            const hasReceipt = true; // Simulate having a receipt image for all in-production/completed orders
            const receiptImage = "/receptPlaceholder.png";
            const suffix = order.id.replace("ORD-", "");
            const trackingNo = `DX-${suffix}987`;
            const status = order.status === "Completed" ? "Delivered" : "In Transit";

            return (
              <div
                key={order.id}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3 sm:gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500 font-semibold">
                      {order.shippingMethod || "Standard Air Freight"}
                    </p>
                    <h2 className="mt-2 text-lg font-bold text-slate-900 sm:text-xl">
                      {trackingNo}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500 font-medium">
                      Sialkot Manufacturing Unit → {order.country}
                    </p>
                  </div>

                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    status === "Delivered" 
                      ? "bg-emerald-100 text-emerald-700" 
                      : "bg-sky-100 text-sky-700 animate-pulse"
                  }`}>
                    {status}
                  </span>
                </div>

                {/* Info summary */}
                <div className="mt-4 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p><b>Product:</b> {order.product}</p>
                  <p className="mt-1"><b>Quantity:</b> {order.quantity} pcs</p>
                  <p className="mt-1"><b>Order ID:</b> {order.id}</p>
                </div>

                {/* Image */}
                <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                  <img
                    src={receiptImage}
                    alt="Shipment Receipt"
                    className="h-56 w-full object-cover sm:h-64"
                  />
                </div>

                {/* ETA */}
                <p className="mt-4 text-sm text-slate-500">
                  <b>Estimated Arrival (ETA):</b> {order.estimatedDelivery || "TBD"}
                </p>

                {/* Download Button */}
                <button
                  onClick={() => {
                    handleDownload(receiptImage, `${trackingNo}-receipt.png`);
                  }}
                  disabled={!hasReceipt}
                  className={`mt-4 w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white
                    ${
                      hasReceipt
                        ? "bg-sky-600 hover:bg-sky-700 transition"
                        : "bg-slate-300 cursor-not-allowed"
                    }`}
                >
                  Download Shipping Receipt
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}