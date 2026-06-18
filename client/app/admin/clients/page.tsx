"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ChevronRight,
  Mail,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  TrendingUp,
  Users,
  X,
} from "lucide-react";

interface Client {
  id: string;
  company: string;
  contact: string;
  region: string;
  orders: number;
  revenue: number;
  status: "Active" | "At Risk" | "VIP";
  lastOrder: string;
  email: string;
  phone: string;
  address: string;
  industry: string;
  recentActivity: string[];
}

const clientsData: Client[] = [
  {
    id: "CL-2101",
    company: "Arcadia Apparel Co.",
    contact: "Maya Patel",
    region: "North America",
    orders: 18,
    revenue: 132000,
    status: "VIP",
    lastOrder: "2026-06-01",
    email: "maya.patel@arcadiaapparel.com",
    phone: "+1 415 890 2334",
    address: "320 Market St, San Francisco, CA",
    industry: "Performance Sportswear",
    recentActivity: [
      "Approved new hoodie tech pack",
      "Confirmed bulk shipment",
      "Reviewed final samples",
    ],
  },
  {
    id: "CL-2089",
    company: "Summit Sportswear",
    contact: "Ethan Brooks",
    region: "Europe",
    orders: 22,
    revenue: 98000,
    status: "Active",
    lastOrder: "2026-05-28",
    email: "ethan.brooks@summitsportswear.co.uk",
    phone: "+44 20 7946 0871",
    address: "88 Queen St, London, UK",
    industry: "Team Apparel",
    recentActivity: [
      "Requested new logo placement",
      "Approved fabric sourcing",
      "Scheduled final delivery",
    ],
  },
  {
    id: "CL-2054",
    company: "Velocity Streetwear",
    contact: "Ava Müller",
    region: "EMEA",
    orders: 12,
    revenue: 84000,
    status: "At Risk",
    lastOrder: "2026-05-20",
    email: "ava.mueller@velocitystreetwear.de",
    phone: "+49 30 1234 5678",
    address: "Straße des 17. Juni 135, Berlin",
    industry: "Streetwear",
    recentActivity: [
      "Reviewed revised sample",
      "Delayed payment confirmation",
      "Updated production schedule",
    ],
  },
];

function badgeClass(status: Client["status"]) {
  switch (status) {
    case "VIP":
      return "bg-emerald-100 text-emerald-700";
    case "At Risk":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-slate-100 text-slate-700";
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
      <div className="w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Client details
          </h2>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            onClick={onClose}
            aria-label="Close dialog"
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
        No clients match the current filters.
      </p>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Try broadening the search or clearing the filters.
      </p>
    </div>
  );
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | Client["status"]>(
    "All",
  );
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setClients(clientsData);
      setIsLoading(false);
    }, 600);
    return () => window.clearTimeout(timer);
  }, []);

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const query = search.toLowerCase();
      const matchesSearch =
        client.company.toLowerCase().includes(query) ||
        client.contact.toLowerCase().includes(query);
      const matchesStatus =
        statusFilter === "All" || client.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [clients, search, statusFilter]);

  const totals = useMemo(() => {
    return {
      clients: clients.length,
      revenue: clients.reduce((sum, client) => sum + client.revenue, 0),
      orders: clients.reduce((sum, client) => sum + client.orders, 0),
    };
  }, [clients]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 xl:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Total Clients
          </p>
          <p className="mt-4 text-4xl font-semibold text-slate-900 dark:text-white">
            {totals.clients}
          </p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Active accounts under management.
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Annual Revenue
          </p>
          <p className="mt-4 text-4xl font-semibold text-emerald-600">
            {formatCurrency(totals.revenue)}
          </p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Revenue generated from current client base.
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Orders Completed
          </p>
          <p className="mt-4 text-4xl font-semibold text-sky-600">
            {totals.orders}
          </p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Orders delivered across all clients.
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
              Clients
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Search clients, monitor revenue trends, and review account health.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search clients"
                className="w-full min-w-[220px] rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as Client["status"] | "All")
              }
              className="rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              aria-label="Filter by client status"
            >
              <option>All</option>
              <option>VIP</option>
              <option>Active</option>
              <option>At Risk</option>
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
          ) : filteredClients.length === 0 ? (
            <EmptyState />
          ) : (
            <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-700">
              <thead className="bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-200">
                <tr>
                  <th className="px-5 py-4 text-left">Client</th>
                  <th className="px-5 py-4 text-left">Region</th>
                  <th className="px-5 py-4 text-left">Orders</th>
                  <th className="px-5 py-4 text-left">Revenue</th>
                  <th className="px-5 py-4 text-left">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredClients.map((client) => (
                  <tr
                    key={client.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <td className="px-5 py-4 text-slate-900 dark:text-white">
                      {client.company}
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                      {client.region}
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                      {client.orders}
                    </td>
                    <td className="px-5 py-4 text-slate-900 dark:text-white">
                      {formatCurrency(client.revenue)}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeClass(client.status)}`}
                      >
                        {client.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                        onClick={() => setSelectedClient(client)}
                      >
                        View <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Modal open={!!selectedClient} onClose={() => setSelectedClient(null)}>
        {selectedClient && (
          <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-[1.4fr,0.8fr]">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {selectedClient.company}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                      {selectedClient.contact}
                    </h3>
                  </div>
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${badgeClass(selectedClient.status)}`}
                  >
                    {selectedClient.status}
                  </span>
                </div>
                <div className="mt-6 space-y-4 text-sm text-slate-600 dark:text-slate-300">
                  <p>
                    <Mail className="inline-block h-4 w-4 text-slate-400" />{" "}
                    <span className="ml-2">{selectedClient.email}</span>
                  </p>
                  <p>
                    <Phone className="inline-block h-4 w-4 text-slate-400" />{" "}
                    <span className="ml-2">{selectedClient.phone}</span>
                  </p>
                  <p>
                    <MapPin className="inline-block h-4 w-4 text-slate-400" />{" "}
                    <span className="ml-2">{selectedClient.address}</span>
                  </p>
                </div>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
                <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Client Summary
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-900">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Orders
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                      {selectedClient.orders}
                    </p>
                  </div>
                  <div className="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-900">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Revenue
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(selectedClient.revenue)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Recent Activity
                </p>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {selectedClient.lastOrder} latest order
                </span>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-300">
                {selectedClient.recentActivity.map((item) => (
                  <li
                    key={item}
                    className="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-900"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}
      </Modal>
    </div>
  );
}
