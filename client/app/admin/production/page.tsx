"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  ClipboardList,
  Search,
  ShieldCheck,
  Timer,
  Users,
  X,
} from "lucide-react";

interface ProductionJob {
  id: string;
  product: string;
  client: string;
  stage: string;
  progress: number;
  assignedTo: string;
  ETA: string;
  priority: "High" | "Medium" | "Low";
}

const productionJobs: ProductionJob[] = [
  {
    id: "PRD-001",
    product: "Premium Performance Hoodie",
    client: "Arcadia Apparel",
    stage: "Printing",
    progress: 62,
    assignedTo: "Sara Kim",
    ETA: "2026-06-09",
    priority: "High",
  },
  {
    id: "PRD-002",
    product: "Team Training Jacket",
    client: "Summit Sportswear",
    stage: "Fabric Sourcing",
    progress: 22,
    assignedTo: "Nina Roberts",
    ETA: "2026-06-14",
    priority: "High",
  },
  {
    id: "PRD-003",
    product: "Screen Printed Tee",
    client: "Velocity Streetwear",
    stage: "Quality Control",
    progress: 84,
    assignedTo: "Jamal Khan",
    ETA: "2026-06-07",
    priority: "Medium",
  },
  {
    id: "PRD-004",
    product: "Safety Work Vest",
    client: "Northshore Uniforms",
    stage: "Cutting",
    progress: 38,
    assignedTo: "Sara Kim",
    ETA: "2026-06-12",
    priority: "Low",
  },
];

function badgeClass(priority: ProductionJob["priority"]) {
  switch (priority) {
    case "High":
      return "bg-rose-100 text-rose-700";
    case "Medium":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-emerald-100 text-emerald-700";
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
            Production job details
          </h2>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            onClick={onClose}
            aria-label="Close production job details dialog"
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
        No production jobs match the filter.
      </p>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Clear filters or add a new batch to continue.
      </p>
    </div>
  );
}

export default function ProductionPage() {
  const [jobs, setJobs] = useState<ProductionJob[]>([]);
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState<"All" | ProductionJob["priority"]>(
    "All",
  );
  const [selectedJob, setSelectedJob] = useState<ProductionJob | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setJobs(productionJobs);
      setIsLoading(false);
    }, 600);
    return () => window.clearTimeout(timer);
  }, []);

  const filteredJobs = useMemo(
    () =>
      jobs.filter((job) => {
        const query = search.toLowerCase();
        const matchesSearch =
          job.product.toLowerCase().includes(query) ||
          job.client.toLowerCase().includes(query) ||
          job.id.toLowerCase().includes(query);
        const matchesPriority = priority === "All" || job.priority === priority;
        return matchesSearch && matchesPriority;
      }),
    [jobs, search, priority],
  );

  const stats = useMemo(
    () => ({
      active: jobs.length,
      onSchedule: jobs.filter((job) => job.progress >= 70).length,
      critical: jobs.filter((job) => job.priority === "High").length,
      average: jobs.length
        ? Math.round(
            jobs.reduce((sum, job) => sum + job.progress, 0) / jobs.length,
          )
        : 0,
    }),
    [jobs],
  );

  return (
    <div className="space-y-8">
      <div className="grid gap-4 lg:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Active Jobs
          </p>
          <p className="mt-4 text-4xl font-semibold text-slate-900 dark:text-white">
            {stats.active}
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            On Schedule
          </p>
          <p className="mt-4 text-4xl font-semibold text-emerald-600">
            {stats.onSchedule}
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            High Priority
          </p>
          <p className="mt-4 text-4xl font-semibold text-rose-600">
            {stats.critical}
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Avg. Progress
          </p>
          <p className="mt-4 text-4xl font-semibold text-sky-600">
            {stats.average}%
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
              Production Queue
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Track each manufacturing job through the apparel production
              workflow.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search jobs"
                className="w-full min-w-[220px] rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>
            <select
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value as ProductionJob["priority"] | "All")
              }
              className="rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              aria-label="Filter by production priority"
            >
              <option>All</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
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
          ) : filteredJobs.length === 0 ? (
            <EmptyState />
          ) : (
            <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-700">
              <thead className="bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-200">
                <tr>
                  <th className="px-5 py-4 text-left">Job ID</th>
                  <th className="px-5 py-4 text-left">Product</th>
                  <th className="px-5 py-4 text-left">Client</th>
                  <th className="px-5 py-4 text-left">Stage</th>
                  <th className="px-5 py-4 text-left">Progress</th>
                  <th className="px-5 py-4 text-left">Assignee</th>
                  <th className="px-5 py-4 text-left">ETA</th>
                  <th className="px-5 py-4 text-left">Priority</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredJobs.map((job) => (
                  <tr
                    key={job.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <td className="px-5 py-4 text-slate-900 dark:text-white">
                      {job.id}
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                      {job.product}
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                      {job.client}
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                      {job.stage}
                    </td>
                    <td className="px-5 py-4">
                      <div className="h-2.5 w-32 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                        {/* eslint-disable-next-line */}
                        <div
                          className="h-full rounded-full bg-emerald-500"
                          style={{ width: `${job.progress}%` }}
                        ></div>
                      </div>
                      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                        {job.progress}%
                      </p>
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                      {job.assignedTo}
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                      {job.ETA}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeClass(job.priority)}`}
                      >
                        {job.priority}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                        onClick={() => setSelectedJob(job)}
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

      <Modal open={!!selectedJob} onClose={() => setSelectedJob(null)}>
        {selectedJob && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Job {selectedJob.id}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                    {selectedJob.product}
                  </h3>
                </div>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${badgeClass(selectedJob.priority)}`}
                >
                  {selectedJob.priority}
                </span>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Stage
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                    {selectedJob.stage}
                  </p>
                </div>
                <div className="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Assigned To
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                    {selectedJob.assignedTo}
                  </p>
                </div>
              </div>
            </div>
            <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Progress
              </p>
              <div className="mt-4 rounded-3xl bg-slate-200 p-1 dark:bg-slate-700">
                {/* eslint-disable-next-line */}
                <div
                  className="h-4 rounded-3xl bg-emerald-500"
                  style={{ width: `${selectedJob.progress}%` }}
                ></div>
              </div>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                Estimated completion in {selectedJob.ETA}
              </p>
            </section>
            <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <Activity className="h-4 w-4" />
                <p>
                  Current phase updating with real-time production progress and
                  quality checks.
                </p>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    ETA
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                    {selectedJob.ETA}
                  </p>
                </div>
                <div className="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Client
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                    {selectedJob.client}
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}
      </Modal>
    </div>
  );
}
