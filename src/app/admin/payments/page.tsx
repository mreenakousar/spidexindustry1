"use client";

import { useEffect, useState, useMemo } from "react";
import {
  DollarSign,
  Search,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  X,
  CreditCard,
  Building,
  FileText
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { PageHeader } from "@/components/ui/PageHeader";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/Button";
import { listAdminPaymentsAction } from "@/actions/adminInvoices";

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Modal state
  const [selectedPayment, setSelectedPayment] = useState<any | null>(null);

  const fetchPayments = async () => {
    try {
      const res = await listAdminPaymentsAction();
      setPayments(res);
    } catch (err) {
      console.error("Error loading admin payments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // Stats calculation
  const stats = useMemo(() => {
    const totalCompleted = payments
      .filter((p) => p.status === "Completed")
      .reduce((sum, p) => {
        const val = Number(p.amount.replace(/[^0-9.-]+/g, ""));
        return sum + (isNaN(val) ? 0 : val);
      }, 0);

    const totalProcessing = payments
      .filter((p) => p.status === "Processing" || p.status === "Pending")
      .reduce((sum, p) => {
        const val = Number(p.amount.replace(/[^0-9.-]+/g, ""));
        return sum + (isNaN(val) ? 0 : val);
      }, 0);

    const totalFailed = payments
      .filter((p) => p.status === "Failed")
      .reduce((sum, p) => {
        const val = Number(p.amount.replace(/[^0-9.-]+/g, ""));
        return sum + (isNaN(val) ? 0 : val);
      }, 0);

    return { totalCompleted, totalProcessing, totalFailed };
  }, [payments]);

  // Filters
  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      const matchSearch =
        p.paymentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.invoice.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.billingEmail.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === "All" || p.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [payments, searchQuery, statusFilter]);

  // Table headers
  const tableHeaders = [
    { key: "paymentId", label: "Payment ID" },
    { key: "invoice", label: "Invoice ID" },
    { key: "amount", label: "Amount" },
    { key: "method", label: "Method" },
    { key: "date", label: "Date" },
    { key: "status", label: "Status" },
  ];

  // Table data mapping
  const tableData = filteredPayments.map((p) => ({
    id: p.id,
    paymentId: <span className="font-mono font-semibold text-slate-700">{p.paymentId}</span>,
    invoice: <span className="font-mono text-xs text-slate-500">{p.invoice}</span>,
    amount: <span className="font-semibold text-slate-900">{p.amount}</span>,
    method: <span className="font-medium text-slate-600">{p.method}</span>,
    date: p.date,
    status: (
      <span
        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
          p.status === "Completed"
            ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
            : p.status === "Failed"
            ? "bg-rose-50 text-rose-700 border border-rose-100"
            : "bg-amber-50 text-amber-700 border border-amber-100 animate-pulse"
        }`}
      >
        {p.status}
      </span>
    ),
  }));

  const tableButtons = [
    {
      icon: <Eye className="h-3.5 w-3.5" />,
      text: "View Details",
      className: "bg-slate-950 text-white hover:bg-slate-800 transition-colors",
      onClick: (row: { id: string }) => {
        const found = payments.find((p) => p.id === row.id);
        if (found) setSelectedPayment(found);
      },
    },
  ];

  const headerActions = (
    <div className="flex flex-wrap items-center gap-3">
      <input
        type="text"
        placeholder="Search payment ID, invoice, email..."
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
        <option value="Completed">Completed</option>
        <option value="Processing">Processing</option>
        <option value="Failed">Failed</option>
      </select>
    </div>
  );

  if (loading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-sky-600" />
        <p className="text-sm font-medium text-slate-500">Loading payment ledger...</p>
      </div>
    );
  }

  return (
    <div className="space-y-[clamp(1.5rem,3vw,2rem)]">
      {/* HEADER */}
      <PageHeader
        variant="dark"
        label="Financial Logging"
        title="Apparel Payments Log"
        description="Audit completed bank receipts, card transfers, and fail/refund history for accounts reconciliation."
      />

      {/* STATS */}
      <section className="grid gap-[clamp(1rem,2vw,1.5rem)] sm:grid-cols-3">
        <Card variant="primary" className="p-5 flex flex-col justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-300">Total Cleared</p>
          <p className="text-2xl font-bold mt-2 text-white">${stats.totalCompleted.toLocaleString()}</p>
        </Card>
        <Card variant="primary" className="p-5 flex flex-col justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-300">Pending Wire Clears</p>
          <p className="text-2xl font-bold mt-2 text-white">${stats.totalProcessing.toLocaleString()}</p>
        </Card>
        <Card variant="primary" className="p-5 flex flex-col justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-300">Failed / Rejected Proofs</p>
          <p className="text-2xl font-bold mt-2 text-white">${stats.totalFailed.toLocaleString()}</p>
        </Card>
      </section>

      {/* TABLE */}
      <Card className="border border-slate-100 p-0 overflow-hidden bg-white">
        <DataTable
          heading="Accounts Receivable Cleared Ledger"
          TableHeaders={tableHeaders}
          TableData={tableData}
          TableButtons={tableButtons}
          currentPage={1}
          totalPages={1}
          onPageChange={() => {}}
          pageSize={filteredPayments.length || 10}
          totalEntries={filteredPayments.length}
          headerActions={headerActions}
        />
      </Card>

      {/* DETAIL MODAL */}
      <Modal
        isOpen={selectedPayment !== null}
        onClose={() => setSelectedPayment(null)}
        showHeader={false}
        className="w-full max-w-md overflow-hidden bg-white"
      >
        {selectedPayment && (
          <>
            <div className="flex items-center justify-between bg-slate-900 p-4">
              <div className="flex items-center gap-2">
                <CreditCard className="text-white h-5 w-5" />
                <span className="font-medium text-white text-sm">Payment Details: {selectedPayment.paymentId}</span>
              </div>
              <button
                onClick={() => setSelectedPayment(null)}
                className="text-white/85 hover:text-white transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3 rounded-xl bg-slate-50 border border-slate-100 p-4 text-xs">
                {[
                  { label: "Payment ID", value: selectedPayment.paymentId },
                  { label: "Invoice ID Reference", value: selectedPayment.invoice },
                  { label: "Amount Settle", value: selectedPayment.amount },
                  { label: "Transfer Method", value: selectedPayment.method },
                  { label: "Billing Email", value: selectedPayment.billingEmail },
                  { label: "Payment Date", value: selectedPayment.date },
                  { label: "Status", value: selectedPayment.status },
                ].map(({ label, value }) => (
                  <div key={label} className="col-span-2 sm:col-span-1 border-b border-slate-100 pb-1.5">
                    <span className="text-slate-400 block font-medium mb-0.5">{label}</span>
                    <span className="font-semibold text-slate-800 text-sm">{value}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-2">
                <Button variant="outline" onClick={() => setSelectedPayment(null)}>
                  Close
                </Button>
              </div>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}
