"use client";

import { useMemo, useState } from "react";
import { LifeBuoy, Search, ShieldCheck, X } from "lucide-react";

interface Ticket {
  id: string;
  subject: string;
  requester: string;
  priority: "Low" | "Medium" | "High";
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  createdAt: string;
  channel: "Email" | "Phone" | "Portal";
  details: string;
}

const ticketData: Ticket[] = [
  {
    id: "TCK-2201",
    subject: "Sample approval delay",
    requester: "Maya Patel",
    priority: "High",
    status: "Open",
    createdAt: "2026-06-02",
    channel: "Email",
    details:
      "Client needs confirmation on approved sample before production continues.",
  },
  {
    id: "TCK-2202",
    subject: "Color mismatch report",
    requester: "Ethan Brooks",
    priority: "Medium",
    status: "In Progress",
    createdAt: "2026-05-31",
    channel: "Portal",
    details:
      "Request to validate navy dye lot against approved Pantone reference.",
  },
  {
    id: "TCK-2203",
    subject: "Shipping documentation",
    requester: "Ava Müller",
    priority: "Low",
    status: "Resolved",
    createdAt: "2026-05-28",
    channel: "Phone",
    details: "Confirm customs documentation for export to Germany.",
  },
];

function badgeClass(status: Ticket["status"]) {
  switch (status) {
    case "Open":
      return "bg-sky-100 text-sky-700";
    case "In Progress":
      return "bg-amber-100 text-amber-700";
    case "Resolved":
      return "bg-emerald-100 text-emerald-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function ticketPriorityClass(priority: Ticket["priority"]) {
  switch (priority) {
    case "High":
      return "bg-rose-100 text-rose-700";
    case "Medium":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-emerald-100 text-emerald-700";
  }
}

export default function SupportTicketsPage() {
  const [tickets] = useState<Ticket[]>(ticketData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | Ticket["status"]>(
    "All",
  );
  const [selected, setSelected] = useState<Ticket | null>(ticketData[0]);

  const filteredTickets = useMemo(
    () =>
      tickets.filter((ticket) => {
        const query = search.toLowerCase();
        const matchesSearch =
          ticket.subject.toLowerCase().includes(query) ||
          ticket.requester.toLowerCase().includes(query) ||
          ticket.id.toLowerCase().includes(query);
        const matchesStatus =
          statusFilter === "All" || ticket.status === statusFilter;
        return matchesSearch && matchesStatus;
      }),
    [tickets, search, statusFilter],
  );

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
              Support Tickets
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Manage support cases for clients, suppliers, and internal
              manufacturing issues.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tickets"
                className="w-full min-w-[220px] rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as Ticket["status"] | "All")
              }
              className="rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              aria-label="Filter by ticket status"
            >
              <option>All</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
              <option>Closed</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.9fr,1.1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
            <LifeBuoy className="h-5 w-5" />
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Ticket Queue
            </h2>
          </div>
          <div className="mt-6 space-y-4">
            {filteredTickets.map((ticket) => (
              <button
                key={ticket.id}
                onClick={() => setSelected(ticket)}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-950"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {ticket.subject}
                    </p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {ticket.requester} — {ticket.channel}
                    </p>
                  </div>
                  <div className="space-y-2 text-right text-sm">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 ${ticketPriorityClass(ticket.priority)} font-semibold`}
                    >
                      {ticket.priority}
                    </span>
                    <span
                      className={`inline-flex rounded-full px-3 py-1 ${badgeClass(ticket.status)} font-semibold`}
                    >
                      {ticket.status}
                    </span>
                  </div>
                </div>
              </button>
            ))}
            {filteredTickets.length === 0 && (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400">
                No tickets match the filter.
              </div>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          {selected ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Current ticket
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                    {selected.subject}
                  </h3>
                </div>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${badgeClass(selected.status)}`}
                >
                  {selected.status}
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-950">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Requester
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                    {selected.requester}
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-950">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Priority
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                    {selected.priority}
                  </p>
                </div>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-950">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Details
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  {selected.details}
                </p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-950">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Submitted
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                  {selected.createdAt}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex h-[420px] flex-col items-center justify-center text-center text-slate-500 dark:text-slate-400">
              <ShieldCheck className="mb-3 h-10 w-10" />
              <p className="text-sm font-semibold">
                Select a ticket to view details
              </p>
              <p className="mt-2 text-sm">
                Ticket details and support actions appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
