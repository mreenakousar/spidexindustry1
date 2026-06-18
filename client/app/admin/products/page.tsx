"use client";

import { useMemo, useState } from "react";
import { Search, Tag, Truck, Star, X } from "lucide-react";
import CountUpNumber from "../../../src/components/ui/CountUpNumber";

interface Product {
  id: string;
  name: string;
  category: string;
  moq: number;
  priceRange: string;
  status: "Active" | "Pending" | "Low Stock";
  colors: string[];
  materials: string;
  leadTime: string;
  image: string;
}

const productData: Product[] = [
  {
    id: "PRD-210",
    name: "Performance Hoodie",
    category: "Sportswear",
    moq: 250,
    priceRange: "$18-22",
    status: "Active",
    colors: ["Charcoal", "Navy", "Red"],
    materials: "320gsm French terry",
    leadTime: "4-6 weeks",
    image: "",
  },
  {
    id: "PRD-211",
    name: "Team Training Jacket",
    category: "Uniforms",
    moq: 200,
    priceRange: "$32-38",
    status: "Active",
    colors: ["Black", "Navy"],
    materials: "Softshell with mesh lining",
    leadTime: "5-7 weeks",
    image: "",
  },
  {
    id: "PRD-212",
    name: "Executive Polo Shirt",
    category: "Corporate",
    moq: 120,
    priceRange: "$14-18",
    status: "Pending",
    colors: ["White", "Sky Blue"],
    materials: "210gsm pique cotton",
    leadTime: "3-5 weeks",
    image: "",
  },
  {
    id: "PRD-213",
    name: "Safety Work Vest",
    category: "Safety",
    moq: 180,
    priceRange: "$12-16",
    status: "Low Stock",
    colors: ["Hi-Vis Yellow"],
    materials: "Reflective mesh",
    leadTime: "4-6 weeks",
    image: "",
  },
];

function badgeClass(status: Product["status"]) {
  switch (status) {
    case "Active":
      return "bg-emerald-100 text-emerald-700";
    case "Pending":
      return "bg-sky-100 text-sky-700";
    default:
      return "bg-amber-100 text-amber-700";
  }
}

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<"All" | string>("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    return productData.filter((product) => {
      const query = search.toLowerCase();
      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);
      const matchesCategory =
        category === "All" || product.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Product Catalog
          </p>
          <p className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl">
            <CountUpNumber value={productData.length} />
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Categories
          </p>
          <p className="mt-4 text-3xl font-semibold text-sky-600 sm:text-4xl"><CountUpNumber value="5" /></p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Low Stock
          </p>
          <p className="mt-4 text-3xl font-semibold text-amber-600 sm:text-4xl"><CountUpNumber value="1" /></p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
              Products
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Browse product SKUs, MOQ details, pricing and production
              readiness.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products"
                className="w-full min-w-0 rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 sm:min-w-[220px]"
              />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              aria-label="Filter by product category"
            >
              <option>All</option>
              {[...new Set(productData.map((product) => product.category))].map(
                (categoryItem) => (
                  <option key={categoryItem} value={categoryItem}>
                    {categoryItem}
                  </option>
                ),
              )}
            </select>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <button
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="group rounded-3xl border border-slate-200 bg-slate-50 p-5 text-left transition hover:border-sky-300 dark:border-slate-700 dark:bg-slate-950"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {product.category}
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
                    {product.name}
                  </h2>
                </div>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeClass(product.status)}`}
                >
                  {product.status}
                </span>
              </div>
              <div className="mt-5 text-sm text-slate-600 dark:text-slate-300">
                <p>MOQ: {product.moq}</p>
                <p className="mt-2">Pricing: {product.priceRange}</p>
                <p className="mt-2">Lead time: {product.leadTime}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Product Grid
          </h2>
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 dark:bg-slate-950 dark:text-slate-200">
            <Tag className="h-4 w-4" /> {filteredProducts.length} items
          </span>
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-700">
            <thead className="bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-200">
              <tr>
                <th className="px-5 py-4 text-left">Product</th>
                <th className="px-5 py-4 text-left">MOQ</th>
                <th className="px-5 py-4 text-left">Price Range</th>
                <th className="px-5 py-4 text-left">Material</th>
                <th className="px-5 py-4 text-left">Colors</th>
                <th className="px-5 py-4 text-left">Lead Time</th>
                <th className="px-5 py-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <td className="px-5 py-4 text-slate-900 dark:text-white">
                    {product.name}
                  </td>
                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                    {product.moq}
                  </td>
                  <td className="px-5 py-4 text-slate-900 dark:text-white">
                    {product.priceRange}
                  </td>
                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                    {product.materials}
                  </td>
                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                    {product.colors.join(", ")}
                  </td>
                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                    {product.leadTime}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeClass(product.status)}`}
                    >
                      {product.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedProduct && (
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-700 dark:bg-slate-950">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Product details
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Detailed specifications for {selectedProduct.name}.
              </p>
            </div>
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close product details"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Category
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                {selectedProduct.category}
              </p>
            </div>
            <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">MOQ</p>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                {selectedProduct.moq}
              </p>
            </div>
            <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Price Range
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                {selectedProduct.priceRange}
              </p>
            </div>
            <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Lead Time
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                {selectedProduct.leadTime}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
