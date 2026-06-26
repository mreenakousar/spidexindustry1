"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { getCurrentUserAction } from "./users";
import type { Order, OrderStatus, PaymentStatus } from "@/types/order";

const orderSchema = z.object({
  clientName: z.string().min(2),
  product: z.string().min(2),
  quantity: z.number().min(1),
  country: z.string().min(2),
  paymentStatus: z.enum(["Paid", "Pending", "Failed", "Partially Paid"]),
  productionStatus: z.string().min(2),
  status: z.enum(["Awaiting Quote", "Confirmed", "Pending", "In Production", "Completed", "Cancelled"]),
  amount: z.number().min(1),
  orderDate: z.string().min(10),
});

type OrderInput = z.infer<typeof orderSchema>;

type OrdersResult =
  | { ok: true; orders: Order[] }
  | { ok: false; error: string };

type OrderResult =
  | { ok: true; order: Order }
  | { ok: false; error: string };

async function requireAdminSession() {
  const user = await getCurrentUserAction();
  if (!user || user.role !== "admin") {
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
    shipmentReceipt: row.shipmentReceipt || "",
  };
}

export async function listOrdersAction(): Promise<OrdersResult> {
  try {
    await requireAdminSession();

    const rows = await prisma.order.findMany({ orderBy: { createdAt: "desc" } });
    return { ok: true, orders: rows.map(mapPrismaOrder) };
  } catch (error: any) {
    return { ok: false, error: error?.message || "Unable to load orders." };
  }
}

export async function getOrderByIdAction(orderId: string): Promise<OrderResult> {
  try {
    await requireAdminSession();
    const row = await prisma.order.findFirst({ where: { orderId } });
    if (!row) return { ok: false, error: "Order not found." };
    return { ok: true, order: mapPrismaOrder(row) };
  } catch (error: any) {
    return { ok: false, error: error?.message || "Unable to load order." };
  }
}

export async function createOrderAction(input: OrderInput): Promise<OrderResult> {
  try {
    await requireAdminSession();
    const parsed = orderSchema.parse({
      ...input,
      quantity: Number(input.quantity),
      amount: Number(input.amount),
    });

    const orderId = `ORD-${Date.now().toString().slice(-6)}`;
    const defaultTimeline = JSON.stringify([
      { label: "Order Received", completed: true },
      { label: "Quotation Approved", completed: false },
      { label: "Payment Received", completed: false },
    ]);

    const row = await prisma.order.create({
      data: {
        orderId,
        ...parsed,
        fabricDetails: "",
        printingDetails: "",
        techPackFile: "",
        clientPhone: "",
        billingEmail: "",
        address: "",
        shippingMethod: "",
        estimatedDelivery: "",
        paymentMethod: "",
        productionTimeline: defaultTimeline,
      },
    });

    return { ok: true, order: mapPrismaOrder(row) };
  } catch (error: any) {
    return { ok: false, error: error?.message || "Unable to create order." };
  }
}

export async function updateOrderAction(
  orderId: string,
  input: OrderInput,
): Promise<OrderResult> {
  try {
    await requireAdminSession();
    const parsed = orderSchema.parse({
      ...input,
      quantity: Number(input.quantity),
      amount: Number(input.amount),
    });

    const row = await prisma.order.update({
      where: { orderId },
      data: {
        ...parsed,
        updatedAt: new Date(),
      },
    });

    return { ok: true, order: mapPrismaOrder(row) };
  } catch (error: any) {
    return { ok: false, error: error?.message || "Unable to update order." };
  }
}

export async function updateOrderAdminFieldsAction(
  orderId: string,
  input: {
    clientName?: string;
    product?: string;
    quantity?: number;
    country?: string;
    paymentStatus?: PaymentStatus;
    productionStatus?: string;
    status?: OrderStatus;
    amount?: number;
    fabricDetails?: string;
    printingDetails?: string;
    techPackFile?: string;
    clientPhone?: string;
    billingEmail?: string;
    address?: string;
    shippingMethod?: string;
    estimatedDelivery?: string;
    paymentMethod?: string;
    productionTimeline?: any[];
    shipmentReceipt?: string;
  }
): Promise<OrderResult> {
  try {
    await requireAdminSession();
    
    // Build update data
    const updateData: any = { ...input };
    if (input.productionTimeline) {
      updateData.productionTimeline = JSON.stringify(input.productionTimeline);
    }
    
    const row = await prisma.order.update({
      where: { orderId },
      data: {
        ...updateData,
        updatedAt: new Date(),
      },
    });

    if (input.amount !== undefined) {
      await prisma.invoice.updateMany({
        where: { orderId },
        data: {
          amount: `$${input.amount.toLocaleString()}`,
        },
      });
    }

    return { ok: true, order: mapPrismaOrder(row) };
  } catch (error: any) {
    return { ok: false, error: error?.message || "Unable to update order." };
  }
}

