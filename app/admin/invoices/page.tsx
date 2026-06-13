"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, Search, Tag, Wallet, X } from "lucide-react";
import CountUpNumber from "../../../src/components/ui/CountUpNumber";

interface Invoice {
  id: string;
  client: string;
  dueDate: string;
  amount: number;
  status: "Paid" | "Pending" | "Overdue";
  orderId: string;
  issuedDate: string;
  method: string;
  balance: number;
}

const invoiceData: Invoice[] = [
  {
    id: "INV-1001",
    client: "Arcadia Apparel",
    dueDate: "2026-06-01",
    amount: 12400,
    status: "Paid",
    orderId: "ORD-5301",
    issuedDate: "2026-05-22",
    method: "Wire Transfer",
    balance: 0,
  },
  {
    id: "INV-1002",
    client: "Summit Sportswear",
    dueDate: "2026-06-07",
    amount: 8200,
    status: "Pending",
    orderId: "ORD-5294",
    issuedDate: "2026-05-28",
    method: "Credit Card",
    balance: 8200,
  },
  {
    id: "INV-1003",
    client: "Uniform Co",
    dueDate: "2026-05-28",
    amount: 3750,
    status: "Overdue",
    orderId: "ORD-5278",
    issuedDate: "2026-05-15",
    method: "Bank Transfer",
    balance: 3750,
  },
  {
    id: "INV-1004",
    client: "Velocity Streetwear",
    dueDate: "2026-06-12",
    amount: 93000,
    status: "Pending",
    orderId: "ORD-5263",
    issuedDate: "2026-05-20",
    method: "PayPal",
    balance: 93000,
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function badgeClass(status: Invoice["status"]) {
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
  const [statusFilter, setStatusFilter] = useState<"All" | Invoice["status"]>(
    "All",
  );
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setInvoices(invoiceData);
      setIsLoading(false);
    }, 600);
    return () => window.clearTimeout(timer);
  }, []);

  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      const query = search.toLowerCase();
      const matchesSearch =
        invoice.id.toLowerCase().includes(query) ||
        invoice.client.toLowerCase().includes(query) ||
        invoice.orderId.toLowerCase().includes(query);
      const matchesStatus =
        statusFilter === "All" || invoice.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [invoices, search, statusFilter]);

  const totals = useMemo(
    () => ({
      total: invoices.length,
      revenue: invoices.reduce((sum, invoice) => sum + invoice.amount, 0),
      paid: invoices.filter((invoice) => invoice.status === "Paid").length,
      overdue: invoices.filter((invoice) => invoice.status === "Overdue")
        .length,
    }),
    [invoices],
  );

  return (
    <div className="space-y-8">
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
            Total Revenue
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
            Overdue
          </p>
          <p className="mt-4 text-4xl font-semibold text-rose-600">
            <CountUpNumber value={totals.overdue} />
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
              Review invoicing status and send payment reminders for apparel
              manufacturing orders.
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
              onChange={(e) =>
                setStatusFilter(e.target.value as Invoice["status"] | "All")
              }
              className="rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              aria-label="Filter by invoice status"
            >
              <option>All</option>
              <option>Paid</option>
              <option>Pending</option>
              <option>Overdue</option>
            </select>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-700">
            <thead className="bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-200">
              <tr>
                <th className="px-5 py-4 text-left">Invoice #</th>
                <th className="px-5 py-4 text-left">Client</th>
                <th className="px-5 py-4 text-left">Order</th>
                <th className="px-5 py-4 text-left">Amount</th>
                <th className="px-5 py-4 text-left">Status</th>
                <th className="px-5 py-4 text-left">Due Date</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredInvoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <td className="px-5 py-4 text-slate-900 dark:text-white">
                    {invoice.id}
                  </td>
                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                    {invoice.client}
                  </td>
                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                    {invoice.orderId}
                  </td>
                  <td className="px-5 py-4 text-slate-900 dark:text-white">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeClass(invoice.status)}`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                    {invoice.dueDate}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                      onClick={() => setSelectedInvoice(invoice)}
                    >
                      <Download className="h-3.5 w-3.5" /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={!!selectedInvoice} onClose={() => setSelectedInvoice(null)}>
        {selectedInvoice && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {selectedInvoice.id}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                    {selectedInvoice.client}
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
                    Issued
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                    {selectedInvoice.issuedDate}
                  </p>
                </div>
                <div className="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Due
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                    {selectedInvoice.dueDate}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Order Reference
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                  {selectedInvoice.orderId}
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Payment Method
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                  {selectedInvoice.method}
                </p>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Outstanding Balance
              </p>
              <p className="mt-2 text-3xl font-semibold text-rose-600 dark:text-rose-400">
                {formatCurrency(selectedInvoice.balance)}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
