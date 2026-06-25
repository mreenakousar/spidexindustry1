"use server";

import prisma from "@/lib/prisma";
import { getCurrentUserAction } from "./users";
import type { Order, OrderStatus, PaymentStatus } from "@/types/order";

// Default production timeline for new orders
const DEFAULT_TIMELINE = [
  { label: "Order Received", completed: true },
  { label: "Quotation Approved", completed: false },
  { label: "Payment Received", completed: false },
  { label: "Fabric Sourcing", completed: false },
  { label: "Cutting", completed: false },
  { label: "Stitching", completed: false },
  { label: "Printing / Embroidery", completed: false },
  { label: "Quality Control", completed: false },
  { label: "Packing", completed: false },
  { label: "Shipping", completed: false },
  { label: "Delivered", completed: false },
];

async function requireUserSession() {
  const user = await getCurrentUserAction();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}

function mapPrismaOrder(row: any): Order {
  return {
    id: row.orderId,
    clientName: row.clientName,
    product: row.product,
    quantity: row.quantity,
    country: row.country,
    paymentStatus: row.paymentStatus as PaymentStatus,
    productionStatus: row.productionStatus,
    status: row.status as OrderStatus,
    orderDate: row.orderDate,
    amount: row.amount,
    fabricDetails: row.fabricDetails || "",
    printingDetails: row.printingDetails || "",
    techPackFile: row.techPackFile || "",
    clientPhone: row.clientPhone || "",
    billingEmail: row.billingEmail || "",
    address: row.address || "",
    shippingMethod: row.shippingMethod || "",
    estimatedDelivery: row.estimatedDelivery || "",
    paymentMethod: row.paymentMethod || "",
    productionTimeline:
      typeof row.productionTimeline === "string"
        ? JSON.parse(row.productionTimeline)
        : Array.isArray(row.productionTimeline)
        ? row.productionTimeline
        : [],
  };
}

// ─── DASHBOARD ───────────────────────────────────────────────────────────────

