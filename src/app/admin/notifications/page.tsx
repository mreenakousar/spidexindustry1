"use client";

import { useMemo, useState } from "react";
import { Bell, CheckCircle2, Inbox, Search, X } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "Production" | "Order" | "Shipping" | "System";
  time: string;
  unread: boolean;
}

const notificationData: Notification[] = [
  {
    id: "NT-001",
    title: "Fabric shipment delayed",
    message: "Your denim shipment from Vendor A is now expected on 2026-06-10.",
    type: "Shipping",
    time: "12m ago",
    unread: true,
  },
  {
    id: "NT-002",
    title: "Order ORD-5301 moved to QC",
    message:
      "Production has completed stitching and forwarded the batch to quality control.",
    type: "Production",
    time: "1h ago",
    unread: true,
  },
  {
    id: "NT-003",
    title: "New RFQ submitted",
    message: "A new quotation request was received from Summit Sportswear.",
    type: "Order",
    time: "3h ago",
    unread: false,
  },
  {
    id: "NT-004",
    title: "System maintenance scheduled",
    message:
      "ERP will be unavailable on 2026-06-12 between 02:00 and 04:00 UTC.",
    type: "System",
    time: "Yesterday",
    unread: false,
  },
];

function badgeClass(type: Notification["type"]) {
  switch (type) {
    case "Shipping":
      return "bg-sky-100 text-sky-700";
    case "Production":
      return "bg-emerald-100 text-emerald-700";
    case "Order":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<Notification[]>(notificationData);
  const [search, setSearch] = useState("");
  const [onlyUnread, setOnlyUnread] = useState(false);

  const filteredNotifications = useMemo(() => {
    return notifications.filter((item) => {
      const query = search.toLowerCase();
      const matchesText =
        item.title.toLowerCase().includes(query) ||
        item.message.toLowerCase().includes(query);
      const matchesUnread = !onlyUnread || item.unread;
      return matchesText && matchesUnread;
    });
  }, [notifications, search, onlyUnread]);

  const unreadCount = notifications.filter((item) => item.unread).length;

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Unread Notifications
          </p>
          <p className="mt-4 text-4xl font-semibold text-slate-900 dark:text-white">
            {unreadCount}
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Production Alerts
          </p>
          <p className="mt-4 text-4xl font-semibold text-emerald-600">8</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Shipping Notices
          </p>
          <p className="mt-4 text-4xl font-semibold text-sky-600">5</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            System Updates
          </p>
          <p className="mt-4 text-4xl font-semibold text-slate-900 dark:text-white">
            2
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
              Notifications
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Review alerts related to orders, shipments, inventory, and system
              updates.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search notifications"
                className="w-full min-w-[220px] rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>
            <button
              onClick={() => setOnlyUnread((current) => !current)}
              className={`rounded-2xl px-4 py-3 text-sm font-semibold ${onlyUnread ? "bg-sky-600 text-white" : "border border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"}`}
            >
              {onlyUnread ? "Showing unread" : "Show unread only"}
            </button>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400">
              No notifications match your filters.
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`rounded-3xl border p-5 shadow-sm ${notification.unread ? "border-sky-200 bg-sky-50" : "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-950"}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeClass(notification.type)}`}
                      >
                        {notification.type}
                      </span>
                      {notification.unread && (
                        <span className="rounded-full bg-slate-900 px-2 py-1 text-[11px] font-semibold text-white">
                          Unread
                        </span>
                      )}
                    </div>
                    <h2 className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">
                      {notification.title}
                    </h2>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                      {notification.message}
                    </p>
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {notification.time}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
