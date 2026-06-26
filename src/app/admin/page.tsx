"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  Box,
  Activity,
  DollarSign,
  CreditCard,
  ArrowRight,
  Eye,
  CheckCircle,
  XCircle,
  RefreshCw,
  Clock,
  X,
  FileText
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/PageHeader";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/Button";
import { getAdminDashboardDataAction } from "@/actions/orders";
import { verifyInvoiceAction } from "@/actions/adminInvoices";

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // Verification states
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      const res = await getAdminDashboardDataAction();
      if (res.ok) {
        setData(res);
      } else {
        console.error("Error loading admin dashboard:", res.error);
      }
    } catch (err) {
      console.error("Error loading admin dashboard:", err);
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

  const handleVerifyPayment = async (status: "Paid" | "Rejected") => {
    if (!selectedInvoice) return;
    if (status === "Rejected" && !rejectionReason.trim()) {
      setActionError("Please provide a rejection reason.");
      return;
    }

    setVerifying(true);
    setActionError(null);
    try {
      const res = await verifyInvoiceAction(
        selectedInvoice.invoiceId,
        status,
        status === "Rejected" ? rejectionReason : undefined
      );

      if (res.ok) {
        setSelectedInvoice(null);
        setRejectionReason("");
        setShowRejectForm(false);
        fetchDashboardData();
      }
    } catch (err: any) {
      setActionError(err.message || "Failed to verify payment proof.");
    } finally {
      setVerifying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-sky-600" />
        <p className="text-sm font-medium text-slate-500">Loading admin panel...</p>
      </div>
    );
  }

  const stats = [
    {
      icon: Users,
      title: "Total Clients",
      value: data?.stats?.totalClients || 0,
      desc: "Registered client accounts",
      color: "text-blue-500"
    },
    {
      icon: Box,
      title: "Total Orders",
      value: data?.stats?.totalOrders || 0,
      desc: "Apparel manufacturing orders",
      color: "text-indigo-500"
    },
    {
      icon: Activity,
      title: "Active Production",
      value: data?.stats?.activeOrders || 0,
      desc: "Pending/In production batches",
      color: "text-amber-500"
    },
    {
      icon: DollarSign,
      title: "Total Revenue",
      value: `$${(data?.stats?.revenue || 0).toLocaleString()}`,
      desc: "Paid order receipts volume",
      color: "text-emerald-500",
      isText: true
    },
  ];

  return (
    <div className="space-y-[clamp(1.5rem,3vw,2rem)]">
      {/* HEADER */}
      <PageHeader
        variant="dark"
        label="Admin Overview"
        title="Apparel ERP Console"
        description="Monitor manufacturing pipelines, client activity, and verify pending wire payments."
      >
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white transition disabled:opacity-50"
          title="Refresh statistics"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
        </button>
      </PageHeader>

      {/* STATS */}
      <section className="grid gap-[clamp(1rem,2vw,1.5rem)] sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} variant="primary" className="relative overflow-hidden p-[clamp(1.25rem,2vw,1.5rem)]">
              <div className="absolute -top-3 -right-3 h-24 w-24 text-white/[0.07] pointer-events-none rotate-12">
                <Icon className="h-full w-full" />
              </div>
              <div className="flex flex-col justify-between h-full">
                <div>
                  <p className="text-[clamp(10px,0.9vw,11px)] font-semibold uppercase tracking-[0.24em] text-slate-300">
                    {stat.title}
                  </p>
                  <div className="mt-4 text-[clamp(1.5rem,2.5vw,1.875rem)] font-semibold text-white">
                    {stat.isText ? stat.value : stat.value}
                  </div>
                </div>
                <p className="mt-4 text-[clamp(12px,1.1vw,13px)] text-slate-300">{stat.desc}</p>
              </div>
            </Card>
          );
        })}
      </section>

      {/* MAIN SECTIONS */}
      <div className="grid gap-[clamp(1rem,2vw,1.5rem)] xl:grid-cols-2">
        {/* PENDING PAYMENT VERIFICATION */}
        <Card className="border border-slate-100 bg-white p-[clamp(1.25rem,2vw,1.5rem)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-sky-600" />
                  Wire Transfer Approvals
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Payments submitted by clients requiring manual receipt verification.
                </p>
              </div>
              {data?.stats?.processingPayments > 0 && (
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700 animate-pulse">
                  {data.stats.processingPayments} pending
                </span>
              )}
            </div>

            <div className="mt-4 space-y-3">
              {(!data?.pendingPayments || data.pendingPayments.length === 0) ? (
                <div className="py-8 text-center text-slate-400 text-sm">
                  <CheckCircle className="h-10 w-10 text-emerald-500 mx-auto mb-2" />
                  All payments reconciled! No pending proofs.
                </div>
              ) : (
                data.pendingPayments.map((inv: any) => (
                  <div
                    key={inv.id}
                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3 hover:bg-slate-50 transition"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{inv.invoiceId}</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {inv.customer} • {inv.amount}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-700 transition"
                    >
                      <Eye className="h-3.5 w-3.5" /> Review Receipt
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end">
            <Link
              href="/admin/invoices"
              className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:text-sky-700"
            >
              Manage Invoices & Ledger <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Card>

        {/* RECENT ORDERS */}
        <Card className="border border-slate-100 bg-white p-[clamp(1.25rem,2vw,1.5rem)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Box className="h-5 w-5 text-sky-600" />
                  Recent Manufacturing Orders
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Latest active garment batches placed in the system.
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {(!data?.recentOrders || data.recentOrders.length === 0) ? (
                <div className="py-8 text-center text-slate-400 text-sm">
                  No orders placed yet.
                </div>
              ) : (
                data.recentOrders.map((order: any) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3 hover:bg-slate-50 transition"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{order.product}</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {order.clientName} • Qty: {order.quantity} • {order.id}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        order.status === "Completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : order.status === "Cancelled"
                          ? "bg-rose-100 text-rose-700"
                          : "bg-sky-100 text-sky-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end">
            <Link
              href="/admin/orders"
              className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:text-sky-700"
            >
              Go to Order Book <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Card>
      </div>

      {/* VERIFY MODAL */}
      <Modal
        isOpen={selectedInvoice !== null}
        onClose={() => {
          setSelectedInvoice(null);
          setShowRejectForm(false);
          setRejectionReason("");
          setActionError(null);
        }}
        showHeader={false}
        className="w-full max-w-lg overflow-hidden bg-white"
      >
        {selectedInvoice && (
          <>
            <div className="flex items-center justify-between bg-slate-900 p-4">
              <div className="flex items-center gap-2">
                <FileText className="text-white h-5 w-5" />
                <span className="font-medium text-white text-sm">Verify Invoice Proof</span>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="text-white/85 hover:text-white transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {actionError && (
                <div className="rounded-lg bg-rose-50 border border-rose-100 p-3 text-xs text-rose-700 font-medium">
                  {actionError}
                </div>
              )}

              <div className="rounded-xl bg-slate-50 border border-slate-100 p-4 space-y-2 text-sm text-slate-700">
                <div className="flex justify-between">
                  <span>Invoice ID</span>
                  <span className="font-semibold text-slate-900">{selectedInvoice.invoiceId}</span>
                </div>
                <div className="flex justify-between">
                  <span>Customer</span>
                  <span className="font-medium text-slate-800">{selectedInvoice.customer}</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount Due</span>
                  <span className="font-bold text-sky-600">{selectedInvoice.amount}</span>
                </div>
              </div>

              {/* Receipt Preview */}
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Submitted Receipt / Proof</p>
                {selectedInvoice.receiptUrl ? (
                  <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center p-2 min-h-[200px]">
                    {selectedInvoice.receiptUrl.toLowerCase().endsWith(".pdf") ? (
                      <div className="text-center p-4">
                        <FileText className="h-16 w-16 text-red-500 mx-auto mb-2" />
                        <a
                          href={selectedInvoice.receiptUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-sky-600 hover:underline"
                        >
                          View Uploaded PDF Document
                        </a>
                      </div>
                    ) : (
                      <img
                        src={selectedInvoice.receiptUrl}
                        alt="Payment receipt proof"
                        className="max-h-[350px] w-auto object-contain rounded"
                      />
                    )}
                  </div>
                ) : (
                  <div className="py-6 text-center text-xs text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    No receipt image url available.
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              {!showRejectForm ? (
                <div className="flex gap-3 justify-end pt-4 border-t border-slate-100">
                  <Button
                    variant="outline"
                    onClick={() => setShowRejectForm(true)}
                    disabled={verifying}
                    className="border-rose-200 text-rose-700 hover:bg-rose-50"
                  >
                    <XCircle className="h-4 w-4 mr-1.5" /> Reject Payment
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => handleVerifyPayment("Paid")}
                    disabled={verifying}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-1.5" /> Approve & Confirm
                  </Button>
                </div>
              ) : (
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Rejection Reason
                  </label>
                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="e.g. Transaction ID doesn't match bank record, image is blurry, etc."
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-sm outline-none focus:border-sky-500"
                    rows={3}
                  />
                  <div className="flex gap-3 justify-end">
                    <Button
                      variant="outline"
                      onClick={() => setShowRejectForm(false)}
                      disabled={verifying}
                    >
                      Back
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => handleVerifyPayment("Rejected")}
                      disabled={verifying}
                      className="bg-rose-600 hover:bg-rose-700"
                    >
                      Confirm Rejection
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}
