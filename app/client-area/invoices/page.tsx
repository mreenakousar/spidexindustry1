

// "use client";

// import { useState, useEffect } from "react";
// import { invoices } from "../../../data/clientPortal";
// import type { InvoiceRecord } from "../../../types/clientPortal";
// import Badge, { statusVariant } from "../../../components/ui/Badge";

// export default function InvoicesPage() {
//   const [selectedInvoice, setSelectedInvoice] =
//     useState<null | InvoiceRecord>(null);

//   // Prevent background scroll when modal open
//   useEffect(() => {
//     if (selectedInvoice) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//   }, [selectedInvoice]);

//   return (
//     <>
//       {/* PAGE WRAPPER */}
//       <div className="space-y-8">
//         {/* HEADER */}
//         <div className="rounded-3xl bg-white p-8 shadow-sm">
//           <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">
//             Invoices
//           </p>
//           <h1 className="mt-3 text-3xl font-semibold text-slate-900">
//             Invoice repository
//           </h1>
//           <p className="mt-2 text-slate-600">
//             Download PDF invoices, review date and payment status for each order.
//           </p>
//         </div>

//         {/* TABLE */}
//         <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
//           <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">
//             <p className="text-sm font-semibold text-slate-900">Invoice list</p>
//           </div>

//           <div className="min-w-full overflow-x-auto">
//             <table className="min-w-full divide-y divide-slate-200 text-sm text-slate-700">
//               <thead className="bg-slate-100 text-left uppercase tracking-[0.24em] text-slate-500">
//                 <tr>
//                   <th className="px-6 py-4">Invoice #</th>
//                   <th className="px-6 py-4">Date</th>
//                   <th className="px-6 py-4">Amount</th>
//                   <th className="px-6 py-4">Status</th>
//                   <th className="px-6 py-4">Actions</th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-slate-200 bg-white">
//                 {invoices.map((invoice) => (
//                   <tr key={invoice.id}>
//                     <td className="px-6 py-5 font-semibold text-slate-900">
//                       {invoice.id}
//                     </td>

//                     <td className="px-6 py-5">{invoice.date}</td>

//                     <td className="px-6 py-5">{invoice.amount}</td>

//                     <td className="px-6 py-5">
//                       <Badge variant={statusVariant(invoice.status)}>
//                         {invoice.status}
//                       </Badge>
//                     </td>

//                     <td className="px-6 py-5 space-x-2">
//                       {/* DOWNLOAD */}
//                       <a
//                         href={invoice.pdfUrl}
//                         download
//                         className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
//                       >
//                         Download PDF
//                       </a>

//                       {/* VIEW */}
//                       <button
//                         onClick={() => setSelectedInvoice(invoice)}
//                         className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
//                       >
//                         View Invoice
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* MODAL */}
//       {selectedInvoice && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
//           onClick={() => setSelectedInvoice(null)}
//         >
//           <div
//             className="w-full max-w-lg rounded-3xl bg-white p-6"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* HEADER */}
//             <div className="flex justify-between items-center">
//               <h2 className="text-xl font-bold">
//                 Invoice {selectedInvoice.id}
//               </h2>

//               <button
//                 onClick={() => setSelectedInvoice(null)}
//                 className="text-slate-500 hover:text-slate-900"
//               >
//                 ✕
//               </button>
//             </div>

//             {/* DETAILS */}
//             <div className="mt-6 space-y-2 text-sm">
//               <p>
//                 <b>Date:</b> {selectedInvoice.date}
//               </p>
//               <p>
//                 <b>Amount:</b> {selectedInvoice.amount}
//               </p>
//               <p>
//                 <b>Status:</b> {selectedInvoice.status}
//               </p>
//               <p>
//                 <b>Customer:</b> {selectedInvoice.customer}
//               </p>
//               <p>
//                 <b>Order ID:</b> {selectedInvoice.orderId}
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
"use client";

import { useState, useEffect, useMemo } from "react";
import { invoices } from "../../../data/clientPortal";
import type { InvoiceRecord } from "../../../types/clientPortal";
import Badge, { statusVariant } from "../../../components/ui/Badge";
import CountUpNumber from "../../../src/components/ui/CountUpNumber";

