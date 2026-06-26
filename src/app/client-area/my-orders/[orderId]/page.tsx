import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { getClientOrderDetailsAction } from "@/actions/client";
import { PageHeader } from "@/components/ui/PageHeader";

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const order = await getClientOrderDetailsAction(orderId);

  if (!order) {
    notFound();
  }

  return (
    <div className="space-y-[clamp(1.5rem,3vw,2rem)]">
      {/* HEADER */}
      <PageHeader
        variant="dark"
        label="Order Details"
        title={`Order #${order.id}`}
        description="Complete product specifications, production summary, and live timeline tracking."
      >
        <Link
          href="/client-area/my-orders"
          className="rounded-lg bg-sky-600 px-5 py-2.5 text-[clamp(13px,1.2vw,14px)] font-semibold text-white transition hover:bg-sky-700 block"
        >
          ← Back to orders
        </Link>
      </PageHeader>


      {/* MAIN GRID */}
      <section className="grid gap-[clamp(1rem,2vw,1.5rem)] xl:grid-cols-[1.4fr_0.6fr]">
        {/* LEFT COLUMN */}
        <div className="space-y-[clamp(1rem,2vw,1.5rem)]">
          {/* Product specifications */}
          <Card className="border border-slate-100 p-[clamp(1.25rem,2vw,1.5rem)] bg-white">
            <p className="text-[clamp(11px,1vw,12px)] font-semibold uppercase tracking-[0.24em] text-sky-600">
              Product specifications
            </p>
            <h2 className="mt-3 text-[clamp(1.25rem,2vw,1.5rem)] font-semibold text-slate-900">
              {order.product}
            </h2>
            <p className="mt-2 text-[clamp(13px,1.1vw,14px)] text-slate-600">
              Premium custom apparel manufacturing specifications. Manufactured to exact brand guidelines.
            </p>

            <div className="mt-[clamp(1rem,1.5vw,1.5rem)] grid gap-[clamp(0.75rem,1vw,1rem)] sm:grid-cols-3">
              {[
              { label: "Quantity", value: `${order.quantity} pcs` },
              { label: "Order Date", value: order.orderDate },
              { label: "Est. Delivery", value: order.estimatedDelivery || "TBD" },
              { label: "Order Total", value: order.amount === 0 ? "⏳ Awaiting Quote" : `$${order.amount.toLocaleString()}` },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-lg bg-sky-50 p-[clamp(0.75rem,1vw,1rem)]">
                  <p className="text-[clamp(10px,0.9vw,11px)] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {label}
                  </p>
                  <p className="mt-1 text-[clamp(14px,1.2vw,16px)] font-semibold text-slate-900">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Production timeline */}
          <Card className="border border-slate-100 p-[clamp(1.25rem,2vw,1.5rem)] bg-white">
            <div className="flex items-center justify-between pb-3 border-b mb-4">
              <h2 className="text-[clamp(15px,1.3vw,17px)] font-semibold text-slate-900">
                Production Timeline
              </h2>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                Current Status: {order.productionStatus}
              </span>
            </div>
            <div className="mt-[clamp(1rem,1.5vw,1.25rem)] space-y-[clamp(0.75rem,1vw,1rem)] relative pl-4 border-l-2 border-slate-200">
              {order.productionTimeline.map((stage, i) => (
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
                    <p className={`text-[clamp(13px,1.2vw,14px)] font-semibold ${
                      stage.completed
                        ? "text-slate-900"
                        : order.productionStatus === stage.label
                        ? "text-sky-600"
                        : "text-slate-500"
                    }`}>
                      {stage.label}
                    </p>
                    <p className="text-[clamp(11px,1vw,12px)] text-slate-400">
                      {stage.completed ? "Step completed successfully" : "Pending action"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-[clamp(1rem,2vw,1.5rem)]">
          {/* Fabric details */}
          <Card className="border border-slate-100 p-[clamp(1rem,1.5vw,1.5rem)] bg-white">
            <h2 className="text-[clamp(15px,1.3vw,17px)] font-semibold text-slate-900">
              Fabric Details
            </h2>
            <p className="mt-[clamp(0.5rem,0.8vw,0.75rem)] text-[clamp(13px,1.1vw,14px)] text-slate-600">
              {order.fabricDetails || "No custom fabric specifications provided."}
            </p>
            <div className="mt-[clamp(0.75rem,1vw,1rem)] space-y-1.5 text-[clamp(13px,1.1vw,14px)] text-slate-600">
              <p>
                <span className="font-medium text-slate-900">Shipping Country:</span>{" "}
                {order.country}
              </p>
              <p>
                <span className="font-medium text-slate-900">Shipping Method:</span>{" "}
                {order.shippingMethod || "Standard Air Freight"}
              </p>
            </div>
          </Card>

          {/* Printing details */}
          <Card className="border border-slate-100 p-[clamp(1rem,1.5vw,1.5rem)] bg-white">
            <h2 className="text-[clamp(15px,1.3vw,17px)] font-semibold text-slate-900">
              Design & Printing Notes
            </h2>
            <p className="mt-[clamp(0.5rem,0.8vw,0.75rem)] text-[clamp(13px,1.1vw,14px)] text-slate-600">
              {order.printingDetails || "No custom design or printing instructions provided."}
            </p>
          </Card>

          {/* Documents */}
          <Card className="border border-slate-100 p-[clamp(1rem,1.5vw,1.5rem)] bg-white">
            <h2 className="text-[clamp(15px,1.3vw,17px)] font-semibold text-slate-900">
              Design Files & Tech Packs
            </h2>
            <div className="mt-[clamp(0.75rem,1vw,1rem)] space-y-2">
              <button
                className="w-full rounded-lg border border-sky-100 bg-sky-50 px-4 py-3 text-left text-[clamp(13px,1.1vw,14px)] text-slate-700 transition hover:bg-sky-100 flex items-center gap-2"
              >
                <span>📄</span>
                <span className="truncate flex-1 font-mono text-xs">
                  {order.techPackFile || "no-tech-pack-attached.pdf"}
                </span>
              </button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}