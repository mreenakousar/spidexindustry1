import React from "react";

export default function ProductDetailPage(props: any) {
  const { productId } = props.params || {};
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Product: {productId}</h1>
        <div className="flex gap-2">
          <button className="px-3 py-2 bg-sky-600 text-white rounded">
            Edit
          </button>
          <button className="px-3 py-2 border rounded">Delete</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Overview</h2>
          <p className="text-sm text-slate-600">
            Placeholder for product description, specifications, and tech pack
            links.
          </p>

          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Variants / SKUs</h3>
            <div className="space-y-2">
              <div className="p-3 border rounded">
                Variant A — SKU: SKU-001 — Qty: 120
              </div>
              <div className="p-3 border rounded">
                Variant B — SKU: SKU-002 — Qty: 80
              </div>
            </div>
          </div>
        </div>

        <aside className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-sm font-medium mb-2">Inventory</h3>
          <p className="text-sm text-slate-600">
            Current stock, low-stock warnings and actions placeholder.
          </p>
          <div className="mt-4">
            <button className="px-3 py-2 bg-green-600 text-white rounded">
              Add Stock
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
