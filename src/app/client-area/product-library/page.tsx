"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getClientProductsAction } from "@/actions/client";
import { Card } from "@/components/ui/card";

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
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-sky-600"></div>
        <p className="text-sm font-medium text-slate-500">Loading product library...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">
          Product Library
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">
          Saved product specifications
        </h1>
        <p className="mt-2 text-slate-600">
          Review previously manufactured products and reorder with the same specifications.
        </p>
      </div>

      {products.length === 0 ? (
        <Card className="p-8 text-center bg-white border border-slate-200">
          <p className="text-slate-500 font-medium">Your product library is empty.</p>
          <p className="text-slate-400 text-xs mt-1">Submit orders to save products in your catalog.</p>
          <Link
            href="/client-area/my-orders"
            className="mt-4 inline-block rounded-xl bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-sky-700 transition"
          >
            Submit an Order
          </Link>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="h-44 w-full overflow-hidden rounded-3xl bg-slate-100 relative">
                  <img
                    src={product.image || "/receptPlaceholder.png"}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute top-3 right-3 bg-slate-950/70 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                    {product.status || "Saved"}
                  </span>
                </div>
                <div className="mt-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500 font-semibold">
                    Product Specs
                  </p>
                  <h2 className="mt-2 text-xl font-bold text-slate-900">
                    {product.name}
                  </h2>
                  <p className="mt-2 text-sm text-slate-600 line-clamp-3">
                    {product.description}
                  </p>
                </div>
              </div>
              <Link
                href={`/client-area/my-orders?reorder=${encodeURIComponent(product.name)}`}
                className="mt-6 block w-full rounded-2xl bg-slate-950 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-slate-800 transition"
              >
                Reorder product
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
