"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Activity,
  CheckCircle2,
  Calendar,
  Edit3,
  Eye,
  FileText,
  FolderOpen,
  Loader2,
  Plus,
  Search,
  Trash2,
  X,
  Zap,
} from "lucide-react";
import { z } from "zod";
import {
  createOrderAction,
  deleteOrderAction,
  listOrdersAction,
  updateOrderAction,
} from "../../../src/actions/orders";
import Modal from "../../../src/components/ui/Modal";
import StatCard from "../../../src/components/ui/StatCard";

const statusOptions = [
  "All",
  "Pending",
  "In Production",
  "Completed",
  "Cancelled",
] as const;
const dateOptions = [
  "All",
  "Last 7 Days",
  "Last 30 Days",
  "This Month",
] as const;
const countryOptions = [
  "All",
  "Bangladesh",
  "United States",
  "United Kingdom",
  "Germany",
  "Australia",
] as const;

const orderFormSchema = z.object({
  clientName: z.string().min(2, "Client name is required"),
  product: z.string().min(2, "Product is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  country: z.string().min(2, "Country is required"),
  paymentStatus: z.enum(["Paid", "Pending", "Failed"]),
  productionStatus: z.string().min(2, "Production status is required"),
  status: z.enum(["Pending", "In Production", "Completed", "Cancelled"]),
  amount: z.number().min(1, "Amount is required"),
  orderDate: z.string().min(10, "Order date is required"),
});

type OrderFormValues = z.infer<typeof orderFormSchema>;

type OrderStatus = "Pending" | "In Production" | "Completed" | "Cancelled";

type PaymentStatus = "Paid" | "Pending" | "Failed";

interface ProductionStage {
  label: string;
  completed: boolean;
}

interface Order {
  id: string;
  clientName: string;
  product: string;
  quantity: number;
  country: string;
  paymentStatus: PaymentStatus;
  productionStatus: string;
  status: OrderStatus;
  orderDate: string;
  amount: number;
  fabricDetails: string;
  printingDetails: string;
  techPackFile: string;
  clientPhone: string;
  billingEmail: string;
  address: string;
  shippingMethod: string;
  estimatedDelivery: string;
  paymentMethod: string;
  productionTimeline: ProductionStage[];
}

const initialOrders: Order[] = [
  {
    id: "ORD-5301",
    clientName: "Arcadia Apparel Co.",
    product: "Premium Performance Hoodie",
    quantity: 480,
    country: "United States",
    paymentStatus: "Paid",
    productionStatus: "Printing",
    status: "In Production",
    orderDate: "2026-06-01",
    amount: 37440,
    fabricDetails: "320gsm French terry, moisture-wicking, custom pantone dye.",
    printingDetails: "Sublimation print with reflective ink on chest logo.",
    techPackFile: "Arcadia_Hoodie_Techpack.pdf",
    clientPhone: "+1 415 890 2334",
    billingEmail: "orders@arcadiaapparel.com",
    address: "320 Market St, San Francisco, CA",
    shippingMethod: "Express Sea Freight",
    estimatedDelivery: "2026-07-15",
    paymentMethod: "Wire Transfer",
    productionTimeline: [
      { label: "Order Received", completed: true },
      { label: "Quotation Approved", completed: true },
      { label: "Payment Received", completed: true },
      { label: "Fabric Sourcing", completed: true },
      { label: "Cutting", completed: true },
      { label: "Stitching", completed: false },
      { label: "Printing", completed: false },
      { label: "Embroidery", completed: false },
      { label: "Quality Control", completed: false },
      { label: "Packing", completed: false },
      { label: "Shipping", completed: false },
      { label: "Delivered", completed: false },
    ],
  },
  {
    id: "ORD-5294",
    clientName: "Summit Sportswear",
    product: "Team Training Jacket",
    quantity: 960,
    country: "United Kingdom",
    paymentStatus: "Pending",
    productionStatus: "Fabric Sourcing",
    status: "Pending",
    orderDate: "2026-05-28",
    amount: 61440,
    fabricDetails:
      "Softshell with breathable mesh lining and TPU water-resistant finish.",
    printingDetails: "Heat transfer crest artwork with team numbering.",
    techPackFile: "Summit_Jacket_Techpack.pdf",
    clientPhone: "+44 20 7946 0871",
    billingEmail: "procurement@summitsports.co.uk",
    address: "88 Queen St, London, UK",
    shippingMethod: "Standard Air Freight",
    estimatedDelivery: "2026-07-02",
    paymentMethod: "Credit Card",
    productionTimeline: [
      { label: "Order Received", completed: true },
      { label: "Quotation Approved", completed: true },
      { label: "Payment Received", completed: false },
      { label: "Fabric Sourcing", completed: false },
      { label: "Cutting", completed: false },
      { label: "Stitching", completed: false },
      { label: "Printing", completed: false },
      { label: "Embroidery", completed: false },
      { label: "Quality Control", completed: false },
      { label: "Packing", completed: false },
      { label: "Shipping", completed: false },
      { label: "Delivered", completed: false },
    ],
  },
  {
    id: "ORD-5278",
    clientName: "Greenfield Corporate",
    product: "Executive Polo Shirt",
    quantity: 240,
    country: "Bangladesh",
    paymentStatus: "Paid",
    productionStatus: "Completed",
    status: "Completed",
    orderDate: "2026-05-15",
    amount: 13440,
    fabricDetails: "210gsm pique cotton with moisture-wicking finish.",
    printingDetails: "Embroidery on chest and custom woven label.",
    techPackFile: "Greenfield_Polo_Techpack.pdf",
    clientPhone: "+880 1912 345678",
    billingEmail: "purchase@greenfieldcorporate.com",
    address: "House 14, Road 7, Dhaka",
    shippingMethod: "Local Pickup",
    estimatedDelivery: "2026-05-25",
    paymentMethod: "Bank Transfer",
    productionTimeline: [
      { label: "Order Received", completed: true },
      { label: "Quotation Approved", completed: true },
      { label: "Payment Received", completed: true },
      { label: "Fabric Sourcing", completed: true },
      { label: "Cutting", completed: true },
      { label: "Stitching", completed: true },
      { label: "Printing", completed: true },
      { label: "Embroidery", completed: true },
      { label: "Quality Control", completed: true },
      { label: "Packing", completed: true },
      { label: "Shipping", completed: true },
      { label: "Delivered", completed: true },
    ],
  },
  {
    id: "ORD-5263",
    clientName: "Velocity Streetwear",
    product: "Screen Printed Tee",
    quantity: 3100,
    country: "Germany",
    paymentStatus: "Paid",
    productionStatus: "Quality Control",
    status: "In Production",
    orderDate: "2026-05-20",
    amount: 93000,
    fabricDetails: "180gsm ring-spun cotton with garment-washed finish.",
    printingDetails: "Water-based discharge print on front and back.",
    techPackFile: "Velocity_Tee_Techpack.pdf",
    clientPhone: "+49 30 1234 5678",
    billingEmail: "hello@velocitystreetwear.de",
    address: "Straße des 17. Juni 135, Berlin",
    shippingMethod: "Express Air",
    estimatedDelivery: "2026-06-25",
    paymentMethod: "PayPal",
    productionTimeline: [
      { label: "Order Received", completed: true },
      { label: "Quotation Approved", completed: true },
      { label: "Payment Received", completed: true },
      { label: "Fabric Sourcing", completed: true },
      { label: "Cutting", completed: true },
      { label: "Stitching", completed: true },
      { label: "Printing", completed: true },
      { label: "Embroidery", completed: false },
      { label: "Quality Control", completed: false },
      { label: "Packing", completed: false },
      { label: "Shipping", completed: false },
      { label: "Delivered", completed: false },
    ],
  },
  {
    id: "ORD-5248",
    clientName: "Northshore Uniforms",
    product: "Safety Work Vest",
    quantity: 820,
    country: "Australia",
    paymentStatus: "Failed",
    productionStatus: "Fabric Sourcing",
    status: "Cancelled",
    orderDate: "2026-05-10",
    amount: 24600,
    fabricDetails: "High-visibility mesh with reflective tape.",
    printingDetails: "No printing; woven logo badge.",
    techPackFile: "Northshore_Vest_Techpack.pdf",
    clientPhone: "+61 2 9876 5432",
    billingEmail: "support@northshoreuniforms.com.au",
    address: "12 Marine Parade, Sydney",
    shippingMethod: "Ground Courier",
    estimatedDelivery: "2026-06-05",
    paymentMethod: "Credit Card",
    productionTimeline: [
      { label: "Order Received", completed: true },
      { label: "Quotation Approved", completed: true },
      { label: "Payment Received", completed: false },
      { label: "Fabric Sourcing", completed: false },
      { label: "Cutting", completed: false },
      { label: "Stitching", completed: false },
      { label: "Printing", completed: false },
      { label: "Embroidery", completed: false },
      { label: "Quality Control", completed: false },
      { label: "Packing", completed: false },
      { label: "Shipping", completed: false },
      { label: "Delivered", completed: false },
    ],
  },
];

function badgeClass(status: OrderStatus | PaymentStatus) {
  switch (status) {
    case "Pending":
      return "bg-amber-100 text-amber-700";
    case "In Production":
      return "bg-sky-100 text-sky-700";
    case "Completed":
      return "bg-emerald-100 text-emerald-700";
    case "Cancelled":
      return "bg-rose-100 text-rose-700";
    case "Paid":
      return "bg-emerald-100 text-emerald-700";
    case "Failed":
      return "bg-rose-100 text-rose-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function getDateRangeFilter(
  orderDate: string,
  option: (typeof dateOptions)[number],
) {
  if (option === "All") return true;
  const order = new Date(orderDate);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - order.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (option === "Last 7 Days") return diffDays <= 7;
  if (option === "Last 30 Days") return diffDays <= 30;
  if (option === "This Month")
    return (
      order.getMonth() === now.getMonth() &&
      order.getFullYear() === now.getFullYear()
    );
  return true;
}

function StatusBadge({ status }: { status: OrderStatus | PaymentStatus }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${badgeClass(status)}`}
    >
      {status}
    </span>
  );
}

function FilterButton({ label }: { label: string }) {
  return (
    <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
      <Search className="h-4 w-4" />
      {label}
    </button>
  );
}

function TableSkeleton() {
  return (
    <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-3xl bg-slate-100 p-5 dark:bg-slate-700/40"
        >
          <div className="mb-4 h-4 w-1/4 rounded bg-slate-200 dark:bg-slate-600"></div>
          <div className="grid gap-3 md:grid-cols-6">
            {[...Array(6)].map((_, cell) => (
              <div
                key={cell}
                className="h-10 rounded bg-slate-200 dark:bg-slate-600"
              ></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
        <FolderOpen className="h-7 w-7" />
      </div>
      <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
        No orders found
      </h3>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Adjust search terms or filters to find the order you are looking for.
      </p>
    </div>
  );
}

function ChevronLeftIcon() {
  return <span className="inline-block rotate-180">›</span>;
}

function ChevronRightIcon() {
  return <span className="inline-block">›</span>;
}

function ProductionTimeline({ steps }: { steps: ProductionStage[] }) {
  return (
    <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950">
      <div className="text-sm font-semibold text-slate-600 dark:text-slate-300">
        Production Timeline
      </div>
      <div className="space-y-3">
        {steps.map((step) => (
          <div key={step.label} className="flex items-center gap-3">
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full ${step.completed ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-300"}`}
            >
              {step.completed ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <Activity className="h-4 w-4" />
              )}
            </span>
            <div>
              <p className="font-medium text-slate-900 dark:text-white">
                {step.label}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {step.completed ? "Completed" : "Pending"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SummaryPanel({ order }: { order: Order }) {
  return (
    <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div>
        <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">
          Current Status
        </div>
        <div className="mt-3 flex items-center justify-between gap-4">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${badgeClass(order.status)}`}
          >
            {order.status}
          </span>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {order.orderDate}
          </span>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-950">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Total Quantity
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
            {order.quantity}
          </p>
        </div>
        <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-950">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Order Value
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
            {formatCurrency(order.amount)}
          </p>
        </div>
      </div>
      <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-950">
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
          Client Information
        </p>
        <p className="mt-3 text-sm text-slate-900 dark:text-slate-100">
          {order.clientName}
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {order.billingEmail}
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {order.clientPhone}
        </p>
      </div>
      <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-950">
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
          Shipping
        </p>
        <p className="mt-3 text-sm text-slate-900 dark:text-slate-100">
          {order.shippingMethod}
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {order.address}
        </p>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<(typeof statusOptions)[number]>("All");
  const [dateFilter, setDateFilter] =
    useState<(typeof dateOptions)[number]>("All");
  const [countryFilter, setCountryFilter] =
    useState<(typeof countryOptions)[number]>("All");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
  });

  useEffect(() => {
    async function loadOrders() {
      try {
        const result = await listOrdersAction();
        if (result.ok) {
          setOrders(result.orders);
        } else {
          console.error("Failed to load orders:", result.error);
        }
      } catch (error) {
        console.error("Failed to load orders:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        order.id.toLowerCase().includes(searchLower) ||
        order.clientName.toLowerCase().includes(searchLower) ||
        order.product.toLowerCase().includes(searchLower);

      const matchesStatus =
        statusFilter === "All" || order.status === statusFilter;
      const matchesCountry =
        countryFilter === "All" || order.country === countryFilter;
      const matchesDate = getDateRangeFilter(order.orderDate, dateFilter);

      return matchesSearch && matchesStatus && matchesCountry && matchesDate;
    });
  }, [orders, searchQuery, statusFilter, countryFilter, dateFilter]);

  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredOrders.slice(start, start + pageSize);
  }, [filteredOrders, currentPage]);

  const pageCount = Math.max(1, Math.ceil(filteredOrders.length / pageSize));

  const statistics = useMemo(() => {
    const totalOrders = orders.length;
    const active = orders.filter(
      (order) => order.status === "In Production" || order.status === "Pending",
    ).length;
    const completed = orders.filter(
      (order) => order.status === "Completed",
    ).length;
    const cancelled = orders.filter(
      (order) => order.status === "Cancelled",
    ).length;
    const revenue = orders.reduce((sum, order) => sum + order.amount, 0);

    return { totalOrders, active, completed, cancelled, revenue };
  }, [orders]);

  const openViewModal = (order: Order) => {
    setSelectedOrder(order);
    setIsViewOpen(true);
  };

  const openEditModal = (order: Order) => {
    setSelectedOrder(order);
    reset({
      clientName: order.clientName,
      product: order.product,
      quantity: order.quantity,
      country: order.country,
      paymentStatus: order.paymentStatus,
      productionStatus: order.productionStatus,
      status: order.status,
      amount: order.amount,
      orderDate: order.orderDate,
    });
    setIsEditOpen(true);
  };

  const openCreateModal = () => {
    setSelectedOrder(null);
    reset({
      clientName: "",
      product: "",
      quantity: 1,
      country: "",
      paymentStatus: "Pending",
      productionStatus: "",
      status: "Pending",
      amount: 0,
      orderDate: new Date().toISOString().slice(0, 10),
    });
    setIsCreateOpen(true);
  };

  const handleCreateOrder = async (values: OrderFormValues) => {
    try {
      const result = await createOrderAction(values);
      if (!result.ok) {
        throw new Error(result.error);
      }

      setOrders((current) => [result.order, ...current]);
      setIsCreateOpen(false);
    } catch (error: any) {
      window.alert(`Failed to create order. ${error?.message || ""}`);
    }
  };

  const closeModals = () => {
    setIsEditOpen(false);
    setIsViewOpen(false);
    setSelectedOrder(null);
  };

  const onSaveOrder = async (values: OrderFormValues) => {
    if (!selectedOrder) return;

    try {
      const result = await updateOrderAction(selectedOrder.id, values);
      if (!result.ok) {
        throw new Error(result.error);
      }

      setOrders((current) =>
        current.map((order) =>
          order.id === selectedOrder.id ? result.order : order,
        ),
      );
      setIsEditOpen(false);
    } catch (error: any) {
      window.alert(`Failed to save order. ${error?.message || ""}`);
    }
  };

  const onDeleteOrder = async (order: Order) => {
    if (!window.confirm(`Delete ${order.id}? This action cannot be undone.`))
      return;

    try {
      const result = await deleteOrderAction(order.id);
      if (!result.ok) {
        throw new Error(result.error);
      }

      setOrders((current) => current.filter((item) => item.id !== order.id));
    } catch (error: any) {
      window.alert(`Failed to delete order. ${error?.message || ""}`);
    }
  };

  const onGenerateInvoice = (order: Order) => {
    window.alert(`Invoice generated for ${order.id}`);
  };

  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsViewOpen(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
            Orders
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
            Manage apparel manufacturing orders with search, filters, timeline
            tracking, and full order details.
          </p>
        </div>
        <button onClick={openCreateModal} className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700">
          <Plus className="h-4 w-4" /> New Order
        </button>
      </div>

      <div className="grid gap-4 xl:grid-cols-5">
        <StatCard title="Total Orders" value={`${statistics.totalOrders}`} />
        <StatCard title="Active Orders" value={`${statistics.active}`} valueClassName="text-sky-600" />
        <StatCard title="Completed Orders" value={`${statistics.completed}`} valueClassName="text-emerald-600" />
        <StatCard title="Cancelled Orders" value={`${statistics.cancelled}`} valueClassName="text-rose-600" />
        <StatCard title="Total Revenue" value={formatCurrency(statistics.revenue)} valueClassName="text-amber-600" />
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="grid gap-4 lg:grid-cols-[1fr,320px]">
          <div className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Search
                </span>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => {
                      setSearchQuery(event.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500"
                    placeholder="Search order, client, product"
                  />
                </div>
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Status
                </span>
                <select
                  value={statusFilter}
                  onChange={(event) => {
                    setStatusFilter(
                      event.target.value as (typeof statusOptions)[number],
                    );
                    setCurrentPage(1);
                  }}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500"
                >
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Date Range
                </span>
                <select
                  value={dateFilter}
                  onChange={(event) => {
                    setDateFilter(
                      event.target.value as (typeof dateOptions)[number],
                    );
                    setCurrentPage(1);
                  }}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500"
                >
                  {dateOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Country
                </span>
                <select
                  value={countryFilter}
                  onChange={(event) => {
                    setCountryFilter(
                      event.target.value as (typeof countryOptions)[number],
                    );
                    setCurrentPage(1);
                  }}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500"
                >
                  {countryOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <FilterButton label="Filter Orders" />
              <button
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("All");
                  setDateFilter("All");
                  setCountryFilter("All");
                  setCurrentPage(1);
                }}
              >
                <X className="h-4 w-4" /> Clear All
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-950">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Showing
                </p>
                <p className="mt-1 text-2xl font-semibold text-slate-900 dark:text-white">
                  {filteredOrders.length}
                </p>
              </div>
              <div className="rounded-full bg-sky-600 px-3 py-2 text-sm font-semibold text-white">
                Page {currentPage}
              </div>
            </div>
            <div className="mt-5 rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-900">
              <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <Calendar className="h-4 w-4" />
                Latest orders updated in real time.
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-700 dark:text-slate-300">
                <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-950">
                  <p className="text-slate-500">Active</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
                    {statistics.active}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-950">
                  <p className="text-slate-500">Completed</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
                    {statistics.completed}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        {isLoading ? (
          <TableSkeleton />
        ) : filteredOrders.length === 0 ? (
          <div className="p-10">
            <EmptyState />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-700">
              <thead className="bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-200">
                <tr>
                  <th className="px-5 py-4 uppercase tracking-wide">
                    Order ID
                  </th>
                  <th className="px-5 py-4 uppercase tracking-wide">
                    Client Name
                  </th>
                  <th className="px-5 py-4 uppercase tracking-wide">Product</th>
                  <th className="px-5 py-4 uppercase tracking-wide">Qty</th>
                  <th className="px-5 py-4 uppercase tracking-wide">Country</th>
                  <th className="px-5 py-4 uppercase tracking-wide">Payment</th>
                  <th className="px-5 py-4 uppercase tracking-wide">
                    Production
                  </th>
                  <th className="px-5 py-4 uppercase tracking-wide">
                    Order Date
                  </th>
                  <th className="px-5 py-4 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {paginatedOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <td className="px-5 py-4 font-medium text-slate-900 dark:text-white">
                      {order.id}
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                      {order.clientName}
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                      {order.product}
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                      {order.quantity}
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                      {order.country}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={order.paymentStatus} />
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                      {order.orderDate}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                        <button
                          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                          onClick={() => openOrderDetails(order)}
                        >
                          <Eye className="h-3.5 w-3.5" /> View
                        </button>
                        <button
                          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                          onClick={() => openEditModal(order)}
                        >
                          <Edit3 className="h-3.5 w-3.5" /> Edit
                        </button>
                        <button
                          className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100 dark:border-rose-700 dark:bg-rose-950 dark:text-rose-200"
                          onClick={() => onDeleteOrder(order)}
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Delete
                        </button>
                        <button
                          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
                          onClick={() => onGenerateInvoice(order)}
                        >
                          <FileText className="h-3.5 w-3.5" /> Invoice
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {!isLoading && filteredOrders.length > 0 && (
        <div className="flex flex-col items-center justify-between gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:flex-row">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing {paginatedOrders.length} of {filteredOrders.length} orders.
          </p>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 p-2 dark:bg-slate-950">
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-200 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
              aria-label="Previous page"
            >
              <ChevronLeftIcon />
            </button>
            <span className="px-3 text-sm font-medium text-slate-700 dark:text-slate-300">
              {currentPage} / {pageCount}
            </span>
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-200 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              disabled={currentPage === pageCount}
              onClick={() =>
                setCurrentPage((page) => Math.min(page + 1, pageCount))
              }
              aria-label="Next page"
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      )}

      <Modal
        open={isViewOpen}
        onClose={closeModals}
        title={
          selectedOrder ? `View Order ${selectedOrder.id}` : "Order details"
        }
      >
        {selectedOrder ? (
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr),360px]">
            <div className="space-y-6">
              <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      Client Information
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                      {selectedOrder.clientName}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {selectedOrder.address}
                    </p>
                  </div>
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${badgeClass(selectedOrder.status)}`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-900">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Billing Email
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-900 dark:text-white">
                      {selectedOrder.billingEmail}
                    </p>
                  </div>
                  <div className="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-900">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Phone
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-900 dark:text-white">
                      {selectedOrder.clientPhone}
                    </p>
                  </div>
                </div>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      Product Details
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                      {selectedOrder.product}
                    </h3>
                  </div>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {selectedOrder.country}
                  </span>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-900">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Quantity
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                      {selectedOrder.quantity}
                    </p>
                  </div>
                  <div className="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-900">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Amount
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                      {formatCurrency(selectedOrder.amount)}
                    </p>
                  </div>
                </div>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Fabric Details
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  {selectedOrder.fabricDetails}
                </p>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Printing Details
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  {selectedOrder.printingDetails}
                </p>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Uploaded Tech Pack
                  </p>
                  <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                    <FileText className="h-4 w-4" /> Download
                  </button>
                </div>
                <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
                  {selectedOrder.techPackFile}
                </p>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      Shipment Information
                    </p>
                    <p className="mt-2 text-sm text-slate-900 dark:text-white">
                      {selectedOrder.shippingMethod}
                    </p>
                  </div>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    ETA {selectedOrder.estimatedDelivery}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  Shipped to: {selectedOrder.address}
                </p>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Payment Information
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-900">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Method
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-900 dark:text-white">
                      {selectedOrder.paymentMethod}
                    </p>
                  </div>
                  <div className="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-900">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Status
                    </p>
                    <StatusBadge status={selectedOrder.paymentStatus} />
                  </div>
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <SummaryPanel order={selectedOrder} />
              <ProductionTimeline steps={selectedOrder.productionTimeline} />
            </div>
          </div>
        ) : (
          <div className="p-10 text-center text-slate-500 dark:text-slate-400">
            Order details are unavailable.
          </div>
        )}
      </Modal>

      <Modal
        open={isEditOpen}
        onClose={closeModals}
        title={selectedOrder ? `Edit Order ${selectedOrder.id}` : "Edit order"}
      >
        {selectedOrder ? (
          <form className="space-y-6" onSubmit={handleSubmit(onSaveOrder)}>
            <div className="grid gap-4 lg:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Client Name
                </span>
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  {...register("clientName")}
                />
                {errors.clientName && (
                  <p className="text-xs text-rose-600">
                    {errors.clientName.message}
                  </p>
                )}
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Product
                </span>
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  {...register("product")}
                />
                {errors.product && (
                  <p className="text-xs text-rose-600">
                    {errors.product.message}
                  </p>
                )}
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Quantity
                </span>
                <input
                  type="number"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  {...register("quantity", { valueAsNumber: true })}
                />
                {errors.quantity && (
                  <p className="text-xs text-rose-600">
                    {errors.quantity.message}
                  </p>
                )}
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Country
                </span>
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  {...register("country")}
                />
                {errors.country && (
                  <p className="text-xs text-rose-600">
                    {errors.country.message}
                  </p>
                )}
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Order Date
                </span>
                <input
                  type="date"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  {...register("orderDate")}
                />
                {errors.orderDate && (
                  <p className="text-xs text-rose-600">
                    {errors.orderDate.message}
                  </p>
                )}
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Amount
                </span>
                <input
                  type="number"
                  step="0.01"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  {...register("amount", { valueAsNumber: true })}
                />
                {errors.amount && (
                  <p className="text-xs text-rose-600">
                    {errors.amount.message}
                  </p>
                )}
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Production Status
                </span>
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  {...register("productionStatus")}
                />
                {errors.productionStatus && (
                  <p className="text-xs text-rose-600">
                    {errors.productionStatus.message}
                  </p>
                )}
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Status
                </span>
                <select
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  {...register("status")}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Production">In Production</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                {errors.status && (
                  <p className="text-xs text-rose-600">
                    {errors.status.message}
                  </p>
                )}
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Payment Status
                </span>
                <select
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  {...register("paymentStatus")}
                >
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                </select>
                {errors.paymentStatus && (
                  <p className="text-xs text-rose-600">
                    {errors.paymentStatus.message}
                  </p>
                )}
              </label>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
                onClick={closeModals}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Zap className="mr-2 h-4 w-4" />
                )}{" "}
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="p-10 text-center text-slate-500 dark:text-slate-400">
            Unable to edit order details.
          </div>
        )}
      </Modal>

      <Modal
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="New Order"
      >
        <form className="space-y-6" onSubmit={handleSubmit(handleCreateOrder)}>
          <div className="grid gap-4 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Client Name</span>
              <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" {...register("clientName")} />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Product</span>
              <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" {...register("product")} />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Quantity</span>
              <input type="number" className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" {...register("quantity", { valueAsNumber: true })} />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Country</span>
              <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" {...register("country")} />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Order Date</span>
              <input type="date" className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" {...register("orderDate")} />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Amount</span>
              <input type="number" step="0.01" className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" {...register("amount", { valueAsNumber: true })} />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Production Status</span>
              <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" {...register("productionStatus")} />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Status</span>
              <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" {...register("status")}>
                <option value="Pending">Pending</option>
                <option value="In Production">In Production</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Payment Status</span>
              <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" {...register("paymentStatus")}>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
            </label>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button type="button" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800" onClick={() => setIsCreateOpen(false)}>Cancel</button>
            <button type="submit" className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700">Create Order</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
