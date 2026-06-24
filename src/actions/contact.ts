"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().optional(),
  message: z.string().min(1),
});

export async function submitContactAction(input: unknown) {
  try {
    const parsed = contactSchema.parse(input);

    await prisma.contact.create({
      data: {
        ...parsed,
        status: "new",
      },
    });

    return { ok: true };
  } catch (error: any) {
    return { ok: false, error: error?.message || "Invalid contact message." };
  }
}
