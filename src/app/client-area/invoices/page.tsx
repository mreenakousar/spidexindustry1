"use client";

import { useState, useEffect, useMemo } from "react";
import { getClientInvoicesAction, payInvoiceAction, getOrderPaymentSummaryAction } from "@/actions/client";
import Badge, { statusVariant } from "@/components/ui/Badge";
import CountUpNumber from "@/components/ui/CountUpNumber";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { PageHeader } from "@/components/ui/PageHeader";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  CreditCard,
  FileCheck,
  Clock,
  DollarSign,
  Eye,
  X,
  Upload,
  AlertCircle,
  CheckCircle2,
  FileText,
  Building,
  Copy,
  Check
} from "lucide-react";

/** Upload a single File to Cloudinary via our server-side API route */
async function uploadFileToCloudinary(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/upload-image", { method: "POST", body: fd });
  if (!res.ok) throw new Error(`Upload failed for ${file.name}`);
  const json = await res.json();
  return json.url as string;
}

export default function InvoicesPage() {
  const [invoicesList, setInvoicesList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);
  const [search, setSearch] = useState("");
  const [payingInvoice, setPayingInvoice] = useState<any | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("Bank Transfer");
  const [processingPayment, setProcessingPayment] = useState(false);

  // Receipt upload states
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [uploadingReceipt, setUploadingReceipt] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState<string | null>(null);

  // Partial payment stats & fields
  const [paymentSummary, setPaymentSummary] = useState<{
    orderTotal: number;
    paidAmount: number;
    remainingAmount: number;
    invoices: any[];
  } | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [customPayAmount, setCustomPayAmount] = useState<string>("");

  // Copy clipboard states
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const fetchInvoices = async () => {
    try {
      const res = await getClientInvoicesAction();
      setInvoicesList(res);
    } catch (err) {
      console.error("Error fetching client invoices:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleReceiptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setReceiptFile(e.target.files[0]);
    setPaymentError(null);
  };

  const removeReceipt = () => {
    setReceiptFile(null);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!payingInvoice || processingPayment || !receiptFile) return;

    setProcessingPayment(true);
    setPaymentError(null);
    setPaymentSuccess(null);

    const parsedAmount = parseFloat(customPayAmount);
    const invoiceMaxAmount = Number(payingInvoice.amount.replace(/[^0-9.-]+/g, ""));

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setPaymentError("Please enter a valid payment amount.");
      setProcessingPayment(false);
      return;
    }

    if (parsedAmount > invoiceMaxAmount) {
      setPaymentError(`Payment amount cannot exceed the total invoice due of $${invoiceMaxAmount.toLocaleString()}.`);
      setProcessingPayment(false);
      return;
    }

    try {
      // 1. Upload receipt to Cloudinary
      setUploadingReceipt(true);
      const receiptUrl = await uploadFileToCloudinary(receiptFile);
      setUploadingReceipt(false);

      // 2. Submit payment action with custom amount
      const res = await payInvoiceAction(
        payingInvoice.invoiceId,
        paymentMethod,
        receiptUrl,
        parsedAmount
      );
      if (res.ok) {
        setPaymentSuccess("Receipt uploaded and payment submitted successfully!");
        setTimeout(() => {
          setPayingInvoice(null);
          setReceiptFile(null);
          setPaymentSuccess(null);
          fetchInvoices();
        }, 2000);
      }
    } catch (err: any) {
      console.error("Error processing invoice payment:", err);
      setPaymentError(err.message || "Failed to process payment. Please try again.");
      setUploadingReceipt(false);
    } finally {
      setProcessingPayment(false);
    }
  };

  const filteredInvoices = useMemo(() => {
    return invoicesList.filter((inv) => {
      const matchesSearch =
        inv.invoiceId.toLowerCase().includes(search.toLowerCase()) ||
        inv.customer?.toLowerCase().includes(search.toLowerCase()) ||
        inv.orderId.toLowerCase().includes(search.toLowerCase());
      return matchesSearch;
    });
  }, [invoicesList, search]);

  const totalOutstandingCount = invoicesList.length;
  const totalAmountDue = invoicesList.reduce((acc, inv) => {
    const val = Number(inv.amount.replace(/[^0-9.-]+/g, ""));
    return acc + (isNaN(val) ? 0 : val);
  }, 0);

  if (loading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-sky-600" />
        <p className="text-sm font-medium text-slate-500">Loading invoices...</p>
      </div>
    );
  }

  // Table config
  const tableHeaders = [
    { key: "invoiceId", label: "Invoice ID" },
    { key: "orderId",   label: "Order ID" },
    { key: "date",      label: "Issue Date" },
    { key: "amount",    label: "Amount Due" },
    { key: "status",    label: "Status" },
  ];

  const tableData = filteredInvoices.map((inv) => ({
    id: inv.id,
    invoiceId: <span className="font-mono font-semibold text-slate-700">{inv.invoiceId}</span>,
    orderId:   <span className="font-mono text-xs text-slate-500">{inv.orderId}</span>,
    date:      inv.date,
    amount:    <span className="font-semibold text-slate-900">{inv.amount}</span>,
    status: (
      <div className="flex flex-col gap-1">
        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold border ${
          inv.status === "Processing"
            ? "bg-amber-50 text-amber-700 border-amber-200"
            : inv.status === "Rejected"
            ? "bg-rose-50 text-rose-700 border-rose-200"
            : "bg-blue-50 text-blue-700 border-blue-200"
        }`}>
          {inv.status}
        </span>
        {inv.status === "Rejected" && inv.rejectionReason && (
          <span className="text-[10px] text-rose-600 font-semibold max-w-[150px] whitespace-normal break-words" title={inv.rejectionReason}>
            Reason: {inv.rejectionReason}
          </span>
        )}
      </div>
    ),
  }));

  const tableButtons = [
    {
      icon: <Eye className="h-4 w-4" />,
      text: "View Details",
      className: "bg-slate-950 text-white hover:bg-slate-800 transition-colors",
      onClick: (row: { id: string }) => {
        const inv = invoicesList.find((i) => i.id === row.id);
        if (inv) setSelectedInvoice(inv);
      },
    },
    {
      icon: <CreditCard className="h-4 w-4" />,
      text: "Pay Now",
      className: "bg-sky-600 text-white hover:bg-sky-700 transition-colors",
      onClick: (row: { id: string }) => {
        const inv = invoicesList.find((i) => i.id === row.id);
        if (!inv) return;
        if (inv.amount === "Awaiting Quote") {
          alert("Your order price has not been confirmed yet. Please wait for the admin to set the quoted amount before making a payment.");
          return;
        }
        if (inv.status === "Processing") {
          alert("This invoice is currently under verification by the admin.");
          return;
        }
        setPayingInvoice(inv);
        setReceiptFile(null);
        setPaymentError(null);
        setPaymentSuccess(null);
        
        // Initial setup for partial payment
        const invoiceNumeric = Number(inv.amount.replace(/[^0-9.-]+/g, ""));
        setCustomPayAmount(isNaN(invoiceNumeric) ? "" : String(invoiceNumeric));

        setLoadingSummary(true);
        setPaymentSummary(null);
        getOrderPaymentSummaryAction(inv.orderId)
          .then((summary) => {
            setPaymentSummary(summary);
          })
          .catch((err) => {
            console.error("Failed to load payment summary:", err);
          })
          .finally(() => {
            setLoadingSummary(false);
          });
      },
    },
  ];

  const filterActions = (
    <div className="flex flex-col gap-3 sm:flex-row">
      <input
        type="text"
        placeholder="Search invoice or order ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm outline-none focus:border-sky-500 bg-white text-slate-900"
      />
    </div>
  );

  const stats = [
    { icon: FileCheck, title: "Awaiting Payment", value: totalOutstandingCount, desc: "Invoices to be paid" },
    { icon: DollarSign, title: "Total Amount Due", value: `$${totalAmountDue.toLocaleString()}`, desc: "Outstanding balance", isText: true },
    { icon: Clock,      title: "Status",           value: "Pending", desc: "Awaiting client transfer", isText: true },
  ];

  return (
    <>
      <div className="space-y-[clamp(1.5rem,3vw,2rem)]">
        {/* HEADER */}
        <PageHeader
          variant="dark"
          label="Invoices"
          title="Outstanding Invoices"
          description="View and process payments for all outstanding invoices."
        />

        {/* STATS */}
        <section className="grid gap-[clamp(1rem,2vw,1.5rem)] sm:grid-cols-3">
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
                      {stat.isText ? stat.value : <CountUpNumber value={stat.value as number} />}
                    </div>
                  </div>
                  <p className="mt-4 text-[clamp(12px,1.1vw,13px)] text-slate-300">{stat.desc}</p>
                </div>
              </Card>
            );
          })}
        </section>

        {/* TABLE */}
        <Card className="border border-slate-100 p-0 overflow-hidden bg-white">
          <DataTable
            heading="Unpaid Invoices"
            TableHeaders={tableHeaders}
            TableData={tableData}
            TableButtons={tableButtons}
            currentPage={1}
            totalPages={1}
            onPageChange={() => {}}
            pageSize={filteredInvoices.length || 10}
            totalEntries={filteredInvoices.length}
            headerActions={filterActions}
          />
        </Card>
      </div>

      {/* VIEW MODAL */}
      <Modal
        isOpen={selectedInvoice !== null}
        onClose={() => setSelectedInvoice(null)}
        showHeader={false}
        className="w-full max-w-2xl overflow-hidden bg-white"
      >
        {selectedInvoice && (
          <>
            {/* Coloured header */}
            <div
              className="flex items-center justify-between bg-slate-900"
              style={{ padding: "clamp(10px,2vw,16px) clamp(14px,3vw,24px)" }}
            >
              <div className="flex items-center" style={{ gap: "clamp(6px,1vw,10px)" }}>
                <FileText
                  className="text-white"
                  style={{ width: "clamp(14px,2vw,20px)", height: "clamp(14px,2vw,20px)" }}
                />
                <span
                  className="font-medium text-white"
                  style={{ fontSize: "clamp(11px,1.5vw,14px)" }}
                >
                  Invoice Details
                </span>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="text-white/80 hover:text-white transition"
              >
                <X style={{ width: "clamp(16px,2vw,22px)", height: "clamp(16px,2vw,22px)" }} />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto" style={{ maxHeight: "calc(85vh - 70px)", padding: "clamp(16px,3vw,28px)" }}>
              <div className="space-y-6">
                <div>
                  <div
                    className="capitalize text-slate-500"
                    style={{
                      fontSize: "clamp(10px,1.2vw,13px)",
                      marginBottom: "clamp(2px,0.4vw,6px)",
                    }}
                  >
                    invoice • {selectedInvoice.date}
                  </div>
                  <h2
                    className="font-semibold text-slate-900"
                    style={{ fontSize: "clamp(16px,2.5vw,26px)" }}
                  >
                    {selectedInvoice.invoiceId}
                  </h2>
                </div>

                <div
                  className="grid grid-cols-2 rounded bg-slate-50"
                  style={{
                    gap: "clamp(10px,1.5vw,18px)",
                    padding: "clamp(12px,2vw,20px)",
                  }}
                >
                  {[
                    { label: "Invoice ID", value: selectedInvoice.invoiceId },
                    { label: "Associated Order", value: selectedInvoice.orderId },
                    { label: "Issue Date", value: selectedInvoice.date },
                    { label: "Total Amount", value: selectedInvoice.amount },
                    { label: "Client", value: selectedInvoice.customer },
                    { label: "Billing Email", value: selectedInvoice.billingEmail },
                    { label: "Status", value: selectedInvoice.status },
                    ...(selectedInvoice.status === "Rejected" && selectedInvoice.rejectionReason
                      ? [{ label: "Rejection Reason", value: selectedInvoice.rejectionReason }]
                      : []),
                  ].map(({ label, value }) => (
                    <div key={label} className="col-span-2 sm:col-span-1">
                      <p
                        className="capitalize text-slate-500"
                        style={{
                          fontSize: "clamp(9px,1vw,12px)",
                          marginBottom: "clamp(2px,0.3vw,5px)"
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

                <div className="flex gap-3 justify-end pt-4 border-t border-slate-100">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setSelectedInvoice(null)}
                  >
                    Close
                  </Button>
                  <a
                    href={selectedInvoice.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
                  >
                    Download Invoice PDF
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </Modal>

      {/* PAYMENT MODAL */}
      <Modal
        isOpen={payingInvoice !== null}
        onClose={() => setPayingInvoice(null)}
        showHeader={false}
        className="w-full max-w-xl overflow-hidden bg-white"
      >
        {payingInvoice && (
          <>
            {/* Coloured header */}
            <div
              className="flex items-center justify-between bg-sky-600"
              style={{ padding: "clamp(10px,2vw,16px) clamp(14px,3vw,24px)" }}
            >
              <div className="flex items-center" style={{ gap: "clamp(6px,1vw,10px)" }}>
                <CreditCard
                  className="text-white"
                  style={{ width: "clamp(14px,2vw,20px)", height: "clamp(14px,2vw,20px)" }}
                />
                <span
                  className="font-medium text-white"
                  style={{ fontSize: "clamp(11px,1.5vw,14px)" }}
                >
                  Pay Invoice
                </span>
              </div>
              <button
                onClick={() => setPayingInvoice(null)}
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
              <form onSubmit={handlePaymentSubmit} className="space-y-6" noValidate>

                {/* ── Error Banner ─────────────────────────────────────────── */}
                {paymentError && (
                  <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <div className="flex-1 text-sm">
                      <p className="font-semibold">Something went wrong</p>
                      <p className="mt-0.5 text-xs text-red-600">{paymentError}</p>
                    </div>
                    <button type="button" onClick={() => setPaymentError(null)} className="text-red-400 hover:text-red-600">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {/* ── Success Banner ────────────────────────────────────────── */}
                {paymentSuccess && (
                  <div className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                    <p className="text-sm font-medium">{paymentSuccess}</p>
                  </div>
                )}

                {/* ── Bank Details Box ──────────────────────────────────────── */}
                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-3">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Building className="h-3.5 w-3.5" /> Company Bank Account Details
                  </h3>
                  <p className="text-xs text-slate-400">Please transfer the amount due to the bank account below, then upload the receipt/proof of transfer.</p>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    {[
                      { label: "Bank Name", value: "Standard Chartered Bank" },
                      { label: "Account Name", value: "SpeedX Manufacturing Ltd" },
                      { label: "Account Number", value: "01-2345678-01" },
                      { label: "IBAN", value: "BD88SCB01234567801" },
                      { label: "SWIFT Code", value: "SCBLBDDX" },
                      { label: "Routing Number", value: "090263622" },
                    ].map(({ label, value }) => (
                      <div key={label} className="col-span-2 sm:col-span-1 flex flex-col justify-between border-b border-slate-100/50 pb-1.5">
                        <span className="text-slate-400 font-medium">{label}</span>
                        <div className="flex items-center justify-between gap-1 mt-0.5">
                          <span className="font-semibold text-slate-800 select-all truncate">{value}</span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(value, label)}
                            className="text-slate-400 hover:text-sky-600 p-0.5 transition"
                            title="Copy details"
                          >
                            {copiedField === label ? (
                              <Check className="h-3 w-3 text-emerald-600" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Invoice Info Banner ───────────────────────────────────── */}
                <div className="rounded-xl bg-slate-50 border border-slate-100 p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Invoice ID</span>
                    <span className="font-semibold">{payingInvoice.invoiceId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Associated Order</span>
                    <span className="font-mono text-xs text-slate-500">{payingInvoice.orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Invoice Amount Due</span>
                    <span className="font-bold text-sky-600">{payingInvoice.amount}</span>
                  </div>

                  {loadingSummary && (
                    <div className="flex items-center justify-center py-2 text-xs text-slate-400">
                      <div className="mr-2 h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-200 border-t-sky-500" />
                      Loading contract history...
                    </div>
                  )}

                  {!loadingSummary && paymentSummary && (
                    <div className="border-t border-slate-200/60 pt-2.5 mt-2.5 space-y-1.5 text-xs">
                      <div className="flex justify-between text-slate-500">
                        <span>Total Contract Value:</span>
                        <span className="font-semibold text-slate-700">${paymentSummary.orderTotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>Total Paid So Far:</span>
                        <span className="font-semibold text-emerald-600">${paymentSummary.paidAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>Balance Remaining:</span>
                        <span className="font-semibold text-rose-600">${paymentSummary.remainingAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* ── Fields ────────────────────────────────────────────────── */}
                <div className="space-y-4">
                  <Input
                    id="pay-custom-amount"
                    label="Amount to Pay (USD $)"
                    type="number"
                    min="1"
                    placeholder="e.g. 5000"
                    value={customPayAmount}
                    onChange={(e) => setCustomPayAmount(e.target.value)}
                    required
                  />

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#475569] uppercase tracking-wider">Payment Method</label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl p-2.5 text-sm bg-slate-50 outline-none focus:border-sky-500"
                    >
                      <option value="Bank Transfer">Bank Wire / Transfer</option>
                      <option value="Stripe">Credit / Debit Card (Stripe)</option>
                      <option value="JazzCash">JazzCash Mobile Wallet</option>
                      <option value="EasyPaisa">EasyPaisa Mobile Wallet</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="receiptUpload"
                      className="text-xs font-semibold text-[#475569] uppercase tracking-wider"
                    >
                      Upload Payment Receipt (PDF or Image)
                    </label>
                    <input
                      id="receiptUpload"
                      type="file"
                      accept=".pdf,image/*"
                      onChange={handleReceiptChange}
                      required
                      className="w-full rounded-md bg-slate-50 border border-slate-200 p-[clamp(0.6rem,1.5vw,0.875rem)] text-[clamp(0.875rem,1vw+0.2rem,1rem)] text-slate-600 file:mr-3 file:rounded file:border-0 file:bg-sky-50 file:px-3 file:py-1 file:text-sm file:font-semibold file:text-sky-600 hover:file:bg-sky-100 transition"
                    />
                  </div>

                  {/* ── Preview Receipt File ──────────────────────────────────── */}
                  {receiptFile && (
                    <div className="flex items-center gap-3 rounded-md bg-white border border-slate-200 p-2 text-sm text-slate-700">
                      {receiptFile.type.startsWith("image/") ? (
                        <img
                          src={URL.createObjectURL(receiptFile)}
                          alt="Receipt Preview"
                          className="h-12 w-12 rounded object-cover shrink-0 border border-slate-200"
                        />
                      ) : (
                        <FileText className="h-10 w-10 shrink-0 text-red-400" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="truncate font-medium text-slate-800">{receiptFile.name}</p>
                        <p className="text-xs text-slate-400">{(receiptFile.size / 1024).toFixed(1)} KB</p>
                      </div>
                      {!processingPayment && (
                        <button
                          type="button"
                          onClick={removeReceipt}
                          className="text-red-500 hover:text-red-700 text-xs shrink-0 font-semibold px-2 py-1"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* ── Submit Buttons ────────────────────────────────────────── */}
                <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setPayingInvoice(null)}
                    disabled={processingPayment}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={processingPayment || !receiptFile}
                  >
                    {processingPayment ? (
                      <span className="flex items-center gap-2">
                        <Upload className="h-3.5 w-3.5 animate-bounce" />
                        Uploading & Processing...
                      </span>
                    ) : (
                      "Submit Proof of Payment"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}