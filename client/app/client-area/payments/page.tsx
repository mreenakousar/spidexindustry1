
"use client";

import { useState } from "react";
import { payments as initialPayments } from "../../../data/clientPortal";
import CountUpNumber from "../../../components/ui/CountUpNumber";

export default function PaymentsPage() {
  const [payments, setPayments] = useState(initialPayments || []);
  const [selected, setSelected] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // STATS
  const paidInvoices = payments.filter(
    (p) => p.status === "Completed"
  ).length;

  const pendingInvoices = payments.filter(
    (p) => p.status !== "Completed"
  ).length;

  const lastTransaction =
    payments.length > 0 ? payments[payments.length - 1] : null;

  // FAKE PAYMENT API
  const handlePayment = async () => {
    if (!selected) return;

    setLoading(true);

    await new Promise((res) => setTimeout(res, 1200));

    setPayments((prev) =>
      prev.map((p) =>
        p.id === selected.id ? { ...p, status: "Completed" } : p
      )
    );

    setSelected(null);
    setLoading(false);
  };

  // ✅ DOWNLOAD RECEIPT (NO PRINT)
  const downloadReceipt = (payment: any) => {
    const receiptHTML = `
      <html>
        <head>
          <title>Receipt_${payment.id}</title>
          <style>
            body { font-family: Arial; padding: 20px; }
            .box { border: 1px solid #ddd; padding: 16px; border-radius: 10px; }
            h2 { color: #0f172a; }
            p { margin: 6px 0; font-size: 14px; }
          </style>
        </head>
        <body>
          <h2>Payment Receipt</h2>
          <div class="box">
            <p><b>ID:</b> ${payment.id}</p>
            <p><b>Invoice:</b> ${payment.invoice}</p>
            <p><b>Date:</b> ${payment.date}</p>
            <p><b>Amount:</b> ${payment.amount}</p>
            <p><b>Method:</b> ${payment.method}</p>
            <p><b>Status:</b> ${payment.status}</p>
          </div>
        </body>
      </html>
    `;

    const blob = new Blob([receiptHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `receipt_${payment.id}.html`;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">
          Payments
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">
          Payment system
        </h1>
        <p className="mt-2 text-slate-600">
          Manage and process manufacturer payments in real time.
        </p>
      </div>

      {/* STATS */}
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <p className="text-sm uppercase text-slate-500">Paid invoices</p>
          <p className="mt-4 text-3xl font-semibold">
            <CountUpNumber value={paidInvoices} />
          </p>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <p className="text-sm uppercase text-slate-500">Pending invoices</p>
          <p className="mt-4 text-3xl font-semibold">
            <CountUpNumber value={pendingInvoices} />
          </p>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <p className="text-sm uppercase text-slate-500">Last transaction</p>
          <p className="mt-4 text-3xl font-semibold">
            <CountUpNumber value={lastTransaction?.amount ?? "$0"} />
          </p>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="border-b bg-slate-50 px-6 py-5 font-semibold">
          Transaction log
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100 text-left uppercase text-slate-500">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Invoice</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="px-6 py-4 font-semibold">{p.id}</td>
                  <td className="px-6 py-4">{p.invoice}</td>
                  <td className="px-6 py-4">{p.amount}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        p.status === "Completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 flex gap-2">
                    {p.status !== "Completed" && (
                      <button
                        onClick={() => setSelected(p)}
                        className="bg-sky-600 text-white px-3 py-1 rounded-lg text-xs"
                      >
                        Pay Now
                      </button>
                    )}

                    <button
                      onClick={() => setSelected({ ...p, mode: "receipt" })}
                      className="bg-slate-200 px-3 py-1 rounded-lg text-xs"
                    >
                      Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAYMENT + RECEIPT MODAL (COMBINED) */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl w-[400px] space-y-4">

            {/* IF RECEIPT MODE */}
            {selected.mode === "receipt" ? (
              <>
                <h2 className="text-lg font-semibold">Payment Receipt</h2>

                <div className="text-sm text-slate-600 space-y-1 border p-3 rounded-lg">
                  <p><b>ID:</b> {selected.id}</p>
                  <p><b>Invoice:</b> {selected.invoice}</p>
                  <p><b>Date:</b> {selected.date}</p>
                  <p><b>Amount:</b> {selected.amount}</p>
                  <p><b>Method:</b> {selected.method}</p>
                  <p><b>Status:</b> {selected.status}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelected(null)}
                    className="flex-1 bg-slate-200 py-2 rounded-lg"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => downloadReceipt(selected)}
                    className="flex-1 bg-sky-600 text-white py-2 rounded-lg"
                  >
                    Download
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* PAYMENT MODE */}
                <h2 className="text-lg font-semibold">Pay Invoice</h2>

                <p className="text-sm text-slate-600">
                  Invoice: {selected.invoice}
                </p>

                <p className="text-sm text-slate-600">
                  Amount: {selected.amount}
                </p>

                <select className="w-full border p-2 rounded-lg">
                  <option>Bank Transfer</option>
                  <option>JazzCash</option>
                  <option>EasyPaisa</option>
                  <option>Stripe</option>
                </select>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelected(null)}
                    className="flex-1 bg-slate-200 py-2 rounded-lg"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="flex-1 bg-sky-600 text-white py-2 rounded-lg"
                  >
                    {loading ? "Processing..." : "Confirm Pay"}
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
}