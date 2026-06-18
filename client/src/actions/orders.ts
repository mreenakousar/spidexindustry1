"use server";

import { cookies } from "next/headers";
import { z } from "zod";
import { getOrdersCollection, seedOrdersIfEmpty } from "../../database/db";
import { verifyJwt } from "../../database/auth";
import type { Order, OrderStatus, PaymentStatus } from "../../database/models/order";

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
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user = token ? verifyJwt(token) : null;

  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  return user;
}

function mapOrderDocument(order: any): Order {
  return {
    ...order,
    id: order.orderId || order.id,
  };
}

export async function listOrdersAction(): Promise<OrdersResult> {
  try {
    await requireAdminSession();
    await seedOrdersIfEmpty();

    const orders = await (await getOrdersCollection()).find().toArray();
    return { ok: true, orders: orders.map(mapOrderDocument) };
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
    const order = {
      ...parsed,
      orderId,
      productionTimeline: [
        { label: "Order Received", completed: true },
        { label: "Quotation Approved", completed: false },
        { label: "Payment Received", completed: false },
      ],
      fabricDetails: "",
      printingDetails: "",
      techPackFile: "",
      clientPhone: "",
      billingEmail: "",
      address: "",
      shippingMethod: "",
      estimatedDelivery: "",
      paymentMethod: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const collection = await getOrdersCollection();
    await collection.insertOne(order);

    return { ok: true, order: mapOrderDocument(order) };
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

    const collection = await getOrdersCollection();
    const result = await collection.findOneAndUpdate(
      { orderId },
      {
        $set: {
          ...parsed,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" },
    );
    const updatedOrder = (result as any)?.value ?? result;

    if (!updatedOrder) {
      return { ok: false, error: "Order not found." };
    }

    return { ok: true, order: mapOrderDocument(updatedOrder) };
  } catch (error: any) {
    return { ok: false, error: error?.message || "Unable to update order." };
  }
}

export async function deleteOrderAction(orderId: string) {
  try {
    await requireAdminSession();
    const collection = await getOrdersCollection();
    const result = await collection.deleteOne({ orderId });

    if (result.deletedCount === 0) {
      return { ok: false, error: "Order not found." };
    }

    return { ok: true };
  } catch (error: any) {
    return { ok: false, error: error?.message || "Unable to delete order." };
  }
}
