"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, MapPin, Search, Truck, X } from "lucide-react";

interface Shipment {
  id: string;
  client: string;
  carrier: string;
  eta: string;
  status: "In Transit" | "Delivered" | "Delayed" | "Awaiting Pickup";
  origin: string;
  destination: string;
  currentLocation: string;
}

const shipmentData: Shipment[] = [
  {
    id: "SHP-801",
    client: "Arcadia Apparel",
    carrier: "FreightWave",
    eta: "2026-06-10",
    status: "In Transit",
    origin: "Chittagong Port",
    destination: "Los Angeles, CA",
    currentLocation: "Singapore",
  },
  {
    id: "SHP-802",
    client: "Summit Sportswear",
    carrier: "OceanCargo",
    eta: "2026-06-08",
    status: "Delayed",
    origin: "Nhava Sheva Port",
    destination: "Hamburg, DE",
    currentLocation: "Dubai",
  },
  {
    id: "SHP-803",
    client: "Velocity Streetwear",
    carrier: "AirJet",
    eta: "2026-06-07",
    status: "Awaiting Pickup",
    origin: "Dhaka, BD",
    destination: "Frankfurt, DE",
    currentLocation: "Dhaka Facility",
  },
  {
    id: "SHP-804",
    client: "Uniform Co",
    carrier: "RailLink",
    eta: "2026-06-05",
    status: "Delivered",
    origin: "Dhaka, BD",
    destination: "New Jersey, NJ",
    currentLocation: "Port of New York",
  },
];

function badgeClass(status: Shipment["status"]) {
  switch (status) {
    case "Delivered":
      return "bg-emerald-100 text-emerald-700";
    case "Delayed":
      return "bg-rose-100 text-rose-700";
    case "Awaiting Pickup":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-sky-100 text-sky-700";
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
            Shipment details
          </h2>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            onClick={onClose}
            aria-label="Close shipment details dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="max-h-[80vh] overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | Shipment["status"]>(
    "All",
  );
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShipments(shipmentData);
      setIsLoading(false);
    }, 600);
    return () => window.clearTimeout(timer);
  }, []);

  const filteredShipments = useMemo(
    () =>
      shipments.filter((shipment) => {
        const query = search.toLowerCase();
        const matchesSearch =
          shipment.id.toLowerCase().includes(query) ||
          shipment.client.toLowerCase().includes(query) ||
          shipment.carrier.toLowerCase().includes(query);
        const matchesStatus =
          statusFilter === "All" || shipment.status === statusFilter;
        return matchesSearch && matchesStatus;
      }),
    [shipments, search, statusFilter],
  );

  const totals = useMemo(
    () => ({
      total: shipments.length,
      inTransit: shipments.filter(
        (shipment) => shipment.status === "In Transit",
      ).length,
      delayed: shipments.filter((shipment) => shipment.status === "Delayed")
        .length,
      delivered: shipments.filter((shipment) => shipment.status === "Delivered")
        .length,
    }),
    [shipments],
  );

  return (
    <div className="space-y-8">
      <div className="grid gap-4 lg:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Total Shipments
          </p>
          <p className="mt-4 text-4xl font-semibold text-slate-900 dark:text-white">
            {totals.total}
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            In Transit
          </p>
          <p className="mt-4 text-4xl font-semibold text-sky-600">
            {totals.inTransit}
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Delayed
          </p>
          <p className="mt-4 text-4xl font-semibold text-rose-600">
            {totals.delayed}
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Delivered
          </p>
          <p className="mt-4 text-4xl font-semibold text-emerald-600">
            {totals.delivered}
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
              Shipments
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Track logistics status, carrier routes, and delivery ETA for all
              active shipments.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search shipments"
                className="w-full min-w-[220px] rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as Shipment["status"] | "All")
              }
              className="rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            >
              <option>All</option>
              <option>In Transit</option>
              <option>Delivered</option>
              <option>Delayed</option>
              <option>Awaiting Pickup</option>
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
          ) : (
            <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-700">
              <thead className="bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-200">
                <tr>
                  <th className="px-5 py-4 text-left">Shipment</th>
                  <th className="px-5 py-4 text-left">Client</th>
                  <th className="px-5 py-4 text-left">Carrier</th>
                  <th className="px-5 py-4 text-left">ETA</th>
                  <th className="px-5 py-4 text-left">Status</th>
                  <th className="px-5 py-4 text-left">Current Location</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredShipments.map((shipment) => (
                  <tr
                    key={shipment.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <td className="px-5 py-4 text-slate-900 dark:text-white">
                      {shipment.id}
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                      {shipment.client}
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                      {shipment.carrier}
                    </td>
                    <td className="px-5 py-4 text-slate-900 dark:text-white">
                      {shipment.eta}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeClass(shipment.status)}`}
                      >
                        {shipment.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                      {shipment.currentLocation}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                        onClick={() => setSelectedShipment(shipment)}
                      >
                        <Download className="h-3.5 w-3.5" /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Modal
        open={!!selectedShipment}
        onClose={() => setSelectedShipment(null)}
      >
        {selectedShipment && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {selectedShipment.id}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                    {selectedShipment.client}
                  </h3>
                </div>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${badgeClass(selectedShipment.status)}`}
                >
                  {selectedShipment.status}
                </span>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Carrier
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                    {selectedShipment.carrier}
                  </p>
                </div>
                <div className="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    ETA
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                    {selectedShipment.eta}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Origin
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                  {selectedShipment.origin}
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Destination
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                  {selectedShipment.destination}
                </p>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Current Location
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                {selectedShipment.currentLocation}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
