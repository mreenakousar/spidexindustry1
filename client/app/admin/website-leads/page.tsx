"use client";

import { useMemo, useState } from "react";
import { Search, Sparkles, Tag, X } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  company: string;
  source: string;
  status: "New" | "Contacted" | "Qualified" | "Lost";
  value: number;
  createdAt: string;
  notes: string;
}

const leadsData: Lead[] = [
  {
    id: "LD-701",
    name: "Grace Lee",
    company: "Arcadia Apparel",
    source: "Contact form",
    status: "New",
    value: 95000,
    createdAt: "2026-06-02",
    notes: "Requesting fast-track quote for 1,200 hoodies.",
  },
  {
    id: "LD-702",
    name: "Mark Evans",
    company: "Summit Sportswear",
    source: "Live chat",
    status: "Contacted",
    value: 77000,
    createdAt: "2026-05-31",
    notes: "Interested in custom branding and small-batch MOQ.",
  },
  {
    id: "LD-703",
    name: "Lina Kozlova",
    company: "Velocity Streetwear",
    source: "Email campaign",
    status: "Qualified",
    value: 42500,
    createdAt: "2026-05-28",
    notes: "Confirmed technical specs and shipping requirements.",
  },
];

function badgeClass(status: Lead["status"]) {
  switch (status) {
    case "New":
      return "bg-sky-100 text-sky-700";
    case "Contacted":
      return "bg-amber-100 text-amber-700";
    case "Qualified":
      return "bg-emerald-100 text-emerald-700";
    default:
      return "bg-rose-100 text-rose-700";
  }
}

export default function WebsiteLeadsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | Lead["status"]>(
    "All",
  );
  const [selectedLead, setSelectedLead] = useState<Lead | null>(leadsData[0]);

  const filteredLeads = useMemo(
    () =>
      leadsData.filter((lead) => {
        const query = search.toLowerCase();
        const matchesSearch =
          lead.name.toLowerCase().includes(query) ||
          lead.company.toLowerCase().includes(query) ||
          lead.source.toLowerCase().includes(query);
        const matchesStatus =
          statusFilter === "All" || lead.status === statusFilter;
        return matchesSearch && matchesStatus;
      }),
    [search, statusFilter],
  );

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
              Website Leads
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Capture inbound requests from the website and move leads through
              qualification.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 dark:bg-slate-950 dark:text-slate-200">
            <Sparkles className="h-4 w-4" /> {filteredLeads.length} active leads
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Lead Pipeline
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Review lead details, source, and estimated project value.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search leads"
                className="w-full min-w-[220px] rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as Lead["status"] | "All")
              }
              className="rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              aria-label="Filter by lead status"
            >
              <option>All</option>
              <option>New</option>
              <option>Contacted</option>
              <option>Qualified</option>
              <option>Lost</option>
            </select>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-700">
            <thead className="bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-200">
              <tr>
                <th className="px-5 py-4 text-left">Name</th>
                <th className="px-5 py-4 text-left">Company</th>
                <th className="px-5 py-4 text-left">Source</th>
                <th className="px-5 py-4 text-left">Value</th>
                <th className="px-5 py-4 text-left">Status</th>
                <th className="px-5 py-4 text-left">Created</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <td className="px-5 py-4 text-slate-900 dark:text-white">
                    {lead.name}
                  </td>
                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                    {lead.company}
                  </td>
                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                    {lead.source}
                  </td>
                  <td className="px-5 py-4 text-slate-900 dark:text-white">
                    ${lead.value.toLocaleString()}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeClass(lead.status)}`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                    {lead.createdAt}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                      onClick={() => setSelectedLead(lead)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedLead && (
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-700 dark:bg-slate-950">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Lead details
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                {selectedLead.name}
              </h2>
            </div>
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              onClick={() => setSelectedLead(null)}
              aria-label="Close lead details"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Company
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                {selectedLead.company}
              </p>
            </div>
            <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Source
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                {selectedLead.source}
              </p>
            </div>
            <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Value
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                ${selectedLead.value.toLocaleString()}
              </p>
            </div>
            <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Status
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                {selectedLead.status}
              </p>
            </div>
          </div>
          <div className="mt-6 rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-900">
            <p className="text-sm text-slate-500 dark:text-slate-400">Notes</p>
            <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
              {selectedLead.notes}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
