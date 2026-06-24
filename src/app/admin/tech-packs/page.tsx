"use client";

import { useMemo, useState } from "react";
import {
  Download,
  FileText,
  Search,
  ShieldCheck,
  Upload,
  X,
} from "lucide-react";

interface TechPack {
  id: string;
  client: string;
  fileName: string;
  status: "Approved" | "Pending Review" | "Revision Requested";
  uploaded: string;
  product: string;
  revisions: number;
}

const techPacks: TechPack[] = [
  {
    id: "TP-5001",
    client: "Acme Apparel",
    fileName: "tech-pack-acme.pdf",
    status: "Pending Review",
    uploaded: "2026-06-01",
    product: "Performance Hoodie",
    revisions: 0,
  },
  {
    id: "TP-5002",
    client: "Sportsline",
    fileName: "tech-pack-sportsline.pdf",
    status: "Approved",
    uploaded: "2026-05-28",
    product: "Team Track Pants",
    revisions: 1,
  },
  {
    id: "TP-5003",
    client: "Uniform Pro",
    fileName: "tech-pack-uniformpro.pdf",
    status: "Revision Requested",
    uploaded: "2026-05-25",
    product: "Executive Polo Shirt",
    revisions: 2,
  },
];

function badgeClass(status: TechPack["status"]) {
  switch (status) {
    case "Approved":
      return "bg-emerald-100 text-emerald-700";
    case "Pending Review":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-rose-100 text-rose-700";
  }
}

export default function TechPacksPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<TechPack | null>(techPacks[0]);

  const filteredPacks = useMemo(
    () =>
      techPacks.filter((pack) => {
        const query = search.toLowerCase();
        return (
          pack.client.toLowerCase().includes(query) ||
          pack.fileName.toLowerCase().includes(query) ||
          pack.product.toLowerCase().includes(query)
        );
      }),
    [search],
  );

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Total Tech Packs
          </p>
          <p className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl">
            {techPacks.length}
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Pending Review
          </p>
          <p className="mt-4 text-3xl font-semibold text-amber-600 sm:text-4xl">
            {
              techPacks.filter((pack) => pack.status === "Pending Review")
                .length
            }
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Approved
          </p>
          <p className="mt-4 text-4xl font-semibold text-emerald-600">
            {techPacks.filter((pack) => pack.status === "Approved").length}
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
              Tech Pack Library
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Review uploaded tech packs, approve revisions, and coordinate
              product spec changes.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tech packs"
                className="w-full min-w-0 rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 sm:min-w-[220px]"
              />
            </div>
            <button className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-700">
              <Upload className="h-4 w-4" /> Upload Pack
            </button>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-700">
            <thead className="bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-200">
              <tr>
                <th className="px-5 py-4 text-left">Client</th>
                <th className="px-5 py-4 text-left">Tech Pack</th>
                <th className="px-5 py-4 text-left">Product</th>
                <th className="px-5 py-4 text-left">Status</th>
                <th className="px-5 py-4 text-left">Uploaded</th>
                <th className="px-5 py-4 text-left">Revisions</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredPacks.map((pack) => (
                <tr
                  key={pack.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <td className="px-5 py-4 text-slate-900 dark:text-white">
                    {pack.client}
                  </td>
                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                    {pack.fileName}
                  </td>
                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                    {pack.product}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeClass(pack.status)}`}
                    >
                      {pack.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-900 dark:text-white">
                    {pack.uploaded}
                  </td>
                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                    {pack.revisions}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                      onClick={() => setSelected(pack)}
                    >
                      <FileText className="h-3.5 w-3.5" /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-700 dark:bg-slate-950">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Selected tech pack
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                {selected.fileName}
              </h2>
            </div>
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              onClick={() => setSelected(null)}
              aria-label="Close tech pack details"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Client
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                {selected.client}
              </p>
            </div>
            <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Status
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                {selected.status}
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Uploaded
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                {selected.uploaded}
              </p>
            </div>
            <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Product
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                {selected.product}
              </p>
            </div>
            <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Revisions
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                {selected.revisions}
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-700">
              <Download className="h-4 w-4" /> Download PDF
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200">
              Request Revision
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
