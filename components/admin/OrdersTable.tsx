"use client";
import React from "react";
import type { Order } from "../../types/admin";

export default function OrdersTable({ rows }: { rows: Order[] }) {
  return (
    <div className="overflow-auto bg-white dark:bg-slate-800 rounded-lg shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
        <thead className="bg-slate-50 dark:bg-slate-900">
          <tr>
            <th className="px-4 py-2 text-left text-sm">Order ID</th>
            <th className="px-4 py-2 text-left text-sm">Client</th>
            <th className="px-4 py-2 text-left text-sm">Product</th>
            <th className="px-4 py-2 text-left text-sm">Qty</th>
            <th className="px-4 py-2 text-left text-sm">Status</th>
            <th className="px-4 py-2 text-left text-sm">Payment</th>
            <th className="px-4 py-2 text-left text-sm">Production</th>
            <th className="px-4 py-2 text-left text-sm">Date</th>
            <th className="px-4 py-2 text-right text-sm">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
          {rows.map((r) => (
            <tr key={r.id}>
              <td className="px-4 py-3 text-sm">{r.id}</td>
              <td className="px-4 py-3 text-sm">{r.clientName}</td>
              <td className="px-4 py-3 text-sm">{r.product}</td>
              <td className="px-4 py-3 text-sm">{r.quantity}</td>
              <td className="px-4 py-3 text-sm">{r.status}</td>
              <td className="px-4 py-3 text-sm">{r.paymentStatus}</td>
              <td className="px-4 py-3 text-sm">{r.productionStatus}</td>
              <td className="px-4 py-3 text-sm">{r.date}</td>
              <td className="px-4 py-3 text-right text-sm">
                <button className="text-blue-600 hover:underline">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
