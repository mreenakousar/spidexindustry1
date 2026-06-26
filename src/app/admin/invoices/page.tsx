"use client";

import { useEffect, useState, useMemo } from "react";
import {
  FileText,
  Search,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  X,
  Building,
  Check,
  Copy,
  Download,
  AlertCircle
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { PageHeader } from "@/components/ui/PageHeader";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  listAdminInvoicesAction,
  verifyInvoiceAction,
  getInvoicePaymentDetailsAction
} from "@/actions/adminInvoices";

export default function AdminInvoicesPage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Verification modal states
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Partial Payment states
  const [paymentDetails, setPaymentDetails] = useState<any | null>(null);
  const [loadingPaymentDetails, setLoadingPaymentDetails] = useState(false);
  const [verifiedAmount, setVerifiedAmount] = useState<string>("");

  const fetchInvoices = async () => {
    try {
      const res = await listAdminInvoicesAction();
      setInvoices(res);
    } catch (err) {
      console.error("Error loading admin invoices:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleVerify = async (status: "Paid" | "Rejected") => {
    if (!selectedInvoice) return;
    if (status === "Rejected" && !rejectionReason.trim()) {
      setActionError("Please enter a rejection reason.");
      return;
    }

    const parsedVerifiedAmount = status === "Paid" ? parseFloat(verifiedAmount) : undefined;
    if (status === "Paid" && (isNaN(parsedVerifiedAmount as number) || (parsedVerifiedAmount as number) <= 0)) {
      setActionError("Please enter a valid verified payment amount.");
      return;
    }

    setVerifying(true);
    setActionError(null);
    setActionSuccess(null);
    try {
      const res = await verifyInvoiceAction(
        selectedInvoice.invoiceId,
        status,
        status === "Rejected" ? rejectionReason : undefined,
        parsedVerifiedAmount
      );

      if (res.ok) {
        setActionSuccess(`Invoice successfully marked as ${status}!`);
        setTimeout(() => {
          setSelectedInvoice(null);
          setRejectionReason("");
          setShowRejectForm(false);
          setActionSuccess(null);
          fetchInvoices();
        }, 1500);
      }
    } catch (err: any) {
      setActionError(err.message || "Failed to process verification.");
    } finally {
      setVerifying(false);
    }
  };

  // Stats calculation
  const stats = useMemo(() => {
    const total = invoices.length;
    const processing = invoices.filter((i) => i.status === "Processing").length;
    const paid = invoices.filter((i) => i.status === "Paid").length;
    const revenue = invoices
      .filter((i) => i.status === "Paid")
      .reduce((sum, i) => {
        const val = Number(i.amount.replace(/[^0-9.-]+/g, ""));
        return sum + (isNaN(val) ? 0 : val);
      }, 0);

    return { total, processing, paid, revenue };
  }, [invoices]);

  // Filters
  const filteredInvoices = useMemo(() => {
    return invoices.filter((i) => {
      const matchSearch =
        i.invoiceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.orderId.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === "All" || i.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [invoices, searchQuery, statusFilter]);

  // Table structure
  const tableHeaders = [
    { key: "invoiceId", label: "Invoice ID" },
    { key: "customer", label: "Client" },
    { key: "orderId", label: "Order ID" },
    { key: "amount", label: "Amount" },
    { key: "date", label: "Issue Date" },
    { key: "status", label: "Status" },
  ];

  const tableData = filteredInvoices.map((i) => ({
    id: i.id,
    invoiceId: <span className="font-mono font-semibold text-slate-700">{i.invoiceId}</span>,
    customer: <span className="font-semibold text-slate-800">{i.customer}</span>,
    orderId: <span className="font-mono text-xs text-slate-500">{i.orderId}</span>,
    amount: <span className="font-semibold text-slate-900">{i.amount}</span>,
    date: i.date,
    status: (
      <div className="flex flex-col gap-1">
        <span
          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            i.status === "Paid"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
              : i.status === "Rejected"
              ? "bg-rose-50 text-rose-700 border border-rose-100"
              : i.status === "Processing"
              ? "bg-amber-50 text-amber-700 border border-amber-100 animate-pulse"
              : "bg-blue-50 text-blue-700 border border-blue-100"
          }`}
        >
          {i.status}
        </span>
        {i.status === "Rejected" && i.rejectionReason && (
          <span className="text-[10px] text-rose-600 font-semibold max-w-[150px] whitespace-normal break-words">
            Reason: {i.rejectionReason}
          </span>
        )}
      </div>
    ),
  }));

  const tableButtons = [
    {
      icon: <Eye className="h-3.5 w-3.5" />,
      text: "Verify / Details",
      className: "bg-slate-950 text-white hover:bg-slate-800 transition-colors",
      onClick: (row: { id: string }) => {
        const found = invoices.find((i) => i.id === row.id);
        if (found) {
          setSelectedInvoice(found);
          setPaymentDetails(null);
          setVerifiedAmount("");
          setLoadingPaymentDetails(true);

          getInvoicePaymentDetailsAction(found.invoiceId)
            .then((pay) => {
              setPaymentDetails(pay);
              if (pay) {
                const numericVal = Number(pay.amount.replace(/[^0-9.-]+/g, ""));
                setVerifiedAmount(isNaN(numericVal) ? "" : String(numericVal));
              } else {
                const numericInvoice = Number(found.amount.replace(/[^0-9.-]+/g, ""));
                setVerifiedAmount(isNaN(numericInvoice) ? "" : String(numericInvoice));
              }
            })
            .catch((err) => {
              console.error("Failed to load invoice payment details:", err);
            })
            .finally(() => {
              setLoadingPaymentDetails(false);
            });
        }
      },
    },
    {
      icon: <Download className="h-3.5 w-3.5" />,
      text: "PDF",
      className: "bg-sky-600 text-white hover:bg-sky-700 transition-colors",
      onClick: (row: { id: string }) => {
        const found = invoices.find((i) => i.id === row.id);
        if (found && found.pdfUrl) {
          window.open(found.pdfUrl, "_blank");
        } else {
          alert("Invoice PDF url not available.");
        }
      },
    },
  ];

  const headerActions = (
    <div className="flex flex-wrap items-center gap-3">
      <input
        type="text"
        placeholder="Search invoice or order ID..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-800 outline-none focus:border-sky-500 bg-white"
      />
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-800 outline-none focus:border-sky-500"
      >
        <option value="All">All Statuses</option>
        <option value="Paid">Paid</option>
        <option value="Processing">Processing</option>
        <option value="Rejected">Rejected</option>
        <option value="Pending">Pending</option>
      </select>
    </div>
  );

  if (loading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-sky-600" />
        <p className="text-sm font-medium text-slate-500">Loading invoices...</p>
      </div>
    );
  }

  return (
    <div className="space-y-[clamp(1.5rem,3vw,2rem)]">
      {/* HEADER */}
      <PageHeader
        variant="dark"
        label="Financial Operations"
        title="Invoice Ledger & Approvals"
        description="Verify submitted proof-of-payment receipts, reconcile bank transfers, and manage client bills."
      />

      {/* STATS */}
      <section className="grid gap-[clamp(1rem,2vw,1.5rem)] sm:grid-cols-4">
        <Card variant="primary" className="p-5 flex flex-col justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-300">Total Bills</p>
          <p className="text-2xl font-bold mt-2 text-white">{stats.total} Invoices</p>
        </Card>
        <Card variant="primary" className="p-5 flex flex-col justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-300">Awaiting Verification</p>
          <p className="text-2xl font-bold mt-2 text-white">{stats.processing} Receipts</p>
        </Card>
        <Card variant="primary" className="p-5 flex flex-col justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-300">Fully Settled</p>
          <p className="text-2xl font-bold mt-2 text-white">{stats.paid} Settled</p>
        </Card>
        <Card variant="primary" className="p-5 flex flex-col justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-300">Reconciled Revenue</p>
          <p className="text-2xl font-bold mt-2 text-white">${stats.revenue.toLocaleString()}</p>
        </Card>
      </section>

      {/* TABLE */}
      <Card className="border border-slate-100 p-0 overflow-hidden bg-white">
        <DataTable
          heading="Accounts Receivable Ledger"
          TableHeaders={tableHeaders}
          TableData={tableData}
          TableButtons={tableButtons}
          currentPage={1}
          totalPages={1}
          onPageChange={() => {}}
          pageSize={filteredInvoices.length || 10}
          totalEntries={filteredInvoices.length}
          headerActions={headerActions}
        />
      </Card>

      {/* VERIFICATION MODAL */}
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
                <span className="font-medium text-white text-sm">Invoice Details: {selectedInvoice.invoiceId}</span>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="text-white/85 hover:text-white transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {actionSuccess && (
                <div className="rounded-lg bg-emerald-50 border border-emerald-100 p-3 text-xs text-emerald-700 font-medium">
                  {actionSuccess}
                </div>
              )}
              {actionError && (
                <div className="rounded-lg bg-rose-50 border border-rose-100 p-3 text-xs text-rose-700 font-medium">
                  {actionError}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 rounded-xl bg-slate-50 border border-slate-100 p-4 text-xs">
                {[
                  { label: "Invoice ID", value: selectedInvoice.invoiceId },
                  { label: "Client / Customer", value: selectedInvoice.customer },
                  { label: "Associated Order ID", value: selectedInvoice.orderId },
                  { label: "Billing Email", value: selectedInvoice.billingEmail },
                  { label: "Amount Due", value: selectedInvoice.amount },
                  { label: "Invoice Date", value: selectedInvoice.date },
                  { label: "Payment Status", value: selectedInvoice.status },
                  ...(selectedInvoice.rejectionReason
                    ? [{ label: "Rejection Reason", value: selectedInvoice.rejectionReason }]
                    : []),
                ].map(({ label, value }) => (
                  <div key={label} className="col-span-2 sm:col-span-1 border-b border-slate-100 pb-1.5">
                    <span className="text-slate-400 block font-medium mb-0.5">{label}</span>
                    <span className="font-semibold text-slate-800 text-sm">{value}</span>
                  </div>
                ))}
              </div>

              {/* Receipt Preview */}
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Proof of Payment Receipt</p>
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
                          View Uploaded Receipt PDF
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
                    No receipt uploaded yet (Status: {selectedInvoice.status}).
                  </div>
                )}
              </div>

              {/* Payment Verification Override */}
              {selectedInvoice.status === "Processing" && (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Payment Verification</p>
                  
                  {loadingPaymentDetails ? (
                    <div className="flex items-center text-xs text-slate-400">
                      <div className="mr-2 h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-200 border-t-sky-500" />
                      Retrieving client claimed payment...
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex justify-between text-xs text-slate-600">
                        <span>Client Claimed Amount:</span>
                        <span className="font-semibold text-slate-800">
                          {paymentDetails ? paymentDetails.amount : selectedInvoice.amount}
                        </span>
                      </div>
                      
                      <Input
                        id="verify-override-amount"
                        label="Verified Payment Amount (USD $)"
                        type="number"
                        min="1"
                        value={verifiedAmount}
                        onChange={(e) => setVerifiedAmount(e.target.value)}
                        required
                        className="bg-white text-slate-800"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              {selectedInvoice.status === "Processing" && (
                <>
                  {!showRejectForm ? (
                    <div className="flex gap-3 justify-end pt-4 border-t border-slate-100">
                      <Button
                        variant="outline"
                        onClick={() => setShowRejectForm(true)}
                        disabled={verifying}
                        className="border-rose-200 text-rose-700 hover:bg-rose-50"
                      >
                        <XCircle className="h-4 w-4 mr-1.5" /> Reject proof
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => handleVerify("Paid")}
                        disabled={verifying}
                        className="bg-emerald-600 hover:bg-emerald-700"
                      >
                        <CheckCircle2 className="h-4 w-4 mr-1.5" /> Approve & Mark Paid
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
                        placeholder="e.g. Blurry photo, incorrect bank details, amount mismatch..."
                        className="w-full rounded-xl border border-slate-200 p-2.5 text-sm outline-none focus:border-sky-500 text-slate-800"
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
                          onClick={() => handleVerify("Rejected")}
                          disabled={verifying}
                          className="bg-rose-600 hover:bg-rose-700"
                        >
                          Confirm Rejection
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}
