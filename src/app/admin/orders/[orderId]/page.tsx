import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/PageHeader";
import { getOrderByIdAction } from "@/actions/orders";
import { ShipmentReceiptUpload } from "@/components/admin/ShipmentReceiptUpload";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  DollarSign,
  Truck,
  FileText,
  Calendar,
  Globe,
} from "lucide-react";

function parseTechPackUrls(raw: string): string[] {
  if (!raw || raw === "No file attached") return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
  } catch {}
  if (raw.startsWith("http")) return [raw];
  if (raw.trim()) return [raw]; // filename fallback
  return [];
}

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const result = await getOrderByIdAction(orderId);

  if (!result.ok) notFound();
  const order = result.order;

  const techPackUrls = parseTechPackUrls(order.techPackFile || "");

  const timeline =
    typeof order.productionTimeline === "string"
      ? JSON.parse(order.productionTimeline)
      : Array.isArray(order.productionTimeline)
      ? order.productionTimeline
      : [];

  return (
    <div className="space-y-[clamp(1.5rem,3vw,2rem)]">
      {/* HEADER */}
      <PageHeader
        variant="dark"
        label="Order Management"
        title={`Order #${order.id}`}
        description="Full specification sheet, client contact details, production timeline, and tech pack attachments."
      >
        <Link
          href="/admin/orders"
          className="rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 text-sm font-semibold text-white transition"
        >
          ← Back to Orders
        </Link>
      </PageHeader>

      {/* STATUS STRIP */}
      <div className="flex flex-wrap gap-3">
        {[
          {
            label: "Order Status",
            value: order.status,
            color:
              order.status === "Completed"
                ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                : order.status === "Cancelled"
                ? "bg-rose-50 text-rose-700 border-rose-100"
                : order.status === "Confirmed"
                ? "bg-violet-50 text-violet-700 border-violet-100"
                : order.status === "Awaiting Quote"
                ? "bg-amber-50 text-amber-700 border-amber-100"
                : "bg-sky-50 text-sky-700 border-sky-100",
          },
          {
            label: "Payment",
            value: order.paymentStatus,
            color:
              order.paymentStatus === "Paid"
                ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                : order.paymentStatus === "Failed"
                ? "bg-rose-50 text-rose-700 border-rose-100"
                : "bg-amber-50 text-amber-700 border-amber-100",
          },
          {
            label: "Production Stage",
            value: order.productionStatus || "Order Received",
            color: "bg-indigo-50 text-indigo-700 border-indigo-100",
          },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className={`rounded-full border px-4 py-1.5 text-xs font-bold flex items-center gap-1.5 ${color}`}
          >
            <span className="text-[10px] uppercase tracking-wider opacity-70">{label}:</span>
            {value}
          </div>
        ))}
      </div>

      {/* MAIN GRID */}
      <section className="grid gap-[clamp(1rem,2vw,1.5rem)] xl:grid-cols-[1.4fr_0.6fr]">
        {/* LEFT COLUMN */}
        <div className="space-y-[clamp(1rem,2vw,1.5rem)]">
          {/* Client Information */}
          <Card className="border border-slate-100 p-[clamp(1.25rem,2vw,1.5rem)] bg-white">
            <p className="text-[clamp(11px,1vw,12px)] font-semibold uppercase tracking-[0.24em] text-sky-600">
              Client Information
            </p>
            <h2 className="mt-2 text-[clamp(1.1rem,1.8vw,1.35rem)] font-bold text-slate-900">
              {order.clientName}
            </h2>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { icon: Mail, label: "Billing Email", value: order.billingEmail || "—" },
                { icon: Phone, label: "Phone", value: order.clientPhone || "—" },
                { icon: MapPin, label: "Shipping Address", value: order.address || "—" },
                { icon: Globe, label: "Country", value: order.country },
                { icon: Truck, label: "Shipping Method", value: order.shippingMethod || "Standard Air Freight" },
                { icon: DollarSign, label: "Payment Method", value: order.paymentMethod || "Bank Transfer" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-lg bg-slate-50 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Icon className="h-3 w-3" /> {label}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-800 break-words">{value}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Product Specifications */}
          <Card className="border border-slate-100 p-[clamp(1.25rem,2vw,1.5rem)] bg-white">
            <p className="text-[clamp(11px,1vw,12px)] font-semibold uppercase tracking-[0.24em] text-sky-600">
              Product Specifications
            </p>
            <h2 className="mt-2 text-[clamp(1.1rem,1.8vw,1.35rem)] font-bold text-slate-900">
              {order.product}
            </h2>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Quantity", value: `${order.quantity.toLocaleString()} pcs` },
                { label: "Order Date", value: order.orderDate },
                { label: "Est. Delivery", value: order.estimatedDelivery || "TBD" },
                { label: "Total Value", value: order.amount === 0 ? "⏳ Awaiting Quote" : `$${order.amount.toLocaleString()}` },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-lg bg-sky-50 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">{label}</p>
                  <p className="mt-1 text-sm font-bold text-slate-900">{value}</p>
                </div>
              ))}
            </div>

            {/* Fabric */}
            <div className="mt-4 rounded-lg border border-slate-100 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Fabric Details</p>
              <p className="text-sm text-slate-700 leading-relaxed">{order.fabricDetails || "No specifications provided."}</p>
            </div>

            {/* Printing */}
            <div className="mt-3 rounded-lg border border-slate-100 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Printing & Embroidery</p>
              <p className="text-sm text-slate-700 leading-relaxed">{order.printingDetails || "No specifications provided."}</p>
            </div>
          </Card>

          {/* Production Timeline */}
          <Card className="border border-slate-100 p-[clamp(1.25rem,2vw,1.5rem)] bg-white">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h2 className="text-[clamp(15px,1.3vw,17px)] font-semibold text-slate-900">
                Production Timeline
              </h2>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                Stage: {order.productionStatus || "Order Received"}
              </span>
            </div>
            {timeline.length === 0 ? (
              <p className="text-sm text-slate-400">No timeline stages configured.</p>
            ) : (
              <div className="space-y-[clamp(0.75rem,1vw,1rem)] relative pl-4 border-l-2 border-slate-200">
                {timeline.map((stage: any, i: number) => (
                  <div key={i} className="flex items-start gap-3 relative">
                    <span
                      className={`absolute -left-[21px] top-1.5 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-white ${
                        stage.completed
                          ? "bg-emerald-500"
                          : order.productionStatus === stage.label
                          ? "bg-sky-500 animate-pulse"
                          : "bg-slate-300"
                      }`}
                    />
                    <div>
                      <p
                        className={`text-sm font-semibold ${
                          stage.completed
                            ? "text-slate-900"
                            : order.productionStatus === stage.label
                            ? "text-sky-600"
                            : "text-slate-400"
                        }`}
                      >
                        {stage.label}
                      </p>
                      <p className="text-xs text-slate-400">
                        {stage.completed ? "Completed" : "Pending"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <Link
                href="/admin/production"
                className="text-xs font-semibold text-sky-600 hover:text-sky-700 transition"
              >
                → Update production stages in Manufacturing Queue
              </Link>
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-[clamp(1rem,2vw,1.5rem)]">
          {/* Tech Pack Files */}
          <Card className="border border-slate-100 p-[clamp(1rem,1.5vw,1.5rem)] bg-white">
            <h2 className="text-[clamp(15px,1.3vw,17px)] font-semibold text-slate-900">
              Tech Pack / Design Files
            </h2>
            <div className="mt-3 space-y-2">
              {techPackUrls.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 py-8 text-center">
                  <FileText className="mb-2 h-8 w-8 text-slate-300" />
                  <p className="text-xs text-slate-400">No files attached</p>
                </div>
              ) : (
                techPackUrls.map((url, idx) => {
                  const isPdf =
                    url.toLowerCase().includes(".pdf") || url.includes("/raw/upload/");
                  return isPdf ? (
                    <a
                      key={idx}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs font-medium text-sky-600 hover:bg-sky-50 transition"
                    >
                      <FileText className="h-4 w-4 shrink-0 text-red-500" />
                      <span className="truncate">PDF File {idx + 1}</span>
                    </a>
                  ) : (
                    <a key={idx} href={url} target="_blank" rel="noopener noreferrer">
                      <img
                        src={url}
                        alt={`Attachment ${idx + 1}`}
                        className="w-full rounded-lg border border-slate-200 object-contain transition hover:opacity-90"
                        style={{ maxHeight: "200px" }}
                      />
                    </a>
                  );
                })
              )}
            </div>
          </Card>

          {/* Shipment Receipt Upload */}
          <ShipmentReceiptUpload
            orderId={order.id}
            initialReceiptUrl={order.shipmentReceipt}
          />

          {/* Financial Summary */}
          <Card className="border border-slate-100 p-[clamp(1rem,1.5vw,1.5rem)] bg-white">
            <h2 className="text-[clamp(15px,1.3vw,17px)] font-semibold text-slate-900">
              Financial Summary
            </h2>
            <div className="mt-4 space-y-3">
              {[
                { label: "Order Value", value: order.amount === 0 ? "⏳ Awaiting Quote" : `$${order.amount.toLocaleString()}` },
                { label: "Payment Status", value: order.paymentStatus },
                { label: "Payment Method", value: order.paymentMethod || "Bank Transfer" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between border-b border-slate-100 pb-2 last:border-0">
                  <span className="text-xs text-slate-500 font-medium">{label}</span>
                  <span className="text-sm font-bold text-slate-900">{value}</span>
                </div>
              ))}
            </div>
            <Link
              href="/admin/invoices"
              className="mt-4 block w-full rounded-lg bg-sky-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-sky-700"
            >
              View Related Invoices →
            </Link>
          </Card>

          {/* Quick Actions */}
          <Card className="border border-slate-100 p-[clamp(1rem,1.5vw,1.5rem)] bg-white">
            <h2 className="text-[clamp(15px,1.3vw,17px)] font-semibold text-slate-900 mb-3">
              Quick Actions
            </h2>
            <div className="space-y-2">
              <Link
                href="/admin/production"
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition w-full"
              >
                <Calendar className="h-4 w-4 text-amber-500" />
                Update Production Timeline
              </Link>
              <Link
                href="/admin/orders"
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition w-full"
              >
                <Package className="h-4 w-4 text-sky-500" />
                Back to Order Book
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
