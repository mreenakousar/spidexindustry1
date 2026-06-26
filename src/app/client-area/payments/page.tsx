"use client";

import { useEffect, useState, useMemo } from "react";
import { getClientPaymentsAction } from "@/actions/client";
import CountUpNumber from "@/components/ui/CountUpNumber";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { PageHeader } from "@/components/ui/PageHeader";
import { CheckCircle2, Banknote, Calendar, Download } from "lucide-react";

export default function PaymentsPage() {
  const [paymentsList, setPaymentsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  const totalAmountPaid = useMemo(() => {
    return paymentsList.reduce((acc, p) => {
      const val = Number(p.amount.replace(/[^0-9.-]+/g, ""));
      return acc + (isNaN(val) ? 0 : val);
    }, 0);
  }, [paymentsList]);

  const lastTx = paymentsList.length > 0 ? paymentsList[0] : null;

  const downloadReceipt = (payment: any) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt - ${payment.invoice}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap');
            body {
              font-family: 'Outfit', sans-serif;
              padding: 40px;
              color: #1e293b;
              background: #fff;
              line-height: 1.5;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              border: 1px solid #e2e8f0;
              border-radius: 24px;
              padding: 40px;
              box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
            }
            .header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 2px dashed #e2e8f0;
              padding-bottom: 24px;
              margin-bottom: 24px;
            }
            .logo {
              font-weight: 700;
              font-size: 24px;
              letter-spacing: -0.05em;
              color: #0f172a;
            }
            .logo span {
              color: #0284c7;
            }
            .receipt-title {
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 0.1em;
              font-weight: 600;
              color: #64748b;
            }
            .details-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 20px;
              margin-bottom: 30px;
            }
            .detail-item {
              display: flex;
              flex-direction: column;
            }
            .label {
              font-size: 11px;
              color: #64748b;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              margin-bottom: 4px;
            }
            .value {
              font-size: 15px;
              font-weight: 600;
              color: #0f172a;
            }
            .badge-verified {
              display: inline-flex;
              align-items: center;
              gap: 6px;
              background-color: #f0fdf4;
              color: #16a34a;
              border: 1px solid #bbf7d0;
              padding: 6px 14px;
              border-radius: 9999px;
              font-size: 12px;
              font-weight: 600;
              width: fit-content;
              margin-top: 6px;
            }
            .footer {
              text-align: center;
              margin-top: 40px;
              font-size: 12px;
              color: #94a3b8;
              border-top: 1px solid #f1f5f9;
              padding-top: 20px;
            }
            @media print {
              body {
                padding: 0;
              }
              .container {
                border: none;
                box-shadow: none;
                padding: 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">SPEEDX<span>INDUSTRY</span></div>
              <div class="receipt-title">Payment Receipt</div>
            </div>
            
            <div class="details-grid">
              <div class="detail-item">
                <span class="label">Transaction ID</span>
                <span class="value">${payment.paymentId}</span>
              </div>
              <div class="detail-item">
                <span class="label">Invoice Number</span>
                <span class="value">${payment.invoice}</span>
              </div>
              <div class="detail-item">
                <span class="label">Date Verified</span>
                <span class="value">${payment.date}</span>
              </div>
              <div class="detail-item">
                <span class="label">Amount Paid</span>
                <span class="value" style="font-size: 18px; color: #0284c7;">${payment.amount}</span>
              </div>
              <div class="detail-item">
                <span class="label">Payment Method</span>
                <span class="value">${payment.method || "Bank Transfer"}</span>
              </div>
              <div class="detail-item">
                <span class="label">Verification Status</span>
                <div class="badge-verified">
                  ✓ Verified by Admin
                </div>
              </div>
            </div>
            
            <div class="footer">
              Thank you for partnering with SpeedX Industry.<br>
              This is an official receipt confirming payment has been verified by admin.
            </div>
          </div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-sky-600" />
        <p className="text-sm font-medium text-slate-500">Loading payments log...</p>
      </div>
    );
  }

  // Table config
  const tableHeaders = [
    { key: "txId",     label: "Transaction ID" },
    { key: "invoice",  label: "Invoice ID" },
    { key: "amount",   label: "Amount" },
    { key: "method",   label: "Method" },
    { key: "date",     label: "Date" },
    { key: "status",   label: "Status" },
  ];

  const tableData = paymentsList.map((p) => ({
    id: p.id,
    txId:    <span className="font-mono font-semibold text-slate-700">{p.paymentId}</span>,
    invoice: <span className="font-mono text-xs text-slate-500">{p.invoice}</span>,
    amount:  <span className="font-semibold text-slate-900">{p.amount}</span>,
    method:  p.method || "Bank Transfer",
    date:    p.date,
    status: (
      <span className="rounded-full px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
        Paid / Verified
      </span>
    ),
  }));

  const tableButtons = [
    {
      icon: <Download className="h-4 w-4" />,
      text: "Download Receipt",
      className: "bg-sky-600 text-white hover:bg-sky-700 transition-colors",
      onClick: (row: { id: string }) => {
        const p = paymentsList.find((x) => x.id === row.id);
        if (p) downloadReceipt(p);
      },
    },
  ];

  const stats = [
    { icon: CheckCircle2, title: "Completed Invoices", value: paymentsList.length, desc: "Paid and verified invoices" },
    { icon: Banknote,     title: "Total Amount Paid",  value: `$${totalAmountPaid.toLocaleString()}`, desc: "Processed payments", isText: true },
    { icon: Calendar,     title: "Last Payment Date",  value: lastTx?.date ?? "No transactions", desc: "Most recent activity", isText: true },
  ];

  return (
    <div className="space-y-[clamp(1.5rem,3vw,2rem)]">
      {/* HEADER */}
      <PageHeader
        variant="dark"
        label="Transactions"
        title="Transaction History"
        description="View your payments history and download verified receipts."
      />

      {/* STATS */}
      <section className="grid gap-[clamp(1rem,2vw,1.5rem)] sm:grid-cols-3">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} variant="primary" className="relative overflow-hidden p-[clamp(1.25rem,2vw,1.5rem)]">
              <div className="absolute -top-3 -right-3 h-24 w-24 text-white/[0.07] pointer-events-none rotate-12">
                <Icon className="h-full w-full" />
              </div>
              <div className="flex flex-col justify-between h-full">
                <div>
                  <p className="text-[clamp(10px,0.9vw,11px)] font-semibold uppercase tracking-[0.24em] text-slate-300">
                    {stat.title}
                  </p>
                  <div className="mt-4 text-[clamp(1.5rem,2.5vw,1.875rem)] font-semibold text-white">
                    {stat.isText ? stat.value : <CountUpNumber value={stat.value as number} />}
                  </div>
                </div>
                <p className="mt-4 text-[clamp(12px,1.1vw,13px)] text-slate-300">{stat.desc}</p>
              </div>
            </Card>
          );
        })}
      </section>

      {/* TABLE */}
      <Card className="border border-slate-100 p-0 overflow-hidden bg-white">
        <DataTable
          heading="Verified Payments Log"
          TableHeaders={tableHeaders}
          TableData={tableData}
          TableButtons={tableButtons}
          currentPage={1}
          totalPages={1}
          onPageChange={() => {}}
          pageSize={paymentsList.length || 10}
          totalEntries={paymentsList.length}
        />
      </Card>
    </div>
  );
}