"use server";

import prisma from "@/lib/prisma";
import { getCurrentUserAction } from "./users";

async function requireAdminSession() {
  const user = await getCurrentUserAction();
  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized");
  }
  return user;
}

export async function listAdminInvoicesAction() {
  await requireAdminSession();

  return prisma.invoice.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function listAdminPaymentsAction() {
  await requireAdminSession();

  return prisma.payment.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function verifyInvoiceAction(
  invoiceId: string,
  status: "Paid" | "Rejected",
  rejectionReason?: string
) {
  const adminUser = await requireAdminSession();

  const invoice = await prisma.invoice.findUnique({
    where: { invoiceId },
  });

  if (!invoice) throw new Error("Invoice not found.");

  if (status === "Paid") {
    // 1. Update invoice status to Paid, clear any rejection reason
    await prisma.invoice.update({
      where: { invoiceId },
      data: {
        status: "Paid",
        rejectionReason: null,
      },
    });

    // 2. Mark matching payment record as Completed
    await prisma.payment.updateMany({
      where: { invoice: invoiceId },
      data: {
        status: "Completed",
      },
    });

    // 3. Advance order status + timeline
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

    // 4. Create Notification for client
    await prisma.notification.create({
      data: {
        title: "Payment Approved & Order In Production",
        description: `Your payment of ${invoice.amount} for Invoice ${invoiceId} (Order ${invoice.orderId}) has been verified and approved by the admin.`,
        date: new Date().toLocaleDateString(),
        category: "Finance",
        clientEmail: invoice.billingEmail,
      },
    });

  } else if (status === "Rejected") {
    if (!rejectionReason) {
      throw new Error("A reason is required when rejecting a payment proof.");
    }

    // 1. Update invoice status to Rejected, set rejectionReason
    await prisma.invoice.update({
      where: { invoiceId },
      data: {
        status: "Rejected",
        rejectionReason,
      },
    });

    // 2. Mark matching payment record as Failed
    await prisma.payment.updateMany({
      where: { invoice: invoiceId },
      data: {
        status: "Failed",
      },
    });

    // 3. Create Notification for client
    await prisma.notification.create({
      data: {
        title: "Payment Proof Rejected",
        description: `Your payment proof for Invoice ${invoiceId} has been rejected. Reason: ${rejectionReason}. Please upload a valid receipt.`,
        date: new Date().toLocaleDateString(),
        category: "Finance",
        clientEmail: invoice.billingEmail,
      },
    });
  }

  return { ok: true };
}
