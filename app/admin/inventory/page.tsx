"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, Layers, Search, Truck, Zap } from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  category: "Fabric" | "Labels" | "Accessories";
  stock: number;
  unit: string;
  reorderLevel: number;
  location: string;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  lastMovement: string;
}

const inventoryData: InventoryItem[] = [
  {
    id: "INV-7001",
    name: "Black French Terry",
    category: "Fabric",
    stock: 420,
    unit: "m",
    reorderLevel: 100,
    location: "Warehouse A",
    status: "In Stock",
    lastMovement: "2026-06-01",
  },
  {
    id: "INV-7002",
    name: "Reflective Tape",
    category: "Accessories",
    stock: 58,
    unit: "rolls",
    reorderLevel: 40,
    location: "Warehouse B",
    status: "Low Stock",
    lastMovement: "2026-06-03",
  },
  {
    id: "INV-7003",
    name: "Woven Labels",
    category: "Labels",
    stock: 3200,
    unit: "pcs",
    reorderLevel: 1500,
    location: "Warehouse A",
    status: "In Stock",
    lastMovement: "2026-05-29",
  },
  {
    id: "INV-7004",
    name: "Metal Zippers",
    category: "Accessories",
    stock: 18,
    unit: "boxes",
    reorderLevel: 25,
    location: "Warehouse C",
    status: "Low Stock",
    lastMovement: "2026-06-04",
  },
  {
    id: "INV-7005",
    name: "White Cotton Poplin",
    category: "Fabric",
    stock: 98,
    unit: "m",
    reorderLevel: 80,
    location: "Warehouse A",
    status: "In Stock",
    lastMovement: "2026-06-02",
  },
];

interface MovementEntry {
  date: string;
  item: string;
  quantity: number;
  direction: "In" | "Out";
  reference: string;
}

const movementHistory: MovementEntry[] = [
  {
    date: "2026-06-04",
    item: "Metal Zippers",
    quantity: 4,
    direction: "Out",
    reference: "ORD-5301",
  },
  {
    date: "2026-06-03",
    item: "Reflective Tape",
    quantity: 30,
    direction: "In",
    reference: "PO-841",
  },
  {
    date: "2026-06-02",
    item: "Black French Terry",
    quantity: 120,
    direction: "In",
    reference: "PO-838",
  },
  {
    date: "2026-05-31",
    item: "White Cotton Poplin",
    quantity: 60,
    direction: "Out",
    reference: "ORD-5294",
  },
];

function statusClass(status: InventoryItem["status"]) {
  switch (status) {
    case "Low Stock":
      return "bg-amber-100 text-amber-700";
    case "Out of Stock":
      return "bg-rose-100 text-rose-700";
    default:
      return "bg-emerald-100 text-emerald-700";
  }
}

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<"All" | InventoryItem["category"]>(
    "All",
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setItems(inventoryData);
      setIsLoading(false);
    }, 600);
    return () => window.clearTimeout(timer);
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const query = search.toLowerCase();
      const matchesQuery =
        item.name.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query);
      const matchesCategory = category === "All" || item.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [items, search, category]);

  const summary = useMemo(() => {
    return {
      total: items.length,
      lowStock: items.filter(
        (item) => item.status === "Low Stock" || item.status === "Out of Stock",
      ).length,
      fabric: items.filter((item) => item.category === "Fabric").length,
      accessories: items.filter((item) => item.category !== "Fabric").length,
    };
  }, [items]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Total SKUs
          </p>
          <p className="mt-4 text-4xl font-semibold text-slate-900 dark:text-white">
            {summary.total}
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Low Stock Alerts
          </p>
          <p className="mt-4 text-4xl font-semibold text-amber-600">
            {summary.lowStock}
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Fabric Items
          </p>
          <p className="mt-4 text-4xl font-semibold text-sky-600">
            {summary.fabric}
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Accessories & Labels
          </p>
          <p className="mt-4 text-4xl font-semibold text-emerald-600">
            {summary.accessories}
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
              Inventory Management
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Monitor material levels and movement across warehouses.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search inventory"
                className="w-full min-w-[220px] rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>
            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as InventoryItem["category"] | "All")
              }
              className="rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              aria-label="Filter by inventory category"
            >
              <option>All</option>
              <option>Fabric</option>
              <option>Labels</option>
              <option>Accessories</option>
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
          ) : filteredItems.length === 0 ? (
            <div className="py-10">
              <p className="text-center text-slate-500 dark:text-slate-400">
                No inventory records found.
              </p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-700">
              <thead className="bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-200">
                <tr>
                  <th className="px-5 py-4 text-left">Item</th>
                  <th className="px-5 py-4 text-left">Category</th>
                  <th className="px-5 py-4 text-left">Stock</th>
                  <th className="px-5 py-4 text-left">Unit</th>
                  <th className="px-5 py-4 text-left">Location</th>
                  <th className="px-5 py-4 text-left">Status</th>
                  <th className="px-5 py-4 text-left">Last Movement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <td className="px-5 py-4 text-slate-900 dark:text-white">
                      {item.name}
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                      {item.category}
                    </td>
                    <td className="px-5 py-4 text-slate-900 dark:text-white">
                      {item.stock}
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                      {item.unit}
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                      {item.location}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClass(item.status)}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                      {item.lastMovement}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
            <Layers className="h-5 w-5" />
            <div>
              <p className="text-sm font-medium">Stock Movement</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Recent inbound and outbound material flows.
              </p>
            </div>
          </div>
          <div className="mt-5 space-y-3 text-sm text-slate-700 dark:text-slate-300">
            {movementHistory.slice(0, 3).map((movement) => (
              <div
                key={movement.reference}
                className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-950"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {movement.item}
                  </p>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-semibold ${movement.direction === "In" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}
                  >
                    {movement.direction}
                  </span>
                </div>
                <p className="mt-2 text-sm">
                  {movement.quantity} units — {movement.reference}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
            <AlertTriangle className="h-5 w-5" />
            <div>
              <p className="text-sm font-medium">Low Stock Alerts</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Materials that need reorder attention.
              </p>
            </div>
          </div>
          <div className="mt-5 space-y-3 text-sm text-slate-700 dark:text-slate-300">
            {items
              .filter((item) => item.status !== "In Stock")
              .map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-950"
                >
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {item.name}
                  </p>
                  <p>
                    {item.stock} {item.unit} remaining in {item.location}
                  </p>
                </div>
              ))}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
            <Truck className="h-5 w-5" />
            <div>
              <p className="text-sm font-medium">Inbound Shipments</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Estimated arrival for replenishment orders.
              </p>
            </div>
          </div>
          <div className="mt-5 rounded-3xl bg-slate-50 p-4 dark:bg-slate-950">
            <p className="text-sm text-slate-900 dark:text-white">PO-841</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Reflective tape shipment arriving 2026-06-07
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