export default function InvoicesPage() {
  const [selectedInvoice, setSelectedInvoice] =
    useState<null | InvoiceRecord>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [payingInvoice, setPayingInvoice] = useState<InvoiceRecord | null>(
    null
  );
  const [loading, setLoading] = useState(false);

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
    return invoices.filter((inv) => {
      const matchesSearch =
        inv.id.toLowerCase().includes(search.toLowerCase()) ||
        inv.customer?.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ? true : inv.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  // STATS
  const totalInvoices = invoices.length;

  const paidInvoices = invoices.filter(
    (i) => i.status === "Paid"
  ).length;

  const pendingInvoices = invoices.filter(
    (i) => i.status === "Pending"
  ).length;

  const totalRevenue = invoices
    .filter((i) => i.status === "Paid")
    .reduce((acc, i) => acc + Number(i.amount.replace(/[^0-9.-]+/g, "")), 0);

  // FAKE PAYMENT
  const handlePayment = async () => {
    if (!payingInvoice) return;

    setLoading(true);

    await new Promise((res) => setTimeout(res, 1500));

    alert(`Payment completed for ${payingInvoice.id}`);

    setPayingInvoice(null);
    setLoading(false);
  };

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
            Search, filter, manage and process all client invoices.
          </p>
        </div>

        {/* STATS */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 sm:gap-6">
          <div className="rounded-3xl border bg-white p-5 shadow-sm sm:p-6">
            <p className="text-sm text-slate-500">Total</p>
            <p className="text-2xl font-semibold">
              <CountUpNumber value={totalInvoices} />
            </p>
          </div>

          <div className="rounded-3xl border bg-white p-5 shadow-sm sm:p-6">
            <p className="text-sm text-slate-500">Paid</p>
            <p className="text-2xl font-semibold text-emerald-600">
              <CountUpNumber value={paidInvoices} />
            </p>
          </div>

          <div className="rounded-3xl border bg-white p-5 shadow-sm sm:p-6">
            <p className="text-sm text-slate-500">Pending</p>
            <p className="text-2xl font-semibold text-amber-600">
              <CountUpNumber value={pendingInvoices} />
            </p>
          </div>

          <div className="rounded-3xl border bg-white p-5 shadow-sm sm:p-6">
            <p className="text-sm text-slate-500">Revenue</p>
            <p className="text-2xl font-semibold text-sky-600">
              <CountUpNumber value={`$${totalRevenue}`} />
            </p>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm md:flex-row">
          <input
            type="text"
            placeholder="Search invoice or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border px-4 py-2"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border px-4 py-2"
          >
            <option value="all">All</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <div className="border-b bg-slate-50 px-4 py-4 font-semibold sm:px-6 sm:py-5">
            Invoice list
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100 text-left uppercase text-slate-500">
                <tr>
                  <th className="px-6 py-4">Invoice</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="border-t">
                    <td className="px-6 py-5 font-semibold">
                      {invoice.id}
                    </td>

                    <td className="px-6 py-5">{invoice.date}</td>

                    <td className="px-6 py-5">{invoice.amount}</td>

                    <td className="px-6 py-5">
                      <Badge variant={statusVariant(invoice.status)}>
                        {invoice.status}
                      </Badge>
                    </td>

                    <td className="px-6 py-5 flex gap-2 flex-wrap">
                      {/* VIEW */}
                      <button
                        onClick={() => setSelectedInvoice(invoice)}
                        className="rounded-xl bg-slate-100 px-3 py-1 text-xs"
                      >
                        View
                      </button>

                      {/* DOWNLOAD */}
                      <a
                        href={invoice.pdfUrl}
                        download
                        className="rounded-xl bg-slate-100 px-3 py-1 text-xs"
                      >
                        Download
                      </a>

                      {/* PAY */}
                      {invoice.status === "Pending" && (
                        <button
                          onClick={() => setPayingInvoice(invoice)}
                          className="rounded-xl bg-sky-600 text-white px-3 py-1 text-xs"
                        >
                          Pay Now
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* VIEW MODAL */}
      {selectedInvoice && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center"
          onClick={() => setSelectedInvoice(null)}
        >
          <div
            className="bg-white p-6 rounded-3xl w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">
              Invoice {selectedInvoice.id}
            </h2>

            <div className="space-y-2 text-sm">
              <p><b>Date:</b> {selectedInvoice.date}</p>
              <p><b>Amount:</b> {selectedInvoice.amount}</p>
              <p><b>Status:</b> {selectedInvoice.status}</p>
              <p><b>Customer:</b> {selectedInvoice.customer}</p>
              <p><b>Order ID:</b> {selectedInvoice.orderId}</p>
            </div>

            <button
              onClick={() => setSelectedInvoice(null)}
              className="mt-5 w-full bg-slate-200 py-2 rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* PAYMENT MODAL */}
      {payingInvoice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-3xl w-full max-w-sm space-y-4">

            <h2 className="text-lg font-semibold">Pay Invoice</h2>

            <p className="text-sm text-slate-600">
              Invoice: {payingInvoice.id}
            </p>

            <p className="text-sm text-slate-600">
              Amount: {payingInvoice.amount}
            </p>

            <select className="w-full border rounded-xl p-2">
              <option>Bank Transfer</option>
              <option>JazzCash</option>
              <option>EasyPaisa</option>
              <option>Stripe</option>
            </select>

            <div className="flex gap-2">
              <button
                onClick={() => setPayingInvoice(null)}
                className="flex-1 bg-slate-200 py-2 rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={handlePayment}
                disabled={loading}
                className="flex-1 bg-sky-600 text-white py-2 rounded-xl"
              >
                {loading ? "Processing..." : "Pay Now"}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}