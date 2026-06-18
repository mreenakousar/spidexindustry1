"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Download, Search, Wallet, X } from "lucide-react";

interface PaymentRecord {
  id: string;
  date: string;
  client: string;
  amount: number;
  method: "Stripe" | "PayPal" | "Bank Transfer" | "Wire Transfer";
  status: "Paid" | "Pending" | "Failed";
  orderId: string;
}

const paymentData: PaymentRecord[] = [
  {
    id: "PMT-1001",
    date: "2026-06-02",
    client: "Arcadia Apparel",
    amount: 12400,
    method: "Stripe",
    status: "Paid",
    orderId: "ORD-5301",
  },
  {
    id: "PMT-1002",
    date: "2026-06-01",
    client: "Summit Sportswear",
    amount: 8200,
    method: "PayPal",
    status: "Pending",
    orderId: "ORD-5294",
  },
  {
    id: "PMT-1003",
    date: "2026-05-29",
    client: "Uniform Co",
    amount: 3750,
    method: "Bank Transfer",
    status: "Failed",
    orderId: "ORD-5278",
  },
  {
    id: "PMT-1004",
    date: "2026-06-03",
    client: "Velocity Streetwear",
    amount: 93000,
    method: "PayPal",
    status: "Pending",
    orderId: "ORD-5263",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function badgeClass(status: PaymentRecord["status"]) {
  switch (status) {
    case "Paid":
      return "bg-emerald-100 text-emerald-700";
    case "Pending":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-rose-100 text-rose-700";
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
  const [statusFilter, setStatusFilter] = useState<
    "All" | PaymentRecord["status"]
  >("All");
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setPayments(paymentData);
      setIsLoading(false);
    }, 600);
    return () => window.clearTimeout(timer);
  }, []);

  const filteredPayments = useMemo(
    () =>
      payments.filter((payment) => {
        const query = search.toLowerCase();
        const matchesSearch =
          payment.client.toLowerCase().includes(query) ||
          payment.id.toLowerCase().includes(query) ||
          payment.orderId.toLowerCase().includes(query);
        const matchesStatus =
          statusFilter === "All" || payment.status === statusFilter;
        return matchesSearch && matchesStatus;
      }),
    [payments, search, statusFilter],
  );

  const totals = useMemo(
    () => ({
      totalReceived: payments
        .filter((payment) => payment.status === "Paid")
        .reduce((sum, payment) => sum + payment.amount, 0),
      pending: payments
        .filter((payment) => payment.status === "Pending")
        .reduce((sum, payment) => sum + payment.amount, 0),
      failed: payments
        .filter((payment) => payment.status === "Failed")
        .reduce((sum, payment) => sum + payment.amount, 0),
    }),
    [payments],
  );

  return (
    <div className="space-y-8">
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Total Received
          </p>
          <p className="mt-4 text-4xl font-semibold text-slate-900 dark:text-white">
            {formatCurrency(totals.totalReceived)}
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Pending
          </p>
          <p className="mt-4 text-4xl font-semibold text-amber-600">
            {formatCurrency(totals.pending)}
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Failed
          </p>
          <p className="mt-4 text-4xl font-semibold text-rose-600">
            {formatCurrency(totals.failed)}
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
              Payments
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Review payment performance, reconcile transactions, and manage
              outstanding balances.
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
              onChange={(e) =>
                setStatusFilter(
                  e.target.value as PaymentRecord["status"] | "All",
                )
              }
              className="rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              aria-label="Filter by payment status"
            >
              <option>All</option>
              <option>Paid</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          {isLoading ? (
            <div className="space-y-4 py-6">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="h-16 rounded-3xl bg-slate-100 dark:bg-slate-800"
                ></div>
              ))}
            </div>
          ) : filteredPayments.length === 0 ? (
            <EmptyState />
          ) : (
            <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-700">
              <thead className="bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-200">
                <tr>
                  <th className="px-5 py-4 text-left">Date</th>
                  <th className="px-5 py-4 text-left">Client</th>
                  <th className="px-5 py-4 text-left">Order</th>
                  <th className="px-5 py-4 text-left">Amount</th>
                  <th className="px-5 py-4 text-left">Method</th>
                  <th className="px-5 py-4 text-left">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredPayments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <td className="px-5 py-4 text-slate-900 dark:text-white">
                      {payment.date}
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                      {payment.client}
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                      {payment.orderId}
                    </td>
                    <td className="px-5 py-4 text-slate-900 dark:text-white">
                      {formatCurrency(payment.amount)}
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
                    <td className="px-5 py-4 text-right">
                      <button
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                        onClick={() => setSelectedPayment(payment)}
                      >
                        <Download className="h-3.5 w-3.5" /> Details
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
                  Payment
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                  {selectedPayment.id}
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Order
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                  {selectedPayment.orderId}
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Client
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                  {selectedPayment.client}
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
              <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
                {formatCurrency(selectedPayment.amount)}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
