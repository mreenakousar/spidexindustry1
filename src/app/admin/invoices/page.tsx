"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, Search, X, FileText, Check, AlertCircle } from "lucide-react";
import CountUpNumber from "@/components/ui/CountUpNumber";
import { listAdminInvoicesAction, verifyInvoiceAction } from "@/actions/adminInvoices";

interface Invoice {
  id: string;
  invoiceId: string;
  date: string;
  amount: string;
  status: string;
  customer: string;
  orderId: string;
  pdfUrl: string;
  billingEmail: string;
  receiptUrl: string | null;
  rejectionReason: string | null;
  createdAt: Date;
  updatedAt: Date;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function badgeClass(status: string) {
  switch (status) {
    case "Paid":
      return "bg-emerald-100 text-emerald-700 border border-emerald-200";
    case "Processing":
      return "bg-amber-100 text-amber-700 border border-amber-200";
    case "Rejected":
      return "bg-rose-100 text-rose-700 border border-rose-200";
    default:
      return "bg-blue-100 text-blue-700 border border-blue-200";
  }
}

function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/50 px-4 py-8">
      <div className="w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Invoice details
          </h2>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            onClick={onClose}
            aria-label="Close invoice details dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="max-h-[80vh] overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verification UI state
  const [isVerifying, setIsVerifying] = useState(false);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const fetchInvoices = async () => {
    setIsLoading(true);
    try {
      const data = await listAdminInvoicesAction();
      setInvoices(data as any[]);
    } catch (err) {
      console.error("Error loading admin invoices:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      const query = search.toLowerCase();
      const matchesSearch =
        invoice.invoiceId.toLowerCase().includes(query) ||
        invoice.customer.toLowerCase().includes(query) ||
        invoice.orderId.toLowerCase().includes(query);
      const matchesStatus =
        statusFilter === "All" || invoice.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [invoices, search, statusFilter]);

  const totals = useMemo(() => {
    return {
      total: invoices.length,
      revenue: invoices
        .filter((inv) => inv.status === "Paid")
        .reduce((sum, inv) => {
          const val = Number(inv.amount.replace(/[^0-9.-]+/g, ""));
          return sum + (isNaN(val) ? 0 : val);
        }, 0),
      paid: invoices.filter((inv) => inv.status === "Paid").length,
      processing: invoices.filter((inv) => inv.status === "Processing").length,
    };
  }, [invoices]);

  const handleApprove = async () => {
    if (!selectedInvoice) return;
    setIsVerifying(true);
    setActionError(null);
    setActionSuccess(null);
    try {
      const res = await verifyInvoiceAction(selectedInvoice.invoiceId, "Paid");
      if (res.ok) {
        setActionSuccess("Payment approved successfully!");
        fetchInvoices();
        setTimeout(() => {
          setSelectedInvoice(null);
          setActionSuccess(null);
        }, 1500);
      }
    } catch (err: any) {
      setActionError(err.message || "Failed to approve invoice");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleReject = async () => {
    if (!selectedInvoice || !rejectionReason.trim()) return;
    setIsVerifying(true);
    setActionError(null);
    setActionSuccess(null);
    try {
      const res = await verifyInvoiceAction(
        selectedInvoice.invoiceId,
        "Rejected",
        rejectionReason.trim()
      );
      if (res.ok) {
        setActionSuccess("Payment verification rejected successfully.");
        fetchInvoices();
        setTimeout(() => {
          setSelectedInvoice(null);
          setActionSuccess(null);
          setShowRejectForm(false);
          setRejectionReason("");
        }, 1500);
      }
    } catch (err: any) {
      setActionError(err.message || "Failed to reject invoice");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* STATS OVERVIEW */}
      <div className="grid gap-4 lg:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Total Invoices
          </p>
          <p className="mt-4 text-4xl font-semibold text-slate-900 dark:text-white">
            <CountUpNumber value={totals.total} />
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Approved Revenue
          </p>
          <p className="mt-4 text-4xl font-semibold text-emerald-600">
            <CountUpNumber value={formatCurrency(totals.revenue)} />
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Paid Invoices
          </p>
          <p className="mt-4 text-4xl font-semibold text-sky-600">
            <CountUpNumber value={totals.paid} />
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Awaiting Verification
          </p>
          <p className="mt-4 text-4xl font-semibold text-amber-600">
            <CountUpNumber value={totals.processing} />
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
              Invoices
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Review invoicing status, verify payments receipts, and manage outstanding balances.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search invoices"
                className="w-full min-w-[220px] rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              aria-label="Filter by invoice status"
            >
              <option value="All">All</option>
              <option value="Paid">Paid</option>
              <option value="Processing">Processing</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          {isLoading ? (
            <div className="space-y-4 py-6">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="h-16 rounded-3xl bg-slate-100 animate-pulse dark:bg-slate-800"
                />
              ))}
            </div>
          ) : filteredInvoices.length === 0 ? (
            <div className="py-12 text-center text-slate-500">No invoices match the current filters.</div>
          ) : (
            <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-700">
              <thead className="bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-200">
                <tr>
                  <th className="px-5 py-4 text-left">Invoice #</th>
                  <th className="px-5 py-4 text-left">Client</th>
                  <th className="px-5 py-4 text-left">Order ID</th>
                  <th className="px-5 py-4 text-left">Amount</th>
                  <th className="px-5 py-4 text-left">Status</th>
                  <th className="px-5 py-4 text-left">Date Issued</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredInvoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <td className="px-5 py-4 text-slate-900 dark:text-white font-mono font-semibold">
                      {invoice.invoiceId}
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                      {invoice.customer}
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300 font-mono text-xs">
                      {invoice.orderId}
                    </td>
                    <td className="px-5 py-4 text-slate-900 dark:text-white font-semibold">
                      {invoice.amount}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeClass(invoice.status)}`}
                      >
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                      {invoice.date}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                        onClick={() => {
                          setSelectedInvoice(invoice);
                          setShowRejectForm(false);
                          setRejectionReason("");
                          setActionError(null);
                          setActionSuccess(null);
                        }}
                      >
                        {invoice.status === "Processing" ? "Verify / View" : "View"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Modal open={!!selectedInvoice} onClose={() => setSelectedInvoice(null)}>
        {selectedInvoice && (
          <div className="space-y-6">
            {/* Action Banners */}
            {actionError && (
              <div className="flex items-center gap-2 rounded-xl bg-rose-50 border border-rose-100 p-4 text-rose-700 text-sm">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{actionError}</span>
              </div>
            )}
            {actionSuccess && (
              <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-100 p-4 text-emerald-700 text-sm">
                <Check className="h-4 w-4 shrink-0" />
                <span>{actionSuccess}</span>
              </div>
            )}

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-mono text-slate-500 dark:text-slate-400">
                    {selectedInvoice.invoiceId}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                    {selectedInvoice.customer}
                  </h3>
                </div>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${badgeClass(selectedInvoice.status)}`}
                >
                  {selectedInvoice.status}
                </span>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Issued Date
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                    {selectedInvoice.date}
                  </p>
                </div>
                <div className="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Amount
                  </p>
                  <p className="mt-2 text-lg font-bold text-sky-600">
                    {selectedInvoice.amount}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Order Reference
                </p>
                <p className="mt-2 font-mono text-base text-slate-900 dark:text-white">
                  {selectedInvoice.orderId}
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Billing Email
                </p>
                <p className="mt-2 text-base text-slate-900 dark:text-white">
                  {selectedInvoice.billingEmail}
                </p>
              </div>
            </div>

            {/* Display Rejection Reason if any */}
            {selectedInvoice.status === "Rejected" && selectedInvoice.rejectionReason && (
              <div className="rounded-3xl border border-rose-200 bg-rose-50/50 p-6">
                <p className="text-sm font-semibold text-rose-800">
                  Rejection Reason
                </p>
                <p className="mt-1 text-xs text-rose-700">
                  {selectedInvoice.rejectionReason}
                </p>
              </div>
            )}

            {/* DISPLAY UPLOADED RECEIPT */}
            {selectedInvoice.receiptUrl && (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950 space-y-3">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Uploaded Payment Proof
                </p>
                {selectedInvoice.receiptUrl.toLowerCase().endsWith(".pdf") ? (
                  <a
                    href={selectedInvoice.receiptUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sky-600 hover:underline text-sm font-semibold"
                  >
                    <FileText className="h-5 w-5" /> View Uploaded Receipt PDF
                  </a>
                ) : (
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 max-h-96 flex justify-center">
                    <img
                      src={selectedInvoice.receiptUrl}
                      alt="Receipt Proof"
                      className="max-h-96 w-full object-contain"
                    />
                  </div>
                )}
              </div>
            )}

            {/* VERIFICATION ACTIONS FOR PROCESSING STATUS */}
            {selectedInvoice.status === "Processing" && (
              <div className="rounded-3xl border border-amber-200 bg-amber-50/50 p-6 space-y-4">
                <h4 className="font-semibold text-slate-900 text-sm">
                  Verify Client Payment Proof
                </h4>
                <p className="text-xs text-slate-500">
                  Please review the client's uploaded receipt. Approve it to advance the order to In Production, or reject it with a reason if incorrect.
                </p>
                
                {!showRejectForm ? (
                  <div className="flex gap-3">
                    <button
                      onClick={handleApprove}
                      disabled={isVerifying}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm py-2.5 px-4 rounded-xl transition disabled:opacity-50"
                    >
                      {isVerifying ? "Processing..." : "Approve & Mark Paid"}
                    </button>
                    <button
                      onClick={() => setShowRejectForm(true)}
                      disabled={isVerifying}
                      className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm py-2.5 px-4 rounded-xl transition disabled:opacity-50"
                    >
                      Reject Payment
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Rejection Reason
                    </label>
                    <textarea
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      placeholder="e.g. Amount mismatch or Proof not clear"
                      rows={3}
                      className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:border-sky-500 bg-white"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleReject}
                        disabled={isVerifying || !rejectionReason.trim()}
                        className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm py-2 px-3 rounded-lg transition disabled:opacity-50"
                      >
                        Submit Rejection
                      </button>
                      <button
                        onClick={() => {
                          setShowRejectForm(false);
                          setRejectionReason("");
                        }}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm py-2 px-3 rounded-lg transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-end pt-4 border-t border-slate-200">
              <button
                onClick={() => setSelectedInvoice(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm py-2.5 px-5 rounded-xl transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
