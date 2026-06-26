"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getClientProductsAction } from "@/actions/client";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/PageHeader";
import { Package, RefreshCw } from "lucide-react";

export default function ProductLibraryPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getClientProductsAction().then((res) => {
      setProducts(res);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-sky-600" />
        <p className="text-sm font-medium text-slate-500">Loading product library...</p>
      </div>
    );
  }

  return (
    <div className="space-y-[clamp(1.5rem,3vw,2rem)]">
      {/* HEADER */}
      <PageHeader
        variant="dark"
        label="Product Library"
        title="Saved Product Specifications"
        description="Review previously manufactured products and reorder with the same specifications."
      />

      {products.length === 0 ? (
        <Card className="p-12 text-center bg-white border border-slate-100">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-sky-50 p-5">
              <Package className="h-10 w-10 text-sky-500" />
            </div>
          </div>
          <p className="font-semibold text-slate-700">Your product library is empty.</p>
          <p className="mt-1 text-sm text-slate-400">
            Submit orders to save products in your catalog.
          </p>
          <Link
            href="/client-area/my-orders"
            className="mt-4 inline-block rounded-xl bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-sky-700 transition"
          >
            Submit an Order
          </Link>
        </Card>
      ) : (
        <div className="grid gap-[clamp(1rem,2vw,1.5rem)] sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <Card
              key={product.id}
              className="border border-slate-100 bg-white p-0 overflow-hidden flex flex-col"
            >
              {/* Product image */}
              <div className="h-44 w-full overflow-hidden bg-slate-100 relative">
                <img
                  src={product.image || "/receptPlaceholder.png"}
                  alt={product.name}
                  className="h-full w-full object-cover transition hover:scale-105 duration-300"
                />
                <span className="absolute top-3 right-3 bg-slate-950/70 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                  {product.status || "Saved"}
                </span>
              </div>

              {/* Info */}
              <div className="flex flex-col flex-1 p-[clamp(1rem,2vw,1.25rem)]">
                <p className="text-[clamp(9px,0.9vw,11px)] font-semibold uppercase tracking-[0.24em] text-sky-500">
                  Product Specs
                </p>
                <h2 className="mt-2 text-[clamp(1rem,1.8vw,1.2rem)] font-bold text-slate-900">
                  {product.name}
                </h2>
                <p className="mt-2 text-[clamp(12px,1.1vw,13px)] text-slate-500 line-clamp-3 flex-1">
                  {product.description}
                </p>

                <Link
                  href={`/client-area/my-orders?reorder=${encodeURIComponent(product.name)}`}
                  className="mt-4 flex items-center justify-center gap-2 w-full rounded-xl bg-slate-900 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-slate-700 transition"
                >
                  <RefreshCw className="h-4 w-4" />
                  Reorder Product
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
