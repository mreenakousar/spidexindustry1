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
  rejectionReason?: string,
  verifiedAmount?: number
) {
  const adminUser = await requireAdminSession();

  const invoice = await prisma.invoice.findUnique({
    where: { invoiceId },
  });

  if (!invoice) throw new Error("Invoice not found.");

  if (status === "Paid") {
    // Parse original amount
    const originalAmountVal = parseFloat(invoice.amount.replace(/[^0-9.-]+/g, ""));
    const actualVerifiedAmount =
      verifiedAmount && verifiedAmount > 0
        ? verifiedAmount
        : originalAmountVal;

    const formattedVerifiedStr = `$${actualVerifiedAmount.toLocaleString()}`;

    // 1. Update invoice status to Paid, clear any rejection reason, and set verified amount
    await prisma.invoice.update({
      where: { invoiceId },
      data: {
        status: "Paid",
        amount: formattedVerifiedStr,
        rejectionReason: null,
      },
    });

    // 2. Mark matching payment record as Completed with verified amount
    await prisma.payment.updateMany({
      where: { invoice: invoiceId },
      data: {
        status: "Completed",
        amount: formattedVerifiedStr,
      },
    });

    // 3. Advance order status + timeline
    const order = await prisma.order.findFirst({
      where: { orderId: invoice.orderId },
    });

    if (order) {
      // Re-fetch all invoices under this order to compute total paid so far
      const updatedInvoices = await prisma.invoice.findMany({
        where: { orderId: order.orderId },
      });

      const totalPaid = updatedInvoices
        .filter((inv) => inv.status === "Paid")
        .reduce((sum, inv) => {
          const val = parseFloat(inv.amount.replace(/[^0-9.-]+/g, ""));
          return sum + (isNaN(val) ? 0 : val);
        }, 0);

      // Check if there is a remaining balance (use > 1 for float precision)
      const remainingBalance = order.amount - totalPaid;

      let paymentStatus = "Paid";
      if (remainingBalance > 1) {
        paymentStatus = "Partially Paid";

        // Create a new invoice & payment record for the remaining amount
        const invoiceCount = await prisma.invoice.count({
          where: { orderId: order.orderId },
        });

        const cleanOrderId = order.orderId.replace("ORD-", "");
        const newInvoiceId = `INV-${cleanOrderId}-R${invoiceCount}`;
        const formattedRemainingStr = `$${remainingBalance.toLocaleString()}`;

        await prisma.invoice.create({
          data: {
            invoiceId: newInvoiceId,
            date: new Date().toLocaleDateString(),
            amount: formattedRemainingStr,
            status: "Pending",
            customer: invoice.customer,
            orderId: order.orderId,
            pdfUrl: invoice.pdfUrl,
            billingEmail: invoice.billingEmail,
          },
        });

        await prisma.payment.create({
          data: {
            paymentId: `PAY-${cleanOrderId}-R${invoiceCount}`,
            invoice: newInvoiceId,
            date: new Date().toLocaleDateString(),
            amount: formattedRemainingStr,
            status: "Pending",
            method: "To be confirmed",
            billingEmail: invoice.billingEmail,
          },
        });
      }

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
          paymentStatus,
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
        description: `Your payment of ${formattedVerifiedStr} for Invoice ${invoiceId} (Order ${invoice.orderId}) has been verified and approved by the admin.`,
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

export async function getInvoicePaymentDetailsAction(invoiceId: string) {
  await requireAdminSession();

  const payment = await prisma.payment.findFirst({
    where: { invoice: invoiceId },
  });

  return payment;
}
