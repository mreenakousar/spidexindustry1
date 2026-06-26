"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, RefreshCw, Package, X, Upload, ImageIcon, FileText, AlertCircle, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { getClientOrdersAction, createClientOrderAction } from "@/actions/client";
import type { Order } from "@/types/order";
import { PageHeader } from "@/components/ui/PageHeader";

/** Upload a single File to Cloudinary via our server-side API route */
async function uploadFileToCloudinary(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/upload-image", { method: "POST", body: fd });
  if (!res.ok) throw new Error(`Upload failed for ${file.name}`);
  const json = await res.json();
  return json.url as string;
}

/** Parse techPackFile field — may be a JSON array of URLs or a plain string */
function parseTechPackUrls(raw: string): string[] {
  if (!raw || raw === "No file attached") return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
  } catch {}
  // Legacy: single URL or filename
  if (raw.startsWith("http")) return [raw];
  return [];
}

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
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string[]>([]);

  // Form-level feedback
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  // Field-level validation errors
  const [fieldErrors, setFieldErrors] = useState<{ product?: string; quantity?: string }>({});

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
      setFetchError(null);
    } catch (err: unknown) {
      console.error("Error fetching client orders:", err);
      const msg = err instanceof Error ? err.message : "Failed to load orders.";
      setFetchError(msg);
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
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (name in fieldErrors) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    // Clear form-level error on any change
    setFormError(null);
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
    setFormError(null);
    setFormSuccess(null);
    setFieldErrors({});
    setUploadProgress([]);
    setIsCreateOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || uploading) return;

    // ── Client-side field validation ─────────────────────────────────────────
    const newFieldErrors: { product?: string; quantity?: string } = {};
    if (!form.product.trim()) {
      newFieldErrors.product = "Product name is required.";
    }
    const quantityNum = parseInt(form.quantity, 10);
    if (!form.quantity.trim()) {
      newFieldErrors.quantity = "Quantity is required.";
    } else if (isNaN(quantityNum) || quantityNum <= 0) {
      newFieldErrors.quantity = "Please enter a valid quantity (positive number).";
    }
    if (Object.keys(newFieldErrors).length > 0) {
      setFieldErrors(newFieldErrors);
      setFormError("Please fix the errors below before submitting.");
      return;
    }

    setFormError(null);
    setFormSuccess(null);
    setSubmitting(true);

    try {
      // ── Upload files to Cloudinary (server-side) ──────────────────────────
      let techPackFile = "";
      if (files.length > 0) {
        setUploading(true);
        setUploadProgress(files.map((f) => `Uploading ${f.name}…`));

        const urls: string[] = [];
        for (let i = 0; i < files.length; i++) {
          try {
            const url = await uploadFileToCloudinary(files[i]);
            urls.push(url);
            setUploadProgress((prev) =>
              prev.map((s, idx) => (idx === i ? `✓ ${files[i].name}` : s))
            );
          } catch {
            setUploadProgress((prev) =>
              prev.map((s, idx) => (idx === i ? `✗ Failed: ${files[i].name}` : s))
            );
            setFormError(`File upload failed for "${files[i].name}". Please remove it or try again.`);
            setUploading(false);
            setSubmitting(false);
            return;
          }
        }
        techPackFile = JSON.stringify(urls);
        setUploading(false);
      }

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
        setFormSuccess(`Order ${res.order.id} submitted successfully! Our team will review it within 24 hours.`);
        setUploadProgress([]);
        setTimeout(() => {
          setIsCreateOpen(false);
          setFormSuccess(null);
          fetchOrders();
        }, 2000);
      }
    } catch (err: unknown) {
      console.error("Error creating order:", err);
      const raw = err instanceof Error ? err.message : String(err);
      // Strip noisy Prisma/Next internals, show the relevant part
      const clean = raw.split("\n")[0].replace(/^Error:\s*/i, "");
      setFormError(clean || "Failed to submit order. Please try again.");
      setUploading(false);
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
    setFormError(null);
    setFormSuccess(null);
    setFieldErrors({});
    setUploadProgress([]);
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
            : order.status === "Cancelled"
            ? "bg-rose-50 text-rose-700"
            : order.status === "In Production"
            ? "bg-sky-50 text-sky-700"
            : order.status === "Confirmed"
            ? "bg-violet-50 text-violet-700"
            : order.status === "Awaiting Quote"
            ? "bg-amber-50 text-amber-700"
            : "bg-slate-100 text-slate-600"
        }`}
      >
        {order.status}
      </span>
    ),
    date: order.orderDate,
    total: order.amount === 0
      ? <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 border border-amber-100">Awaiting Quote</span>
      : `$${order.amount.toLocaleString()}`,
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

  if (fetchError) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4 px-4">
        <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-red-700 max-w-lg w-full">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <div>
            <p className="font-semibold text-sm">Failed to load orders</p>
            <p className="text-xs mt-0.5 text-red-600">{fetchError}</p>
          </div>
        </div>
        <button
          onClick={() => { setLoading(true); fetchOrders(); }}
          className="text-sm font-semibold text-sky-600 hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-[clamp(1.5rem,3vw,2rem)]">
      {/* HEADER */}
      <PageHeader
        variant="dark"
        label="My Orders"
        title="Order Management"
        description="Create production orders, track status, and manage your workflow."
      />

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
                    {selectedOrder.amount === 0 ? (
                      <div className="mt-1 flex flex-col gap-1">
                        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3 py-1.5 text-sm font-semibold text-amber-700">
                          ⏳ Awaiting Quote
                        </span>
                        <p className="text-xs text-slate-400">Our team will set the final price shortly.</p>
                      </div>
                    ) : (
                      <p
                        className="font-bold tabular-nums text-sky-600"
                        style={{ fontSize: "clamp(18px,3vw,28px)" }}
                      >
                        ${selectedOrder.amount.toLocaleString()}
                      </p>
                    )}
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
                      {
                        label: "Payment Status",
                        value: (
                          <span
                            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              selectedOrder.paymentStatus === "Paid"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                : selectedOrder.paymentStatus === "Partially Paid"
                                ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
                                : selectedOrder.paymentStatus === "Failed"
                                ? "bg-rose-50 text-rose-700 border border-rose-100"
                                : "bg-amber-50 text-amber-700 border border-amber-100"
                            }`}
                          >
                            {selectedOrder.paymentStatus || "Pending"}
                          </span>
                        ),
                      },
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

                {/* Right — Tech Pack Attachments */}
                <div
                  className="w-full shrink-0 bg-slate-50 md:w-[300px]"
                  style={{ padding: "clamp(14px,2.5vw,24px)" }}
                >
                  <h3
                    className="font-medium text-slate-700"
                    style={{
                      fontSize: "clamp(11px,1.3vw,14px)",
                      marginBottom: "clamp(10px,1.5vw,18px)",
                    }}
                  >
                    Tech Pack / Mockup Files
                  </h3>

                  {(() => {
                    const urls = parseTechPackUrls(selectedOrder.techPackFile);
                    if (urls.length === 0) {
                      return (
                        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-white py-10 text-center">
                          <ImageIcon className="mb-2 h-8 w-8 text-slate-300" />
                          <p className="text-xs text-slate-400">No files attached</p>
                        </div>
                      );
                    }
                    return (
                      <div className="space-y-3">
                        {urls.map((url, idx) => {
                          const isPdf = url.toLowerCase().includes(".pdf") || url.includes("/raw/upload/");
                          return isPdf ? (
                            <a
                              key={idx}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 rounded-md border border-slate-200 bg-white p-2.5 text-xs font-medium text-sky-600 hover:bg-sky-50 transition"
                            >
                              <FileText className="h-4 w-4 shrink-0 text-red-500" />
                              <span className="truncate">PDF File {idx + 1}</span>
                            </a>
                          ) : (
                            <a key={idx} href={url} target="_blank" rel="noopener noreferrer">
                              <img
                                src={url}
                                alt={`Attachment ${idx + 1}`}
                                className="w-full rounded-md border border-slate-200 object-cover transition hover:opacity-90"
                                style={{ maxHeight: "180px", objectFit: "contain" }}
                              />
                            </a>
                          );
                        })}
                      </div>
                    );
                  })()}

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
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>

            {/* ── Error Banner ─────────────────────────────────────────── */}
            {formError && (
              <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <div className="flex-1 text-sm">
                  <p className="font-semibold">Something went wrong</p>
                  <p className="mt-0.5 text-xs text-red-600">{formError}</p>
                </div>
                <button type="button" onClick={() => setFormError(null)} className="text-red-400 hover:text-red-600">
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* ── Success Banner ────────────────────────────────────────── */}
            {formSuccess && (
              <div className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <p className="text-sm font-medium">{formSuccess}</p>
              </div>
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1">
                <Input
                  id="product"
                  name="product"
                  label="Product Name"
                  placeholder="e.g. Custom Hoodie"
                  value={form.product}
                  onChange={handleChange}
                  required
                />
                {fieldErrors.product && (
                  <p className="flex items-center gap-1 text-xs text-red-500">
                    <AlertCircle className="h-3 w-3" />
                    {fieldErrors.product}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Input
                  id="quantity"
                  name="quantity"
                  label="Quantity"
                  placeholder="e.g. 100"
                  value={form.quantity}
                  onChange={handleChange}
                  required
                />
                {fieldErrors.quantity && (
                  <p className="flex items-center gap-1 text-xs text-red-500">
                    <AlertCircle className="h-3 w-3" />
                    {fieldErrors.quantity}
                  </p>
                )}
              </div>
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
                  Attached files ({files.length})
                </p>
                {files.map((file, i) => {
                  const isImage = file.type.startsWith("image/");
                  const preview = isImage ? URL.createObjectURL(file) : null;
                  const status = uploadProgress[i];
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-md bg-white border border-slate-100 p-2 text-[clamp(12px,1.1vw,13px)] text-slate-700"
                    >
                      {preview ? (
                        <img
                          src={preview}
                          alt={file.name}
                          className="h-10 w-10 rounded object-cover shrink-0 border border-slate-200"
                        />
                      ) : (
                        <FileText className="h-8 w-8 shrink-0 text-red-400" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="truncate font-medium text-slate-800">{file.name}</p>
                        {status && (
                          <p className={`text-xs mt-0.5 ${
                            status.startsWith("✓") ? "text-emerald-600" : "text-sky-500"
                          }`}>
                            {status}
                          </p>
                        )}
                      </div>
                      {!uploading && (
                        <Button
                          type="button"
                          variant="danger"
                          onClick={() => removeFile(i)}
                          className="!py-0.5 !px-2 text-xs shrink-0"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  );
                })}
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
              <Button type="submit" variant="primary" disabled={submitting || uploading}>
                {uploading ? (
                  <span className="flex items-center gap-2">
                    <Upload className="h-3.5 w-3.5 animate-bounce" />
                    Uploading files…
                  </span>
                ) : submitting ? (
                  "Submitting…"
                ) : (
                  "Submit Order"
                )}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}