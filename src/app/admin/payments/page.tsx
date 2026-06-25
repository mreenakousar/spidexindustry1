"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Search, X } from "lucide-react";
import { listAdminPaymentsAction } from "@/actions/adminInvoices";
import CountUpNumber from "@/components/ui/CountUpNumber";

interface PaymentRecord {
  id: string;
  paymentId: string;
  invoice: string;
  date: string;
  amount: string;
  status: string;
  method: string;
  billingEmail: string;
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
    case "Completed":
      return "bg-emerald-100 text-emerald-700 border border-emerald-200";
    case "Processing":
      return "bg-amber-100 text-amber-700 border border-amber-200";
    case "Failed":
      return "bg-rose-100 text-rose-700 border border-rose-200";
    default:
      return "bg-slate-100 text-slate-700 border border-slate-200";
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
            Payment details
          </h2>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            onClick={onClose}
            aria-label="Close payment details dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="max-h-[80vh] overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <p className="text-sm font-semibold text-slate-900 dark:text-white">
        No payments found.
      </p>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Use filters to locate payment records or add a new transaction.
      </p>
    </div>
  );
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPayments = async () => {
    setIsLoading(true);
    try {
      const data = await listAdminPaymentsAction();
      setPayments(data as any[]);
    } catch (err) {
      console.error("Error fetching admin payments:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const query = search.toLowerCase();
      const matchesSearch =
        payment.paymentId.toLowerCase().includes(query) ||
        payment.invoice.toLowerCase().includes(query) ||
        payment.billingEmail.toLowerCase().includes(query);
      const matchesStatus =
        statusFilter === "All" || payment.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [payments, search, statusFilter]);

  const totals = useMemo(() => {
    return {
      totalReceived: payments
        .filter((payment) => payment.status === "Completed")
        .reduce((sum, payment) => {
          const val = Number(payment.amount.replace(/[^0-9.-]+/g, ""));
          return sum + (isNaN(val) ? 0 : val);
        }, 0),
      pending: payments
        .filter((payment) => payment.status === "Pending" || payment.status === "Processing")
        .reduce((sum, payment) => {
          const val = Number(payment.amount.replace(/[^0-9.-]+/g, ""));
          return sum + (isNaN(val) ? 0 : val);
        }, 0),
      failed: payments
        .filter((payment) => payment.status === "Failed")
        .reduce((sum, payment) => {
          const val = Number(payment.amount.replace(/[^0-9.-]+/g, ""));
          return sum + (isNaN(val) ? 0 : val);
        }, 0),
    };
  }, [payments]);

  return (
    <div className="space-y-8">
      {/* STATS */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Total Received
          </p>
          <p className="mt-4 text-4xl font-semibold text-emerald-600">
            <CountUpNumber value={formatCurrency(totals.totalReceived)} />
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Pending / Processing
          </p>
          <p className="mt-4 text-4xl font-semibold text-amber-600">
            <CountUpNumber value={formatCurrency(totals.pending)} />
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Failed
          </p>
          <p className="mt-4 text-4xl font-semibold text-rose-600">
            <CountUpNumber value={formatCurrency(totals.failed)} />
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
              Payments Log
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Review payment performance, reconcile transactions, and manage outstanding balances.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search payments"
                className="w-full min-w-[220px] rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              aria-label="Filter by payment status"
            >
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Processing">Processing</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          {isLoading ? (
            <div className="space-y-4 py-6">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="h-16 rounded-3xl bg-slate-100 animate-pulse dark:bg-slate-800"
                />
              ))}
            </div>
          ) : filteredPayments.length === 0 ? (
            <EmptyState />
          ) : (
            <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-700">
              <thead className="bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-200">
                <tr>
                  <th className="px-5 py-4 text-left">Payment ID</th>
                  <th className="px-5 py-4 text-left">Invoice #</th>
                  <th className="px-5 py-4 text-left">Client Email</th>
                  <th className="px-5 py-4 text-left">Amount</th>
                  <th className="px-5 py-4 text-left">Method</th>
                  <th className="px-5 py-4 text-left">Status</th>
                  <th className="px-5 py-4 text-left">Date</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredPayments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <td className="px-5 py-4 text-slate-900 dark:text-white font-mono font-semibold">
                      {payment.paymentId}
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300 font-mono text-xs">
                      {payment.invoice}
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                      {payment.billingEmail}
                    </td>
                    <td className="px-5 py-4 text-slate-900 dark:text-white font-semibold">
                      {payment.amount}
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                      {payment.method}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeClass(payment.status)}`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                      {payment.date}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                        onClick={() => setSelectedPayment(payment)}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Modal open={!!selectedPayment} onClose={() => setSelectedPayment(null)}>
        {selectedPayment && (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Payment Reference
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white font-mono">
                  {selectedPayment.paymentId}
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Invoice Reference
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white font-mono">
                  {selectedPayment.invoice}
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Client Email
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                  {selectedPayment.billingEmail}
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Method
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                  {selectedPayment.method}
                </p>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Amount
              </p>
              <p className="mt-2 text-3xl font-bold text-sky-600">
                {selectedPayment.amount}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
