"use client";

import { useState, useEffect, useMemo } from "react";
import { getClientInvoicesAction, payInvoiceAction } from "@/actions/client";
import Badge, { statusVariant } from "@/components/ui/Badge";
import CountUpNumber from "@/components/ui/CountUpNumber";
import { Card } from "@/components/ui/card";

export default function InvoicesPage() {
  const [invoicesList, setInvoicesList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [payingInvoice, setPayingInvoice] = useState<any | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("Bank Transfer");
  const [processingPayment, setProcessingPayment] = useState(false);

  const fetchInvoices = async () => {
    try {
      const res = await getClientInvoicesAction();
      setInvoicesList(res);
    } catch (err) {
      console.error("Error fetching client invoices:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // Prevent background scroll when modal open
  useEffect(() => {
    if (selectedInvoice || payingInvoice) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedInvoice, payingInvoice]);

  // FILTERED DATA
  const filteredInvoices = useMemo(() => {
    return invoicesList.filter((inv) => {
      const matchesSearch =
        inv.invoiceId.toLowerCase().includes(search.toLowerCase()) ||
        inv.customer?.toLowerCase().includes(search.toLowerCase()) ||
        inv.orderId.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ? true : inv.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [invoicesList, search, statusFilter]);

  // STATS
  const totalInvoices = invoicesList.length;

  const paidInvoices = invoicesList.filter(
    (i) => i.status === "Paid"
  ).length;

  const pendingInvoices = invoicesList.filter(
    (i) => i.status === "Pending"
  ).length;

  const totalRevenue = invoicesList
    .filter((i) => i.status === "Paid")
    .reduce((acc, i) => acc + Number(i.amount.replace(/[^0-9.-]+/g, "")), 0);

  // REAL PAYMENT OPERATION
  const handlePayment = async () => {
    if (!payingInvoice || processingPayment) return;

    setProcessingPayment(true);
    try {
      const res = await payInvoiceAction(payingInvoice.invoiceId, paymentMethod);
      if (res.ok) {
        alert(`Payment completed for invoice ${payingInvoice.invoiceId}`);
        setPayingInvoice(null);
        fetchInvoices();
      }
    } catch (err) {
      console.error("Error processing invoice payment:", err);
      alert("Failed to process payment. Please try again.");
    } finally {
      setProcessingPayment(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-sky-600"></div>
        <p className="text-sm font-medium text-slate-500">Loading invoices...</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8">
        {/* HEADER */}
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">
            Invoices
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">
            Invoice dashboard
          </h1>
          <p className="mt-2 text-slate-600">
            Search, filter, manage and process all your manufacturer invoices.
          </p>
        </div>

        {/* STATS */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 sm:gap-6">
          <div className="rounded-3xl border bg-white p-5 shadow-sm sm:p-6">
            <p className="text-sm text-slate-500">Total Invoices</p>
            <p className="text-2xl font-bold mt-1">
              <CountUpNumber value={totalInvoices} />
            </p>
          </div>

          <div className="rounded-3xl border bg-white p-5 shadow-sm sm:p-6">
            <p className="text-sm text-slate-500">Paid</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">
              <CountUpNumber value={paidInvoices} />
            </p>
          </div>

          <div className="rounded-3xl border bg-white p-5 shadow-sm sm:p-6">
            <p className="text-sm text-slate-500">Pending</p>
            <p className="text-2xl font-bold text-amber-600 mt-1">
              <CountUpNumber value={pendingInvoices} />
            </p>
          </div>

          <div className="rounded-3xl border bg-white p-5 shadow-sm sm:p-6">
            <p className="text-sm text-slate-500">Total Paid Amount</p>
            <p className="text-2xl font-bold text-sky-600 mt-1">
              ${totalRevenue.toLocaleString()}
            </p>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm md:flex-row border border-slate-100">
          <input
            type="text"
            placeholder="Search invoice or order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border px-4 py-2 text-sm outline-none focus:border-sky-500"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border px-4 py-2 text-sm text-slate-700 outline-none"
          >
            <option value="all">All statuses</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm border border-slate-200">
          <div className="border-b bg-slate-50 px-4 py-4 font-semibold sm:px-6 sm:py-5">
            Invoice list
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100 text-left uppercase text-slate-500">
                <tr>
                  <th className="px-6 py-4">Invoice</th>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredInvoices.length > 0 ? (
                  filteredInvoices.map((invoice) => (
                    <tr key={invoice.id} className="border-t hover:bg-slate-50/50">
                      <td className="px-6 py-5 font-semibold text-slate-900">
                        {invoice.invoiceId}
                      </td>

                      <td className="px-6 py-5 font-mono text-xs text-slate-500">
                        {invoice.orderId}
                      </td>

                      <td className="px-6 py-5 text-slate-600">{invoice.date}</td>

                      <td className="px-6 py-5 font-semibold text-slate-900">{invoice.amount}</td>

                      <td className="px-6 py-5">
                        <Badge variant={statusVariant(invoice.status)}>
                          {invoice.status}
                        </Badge>
                      </td>

                      <td className="px-6 py-5 space-x-2">
                        {/* VIEW */}
                        <button
                          onClick={() => setSelectedInvoice(invoice)}
                          className="rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-semibold hover:bg-slate-200 transition"
                        >
                          View Details
                        </button>

                        {/* PAY */}
                        {invoice.status === "Pending" && (
                          <button
                            onClick={() => setPayingInvoice(invoice)}
                            className="rounded-xl bg-sky-600 text-white px-3 py-1.5 text-xs font-semibold hover:bg-sky-700 transition"
                          >
                            Pay Now
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                      No invoices found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* VIEW MODAL */}
      {selectedInvoice && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in"
          onClick={() => setSelectedInvoice(null)}
        >
          <div
            className="bg-white p-6 rounded-3xl w-full max-w-lg shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">
              Invoice details
            </h2>

            <div className="space-y-3 text-sm border p-4 rounded-2xl bg-slate-50">
              <p className="flex justify-between">
                <span className="text-slate-500">Invoice ID:</span>
                <span className="font-semibold">{selectedInvoice.invoiceId}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-slate-500">Associated Order:</span>
                <span className="font-mono">{selectedInvoice.orderId}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-slate-500">Issue Date:</span>
                <span>{selectedInvoice.date}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-slate-500">Total Amount:</span>
                <span className="font-semibold">{selectedInvoice.amount}</span>
              </p>
              <p className="flex justify-between items-center">
                <span className="text-slate-500">Payment Status:</span>
                <Badge variant={statusVariant(selectedInvoice.status)}>
                  {selectedInvoice.status}
                </Badge>
              </p>
              <p className="flex justify-between">
                <span className="text-slate-500">Client:</span>
                <span>{selectedInvoice.customer}</span>
              </p>
            </div>

            <button
              onClick={() => setSelectedInvoice(null)}
              className="mt-5 w-full bg-slate-900 text-white font-semibold py-2.5 rounded-xl hover:bg-slate-800 transition"
            >
              Close Details
            </button>
          </div>
        </div>
      )}

      {/* PAYMENT MODAL */}
      {payingInvoice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in">
          <div className="bg-white p-6 rounded-3xl w-full max-w-sm space-y-4 shadow-xl">
            <h2 className="text-lg font-bold text-slate-900">Process payment</h2>

            <p className="text-sm text-slate-600">
              Invoice ID: <span className="font-semibold text-slate-900">{payingInvoice.invoiceId}</span>
            </p>

            <p className="text-sm text-slate-600">
              Total Amount: <span className="font-bold text-sky-600">{payingInvoice.amount}</span>
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
                onClick={() => setPayingInvoice(null)}
                className="flex-1 bg-slate-100 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-200 transition"
              >
                Cancel
              </button>

              <button
                onClick={handlePayment}
                disabled={processingPayment}
                className="flex-1 bg-sky-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-sky-700 transition"
              >
                {processingPayment ? "Processing..." : "Confirm Payment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}