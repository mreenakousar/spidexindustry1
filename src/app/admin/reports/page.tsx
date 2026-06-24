"use client";

import { useMemo, useState } from "react";
import {
  BarChart3,
  CalendarDays,
  PieChart,
  Search,
  TrendingUp,
} from "lucide-react";
import CountUpNumber from "@/components/ui/CountUpNumber";

interface ReportCard {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

interface ActivityItem {
  label: string;
  value: string;
  trend: string;
}

const reportCards: ReportCard[] = [
  {
    title: "Revenue Growth",
    value: "$1.2M",
    change: "+14%",
    icon: <TrendingUp className="h-5 w-5" />,
  },
  {
    title: "Orders Fulfilled",
    value: "214",
    change: "+9%",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Quote Conversion",
    value: "32%",
    change: "+3 pts",
    icon: <PieChart className="h-5 w-5" />,
  },
  {
    title: "On-Time Shipments",
    value: "89%",
    change: "+5 pts",
    icon: <CalendarDays className="h-5 w-5" />,
  },
];

const activityData: ActivityItem[] = [
  { label: "High-priority orders completed", value: "14", trend: "+22%" },
  { label: "Factory downtime hours", value: "6h", trend: "-18%" },
  { label: "New product launches", value: "4", trend: "+33%" },
];

export default function ReportsPage() {
  const [search, setSearch] = useState("");
  const [timeframe, setTimeframe] = useState("This Month");

  const dashboardData = useMemo(() => {
    return reportCards.filter((card) =>
      card.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reportCards.map((card) => (
          <div
            key={card.title}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6"
          >
            <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
              {card.icon}
              <span className="text-sm font-medium">{card.title}</span>
            </div>
            <p className="mt-6 text-3xl font-semibold text-slate-900 dark:text-white">
              <CountUpNumber value={card.value} />
            </p>
            <p className="mt-2 text-sm text-emerald-600">
              {card.change} vs last period
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
              Operations Report
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Last 30 days of production, order flow, and fulfillment
              performance.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search metrics"
                className="w-full min-w-0 rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 sm:min-w-[220px]"
              />
            </div>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              aria-label="Select report timeframe"
            >
              <option>This Month</option>
              <option>Last Quarter</option>
              <option>Year to Date</option>
            </select>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950 sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Production Metrics
              </h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                {timeframe}
              </span>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-900">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Average Lead Time
                </p>
                <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">
                  <CountUpNumber value="4.8 wks" />
                </p>
              </div>
              <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-900">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Quality Pass Rate
                </p>
                <p className="mt-3 text-3xl font-semibold text-emerald-600">
                  <CountUpNumber value="96%" />
                </p>
              </div>
              <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-900">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  On-Time Delivery
                </p>
                <p className="mt-3 text-3xl font-semibold text-sky-600">
                  <CountUpNumber value="89%" />
                </p>
              </div>
              <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-900">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Cost per Unit
                </p>
                <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">
                  <CountUpNumber value="$15.20" />
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Actionable Insights
            </h2>
            <div className="mt-6 space-y-4">
              {activityData.map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-900"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        {item.label}
                      </p>
                      <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                        <CountUpNumber value={item.value} />
                      </p>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                      {item.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