/**
 * Admin confirms an order: sets the quoted price, creates Invoice + Payment
 * records, and moves the order status to "Confirmed".
 */
export async function confirmOrderAction(
  orderId: string,
  amount: number,
  estimatedDelivery?: string,
  shippingMethod?: string,
): Promise<OrderResult> {
  try {
    await requireAdminSession();

    if (amount <= 0) {
      return { ok: false, error: "Quoted price must be greater than zero." };
    }

    const order = await prisma.order.findFirst({ where: { orderId } });
    if (!order) return { ok: false, error: "Order not found." };

    // Update order with confirmed price and move to Confirmed status
    const updateData: any = {
      amount,
      status: "Confirmed",
      updatedAt: new Date(),
    };
    if (estimatedDelivery) updateData.estimatedDelivery = estimatedDelivery;
    if (shippingMethod)    updateData.shippingMethod    = shippingMethod;

    const row = await prisma.order.update({ where: { orderId }, data: updateData });

    const orderDate = new Date().toISOString().split("T")[0];
    const suffix    = orderId.replace("ORD-", "");
    const invoiceId = `INV-${suffix}`;
    const paymentId = `PAY-${suffix}`;

    // Create invoice only once
    const existingInvoice = await prisma.invoice.findFirst({ where: { orderId } });
    if (!existingInvoice) {
      await prisma.invoice.create({
        data: {
          invoiceId,
          date:         orderDate,
          amount:       `$${amount.toLocaleString()}`,
          status:       "Pending",
          customer:     order.clientName,
          orderId,
          pdfUrl:       `/invoices/${invoiceId}.pdf`,
          billingEmail: order.billingEmail,
        },
      });
      await prisma.payment.create({
        data: {
          paymentId,
          invoice:      invoiceId,
          date:         orderDate,
          amount:       `$${amount.toLocaleString()}`,
          status:       "Pending",
          method:       "To be confirmed",
          billingEmail: order.billingEmail,
        },
      });
    } else {
      await prisma.invoice.updateMany({
        where: { orderId },
        data:  { amount: `$${amount.toLocaleString()}`, status: "Pending" },
      });
    }

    // Notify client
    await prisma.notification.create({
      data: {
        title:       "Order Confirmed — Invoice Ready",
        description: `Your order ${orderId} has been confirmed with a quoted price of $${amount.toLocaleString()}. Your invoice is now available for payment.`,
        date:        new Date().toLocaleDateString(),
        category:    "Finance",
        clientEmail: order.billingEmail,
      },
    });

    return { ok: true, order: mapPrismaOrder(row) };
  } catch (error: any) {
    return { ok: false, error: error?.message || "Unable to confirm order." };
  }
}

export async function deleteOrderAction(orderId: string) {
  try {
    await requireAdminSession();
    await prisma.order.delete({ where: { orderId } });
    return { ok: true };
  } catch (error: any) {
    return { ok: false, error: error?.message || "Unable to delete order." };
  }
}

export async function getAdminDashboardDataAction() {
  try {
    await requireAdminSession();

    const totalClients = await prisma.user.count({ where: { role: "client" } });
    const totalOrders = await prisma.order.count();
    const activeOrders = await prisma.order.count({
      where: {
        status: { in: ["Awaiting Quote", "Confirmed", "Pending", "In Production"] },
      },
    });

    const paidOrders = await prisma.order.findMany({
      where: { paymentStatus: "Paid" },
      select: { amount: true },
    });
    const revenue = paidOrders.reduce((sum, o) => sum + o.amount, 0);

    const processingPayments = await prisma.invoice.count({
      where: { status: "Processing" },
    });

    const recentOrders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    const pendingPayments = await prisma.invoice.findMany({
      where: { status: "Processing" },
      orderBy: { updatedAt: "desc" },
      take: 5,
    });

    return {
      ok: true,
      stats: {
        totalClients,
        totalOrders,
        activeOrders,
        revenue,
        processingPayments,
      },
      recentOrders: recentOrders.map(mapPrismaOrder),
      pendingPayments,
    };
  } catch (error: any) {
    return { ok: false, error: error?.message || "Unable to load dashboard data." };
  }
}
