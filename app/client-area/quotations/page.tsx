
"use client";

import { useState } from "react";
import { quotations } from "../../../data/clientPortal";
import CountUpNumber from "../../../src/components/ui/CountUpNumber";

export default function QuotationsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    product: "",
    quantity: "",
    budget: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("RFQ Submitted:", form);

    // reset form
    setForm({
      product: "",
      quantity: "",
      budget: "",
      notes: "",
    });

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">
          Quotations
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">
          RFQ management
        </h1>
        <p className="mt-2 text-slate-600">
          Manage submitted requests, approve quotes, and create new RFQs
          instantly.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* BUTTON INSTEAD OF LINK */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Create New RFQ
          </button>

          <div className="grid grid-cols-3 gap-3 text-sm text-slate-600">
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">Submitted</p>
              <p className="mt-2">
                <CountUpNumber value={quotations.length} />
              </p>
            </div>

            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">Approved</p>
              <p className="mt-2">
                <CountUpNumber
                  value={quotations.filter((item) => item.status === "Approved").length}
                />
              </p>
            </div>

            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">Pending</p>
              <p className="mt-2">
                <CountUpNumber
                  value={quotations.filter((item) => item.status === "Pending").length}
                />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-slate-50 px-4 py-4 sm:px-6 sm:py-5">
          <p className="text-sm font-semibold text-slate-900">
            Quotation details
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm text-slate-700">
            <thead className="bg-slate-100 text-left uppercase tracking-[0.24em] text-slate-500">
              <tr>
                <th className="px-6 py-4">RFQ #</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 bg-white">
              {quotations.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-5 font-semibold text-slate-900">
                    {item.id}
                  </td>
                  <td className="px-6 py-5">{item.product}</td>
                  <td className="px-6 py-5">{item.amount}</td>
                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        item.status === "Approved"
                          ? "bg-emerald-100 text-emerald-700"
                          : item.status === "Pending"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                Create New RFQ
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-500 hover:text-slate-800"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input
                name="product"
                value={form.product}
                onChange={handleChange}
                placeholder="Product name"
                className="w-full rounded-xl border border-slate-200 p-3 text-sm"
              />

              <input
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                className="w-full rounded-xl border border-slate-200 p-3 text-sm"
              />

              <input
                name="budget"
                value={form.budget}
                onChange={handleChange}
                placeholder="Budget"
                className="w-full rounded-xl border border-slate-200 p-3 text-sm"
              />

              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Additional notes"
                className="w-full rounded-xl border border-slate-200 p-3 text-sm"
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Submit RFQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}