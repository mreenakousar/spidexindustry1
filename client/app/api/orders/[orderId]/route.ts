import { NextResponse } from "next/server";
import { z } from "zod";
import {
  deleteOrderAction,
  updateOrderAction,
} from "../../../../src/actions/orders";

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

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ orderId: string }> },
) {
  const { orderId } = await params;
  try {
    const body = await req.json();
    const values = orderSchema.parse({
      ...body,
      quantity: Number(body.quantity),
      amount: Number(body.amount),
    });
    const result = await updateOrderAction(orderId, values);
    return NextResponse.json(result, { status: result.ok ? 200 : 404 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Unable to update order." }, { status: 400 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ orderId: string }> },
) {
  const { orderId } = await params;
  const result = await deleteOrderAction(orderId);
  return NextResponse.json(result, { status: result.ok ? 200 : 404 });
}
