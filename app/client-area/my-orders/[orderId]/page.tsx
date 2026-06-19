

import Link from "next/link";
import { orders, productionStages } from "../../../../data/clientPortal";

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const order = orders.find((item) => String(item.id) === orderId) ?? orders[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sky-50 px-4 py-8 sm:py-10 md:px-10">
      {/* HEADER */}
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">
                Order details
              </p>
              <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
                Order #{order.id}
              </h1>
              <p className="mt-2 text-slate-600">
                Complete product specifications, production summary, and live
                timeline tracking.
              </p>
            </div>

            <Link
              href="/client-area/my-orders"
              className="rounded-2xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
            >
              Back to orders
            </Link>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          {/* LEFT SIDE */}
          <div className="space-y-6">
            {/* PRODUCT INFO */}
            <div className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">
                Product specifications
              </p>

              <h2 className="mt-3 text-2xl font-bold text-slate-900">
                {order.product}
              </h2>

              <p className="mt-3 text-slate-600">
                High-performance fabric engineered for durability, comfort, and
                premium custom branding output.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-sky-50 p-4">
                  <p className="text-xs text-slate-500">Quantity</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">
                    {order.quantity} pcs
                  </p>
                </div>

                <div className="rounded-2xl bg-sky-50 p-4">
                  <p className="text-xs text-slate-500">Order Date</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">
                    {order.date}
                  </p>
                </div>

                <div className="rounded-2xl bg-sky-50 p-4">
                  <p className="text-xs text-slate-500">ETA</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">
                    {order.eta ?? "Pending"}
                  </p>
                </div>
              </div>
            </div>

            {/* TIMELINE */}
            <div className="rounded-3xl border border-sky-100 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">
                Production Timeline
              </h2>

              <div className="mt-6 space-y-5">
                {productionStages.map((stage) => (
                  <div key={stage.title} className="flex gap-4">
                    <div
                      className={`mt-1 h-3 w-3 rounded-full ${
                        stage.completed
                          ? "bg-emerald-500"
                          : stage.active
                          ? "bg-sky-500"
                          : "bg-slate-300"
                      }`}
                    />
                    <div>
                      <p className="font-semibold text-slate-900">
                        {stage.title}
                      </p>
                      <p className="text-sm text-slate-500">{stage.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            {/* FABRIC */}
            <div className="rounded-3xl border border-sky-100 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-lg font-bold text-slate-900">
                Fabric Details
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                Imported performance knit with moisture-wicking finish,
                anti-pilling treatment, and reinforced stitching for long-term
                use.
              </p>

              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <p>
                  <span className="font-medium text-slate-900">Supplier:</span>{" "}
                  BlueWave Fabrics
                </p>
                <p>
                  <span className="font-medium text-slate-900">Color:</span>{" "}
                  Navy / White
                </p>
              </div>
            </div>

            {/* PRINT */}
            <div className="rounded-3xl border border-sky-100 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-lg font-bold text-slate-900">
                Printing Details
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                High-definition screen printing on front panel with premium
                embroidery finishing on sleeves.
              </p>

              <p className="mt-3 text-sm text-slate-600">
                Eco-friendly ink used for soft touch and long-lasting color
                durability.
              </p>
            </div>

            {/* DOCUMENTS */}
            <div className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">
                Documents
              </h2>

              <div className="mt-4 space-y-3">
                <button className="w-full rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-sky-100">
                  📄 Design pack: hoodie-artwork.pdf
                </button>

                <button className="w-full rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-sky-100">
                  📐 Size chart: measurement-specs.pdf
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}