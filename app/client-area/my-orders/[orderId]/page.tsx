import Link from "next/link";
import { Card } from "../../../../components/ui/card";
import { orders, productionStages } from "../../../../data/clientPortal";

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const order = orders.find((item) => String(item.id) === orderId) ?? orders[0];

  const headerAction = (
    <Link
      href="/client-area/my-orders"
      className="text-sm font-semibold text-sky-600 hover:text-sky-700"
    >
      ← Back to orders
    </Link>
  );

  return (
    <div className="space-y-[clamp(1.5rem,3vw,2rem)]">

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <Card className="p-[clamp(1.25rem,2.5vw,2rem)] rounded-none bg-slate-900 border border-slate-800 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[clamp(11px,1vw,12px)] font-semibold uppercase tracking-[0.24em] text-sky-600">
              Order Details
            </p>
            <h1 className="mt-3 text-[clamp(1.5rem,2.5vw,1.875rem)] font-semibold text-white">
              Order #{order.id}
            </h1>
            <p className="mt-2 text-[clamp(13px,1.1vw,14px)] text-slate-300">
              Complete product specifications, production summary, and live timeline tracking.
            </p>
          </div>
          <Link
            href="/client-area/my-orders"
            className="self-start rounded-lg bg-sky-600 px-5 py-2.5 text-[clamp(13px,1.2vw,14px)] font-semibold text-white transition hover:bg-sky-700 lg:self-auto"
          >
            ← Back to orders
          </Link>
        </div>
      </Card>

      {/* ── MAIN GRID ──────────────────────────────────────────────────────── */}
      <section className="grid gap-[clamp(1rem,2vw,1.5rem)] xl:grid-cols-[1.4fr_0.6fr]">

        {/* LEFT COLUMN */}
        <div className="space-y-[clamp(1rem,2vw,1.5rem)]">

          {/* Product specifications */}
          <Card className="border border-slate-100 p-[clamp(1.25rem,2vw,1.5rem)]">
            <p className="text-[clamp(11px,1vw,12px)] font-semibold uppercase tracking-[0.24em] text-sky-600">
              Product specifications
            </p>
            <h2 className="mt-3 text-[clamp(1.25rem,2vw,1.5rem)] font-semibold text-slate-900">
              {order.product}
            </h2>
            <p className="mt-2 text-[clamp(13px,1.1vw,14px)] text-slate-600">
              High-performance fabric engineered for durability, comfort, and premium custom branding output.
            </p>

            <div className="mt-[clamp(1rem,1.5vw,1.5rem)] grid gap-[clamp(0.75rem,1vw,1rem)] sm:grid-cols-3">
              {[
                { label: "Quantity", value: `${order.quantity} pcs` },
                { label: "Order Date", value: order.date },
                { label: "ETA", value: order.eta ?? "Pending" },
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
          <Card className="border border-slate-100 p-[clamp(1.25rem,2vw,1.5rem)]">
            <h2 className="text-[clamp(15px,1.3vw,17px)] font-semibold text-slate-900">
              Production Timeline
            </h2>
            <div className="mt-[clamp(1rem,1.5vw,1.25rem)] space-y-[clamp(0.75rem,1vw,1rem)]">
              {productionStages.map((stage) => (
                <div key={stage.title} className="flex items-start gap-3">
                  <span
                    className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${
                      stage.completed
                        ? "bg-emerald-500"
                        : stage.active
                        ? "bg-sky-500"
                        : "bg-slate-300"
                    }`}
                  />
                  <div>
                    <p className="text-[clamp(13px,1.2vw,14px)] font-semibold text-slate-900">
                      {stage.title}
                    </p>
                    <p className="text-[clamp(11px,1vw,12px)] text-slate-500">{stage.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-[clamp(1rem,2vw,1.5rem)]">

          {/* Fabric details */}
          <Card className="border border-slate-100 p-[clamp(1rem,1.5vw,1.5rem)]">
            <h2 className="text-[clamp(15px,1.3vw,17px)] font-semibold text-slate-900">
              Fabric Details
            </h2>
            <p className="mt-[clamp(0.5rem,0.8vw,0.75rem)] text-[clamp(13px,1.1vw,14px)] text-slate-600">
              Imported performance knit with moisture-wicking finish, anti-pilling treatment,
              and reinforced stitching for long-term use.
            </p>
            <div className="mt-[clamp(0.75rem,1vw,1rem)] space-y-1.5 text-[clamp(13px,1.1vw,14px)] text-slate-600">
              <p>
                <span className="font-medium text-slate-900">Supplier:</span>{" "}
                BlueWave Fabrics
              </p>
              <p>
                <span className="font-medium text-slate-900">Color:</span>{" "}
                Navy / White
              </p>
            </div>
          </Card>

          {/* Printing details */}
          <Card className="border border-slate-100 p-[clamp(1rem,1.5vw,1.5rem)]">
            <h2 className="text-[clamp(15px,1.3vw,17px)] font-semibold text-slate-900">
              Printing Details
            </h2>
            <p className="mt-[clamp(0.5rem,0.8vw,0.75rem)] text-[clamp(13px,1.1vw,14px)] text-slate-600">
              High-definition screen printing on front panel with premium embroidery finishing on sleeves.
            </p>
            <p className="mt-[clamp(0.5rem,0.8vw,0.75rem)] text-[clamp(13px,1.1vw,14px)] text-slate-600">
              Eco-friendly ink used for soft touch and long-lasting colour durability.
            </p>
          </Card>

          {/* Documents */}
          <Card className="border border-slate-100 p-[clamp(1rem,1.5vw,1.5rem)]">
            <h2 className="text-[clamp(15px,1.3vw,17px)] font-semibold text-slate-900">
              Documents
            </h2>
            <div className="mt-[clamp(0.75rem,1vw,1rem)] space-y-2">
              {[
                { icon: "📄", label: "Design pack: hoodie-artwork.pdf" },
                { icon: "📐", label: "Size chart: measurement-specs.pdf" },
              ].map(({ icon, label }) => (
                <button
                  key={label}
                  className="w-full rounded-lg border border-sky-100 bg-sky-50 px-4 py-3 text-left text-[clamp(13px,1.1vw,14px)] text-slate-700 transition hover:bg-sky-100"
                >
                  {icon} {label}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}