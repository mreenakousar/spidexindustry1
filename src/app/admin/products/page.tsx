"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Tag,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  X,
  FileText,
  Package
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { PageHeader } from "@/components/ui/PageHeader";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/Button";
import {
  getProductLibraryAction,
  createProductAction,
  updateProductAction,
  deleteProductAction
} from "@/actions/products";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Modal states
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [creatingProduct, setCreatingProduct] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form fields
  const [formFields, setFormFields] = useState({
    productId: "",
    name: "",
    description: "",
    image: "/products/jersey.jpg",
    status: "Active",
    clientEmail: "",
  });

  const fetchProducts = async () => {
    try {
      const res = await getProductLibraryAction();
      setProducts(res);
    } catch (err) {
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenEdit = (prod: any) => {
    setFormFields({
      productId: prod.productId || "",
      name: prod.name || "",
      description: prod.description || "",
      image: prod.image || "/products/jersey.jpg",
      status: prod.status || "Active",
      clientEmail: prod.clientEmail || "",
    });
    setEditingProduct(prod);
  };

  const handleOpenCreate = () => {
    setFormFields({
      productId: `PRD-${Math.floor(100 + Math.random() * 900)}`,
      name: "",
      description: "",
      image: "/products/jersey.jpg",
      status: "Active",
      clientEmail: "",
    });
    setCreatingProduct(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingProduct) {
        const res = await updateProductAction(editingProduct.productId, {
          name: formFields.name,
          description: formFields.description,
          image: formFields.image,
          status: formFields.status,
          clientEmail: formFields.clientEmail || undefined,
        });
        if (res.ok) {
          setEditingProduct(null);
          fetchProducts();
        } else {
          alert(`Error: ${res.error}`);
        }
      } else {
        const res = await createProductAction({
          productId: formFields.productId,
          name: formFields.name,
          description: formFields.description,
          image: formFields.image,
          status: formFields.status,
          clientEmail: formFields.clientEmail || undefined,
        });
        if (res.ok) {
          setCreatingProduct(false);
          fetchProducts();
        } else {
          alert(`Error: ${res.error}`);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (prodId: string) => {
    if (!confirm(`Are you sure you want to delete product SKU ${prodId}?`)) return;
    try {
      const res = await deleteProductAction(prodId);
      if (res.ok) {
        fetchProducts();
      } else {
        alert(`Error: ${res.error}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Stats calculation
  const stats = useMemo(() => {
    const total = products.length;
    const active = products.filter((p) => p.status === "Active").length;
    const pending = products.filter((p) => p.status === "Pending" || p.status === "Saved").length;
    const lowStock = products.filter((p) => p.status === "Low Stock").length;

    return { total, active, pending, lowStock };
  }, [products]);

  // Filters
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.productId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === "All" || p.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [products, searchQuery, statusFilter]);

  // Table structure
  const tableHeaders = [
    { key: "productId", label: "SKU ID" },
    { key: "name", label: "Product Name" },
    { key: "description", label: "Description" },
    { key: "clientEmail", label: "Client Scope" },
    { key: "status", label: "Status" },
  ];

  const tableData = filteredProducts.map((p) => ({
    id: p.id,
    productId: <span className="font-mono font-semibold text-slate-700">{p.productId}</span>,
    name: <span className="font-semibold text-slate-800">{p.name}</span>,
    description: <span className="text-xs text-slate-500 line-clamp-1 max-w-[200px]">{p.description}</span>,
    clientEmail: <span className="text-xs text-sky-600 font-medium">{p.clientEmail || "Global Catalog"}</span>,
    status: (
      <span
        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
          p.status === "Active"
            ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
            : p.status === "Low Stock"
            ? "bg-rose-50 text-rose-700 border border-rose-100 animate-pulse"
            : "bg-amber-50 text-amber-700 border border-amber-100"
        }`}
      >
        {p.status}
      </span>
    ),
  }));

  const tableButtons = [
    {
      icon: <Eye className="h-3.5 w-3.5" />,
      text: "View",
      className: "bg-slate-950 text-white hover:bg-slate-800 transition-colors",
      onClick: (row: { id: string }) => {
        const found = products.find((p) => p.id === row.id);
        if (found) setSelectedProduct(found);
      },
    },
    {
      icon: <Edit className="h-3.5 w-3.5" />,
      text: "Edit",
      className: "bg-sky-600 text-white hover:bg-sky-700 transition-colors",
      onClick: (row: { id: string }) => {
        const found = products.find((p) => p.id === row.id);
        if (found) handleOpenEdit(found);
      },
    },
    {
      icon: <Trash2 className="h-3.5 w-3.5" />,
      text: "Delete",
      className: "bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors",
      onClick: (row: { id: string }) => {
        const found = products.find((p) => p.id === row.id);
        if (found) handleDelete(found.productId);
      },
    },
  ];

  const headerActions = (
    <div className="flex flex-wrap items-center gap-3">
      <input
        type="text"
        placeholder="Search SKU name, ID..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-800 outline-none focus:border-sky-500 bg-white"
      />
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-800 outline-none focus:border-sky-500"
      >
        <option value="All">All Statuses</option>
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Low Stock">Low Stock</option>
        <option value="Saved">Saved</option>
      </select>
    </div>
  );

  if (loading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-sky-600" />
        <p className="text-sm font-medium text-slate-500">Loading product catalog...</p>
      </div>
    );
  }

  return (
    <div className="space-y-[clamp(1.5rem,3vw,2rem)]">
      {/* HEADER */}
      <PageHeader
        variant="dark"
        label="Catalog Inventory"
        title="Product Library & SKUs"
        description="Configure available apparel items, design specifications, and scope catalog items to clients."
      >
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-1.5 rounded-xl bg-white text-slate-900 px-4 py-2.5 text-sm font-semibold hover:bg-slate-100 transition shadow"
        >
          <Plus className="h-4 w-4" /> New Product SKU
        </button>
      </PageHeader>

      {/* STATS */}
      <section className="grid gap-[clamp(1rem,2vw,1.5rem)] sm:grid-cols-4">
        <Card variant="primary" className="p-5 flex flex-col justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-300">Total Items</p>
          <p className="text-2xl font-bold mt-2 text-white">{stats.total} SKUs</p>
        </Card>
        <Card variant="primary" className="p-5 flex flex-col justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-300">Active Catalog</p>
          <p className="text-2xl font-bold mt-2 text-white">{stats.active} Active</p>
        </Card>
        <Card variant="primary" className="p-5 flex flex-col justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-300">Pending Review</p>
          <p className="text-2xl font-bold mt-2 text-white">{stats.pending} Drafts</p>
        </Card>
        <Card variant="primary" className="p-5 flex flex-col justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-300">Low stock</p>
          <p className="text-2xl font-bold mt-2 text-white">{stats.lowStock} Items</p>
        </Card>
      </section>

      {/* TABLE */}
      <Card className="border border-slate-100 p-0 overflow-hidden bg-white">
        <DataTable
          heading="Product Specifications Catalog"
          TableHeaders={tableHeaders}
          TableData={tableData}
          TableButtons={tableButtons}
          currentPage={1}
          totalPages={1}
          onPageChange={() => {}}
          pageSize={filteredProducts.length || 10}
          totalEntries={filteredProducts.length}
          headerActions={headerActions}
        />
      </Card>

      {/* VIEW MODAL */}
      <Modal
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        showHeader={false}
        className="w-full max-w-lg overflow-hidden bg-white"
      >
        {selectedProduct && (
          <>
            <div className="flex items-center justify-between bg-slate-900 p-4">
              <span className="font-semibold text-white text-sm">Specification Sheet: {selectedProduct.productId}</span>
              <button onClick={() => setSelectedProduct(null)} className="text-white/80 hover:text-white transition">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[85vh] overflow-y-auto">
              <div className="h-48 w-full bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex items-center justify-center p-2">
                <img
                  src={selectedProduct.image || "/products/jersey.jpg"}
                  alt={selectedProduct.name}
                  className="max-h-full w-auto object-contain rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 rounded-xl bg-slate-50 border border-slate-100 p-4 text-xs">
                {[
                  { label: "SKU ID Reference", value: selectedProduct.productId },
                  { label: "Product Name", value: selectedProduct.name },
                  { label: "Client Scope Constraint", value: selectedProduct.clientEmail || "Global / Shared Catalog" },
                  { label: "Item Status", value: selectedProduct.status },
                ].map(({ label, value }) => (
                  <div key={label} className="col-span-2 sm:col-span-1 border-b border-slate-100 pb-1.5">
                    <span className="text-slate-400 block font-medium mb-0.5">{label}</span>
                    <span className="font-semibold text-slate-800 text-sm">{value}</span>
                  </div>
                ))}
              </div>

              <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50">
                <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider mb-2">Detailed Specifications</h4>
                <p className="text-sm text-slate-700 leading-relaxed">{selectedProduct.description || "No specifications supplied."}</p>
              </div>

              <div className="flex justify-end pt-2">
                <Button variant="outline" onClick={() => setSelectedProduct(null)}>
                  Close
                </Button>
              </div>
            </div>
          </>
        )}
      </Modal>

      {/* CREATE / EDIT MODAL */}
      <Modal
        isOpen={creatingProduct || editingProduct !== null}
        onClose={() => {
          setCreatingProduct(false);
          setEditingProduct(null);
        }}
        showHeader={false}
        className="w-full max-w-lg overflow-hidden bg-white"
      >
        <div className="flex items-center justify-between bg-sky-600 p-4">
          <span className="font-semibold text-white text-sm">
            {editingProduct ? `Edit Product SKU: ${editingProduct.productId}` : "Create Catalog Product SKU"}
          </span>
          <button
            onClick={() => {
              setCreatingProduct(false);
              setEditingProduct(null);
            }}
            className="text-white/80 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSaveProduct} className="p-6 space-y-4 max-h-[85vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1 flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">SKU Product ID</label>
              <input
                type="text"
                required
                disabled={!!editingProduct}
                value={formFields.productId}
                onChange={(e) => setFormFields({ ...formFields, productId: e.target.value })}
                className="rounded-xl border border-slate-200 p-2.5 text-sm bg-slate-50 outline-none focus:border-sky-500 text-slate-800 disabled:opacity-60"
              />
            </div>

            <div className="col-span-2 sm:col-span-1 flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider font-semibold">Status</label>
              <select
                value={formFields.status}
                onChange={(e) => setFormFields({ ...formFields, status: e.target.value })}
                className="rounded-xl border border-slate-200 p-2.5 text-sm bg-slate-50 outline-none focus:border-sky-500 text-slate-800"
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Saved">Saved</option>
              </select>
            </div>

            <div className="col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Product Name</label>
              <input
                type="text"
                required
                value={formFields.name}
                onChange={(e) => setFormFields({ ...formFields, name: e.target.value })}
                className="rounded-xl border border-slate-200 p-2.5 text-sm bg-slate-50 outline-none focus:border-sky-500 text-slate-800"
              />
            </div>

            <div className="col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Client Email Scope (Optional)</label>
              <input
                type="email"
                placeholder="e.g. buyer@arcadia.com (leave blank for global shared item)"
                value={formFields.clientEmail}
                onChange={(e) => setFormFields({ ...formFields, clientEmail: e.target.value })}
                className="rounded-xl border border-slate-200 p-2.5 text-sm bg-slate-50 outline-none focus:border-sky-500 text-slate-800"
              />
            </div>

            <div className="col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider font-semibold">Image URL</label>
              <input
                type="text"
                required
                value={formFields.image}
                onChange={(e) => setFormFields({ ...formFields, image: e.target.value })}
                className="rounded-xl border border-slate-200 p-2.5 text-sm bg-slate-50 outline-none focus:border-sky-500 text-slate-800"
              />
            </div>

            <div className="col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider font-semibold">Technical Specifications & Material Descriptions</label>
              <textarea
                rows={4}
                required
                value={formFields.description}
                onChange={(e) => setFormFields({ ...formFields, description: e.target.value })}
                className="rounded-xl border border-slate-200 p-2.5 text-sm bg-slate-50 outline-none focus:border-sky-500 text-slate-800"
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              disabled={saving}
              onClick={() => {
                setCreatingProduct(false);
                setEditingProduct(null);
              }}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? "Saving..." : "Save SKU Product"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
