"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getClientOrdersAction } from "@/actions/client";
import type { Order } from "@/types/order";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { PageHeader } from "@/components/ui/PageHeader";
import { Truck, Package, Download, FileText } from "lucide-react";

export default function ShipmentTrackingPage() {
  const [ordersList, setOrdersList] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getClientOrdersAction().then((res) => {
      setOrdersList(
        res.filter(
          (o) =>
            o.paymentStatus === "Paid" ||
            o.status === "In Production" ||
            o.status === "Completed"
        )
      );
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
    } catch {
      console.error("Download failed");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-sky-600" />
        <p className="text-sm font-medium text-slate-500">Loading shipment status...</p>
      </div>
    );
  }

  // Table config for shipments
  const tableHeaders = [
    { key: "tracking",  label: "Tracking No." },
    { key: "product",   label: "Product" },
    { key: "quantity",  label: "Qty" },
    { key: "eta",       label: "ETA" },
    { key: "status",    label: "Status" },
  ];

  const tableData = ordersList.map((order) => {
    const suffix = order.id.replace("ORD-", "");
    const trackingNo = `DX-${suffix}987`;
    const shipStatus = order.status === "Completed" ? "Delivered" : "In Transit";
    return {
      id: order.id,
      tracking: (
        <span className="font-mono font-semibold text-slate-700">{trackingNo}</span>
      ),
      product:  order.product,
      quantity: `${order.quantity} pcs`,
      eta:      order.estimatedDelivery || "TBD",
      status: (
        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
          shipStatus === "Delivered"
            ? "bg-emerald-50 text-emerald-700"
            : "bg-sky-50 text-sky-700"
        }`}>
          {shipStatus}
        </span>
      ),
    };
  });

  const tableButtons = [
    {
      icon: <Download className="h-4 w-4" />,
      text: "Receipt",
      className: "border border-slate-200 bg-slate-50 text-slate-900",
      onClick: (row: { id: string }) => {
        const order = ordersList.find((o) => o.id === row.id);
        if (!order) return;
        if (!order.shipmentReceipt) {
          alert("Shipment receipt document is pending upload by the admin.");
          return;
        }
        const suffix = order.id.replace("ORD-", "");
        const ext = order.shipmentReceipt.toLowerCase().includes(".pdf") ? "pdf" : "png";
        handleDownload(order.shipmentReceipt, `DX-${suffix}987-receipt.${ext}`);
      },
    },
  ];

  return (
    <div className="space-y-[clamp(1.5rem,3vw,2rem)]">
      {/* HEADER */}
      <PageHeader
        variant="dark"
        label="Shipment Receipt"
        title="Your Delivery Receipts"
        description="Track active shipments and download shipping receipts uploaded for your orders."
      />

      {ordersList.length === 0 ? (
        <Card className="p-8 text-center bg-white border border-slate-100">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-sky-50 p-5">
              <Truck className="h-10 w-10 text-sky-500" />
            </div>
          </div>
          <p className="font-semibold text-slate-700">No active shipments found.</p>
          <p className="mt-1 text-sm text-slate-400">
            Once your orders start production and shipping, tracking will appear here.
          </p>
          <Link
            href="/client-area/my-orders"
            className="mt-4 inline-block rounded-xl bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-sky-700 transition"
          >
            Go to Orders
          </Link>
        </Card>
      ) : (
        <>
          {/* SHIPMENTS TABLE */}
          <Card className="border border-slate-100 p-0 overflow-hidden bg-white">
            <DataTable
              heading="Active Shipments"
              TableHeaders={tableHeaders}
              TableData={tableData}
              TableButtons={tableButtons}
              currentPage={1}
              totalPages={1}
              onPageChange={() => {}}
              pageSize={ordersList.length || 10}
              totalEntries={ordersList.length}
            />
          </Card>

          {/* SHIPMENT CARDS */}
          <div className="grid gap-[clamp(1rem,2vw,1.5rem)] lg:grid-cols-2">
            {ordersList.map((order) => {
              const suffix = order.id.replace("ORD-", "");
              const trackingNo = `DX-${suffix}987`;
              const status = order.status === "Completed" ? "Delivered" : "In Transit";
              return (
                <Card key={order.id} className="border border-slate-100 bg-white p-[clamp(1.25rem,2.5vw,1.5rem)]">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[clamp(10px,1vw,11px)] font-semibold uppercase tracking-[0.24em] text-slate-500">
                        {order.shippingMethod || "Standard Air Freight"}
                      </p>
                      <h2 className="mt-2 text-[clamp(1rem,2vw,1.25rem)] font-bold text-slate-900">
                        {trackingNo}
                      </h2>
                      <p className="mt-1 text-[clamp(12px,1.1vw,13px)] text-slate-500 font-medium">
                        Sialkot Manufacturing Unit → {order.country || "Destination"}
                      </p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold shrink-0 ${
                      status === "Delivered"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-sky-50 text-sky-700 animate-pulse"
                    }`}>
                      {status}
                    </span>
                  </div>

                  <div className="mt-4 rounded-xl bg-slate-50 border border-slate-100 p-3 text-xs text-slate-600 space-y-1">
                    <p><b>Product:</b> {order.product}</p>
                    <p><b>Quantity:</b> {order.quantity} pcs</p>
                    <p><b>Order ID:</b> {order.id}</p>
                    <p><b>ETA:</b> {order.estimatedDelivery || "TBD"}</p>
                  </div>

                  {order.shipmentReceipt ? (
                    <>
                      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                        {order.shipmentReceipt.toLowerCase().includes(".pdf") ? (
                          <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                            <FileText className="h-12 w-12 text-red-500 mb-2" />
                            <span className="text-xs font-semibold text-slate-700 truncate max-w-full">
                              Shipment_Receipt_{order.id}.pdf
                            </span>
                          </div>
                        ) : (
                          <img
                            src={order.shipmentReceipt}
                            alt="Shipment Receipt"
                            className="h-48 w-full object-cover"
                          />
                        )}
                      </div>

                      <button
                        onClick={() =>
                          handleDownload(
                            order.shipmentReceipt!,
                            `${trackingNo}-receipt.${order.shipmentReceipt!.toLowerCase().includes(".pdf") ? "pdf" : "png"}`
                          )
                        }
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-700 transition"
                      >
                        <Download className="h-4 w-4" />
                        Download Shipping Receipt
                      </button>
                    </>
                  ) : (
                    <div className="mt-4 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
                      <Truck className="h-8 w-8 text-slate-300 mb-2" />
                      <p className="text-xs font-semibold text-slate-500">Shipping Document Pending</p>
                      <p className="text-[10px] text-slate-400 mt-1 font-medium">Admin will upload the dispatch receipt shortly.</p>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}