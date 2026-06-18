import { notifications } from "../../../data/clientPortal";

export default function NotificationsPage() {
  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">
          Notifications
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">
          Production and account alerts
        </h1>
        <p className="mt-2 text-slate-600">
          Stay informed about order progress, invoices, and shipment updates.
        </p>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <div className="space-y-4">
          {notifications.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-lg font-semibold text-slate-900">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {item.description}
                  </p>
                </div>
                <span className="text-xs uppercase tracking-[0.24em] text-slate-500">
                  {item.date}
                </span>
              </div>
              <p className="mt-4 rounded-2xl bg-white px-4 py-3 text-sm text-slate-600">
                Category: {item.category}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
