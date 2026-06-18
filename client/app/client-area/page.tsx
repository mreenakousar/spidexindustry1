import Link from "next/link";
import { Package, Box, CreditCard, Bell } from "lucide-react";
import StatCard from "../../components/client-portal/StatCard";
import {
  quickActions,
  notifications,
  productionStages,
} from "../../data/clientPortal";

export default function ClientAreaPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">
              Dashboard
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">
              Welcome back, John.
            </h1>
            <p className="mt-2 text-slate-600">
              Your premium manufacturing portal is ready to manage orders,
              production, invoices and shipments.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-950 px-6 py-5 text-white shadow-lg">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
              Premium client access
            </p>
            <p className="mt-4 text-2xl font-semibold">Global Apparel</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-4">
        <StatCard
          icon={Package}
          title="Total Orders"
          value="1,248"
          change="+8.2% from last month"
        />
        <StatCard
          icon={Box}
          title="Active Orders"
          value="67"
          change="4 active projects"
        />
        <StatCard
          icon={CreditCard}
          title="Pending Payments"
          value="$34,800"
          change="3 invoices overdue"
        />
        <StatCard
          icon={Bell}
          title="Production Alerts"
          value="12"
          change="2 high-priority items"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Latest production updates
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Track progress across your manufacturing stages.
              </p>
            </div>
            <Link
              href="/client-area/production-tracker"
              className="text-sm font-semibold text-sky-600 hover:text-sky-700"
            >
              View full tracker
            </Link>
          </div>
          <div className="mt-6 space-y-5">
            {productionStages.slice(0, 5).map((stage) => (
              <div
                key={stage.title}
                className="flex items-center justify-between rounded-3xl border border-slate-200 px-4 py-4"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {stage.title}
                  </p>
                  <p className="text-sm text-slate-500">{stage.date}</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${stage.completed ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"}`}
                >
                  {stage.completed ? "Completed" : "Pending"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-semibold text-slate-900">
              Recent notifications
            </h2>
            <div className="mt-5 space-y-4">
              {notifications.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-600">
                    {item.description}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                    {item.date}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Quick actions
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Launch common tasks in one click.
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-4">
              {quickActions.map((action) => (
                <Link
                  key={action.title}
                  href={action.href}
                  className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 sm:px-5"
                >
                  <p>{action.title}</p>
                  <p className="mt-1 text-sm font-normal text-slate-500">
                    {action.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
