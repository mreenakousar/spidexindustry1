"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  Eye, Edit, Trash2, X, Package, FileText, ImageIcon, Activity
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { PageHeader } from "@/components/ui/PageHeader";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { listOrdersAction, updateOrderAdminFieldsAction, deleteOrderAction, confirmOrderAction } from "@/actions/orders";

function parseTechPackUrls(raw: string): string[] {
  if (!raw || raw === "No file attached") return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
  } catch {}
  if (raw.startsWith("http")) return [raw];
  return [];
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // View modal
  const [viewingOrder, setViewingOrder] = useState<any | null>(null);

  // Edit modal
  const [editingOrder, setEditingOrder] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [formFields, setFormFields] = useState({
    amount: 0,
    estimatedDelivery: "",
    shippingMethod: "",
    status: "Pending",
    paymentStatus: "Pending",
  });

  const fetchOrders = async () => {
    try {
      const res = await listOrdersAction();
      if (res.ok) setOrders(res.orders);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleOpenEdit = (order: any) => {
    setFormFields({
      amount: order.amount || 0,
      estimatedDelivery: order.estimatedDelivery || "",
      shippingMethod: order.shippingMethod || "",
      status: order.status || "Pending",
      paymentStatus: order.paymentStatus || "Pending",
    });
    setEditingOrder(order);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOrder) return;
    setSaving(true);
    try {
      const res = await updateOrderAdminFieldsAction(editingOrder.id, {
        amount: Number(formFields.amount),
        estimatedDelivery: formFields.estimatedDelivery,
        shippingMethod: formFields.shippingMethod,
        paymentStatus: formFields.paymentStatus as any,
        status: formFields.status as any,
      });
      if (res.ok) { setEditingOrder(null); fetchOrders(); }
      else alert(`Error: ${res.error}`);
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const handleDelete = async (orderId: string) => {
    if (!confirm(`Delete order ${orderId}?`)) return;
    const res = await deleteOrderAction(orderId);
    if (res.ok) fetchOrders();
    else alert(`Error: ${res.error}`);
  };

  const handleConfirmOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOrder) return;
    if (!formFields.amount || formFields.amount <= 0) {
      alert("Please enter a valid quoted price before confirming.");
      return;
    }
    setSaving(true);
    try {
      const res = await confirmOrderAction(
        editingOrder.id,
        Number(formFields.amount),
        formFields.estimatedDelivery || undefined,
        formFields.shippingMethod || undefined,
      );
      if (res.ok) { setEditingOrder(null); fetchOrders(); }
      else alert(`Error: ${res.error}`);
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const stats = useMemo(() => ({
    total: orders.length,
    active: orders.filter(o => ["Awaiting Quote", "Confirmed", "In Production", "Pending"].includes(o.status)).length,
    completed: orders.filter(o => o.status === "Completed").length,
    revenue: orders.filter(o => o.paymentStatus === "Paid").reduce((s: number, o: any) => s + o.amount, 0),
  }), [orders]);

  const filteredOrders = useMemo(() => orders.filter(o => {
    const q = searchQuery.toLowerCase();
    const matchSearch = o.id.toLowerCase().includes(q) || o.clientName.toLowerCase().includes(q) || o.product.toLowerCase().includes(q);
    return matchSearch && (statusFilter === "All" || o.status === statusFilter);
  }), [orders, searchQuery, statusFilter]);

  const tableHeaders = [
    { key: "id", label: "Order ID" },
    { key: "clientName", label: "Client" },
    { key: "product", label: "Product" },
    { key: "qty", label: "Qty" },
    { key: "amount", label: "Value" },
    { key: "payment", label: "Payment" },
    { key: "status", label: "Status" },
  ];

  const tableData = filteredOrders.map(o => ({
    id: o.id,
    clientName: <span className="font-semibold text-slate-800">{o.clientName}</span>,
    product: <span className="text-xs text-slate-500 font-mono">{o.product}</span>,
    qty: `${o.quantity.toLocaleString()} pcs`,
    amount: o.amount === 0
      ? <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 border border-amber-100">Awaiting Quote</span>
      : <span className="font-semibold">${o.amount.toLocaleString()}</span>,
    payment: (
      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold border ${
        o.paymentStatus === "Paid" ? "bg-emerald-50 text-emerald-700 border-emerald-100"
        : o.paymentStatus === "Partially Paid" ? "bg-indigo-50 text-indigo-700 border-indigo-100"
        : o.paymentStatus === "Failed" ? "bg-rose-50 text-rose-700 border-rose-100"
        : "bg-amber-50 text-amber-700 border-amber-100"}`}>{o.paymentStatus}</span>
    ),
    status: (
      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        o.status === "Completed"      ? "bg-emerald-100 text-emerald-800"
        : o.status === "Cancelled"    ? "bg-rose-100 text-rose-800"
        : o.status === "In Production" ? "bg-sky-100 text-sky-800"
        : o.status === "Confirmed"     ? "bg-violet-100 text-violet-800"
        : o.status === "Awaiting Quote" ? "bg-amber-100 text-amber-800"
        : "bg-slate-100 text-slate-700"}`}>{o.status}</span>
    ),
  }));

  const tableButtons = [
    {
      icon: <Eye className="h-3.5 w-3.5" />, text: "View",
      className: "bg-slate-950 text-white hover:bg-slate-800",
      onClick: (row: { id: string }) => { const o = orders.find(x => x.id === row.id); if (o) setViewingOrder(o); },
    },
    {
      icon: <Edit className="h-3.5 w-3.5" />, text: "Edit",
      className: "bg-sky-600 text-white hover:bg-sky-700",
      onClick: (row: { id: string }) => { const o = orders.find(x => x.id === row.id); if (o) handleOpenEdit(o); },
    },
    {
      icon: <Activity className="h-3.5 w-3.5" />, text: "Timeline",
      className: "bg-amber-500 text-white hover:bg-amber-600",
      onClick: (row: { id: string }) => { window.location.href = "/admin/production"; },
    },
    {
      icon: <Trash2 className="h-3.5 w-3.5" />, text: "Delete",
      className: "bg-rose-50 text-rose-700 hover:bg-rose-100",
      onClick: (row: { id: string }) => handleDelete(row.id),
    },
  ];

  const headerActions = (
    <div className="flex flex-wrap items-center gap-2">
      <input type="text" placeholder="Search orders..." value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-800 outline-none focus:border-sky-500" />
      <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
        className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-800 outline-none focus:border-sky-500">
        <option value="All">All Statuses</option>
        <option value="Awaiting Quote">Awaiting Quote</option>
        <option value="Confirmed">Confirmed</option>
        <option value="In Production">In Production</option>
        <option value="Completed">Completed</option>
        <option value="Cancelled">Cancelled</option>
      </select>
    </div>
  );

  if (loading) return (
    <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-sky-600" />
      <p className="text-sm font-medium text-slate-500">Loading order book...</p>
    </div>
  );

  return (
    <div className="space-y-[clamp(1.5rem,3vw,2rem)]">
      <PageHeader variant="dark" label="Manufacturing Operations" title="Apparel Order Book"
        description="Review client orders, update specs, and manage order statuses across all clients." />

      {/* STATS */}
      <section className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total Orders", value: `${stats.total}` },
          { label: "Active Queue", value: `${stats.active}` },
          { label: "Completed", value: `${stats.completed}` },
          { label: "Paid Volume", value: `$${stats.revenue.toLocaleString()}` },
        ].map(s => (
          <Card key={s.label} variant="primary" className="p-5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-300">{s.label}</p>
            <p className="text-2xl font-bold mt-2 text-white">{s.value}</p>
          </Card>
        ))}
      </section>

      {/* TABLE */}
      <Card className="border border-slate-100 p-0 overflow-hidden bg-white">
        <DataTable heading="Orders Ledger" TableHeaders={tableHeaders} TableData={tableData}
          TableButtons={tableButtons} currentPage={1} totalPages={1} onPageChange={() => {}}
          pageSize={filteredOrders.length || 10} totalEntries={filteredOrders.length} headerActions={headerActions} />
      </Card>

      {/* ── VIEW MODAL — matches client my-orders style ── */}
      <Modal isOpen={viewingOrder !== null} onClose={() => setViewingOrder(null)}
        showHeader={false} className="w-full max-w-4xl overflow-hidden bg-white">
        {viewingOrder && (
          <>
            {/* Sky header — same as client portal */}
            <div className="flex items-center justify-between bg-sky-600"
              style={{ padding: "clamp(10px,2vw,16px) clamp(14px,3vw,24px)" }}>
              <div className="flex items-center" style={{ gap: "clamp(6px,1vw,10px)" }}>
                <Package className="text-white" style={{ width: "clamp(14px,2vw,20px)", height: "clamp(14px,2vw,20px)" }} />
                <span className="font-medium text-white" style={{ fontSize: "clamp(11px,1.5vw,14px)" }}>
                  Order Details
                </span>
              </div>
              <button onClick={() => setViewingOrder(null)} className="text-white/80 hover:text-white transition">
                <X style={{ width: "clamp(16px,2vw,22px)", height: "clamp(16px,2vw,22px)" }} />
              </button>
            </div>

            {/* Scrollable body — left info + right tech pack */}
            <div className="overflow-y-auto" style={{ maxHeight: "calc(85vh - 70px)" }}>
              <div className="flex flex-col md:flex-row">
                {/* Left — order info */}
                <div className="flex-1" style={{ padding: "clamp(16px,3vw,28px)", display: "flex", flexDirection: "column", gap: "clamp(16px,2.5vw,24px)" }}>
                  <div>
                    <div className="text-slate-500 capitalize" style={{ fontSize: "clamp(10px,1.2vw,13px)", marginBottom: "clamp(2px,0.4vw,6px)" }}>
                      {viewingOrder.clientName} • {viewingOrder.orderDate}
                    </div>
                    <h2 className="font-semibold text-slate-900" style={{ fontSize: "clamp(16px,2.5vw,26px)" }}>
                      {viewingOrder.product}
                    </h2>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        viewingOrder.status === "Completed" ? "bg-emerald-50 text-emerald-700"
                        : viewingOrder.status === "In Production" ? "bg-amber-50 text-amber-700"
                        : "bg-slate-100 text-slate-600"}`}>{viewingOrder.status}</span>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        viewingOrder.paymentStatus === "Paid" ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                        : viewingOrder.paymentStatus === "Partially Paid" ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
                        : viewingOrder.paymentStatus === "Failed" ? "bg-rose-50 text-rose-700 border border-rose-100"
                        : "bg-amber-50 text-amber-700 border border-amber-100"}`}>{viewingOrder.paymentStatus}</span>
                    </div>
                  </div>

                  {/* Total */}
                  <div>
                    <p className="text-slate-500" style={{ fontSize: "clamp(10px,1.2vw,13px)", marginBottom: "clamp(2px,0.4vw,6px)" }}>Order Total</p>
                    {viewingOrder.amount === 0 ? (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-sm font-semibold text-amber-700">
                          ⏳ Awaiting Quote
                        </span>
                        <p className="text-xs text-slate-400">Admin will set pricing shortly</p>
                      </div>
                    ) : (
                      <p className="font-bold tabular-nums text-sky-600" style={{ fontSize: "clamp(18px,3vw,28px)" }}>
                        ${viewingOrder.amount.toLocaleString()}
                      </p>
                    )}
                  </div>

                  {/* Details grid */}
                  <div className="grid grid-cols-2 rounded bg-slate-50" style={{ gap: "clamp(10px,1.5vw,18px)", padding: "clamp(12px,2vw,20px)" }}>
                    {[
                      { label: "Order ID", value: `#${viewingOrder.id}` },
                      { label: "Quantity", value: `${viewingOrder.quantity} pcs` },
                      { label: "Country", value: viewingOrder.country },
                      { label: "Est. Delivery", value: viewingOrder.estimatedDelivery || "Pending" },
                      { label: "Billing Email", value: viewingOrder.billingEmail || "—" },
                      { label: "Payment Method", value: viewingOrder.paymentMethod || "—" },
                      { label: "Production Stage", value: viewingOrder.productionStatus || "—" },
                      { label: "Fabric Info", value: viewingOrder.fabricDetails || "N/A" },
                    ].map(({ label, value }) => (
                      <div key={label} className="col-span-2 sm:col-span-1">
                        <p className="capitalize text-slate-500" style={{ fontSize: "clamp(9px,1vw,12px)", marginBottom: "clamp(2px,0.3vw,5px)" }}>{label}</p>
                        <p className="font-medium text-slate-900 break-words" style={{ fontSize: "clamp(11px,1.3vw,14px)" }}>{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right — Tech Pack */}
                <div className="w-full shrink-0 bg-slate-50 md:w-[300px]" style={{ padding: "clamp(14px,2.5vw,24px)" }}>
                  <h3 className="font-medium text-slate-700" style={{ fontSize: "clamp(11px,1.3vw,14px)", marginBottom: "clamp(10px,1.5vw,18px)" }}>
                    Tech Pack / Mockup Files
                  </h3>

                  {(() => {
                    const urls = parseTechPackUrls(viewingOrder.techPackFile || "");
                    if (urls.length === 0) return (
                      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-white py-10 text-center">
                        <ImageIcon className="mb-2 h-8 w-8 text-slate-300" />
                        <p className="text-xs text-slate-400">No files attached</p>
                      </div>
                    );
                    return (
                      <div className="space-y-3">
                        {urls.map((url, idx) => {
                          const isPdf = url.toLowerCase().includes(".pdf") || url.includes("/raw/upload/");
                          return isPdf ? (
                            <a key={idx} href={url} target="_blank" rel="noopener noreferrer"
                              className="flex items-center gap-2 rounded-md border border-slate-200 bg-white p-2.5 text-xs font-medium text-sky-600 hover:bg-sky-50 transition">
                              <FileText className="h-4 w-4 shrink-0 text-red-500" />
                              <span className="truncate">PDF File {idx + 1}</span>
                            </a>
                          ) : (
                            <a key={idx} href={url} target="_blank" rel="noopener noreferrer">
                              <img src={url} alt={`Attachment ${idx + 1}`}
                                className="w-full rounded-md border border-slate-200 object-cover transition hover:opacity-90"
                                style={{ maxHeight: "180px", objectFit: "contain" }} />
                            </a>
                          );
                        })}
                      </div>
                    );
                  })()}

                  {/* Full details link */}
                  <Link href={`/admin/orders/${viewingOrder.id}`}
                    className="mt-6 block w-full rounded-lg bg-sky-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-sky-700">
                    View Full Details →
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </Modal>

      {/* ── EDIT MODAL ── */}
      <Modal isOpen={editingOrder !== null} onClose={() => setEditingOrder(null)}
        showHeader={false} className="w-full max-w-lg bg-white overflow-hidden">
        <div className={`flex items-center justify-between px-5 py-4 ${
          editingOrder?.status === "Awaiting Quote" ? "bg-amber-600" : "bg-sky-600"
        }`}>
          <div>
            <span className="font-semibold text-white text-sm">
              {editingOrder?.status === "Awaiting Quote" ? "Confirm & Quote Order" : "Edit Order"}: {editingOrder?.id}
            </span>
            <p className="text-xs text-white/70 mt-0.5">Client: {editingOrder?.clientName}</p>
          </div>
          <button onClick={() => setEditingOrder(null)} className="text-white/80 hover:text-white transition">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form
          onSubmit={editingOrder?.status === "Awaiting Quote" ? handleConfirmOrder : handleSaveEdit}
          className="px-6 py-5 space-y-4 max-h-[80vh] overflow-y-auto"
        >
          {/* Banner for Awaiting Quote */}
          {editingOrder?.status === "Awaiting Quote" && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
              ⚠️ This order is awaiting a quote. Set the price below and click
              <strong> Confirm Order</strong> to generate the invoice and notify the client.
            </div>
          )}

          <Input
            id="edit-amount"
            label="Quoted Price (USD $)"
            type="number"
            min="0"
            placeholder="e.g. 12500"
            value={formFields.amount}
            onChange={e => setFormFields({ ...formFields, amount: Number(e.target.value) })}
          />

          <Input
            id="edit-estimatedDelivery"
            label="Est. Delivery Date"
            type="date"
            value={formFields.estimatedDelivery}
            onChange={e => setFormFields({ ...formFields, estimatedDelivery: e.target.value })}
          />

          <Input
            id="edit-shippingMethod"
            label="Shipping Method"
            type="text"
            placeholder="e.g. Standard Air Freight"
            value={formFields.shippingMethod}
            onChange={e => setFormFields({ ...formFields, shippingMethod: e.target.value })}
          />

          {/* Only show status selects for already-confirmed orders */}
          {editingOrder?.status !== "Awaiting Quote" && (
            <>
              <div className="flex flex-col gap-[clamp(0.3rem,1vw,0.5rem)]">
                <label htmlFor="edit-status" className="text-[clamp(0.7rem,1vw,0.8rem)] font-bold text-[#475569] uppercase tracking-wide">
                  Order Status
                </label>
                <select
                  id="edit-status"
                  value={formFields.status}
                  onChange={e => setFormFields({ ...formFields, status: e.target.value })}
                  className="w-full bg-[var(--color-secondary)] text-[#1E293B] rounded-md outline-none transition-all duration-200 border border-transparent focus:border-[var(--color-primary)] focus:bg-white focus:shadow-sm p-[clamp(0.6rem,1.5vw,0.875rem)] text-[clamp(0.875rem,1vw+0.2rem,1rem)]"
                >
                  <option>Awaiting Quote</option>
                  <option>Confirmed</option>
                  <option>In Production</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
              </div>

              <div className="flex flex-col gap-[clamp(0.3rem,1vw,0.5rem)]">
                <label htmlFor="edit-paymentStatus" className="text-[clamp(0.7rem,1vw,0.8rem)] font-bold text-[#475569] uppercase tracking-wide">
                  Payment Status
                </label>
                <select
                  id="edit-paymentStatus"
                  value={formFields.paymentStatus}
                  onChange={e => setFormFields({ ...formFields, paymentStatus: e.target.value })}
                  className="w-full bg-[var(--color-secondary)] text-[#1E293B] rounded-md outline-none transition-all duration-200 border border-transparent focus:border-[var(--color-primary)] focus:bg-white focus:shadow-sm p-[clamp(0.6rem,1.5vw,0.875rem)] text-[clamp(0.875rem,1vw+0.2rem,1rem)]"
                >
                  <option>Pending</option>
                  <option>Partially Paid</option>
                  <option>Paid</option>
                  <option>Failed</option>
                </select>
              </div>
            </>
          )}

          <div className="flex gap-3 justify-end pt-4 border-t border-slate-100">
            <Button type="button" variant="outline" disabled={saving} onClick={() => setEditingOrder(null)}>Cancel</Button>
            {editingOrder?.status === "Awaiting Quote" ? (
              <Button type="submit" disabled={saving} className="bg-amber-600 hover:bg-amber-700 text-white">
                {saving ? "Confirming..." : "✓ Confirm Order & Generate Invoice"}
              </Button>
            ) : (
              <Button type="submit" variant="primary" disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            )}
          </div>
        </form>
      </Modal>
    </div>
  );
}
