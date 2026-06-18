
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { orders } from "../../../data/clientPortal";

type OrderForm = {
  product: string;
  quantity: string;
  sizes: string;
  color: string;
  gsm: string;
  designNotes: string;
};

export default function MyOrdersPage() {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const [form, setForm] = useState<OrderForm>({
    product: "",
    quantity: "",
    sizes: "",
    color: "",
    gsm: "",
    designNotes: "",
  });

  const [files, setFiles] = useState<File[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const openCreateModal = () => {
    setViewMode(false);
    setSelectedOrder(null);
    setForm({
      product: "",
      quantity: "",
      sizes: "",
      color: "",
      gsm: "",
      designNotes: "",
    });
    setFiles([]);
    setIsModalOpen(true);
  };

  const openViewModal = (order: any) => {
    setViewMode(true);
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    console.log("ORDER DATA:", form);
    console.log("FILES:", files);

    alert("Order submitted successfully!");

    setIsModalOpen(false);
    router.push("/client-area/my-orders");
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">
              My Orders
            </p>

            <h1 className="mt-3 text-3xl font-semibold text-slate-900">
              Order Management
            </h1>

            <p className="mt-2 text-slate-600">
              Create production orders, track status, and manage workflow.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">

            <button
              onClick={openCreateModal}
              className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
            >
              + New Order
            </button>

            <Link
              href="/client-area/my-orders/1002"
              className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              View Latest
            </Link>

          </div>

        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">

        <div className="border-b border-slate-200 bg-slate-50 px-4 py-4 sm:px-6 sm:py-5">
          <p className="text-sm font-semibold text-slate-900">
            Order Table
          </p>
        </div>

        <div className="overflow-x-auto">

            <table className="min-w-full divide-y divide-slate-200 text-sm">

            <thead className="bg-slate-100 text-left text-xs uppercase tracking-[0.24em] text-slate-500">
              <tr>
                <th className="px-4 py-4 sm:px-6">Order ID</th>
                <th className="px-4 py-4 sm:px-6">Product</th>
                <th className="px-4 py-4 sm:px-6">Quantity</th>
                <th className="px-4 py-4 sm:px-6">Status</th>
                <th className="px-4 py-4 sm:px-6">Date</th>
                <th className="px-4 py-4 sm:px-6">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 bg-white text-sm text-slate-700">

              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-4 py-5 font-semibold text-slate-900 sm:px-6">
                    #{order.id}
                  </td>

                  <td className="px-4 py-5 sm:px-6">{order.product}</td>
                  <td className="px-4 py-5 sm:px-6">{order.quantity}</td>

                  <td className="px-4 py-5 sm:px-6">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      order.status === "Completed"
                        ? "bg-emerald-100 text-emerald-700"
                        : order.status === "In Production"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-slate-100 text-slate-700"
                    }`}>
                      {order.status}
                    </span>
                  </td>

                  <td className="px-4 py-5 sm:px-6">{order.date}</td>

                  <td className="flex gap-2 px-4 py-5 sm:px-6">

                    {/* VIEW POPUP */}
                    <button
                      onClick={() => openViewModal(order)}
                      className="rounded-2xl bg-slate-950 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition"
                    >
                      View
                    </button>

                    <button className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-900 hover:bg-slate-100 transition">
                      Reorder
                    </button>

                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-y-auto rounded-3xl bg-white p-4 shadow-xl sm:p-6">

            {/* HEADER */}
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-lg font-semibold text-slate-900">
                {viewMode ? "Order Details" : "Create Production Order"}
              </h2>

              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-500 hover:text-slate-900"
              >
                ✕
              </button>
            </div>

            {/* BODY */}
            <div className="flex-1 mt-5">

              {viewMode ? (
                <div className="space-y-3 text-sm text-slate-700">
                  <p><b>Product:</b> {selectedOrder?.product}</p>
                  <p><b>Quantity:</b> {selectedOrder?.quantity}</p>
                  <p><b>Status:</b> {selectedOrder?.status}</p>
                  <p><b>Date:</b> {selectedOrder?.date}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">

                  <input
                    name="product"
                    value={form.product}
                    onChange={handleChange}
                    placeholder="Product Name"
                    className="w-full rounded-xl border p-3"
                    required
                  />

                  <input
                    name="quantity"
                    value={form.quantity}
                    onChange={handleChange}
                    placeholder="Quantity"
                    className="w-full rounded-xl border p-3"
                    required
                  />

                  <input
                    name="sizes"
                    value={form.sizes}
                    onChange={handleChange}
                    placeholder="S=10, M=20, L=30"
                    className="w-full rounded-xl border p-3"
                  />

                  <input
                    name="color"
                    value={form.color}
                    onChange={handleChange}
                    placeholder="Color"
                    className="w-full rounded-xl border p-3"
                  />

                  <input
                    name="gsm"
                    value={form.gsm}
                    onChange={handleChange}
                    placeholder="Fabric / GSM"
                    className="w-full rounded-xl border p-3"
                  />

                  <textarea
                    name="designNotes"
                    value={form.designNotes}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Design instructions"
                    className="w-full rounded-xl border p-3"
                  />

                  <input
                    type="file"
                    multiple
                    accept=".pdf,image/*"
                    onChange={handleFileChange}
                    className="w-full rounded-xl border p-3"
                  />

                  {files.length > 0 && (
                    <div className="rounded-xl border p-3 bg-slate-50 space-y-2">
                      <p className="text-sm font-semibold">Files</p>

                      {files.map((file, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span>📎 {file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(i)}
                            className="text-red-500"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                </form>
              )}

            </div>

            {/* FOOTER BUTTONS */}
            <div className="mt-6 flex justify-end gap-3 border-t pt-4">

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-xl border px-5 py-2 text-sm"
              >
                Cancel
              </button>

              {!viewMode && (
                <button
                  onClick={() => handleSubmit()}
                  className="rounded-xl bg-sky-600 px-5 py-2 text-sm font-semibold text-white hover:bg-sky-700"
                >
                  Submit Order
                </button>
              )}

            </div>

          </div>

        </div>
      )}

    </div>
  );
}