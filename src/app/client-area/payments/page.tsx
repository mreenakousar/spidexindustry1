"use client";

import { useEffect, useState } from "react";
import { getClientPaymentsAction, payInvoiceAction } from "@/actions/client";
import CountUpNumber from "@/components/ui/CountUpNumber";
import { Card } from "@/components/ui/card";

export default function PaymentsPage() {
  const [paymentsList, setPaymentsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState("Bank Transfer");
  const [processing, setProcessing] = useState(false);

  const fetchPayments = async () => {
    try {
      const res = await getClientPaymentsAction();
      setPaymentsList(res);
    } catch (err) {
      console.error("Error fetching client payments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // STATS
  const paidInvoices = paymentsList.filter(
    (p) => p.status === "Completed"
  ).length;

  const pendingInvoices = paymentsList.filter(
    (p) => p.status === "Pending"
  ).length;

  const lastTransaction =
    paymentsList.length > 0 ? paymentsList[0] : null;

  // REAL PAYMENT OPERATION
  const handlePayment = async () => {
    if (!selected || processing) return;

    setProcessing(true);
    try {
      // payment record uses `invoice` field as the invoice identifier
      const res = await payInvoiceAction(selected.invoice, paymentMethod);
      if (res.ok) {
        alert(`Payment processed successfully for invoice ${selected.invoice}`);
        setSelected(null);
        fetchPayments();
      }
    } catch (err) {
      console.error("Error processing payment:", err);
      alert("Failed to process payment. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  // DOWNLOAD RECEIPT
  const downloadReceipt = (payment: any) => {
    const receiptHTML = `
      <html>
        <head>
          <title>Receipt_${payment.paymentId}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; color: #333; background: #f8fafc; }
            .receipt-card { border: 1px solid #e2e8f0; padding: 30px; border-radius: 20px; max-width: 500px; margin: auto; bg: white; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
            h2 { color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-top: 0; }
            p { margin: 12px 0; font-size: 14px; display: flex; justify-content: space-between; }
            .label { color: #64748b; font-weight: 500; }
            .val { color: #0f172a; font-weight: 600; }
            .brand { text-align: center; margin-top: 20px; font-size: 12px; color: #94a3b8; font-weight: 700; letter-spacing: 0.1em; }
          </style>
        </head>
        <body>
          <div class="receipt-card">
            <h2>Payment Receipt</h2>
            <p><span class="label">Transaction ID:</span><span class="val">${payment.paymentId}</span></p>
            <p><span class="label">Invoice ID:</span><span class="val">${payment.invoice}</span></p>
            <p><span class="label">Date:</span><span class="val">${payment.date}</span></p>
            <p><span class="label">Amount Paid:</span><span class="val">${payment.amount}</span></p>
            <p><span class="label">Payment Method:</span><span class="val">${payment.method}</span></p>
            <p><span class="label">Status:</span><span class="val">${payment.status}</span></p>
            <div class="brand">SPEEDX INDUSTRY</div>
          </div>
        </body>
      </html>
    `;

    const blob = new Blob([receiptHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `receipt_${payment.paymentId}.html`;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-sky-600"></div>
        <p className="text-sm font-medium text-slate-500">Loading payments log...</p>
      </div>
    );
  }

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
          <p className="text-sm uppercase text-slate-500 font-semibold tracking-wider">Completed Transactions</p>
          <p className="mt-4 text-3xl font-bold text-slate-900">
            <CountUpNumber value={paidInvoices} />
          </p>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <p className="text-sm uppercase text-slate-500 font-semibold tracking-wider">Awaiting Payments</p>
          <p className="mt-4 text-3xl font-bold text-slate-900">
            <CountUpNumber value={pendingInvoices} />
          </p>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <p className="text-sm uppercase text-slate-500 font-semibold tracking-wider">Last Transaction Amount</p>
          <p className="mt-4 text-3xl font-bold text-sky-600">
            {lastTransaction ? lastTransaction.amount : "$0"}
          </p>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-3xl bg-white shadow-sm border border-slate-200">
        <div className="border-b bg-slate-50 px-6 py-5 font-semibold text-slate-900">
          Transaction log
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100 text-left uppercase text-slate-500">
              <tr>
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Invoice ID</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Method</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {paymentsList.length > 0 ? (
                paymentsList.map((p) => (
                  <tr key={p.id} className="border-t hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-mono font-semibold text-slate-900">{p.paymentId}</td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">{p.invoice}</td>
                    <td className="px-6 py-4 font-semibold text-slate-900">{p.amount}</td>
                    <td className="px-6 py-4 text-slate-600">{p.method || "Bank Transfer"}</td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          p.status === "Completed"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {p.status === "Completed" ? "Completed" : "Pending"}
                      </span>
                    </td>

                    <td className="px-6 py-4 flex gap-2">
                      {p.status !== "Completed" ? (
                        <button
                          onClick={() => setSelected(p)}
                          className="bg-sky-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-sky-700 transition"
                        >
                          Pay Now
                        </button>
                      ) : (
                        <button
                          onClick={() => downloadReceipt(p)}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                        >
                          Receipt
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-50 animate-in fade-in">
          <div className="bg-white p-6 rounded-3xl w-full max-w-sm space-y-4 shadow-xl">
            <h2 className="text-lg font-bold text-slate-900">Pay Invoice</h2>

            <p className="text-sm text-slate-600">
              Invoice ID: <span className="font-semibold text-slate-900">{selected.invoice}</span>
            </p>

            <p className="text-sm text-slate-600">
              Total Amount: <span className="font-bold text-sky-600">{selected.amount}</span>
            </p>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Select payment method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full border rounded-xl p-2.5 text-sm bg-slate-50"
              >
                <option value="Bank Transfer">Bank Wire / Transfer</option>
                <option value="Stripe">Credit / Debit Card (Stripe)</option>
                <option value="JazzCash">JazzCash Mobile Wallet</option>
                <option value="EasyPaisa">EasyPaisa Mobile Wallet</option>
              </select>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setSelected(null)}
                className="flex-1 bg-slate-100 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-200 transition"
              >
                Cancel
              </button>

              <button
                onClick={handlePayment}
                disabled={processing}
                className="flex-1 bg-sky-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-sky-700 transition"
              >
                {processing ? "Processing..." : "Confirm Pay"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}