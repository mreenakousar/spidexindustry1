"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  ClipboardList,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";

interface Rfq {
  id: string;
  client: string;
  product: string;
  quantity: number;
  requestedDate: string;
  status: "New" | "Quoted" | "Approved" | "Rejected";
  targetDelivery: string;
  value: number;
}

const rfqData: Rfq[] = [
  {
    id: "RFQ-3201",
    client: "Arcadia Apparel",
    product: "Performance Hoodie",
    quantity: 1200,
    requestedDate: "2026-06-02",
    status: "New",
    targetDelivery: "2026-08-01",
    value: 204000,
  },
  {
    id: "RFQ-3202",
    client: "Summit Sportswear",
    product: "Team Track Pants",
    quantity: 850,
    requestedDate: "2026-05-28",
    status: "Quoted",
    targetDelivery: "2026-07-22",
    value: 136000,
  },
  {
    id: "RFQ-3203",
    client: "Velocity Streetwear",
    product: "Printed Tee",
    quantity: 1500,
    requestedDate: "2026-05-24",
    status: "Approved",
    targetDelivery: "2026-07-05",
    value: 90000,
  },
];

function badgeClass(status: Rfq["status"]) {
  switch (status) {
    case "New":
      return "bg-sky-100 text-sky-700";
    case "Quoted":
      return "bg-amber-100 text-amber-700";
    case "Approved":
      return "bg-emerald-100 text-emerald-700";
    default:
      return "bg-rose-100 text-rose-700";
  }
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
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
            RFQ details
          </h2>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            onClick={onClose}
            aria-label="Close RFQ details dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="max-h-[80vh] overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}

export default function RfqsPage() {
  const [rfqs, setRfqs] = useState<Rfq[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | Rfq["status"]>(
    "All",
  );
  const [selectedRfq, setSelectedRfq] = useState<Rfq | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setRfqs(rfqData);
      setIsLoading(false);
    }, 600);
    return () => window.clearTimeout(timer);
  }, []);

  const filteredRfqs = useMemo(
    () =>
      rfqs.filter((rfq) => {
        const query = search.toLowerCase();
        const matchesSearch =
          rfq.id.toLowerCase().includes(query) ||
          rfq.client.toLowerCase().includes(query) ||
          rfq.product.toLowerCase().includes(query);
        const matchesStatus =
          statusFilter === "All" || rfq.status === statusFilter;
        return matchesSearch && matchesStatus;
      }),
    [rfqs, search, statusFilter],
  );

  const totals = useMemo(
    () => ({
      total: rfqs.length,
      quoted: rfqs.filter((rfq) => rfq.status === "Quoted").length,
      approved: rfqs.filter((rfq) => rfq.status === "Approved").length,
      value: rfqs.reduce((sum, rfq) => sum + rfq.value, 0),
    }),
    [rfqs],
  );

  return (
    <div className="space-y-8">
      <div className="grid gap-4 lg:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Total RFQs
          </p>
          <p className="mt-4 text-4xl font-semibold text-slate-900 dark:text-white">
            {totals.total}
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Quoted
          </p>
          <p className="mt-4 text-4xl font-semibold text-amber-600">
            {totals.quoted}
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Approved
          </p>
          <p className="mt-4 text-4xl font-semibold text-emerald-600">
            {totals.approved}
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Pipeline Value
          </p>
          <p className="mt-4 text-4xl font-semibold text-slate-900 dark:text-white">
            {formatCurrency(totals.value)}
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
              RFQ Pipeline
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Review quotes, approve new requests, and manage order value.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search RFQs"
                className="w-full min-w-[220px] rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as Rfq["status"] | "All")
              }
              className="rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              aria-label="Filter by RFQ status"
            >
              <option>All</option>
              <option>New</option>
              <option>Quoted</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-700">
            <thead className="bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-200">
              <tr>
                <th className="px-5 py-4 text-left">RFQ</th>
                <th className="px-5 py-4 text-left">Client</th>
                <th className="px-5 py-4 text-left">Product</th>
                <th className="px-5 py-4 text-left">Qty</th>
                <th className="px-5 py-4 text-left">Status</th>
                <th className="px-5 py-4 text-left">Value</th>
                <th className="px-5 py-4 text-left">Delivery</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredRfqs.map((rfq) => (
                <tr
                  key={rfq.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <td className="px-5 py-4 text-slate-900 dark:text-white">
                    {rfq.id}
                  </td>
                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                    {rfq.client}
                  </td>
                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                    {rfq.product}
                  </td>
                  <td className="px-5 py-4 text-slate-900 dark:text-white">
                    {rfq.quantity}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeClass(rfq.status)}`}
                    >
                      {rfq.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-900 dark:text-white">
                    {formatCurrency(rfq.value)}
                  </td>
                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                    {rfq.targetDelivery}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                      onClick={() => setSelectedRfq(rfq)}
                    >
                      <ClipboardList className="h-3.5 w-3.5" /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={!!selectedRfq} onClose={() => setSelectedRfq(null)}>
        {selectedRfq && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    RFQ {selectedRfq.id}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                    {selectedRfq.product}
                  </h3>
                </div>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${badgeClass(selectedRfq.status)}`}
                >
                  {selectedRfq.status}
                </span>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Client
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                    {selectedRfq.client}
                  </p>
                </div>
                <div className="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Quantity
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                    {selectedRfq.quantity}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Requested
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                  {selectedRfq.requestedDate}
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Target Delivery
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                  {selectedRfq.targetDelivery}
                </p>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Estimated Value
              </p>
              <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
                {formatCurrency(selectedRfq.value)}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
