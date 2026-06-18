"use server";

import { z } from "zod";
import { getContactsCollection } from "../../database/db";

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().optional(),
  message: z.string().min(1),
});

export async function submitContactAction(input: unknown) {
  try {
    const parsed = contactSchema.parse(input);
    const collection = await getContactsCollection();
    await collection.insertOne({
      ...parsed,
      status: "new",
      createdAt: new Date(),
    });

    return { ok: true };
  } catch (error: any) {
    return { ok: false, error: error?.message || "Invalid contact message." };
  }
}
