"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, RefreshCw, Package, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { getClientOrdersAction, createClientOrderAction } from "@/actions/client";
import type { Order } from "@/types/order";

type OrderForm = {
  product: string;
  quantity: string;
  sizes: string;
  color: string;
  gsm: string;
  designNotes: string;
};

export default function MyOrdersPage() {
  const [ordersList, setOrdersList] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState<OrderForm>({
    product: "",
    quantity: "",
    sizes: "",
    color: "",
    gsm: "",
    designNotes: "",
  });

  const [files, setFiles] = useState<File[]>([]);

  const fetchOrders = async () => {
    try {
      const res = await getClientOrdersAction();
      setOrdersList(res);
    } catch (err) {
      console.error("Error fetching client orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const reorderProduct = params.get("reorder");
      if (reorderProduct) {
        setForm((prev) => ({
          ...prev,
          product: reorderProduct,
        }));
        setIsCreateOpen(true);
      }
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const openViewModal = (order: Order) => {
    setSelectedOrder(order);
    setIsViewOpen(true);
  };

  const openCreateModal = () => {
    setForm({ product: "", quantity: "", sizes: "", color: "", gsm: "", designNotes: "" });
    setFiles([]);
    setIsCreateOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    try {
      const quantityNum = parseInt(form.quantity, 10);
      if (isNaN(quantityNum) || quantityNum <= 0) {
        alert("Please enter a valid quantity.");
        setSubmitting(false);
        return;
      }

      const techPackFile = files.length > 0 ? files[0].name : "No file attached";

      const res = await createClientOrderAction({
        product: form.product,
        quantity: quantityNum,
        sizes: form.sizes,
        color: form.color,
        gsm: form.gsm,
        designNotes: form.designNotes,
        techPackFile,
      });

      if (res.ok) {
        alert(`Order ${res.order.id} submitted successfully!`);
        setIsCreateOpen(false);
        fetchOrders();
      }
    } catch (err) {
      console.error("Error creating order:", err);
      alert("Failed to submit order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReorder = (order: Order) => {
    setForm({
      product: order.product,
      quantity: String(order.quantity),
      sizes: order.fabricDetails.includes("Sizes:") 
        ? order.fabricDetails.split("Sizes:")[1].trim()
        : "",
      color: order.fabricDetails.includes("Color:") 
        ? order.fabricDetails.split("Color:")[1].split("|")[0].trim()
        : "",
      gsm: order.fabricDetails.split("|")[0].trim(),
      designNotes: order.printingDetails,
    });
    setFiles([]);
    setIsCreateOpen(true);
  };

  // Table Config
  const tableHeaders = [
    { key: "orderId", label: "Order ID" },
    { key: "product", label: "Product" },
    { key: "quantity", label: "Quantity" },
    { key: "status", label: "Status" },
    { key: "date", label: "Date" },
    { key: "total", label: "Total" },
  ];

  const tableData = ordersList.map((order) => ({
    id: order.id,
    orderId: (
      <span className="font-mono font-semibold text-slate-700">
        {order.id}
      </span>
    ),
    product: order.product,
    quantity: `${order.quantity} pcs`,
    status: (
      <span
        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
          order.status === "Completed"
            ? "bg-emerald-50 text-emerald-700"
            : order.status === "In Production"
            ? "bg-amber-50 text-amber-700"
            : "bg-slate-100 text-slate-600"
        }`}
      >
        {order.status}
      </span>
    ),
    date: order.orderDate,
    total: `$${order.amount.toLocaleString()}`,
  }));

  const tableButtons = [
    {
      icon: <Eye className="h-4 w-4" />,
      text: "View",
      className: "bg-slate-950 text-white",
      onClick: (row: { id: string }) => {
        const order = ordersList.find((o) => o.id === row.id);
        if (order) openViewModal(order);
      },
    },
    {
      icon: <RefreshCw className="h-4 w-4" />,
      text: "Reorder",
      className: "border border-slate-200 bg-slate-50 text-slate-900",
      onClick: (row: { id: string }) => {
        const order = ordersList.find((o) => o.id === row.id);
        if (order) handleReorder(order);
      },
    },
  ];

  const headerActions = (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <Button onClick={openCreateModal} variant="primary">
        <span>New Order</span>
      </Button>
      {ordersList.length > 0 && (
        <Button onClick={() => openViewModal(ordersList[0])} variant="outline">
          <span>View Latest</span>
        </Button>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-sky-600"></div>
        <p className="text-sm font-medium text-slate-500">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="space-y-[clamp(1.5rem,3vw,2rem)]">
      {/* HEADER */}
      <Card className="p-[clamp(1.25rem,2.5vw,2rem)] rounded-none bg-slate-900 border border-slate-800 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[clamp(11px,1vw,12px)] font-semibold uppercase tracking-[0.24em] text-sky-500">
              My Orders
            </p>
            <h1 className="mt-3 text-[clamp(1.5rem,2.5vw,1.875rem)] font-semibold text-white">
              Order Management
            </h1>
            <p className="mt-2 text-[clamp(13px,1.1vw,14px)] text-slate-300">
              Create production orders, track status, and manage your workflow.
            </p>
          </div>
        </div>
      </Card>

      {/* TABLE */}
      <Card className="border border-slate-100 p-0 overflow-hidden bg-white">
        <DataTable
          heading="All Orders"
          TableHeaders={tableHeaders}
          TableData={tableData}
          TableButtons={tableButtons}
          currentPage={1}
          totalPages={1}
          onPageChange={() => {}}
          pageSize={ordersList.length || 10}
          totalEntries={ordersList.length}
          headerActions={headerActions}
        />
      </Card>

      {/* VIEW ORDER MODAL */}
      <Modal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        showHeader={false}
        className="w-full max-w-4xl overflow-hidden bg-white"
      >
        {selectedOrder && (
          <>
            {/* Coloured header */}
            <div
              className="flex items-center justify-between bg-sky-600"
              style={{ padding: "clamp(10px,2vw,16px) clamp(14px,3vw,24px)" }}
            >
              <div className="flex items-center" style={{ gap: "clamp(6px,1vw,10px)" }}>
                <Package
                  className="text-white"
                  style={{ width: "clamp(14px,2vw,20px)", height: "clamp(14px,2vw,20px)" }}
                />
                <span
                  className="font-medium capitalize text-white"
                  style={{ fontSize: "clamp(11px,1.5vw,14px)" }}
                >
                  Order Details
                </span>
              </div>
              <button
                onClick={() => setIsViewOpen(false)}
                className="text-white/80 hover:text-white transition"
              >
                <X style={{ width: "clamp(16px,2vw,22px)", height: "clamp(16px,2vw,22px)" }} />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto" style={{ maxHeight: "calc(85vh - 70px)" }}>
              <div className="flex flex-col md:flex-row">
                {/* Left — order info */}
                <div
                  className="flex-1"
                  style={{
                    padding: "clamp(16px,3vw,28px)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "clamp(16px,2.5vw,28px)",
                  }}
                >
                  <div>
                    <div
                      className="capitalize text-slate-500"
                      style={{
                        fontSize: "clamp(10px,1.2vw,13px)",
                        marginBottom: "clamp(2px,0.4vw,6px)",
                      }}
                    >
                      order • {selectedOrder.orderDate}
                    </div>
                    <h2
                      className="font-semibold text-slate-900"
                      style={{ fontSize: "clamp(16px,2.5vw,26px)" }}
                    >
                      {selectedOrder.product}
                    </h2>
                    <div
                      className="mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold"
                      style={{ fontSize: "clamp(11px,1.1vw,13px)" }}
                    >
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          selectedOrder.status === "Completed"
                            ? "bg-emerald-50 text-emerald-700"
                            : selectedOrder.status === "In Production"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {selectedOrder.status}
                      </span>
                    </div>
                  </div>

                  {/* Total amount */}
                  <div>
                    <p
                      className="text-slate-500"
                      style={{
                        fontSize: "clamp(10px,1.2vw,13px)",
                        marginBottom: "clamp(2px,0.4vw,6px)",
                      }}
                    >
                      Order Total
                    </p>
                    <p
                      className="font-bold tabular-nums text-sky-600"
                      style={{ fontSize: "clamp(18px,3vw,28px)" }}
                    >
                      ${selectedOrder.amount.toLocaleString()}
                    </p>
                  </div>

                  {/* Details grid */}
                  <div
                    className="grid grid-cols-2 rounded bg-slate-50"
                    style={{
                      gap: "clamp(10px,1.5vw,18px)",
                      padding: "clamp(12px,2vw,20px)",
                    }}
                  >
                    {[
                      { label: "Order ID", value: `#${selectedOrder.id}` },
                      { label: "Quantity", value: `${selectedOrder.quantity} pcs` },
                      { label: "Order Date", value: selectedOrder.orderDate },
                      { label: "Estimated Delivery", value: selectedOrder.estimatedDelivery || "Pending" },
                      { label: "Fabric Info", value: selectedOrder.fabricDetails || "N/A" },
                      { label: "Payment Status", value: selectedOrder.paymentStatus || "Pending" },
                    ].map(({ label, value }) => (
                      <div key={label} className="col-span-2 sm:col-span-1">
                        <p
                          className="capitalize text-slate-500"
                          style={{
                            fontSize: "clamp(9px,1vw,12px)",
                            marginBottom: "clamp(2px,0.3vw,5px)",
                          }}
                        >
                          {label}
                        </p>
                        <p
                          className="font-medium text-slate-900 break-words"
                          style={{ fontSize: "clamp(11px,1.3vw,14px)" }}
                        >
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right — product image & action */}
                <div
                  className="w-full shrink-0 bg-slate-50 md:w-[280px]"
                  style={{ padding: "clamp(14px,2.5vw,24px)" }}
                >
                  <h3
                    className="font-medium text-slate-700"
                    style={{
                      fontSize: "clamp(11px,1.3vw,14px)",
                      marginBottom: "clamp(10px,1.5vw,18px)",
                    }}
                  >
                    Product Spec Image
                  </h3>
                  <img
                    src="/receptPlaceholder.png"
                    alt={selectedOrder.product}
                    className="h-auto max-w-full rounded border border-slate-200 object-contain mx-auto"
                  />
                  <Link
                    href={`/client-area/my-orders/${selectedOrder.id}`}
                    className="mt-6 block w-full rounded-lg bg-sky-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-sky-700"
                  >
                    View Full Details →
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </Modal>

      {/* CREATE ORDER MODAL */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        showHeader={false}
        className="w-full max-w-2xl overflow-hidden bg-white"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between bg-slate-900"
          style={{ padding: "clamp(10px,2vw,16px) clamp(14px,3vw,24px)" }}
        >
          <div className="flex items-center" style={{ gap: "clamp(6px,1vw,10px)" }}>
            <Package
              className="text-white"
              style={{ width: "clamp(14px,2vw,20px)", height: "clamp(14px,2vw,20px)" }}
            />
            <span
              className="font-medium text-white"
              style={{ fontSize: "clamp(11px,1.5vw,14px)" }}
            >
              Create Production Order
            </span>
          </div>
          <button
            onClick={() => setIsCreateOpen(false)}
            className="text-white/80 hover:text-white transition"
          >
            <X style={{ width: "clamp(16px,2vw,22px)", height: "clamp(16px,2vw,22px)" }} />
          </button>
        </div>

        {/* Form Body */}
        <div
          className="overflow-y-auto"
          style={{ maxHeight: "calc(85vh - 70px)", padding: "clamp(16px,3vw,28px)" }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                id="product"
                name="product"
                label="Product Name"
                placeholder="e.g. Custom Hoodie"
                value={form.product}
                onChange={handleChange}
                required
              />
              <Input
                id="quantity"
                name="quantity"
                label="Quantity"
                placeholder="e.g. 100"
                value={form.quantity}
                onChange={handleChange}
                required
              />
              <Input
                id="sizes"
                name="sizes"
                label="Sizes"
                placeholder="S=10, M=20, L=30"
                value={form.sizes}
                onChange={handleChange}
              />
              <Input
                id="color"
                name="color"
                label="Color"
                placeholder="e.g. Navy Blue"
                value={form.color}
                onChange={handleChange}
              />
              <Input
                id="gsm"
                name="gsm"
                label="Fabric / GSM"
                placeholder="e.g. 320gsm French Terry"
                value={form.gsm}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-[clamp(0.3rem,1vw,0.5rem)]">
              <label
                htmlFor="designNotes"
                className="text-[clamp(0.7rem,1vw,0.8rem)] font-bold text-[#475569] uppercase tracking-wide"
              >
                Design Instructions
              </label>
              <Textarea
                id="designNotes"
                name="designNotes"
                value={form.designNotes}
                onChange={handleChange}
                rows={4}
                placeholder="Describe artwork, embroidery placement, special requirements…"
              />
            </div>

            <div className="flex flex-col gap-[clamp(0.3rem,1vw,0.5rem)]">
              <label
                htmlFor="fileUpload"
                className="text-[clamp(0.7rem,1vw,0.8rem)] font-bold text-[#475569] uppercase tracking-wide"
              >
                Tech Pack / Mockup File (.pdf, images)
              </label>
              <input
                id="fileUpload"
                type="file"
                multiple
                accept=".pdf,image/*"
                onChange={handleFileChange}
                className="w-full rounded-md bg-slate-50 border border-slate-200 p-[clamp(0.6rem,1.5vw,0.875rem)] text-[clamp(0.875rem,1vw+0.2rem,1rem)] text-slate-600 file:mr-3 file:rounded file:border-0 file:bg-sky-50 file:px-3 file:py-1 file:text-sm file:font-semibold file:text-sky-600 hover:file:bg-sky-100 transition"
              />
            </div>

            {files.length > 0 && (
              <div className="space-y-2 rounded-md border border-slate-200 bg-slate-50 p-3">
                <p className="text-[clamp(12px,1.1vw,13px)] font-semibold text-slate-700">
                  Attached files
                </p>
                {files.map((file, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-[clamp(12px,1.1vw,13px)] text-slate-700"
                  >
                    <span>📎 {file.name}</span>
                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => removeFile(i)}
                      className="!py-0.5 !px-2 text-xs"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreateOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit Order"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}