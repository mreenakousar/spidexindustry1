"use server";

import { z } from "zod";
import { getRfqsCollection } from "../../database/db";

const rfqSchema = z.object({
  fullName: z.string().min(2),
  brandName: z.string().min(1),
  email: z.string().email(),
  whatsapp: z.string().optional(),
  productType: z.string().min(1),
  quantity: z.number().min(1),
  fabricType: z.string().optional(),
  printingMethod: z.string().optional(),
  sizeChart: z.string().optional(),
  deliveryCountry: z.string().min(1),
  techPackFileName: z.string().optional(),
  notes: z.string().optional(),
});

export async function submitRfqAction(input: unknown) {
  try {
    const payload =
      typeof input === "object" && input !== null
        ? (input as Record<string, unknown>)
        : ({} as Record<string, unknown>);
    const parsed = rfqSchema.parse({
      ...payload,
      quantity: Number((payload as any).quantity),
    });
    const collection = await getRfqsCollection();
    await collection.insertOne({
      ...parsed,
      status: "new",
      createdAt: new Date(),
    });

    return { ok: true };
  } catch (error: any) {
    return { ok: false, error: error?.message || "Invalid RFQ submission." };
  }
}
