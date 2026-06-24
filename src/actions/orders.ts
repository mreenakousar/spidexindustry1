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
  paymentStatus: z.enum(["Paid", "Pending", "Failed"]),
  productionStatus: z.string().min(2),
  status: z.enum(["Pending", "In Production", "Completed", "Cancelled"]),
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
    productionTimeline: Array.isArray(row.productionTimeline) ? row.productionTimeline : [],
  };
}

const SEED_ORDERS = [
  {
    orderId: "ORD-5301",
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
    productionTimeline: JSON.stringify([
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
    ]),
  },
  {
    orderId: "ORD-5294",
    clientName: "Summit Sportswear",
    product: "Team Training Jacket",
    quantity: 960,
    country: "United Kingdom",
    paymentStatus: "Pending",
    productionStatus: "Fabric Sourcing",
    status: "Pending",
    orderDate: "2026-05-28",
    amount: 61440,
    fabricDetails: "Softshell with breathable mesh lining and TPU water-resistant finish.",
    printingDetails: "Heat transfer crest artwork with team numbering.",
    techPackFile: "Summit_Jacket_Techpack.pdf",
    clientPhone: "+44 20 7946 0871",
    billingEmail: "procurement@summitsports.co.uk",
    address: "88 Queen St, London, UK",
    shippingMethod: "Standard Air Freight",
    estimatedDelivery: "2026-07-02",
    paymentMethod: "Credit Card",
    productionTimeline: JSON.stringify([
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
    ]),
  },
  {
    orderId: "ORD-5278",
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
    productionTimeline: JSON.stringify([
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
    ]),
  },
];

async function seedOrdersIfEmpty() {
  const count = await prisma.order.count();
  if (count > 0) return;
  for (const order of SEED_ORDERS) {
    await prisma.order.create({ data: order as any });
  }
}

export async function listOrdersAction(): Promise<OrdersResult> {
  try {
    await requireAdminSession();
    await seedOrdersIfEmpty();

    const rows = await prisma.order.findMany({ orderBy: { createdAt: "desc" } });
    return { ok: true, orders: rows.map(mapPrismaOrder) };
  } catch (error: any) {
    return { ok: false, error: error?.message || "Unable to load orders." };
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

export async function deleteOrderAction(orderId: string) {
  try {
    await requireAdminSession();
    await prisma.order.delete({ where: { orderId } });
    return { ok: true };
  } catch (error: any) {
    return { ok: false, error: error?.message || "Unable to delete order." };
  }
}