export async function getClientDashboardData() {
  const user = await requireUserSession();

  const orders = await prisma.order.findMany({
    where: { billingEmail: user.email },
    orderBy: { createdAt: "desc" },
  });

  const totalOrders = orders.length;
  const activeOrders = orders.filter(
    (o) => o.status !== "Completed" && o.status !== "Cancelled"
  ).length;

  const pendingPaymentsSum = orders
    .filter((o) => o.paymentStatus !== "Paid")
    .reduce((sum, o) => sum + o.amount, 0);

  const alertsCount = orders.filter(
    (o) => o.status === "Pending" || o.paymentStatus === "Failed"
  ).length;

  const notifications = await prisma.notification.findMany({
    where: { clientEmail: user.email },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const productionUpdates = orders
    .filter((o) => o.status !== "Completed")
    .map((o) => {
      const timeline =
        typeof o.productionTimeline === "string"
          ? JSON.parse(o.productionTimeline)
          : Array.isArray(o.productionTimeline)
          ? o.productionTimeline
          : [];
      const currentStage =
        timeline.find((s: any) => !s.completed) ||
        timeline[timeline.length - 1] || { label: "N/A" };
      return {
        id: o.orderId,
        product: o.product,
        stage: o.productionStatus || currentStage.label,
        status: o.status,
        date: o.estimatedDelivery || "TBD",
      };
    })
    .slice(0, 5);

  return {
    user: {
      name: user.name,
      email: user.email,
    },
    stats: {
      totalOrders,
      activeOrders,
      pendingPayments: `$${pendingPaymentsSum.toLocaleString()}`,
      alerts: alertsCount,
    },
    productionUpdates,
    notifications,
  };
}

// ─── ORDERS ──────────────────────────────────────────────────────────────────

export async function getClientOrdersAction() {
  const user = await requireUserSession();

  const rows = await prisma.order.findMany({
    where: { billingEmail: user.email },
    orderBy: { createdAt: "desc" },
  });

  return rows.map(mapPrismaOrder);
}

export async function getClientOrderDetailsAction(orderId: string) {
  const user = await requireUserSession();

  const row = await prisma.order.findFirst({
    where: {
      orderId,
      billingEmail: user.email,
    },
  });

  if (!row) return null;
  return mapPrismaOrder(row);
}

export async function createClientOrderAction(input: {
  product: string;
  quantity: number;
  sizes?: string;
  color?: string;
  gsm?: string;
  designNotes?: string;
  techPackFile?: string;
}) {
  const user = await requireUserSession();

  const orderId = `ORD-${Date.now().toString().slice(-6)}`;
  const rate = 15; // standard rate per item (admin can update per order)
  const amount = input.quantity * rate;

  const fabricDetails = [
    input.gsm ? `Fabric/GSM: ${input.gsm}` : null,
    input.color ? `Color: ${input.color}` : null,
    input.sizes ? `Sizes: ${input.sizes}` : null,
  ]
    .filter(Boolean)
    .join(" | ") || "Specifications to be confirmed";

  const printingDetails = input.designNotes || "";
  const techPackFile = input.techPackFile || "";

  const orderDate = new Date().toISOString().split("T")[0];
  const estimatedDelivery = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const row = await prisma.order.create({
    data: {
      orderId,
      clientName: user.name,
      product: input.product,
      quantity: input.quantity,
      country: "",
      paymentStatus: "Pending",
      productionStatus: "Order Received",
      status: "Pending",
      orderDate,
      amount,
      fabricDetails,
      printingDetails,
      techPackFile,
      clientPhone: "",
      billingEmail: user.email,
      address: "",
      shippingMethod: "To be confirmed",
      estimatedDelivery,
      paymentMethod: "To be confirmed",
      productionTimeline: JSON.stringify(DEFAULT_TIMELINE),
    },
  });

  const suffix = orderId.replace("ORD-", "");

  // Auto-create Invoice for this order
  const invoiceId = `INV-${suffix}`;
  await prisma.invoice.create({
    data: {
      invoiceId,
      date: orderDate,
      amount: `$${amount.toLocaleString()}`,
      status: "Pending",
      customer: user.name,
      orderId,
      pdfUrl: `/invoices/${invoiceId}.pdf`,
      billingEmail: user.email,
    },
  });

  // Auto-create Payment record
  const paymentId = `PAY-${suffix}`;
  await prisma.payment.create({
    data: {
      paymentId,
      invoice: invoiceId,
      date: orderDate,
      amount: `$${amount.toLocaleString()}`,
      status: "Pending",
      method: "To be confirmed",
      billingEmail: user.email,
    },
  });

  // Create Notification
  await prisma.notification.create({
    data: {
      title: "New order submitted",
      description: `Your order ${orderId} for ${input.product} (qty: ${input.quantity}) has been received. Our team will review and confirm pricing within 24 hours.`,
      date: new Date().toLocaleDateString(),
      category: "Production",
      clientEmail: user.email,
    },
  });

  // Save product to client's product library
  await prisma.product.create({
    data: {
      productId: `P-${suffix}`,
      name: input.product,
      description: fabricDetails,
      image: "/products/jersey.jpg",
      status: "Saved",
      clientEmail: user.email,
    },
  });

  return { ok: true, order: mapPrismaOrder(row) };
}

// ─── INVOICES ────────────────────────────────────────────────────────────────

export async function getClientInvoicesAction() {
  const user = await requireUserSession();

  return prisma.invoice.findMany({
    where: {
      billingEmail: user.email,
      status: {
        not: "Paid",
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

// ─── PAYMENTS ────────────────────────────────────────────────────────────────

export async function getClientPaymentsAction() {
  const user = await requireUserSession();

  return prisma.payment.findMany({
    where: { billingEmail: user.email },
    orderBy: { createdAt: "desc" },
  });
}

export async function payInvoiceAction(invoiceId: string, method: string, receiptUrl?: string) {
  const user = await requireUserSession();

  const invoice = await prisma.invoice.findFirst({
    where: { invoiceId, billingEmail: user.email },
  });

  if (!invoice) throw new Error("Invoice not found or access denied.");

  // Mark invoice as Paid and save receipt
  await prisma.invoice.update({
    where: { invoiceId },
    data: {
      status: "Paid",
      receiptUrl,
    },
  });

  // Mark matching payment record as Completed
  await prisma.payment.updateMany({
    where: { invoice: invoiceId, billingEmail: user.email },
    data: {
      status: "Completed",
      method,
    },
  });

  // Advance order status + timeline
  const order = await prisma.order.findFirst({
    where: { orderId: invoice.orderId },
  });

  if (order) {
    const timeline =
      typeof order.productionTimeline === "string"
        ? JSON.parse(order.productionTimeline)
        : Array.isArray(order.productionTimeline)
        ? order.productionTimeline
        : [];

    const updatedTimeline = timeline.map((stage: any) => {
      if (
        stage.label === "Quotation Approved" ||
        stage.label === "Payment Received"
      ) {
        return { ...stage, completed: true };
      }
      return stage;
    });

    await prisma.order.update({
      where: { orderId: order.orderId },
      data: {
        paymentStatus: "Paid",
        status: "In Production",
        productionStatus: "Fabric Sourcing",
        productionTimeline: JSON.stringify(updatedTimeline),
      },
    });
  }

  // Notify client
  await prisma.notification.create({
    data: {
      title: "Payment confirmed",
      description: `Payment for invoice ${invoiceId} via ${method} has been successfully processed. Your order is now In Production.`,
      date: new Date().toLocaleDateString(),
      category: "Finance",
      clientEmail: user.email,
    },
  });

  return { ok: true };
}

// ─── PRODUCT LIBRARY ─────────────────────────────────────────────────────────

export async function getClientProductsAction() {
  const user = await requireUserSession();

  return prisma.product.findMany({
    where: { clientEmail: user.email },
    orderBy: { createdAt: "desc" },
  });
}

// ─── NOTIFICATIONS ───────────────────────────────────────────────────────────

export async function getClientNotificationsAction() {
  const user = await requireUserSession();

  return prisma.notification.findMany({
    where: { clientEmail: user.email },
    orderBy: { createdAt: "desc" },
  });
}
