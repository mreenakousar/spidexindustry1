"use server";

import { capabilities, portfolio, services } from "@/data/site";
import prisma from "@/lib/prisma";
import { getCurrentUserAction } from "./users";

async function requireAdminSession() {
  const user = await getCurrentUserAction();
  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized");
  }
  return user;
}

export async function getCapabilitiesAction() {
  return capabilities;
}

export async function getServicesAction() {
  return services;
}

export async function getPortfolioAction() {
  return portfolio;
}

export async function getProductLibraryAction() {
  try {
    return await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.error("Error in getProductLibraryAction:", err);
    return [];
  }
}

export async function createProductAction(input: {
  productId: string;
  name: string;
  description: string;
  image: string;
  status: string;
  clientEmail?: string;
}) {
  try {
    await requireAdminSession();
    const product = await prisma.product.create({
      data: {
        productId: input.productId,
        name: input.name,
        description: input.description,
        image: input.image || "/products/jersey.jpg",
        status: input.status || "Saved",
        clientEmail: input.clientEmail || null,
      },
    });
    return { ok: true, product };
  } catch (error: any) {
    return { ok: false, error: error?.message || "Unable to create product." };
  }
}

export async function updateProductAction(
  productId: string,
  input: {
    name: string;
    description: string;
    image: string;
    status: string;
    clientEmail?: string;
  }
) {
  try {
    await requireAdminSession();
    const product = await prisma.product.update({
      where: { productId },
      data: {
        name: input.name,
        description: input.description,
        image: input.image,
        status: input.status,
        clientEmail: input.clientEmail || null,
      },
    });
    return { ok: true, product };
  } catch (error: any) {
    return { ok: false, error: error?.message || "Unable to update product." };
  }
}

export async function deleteProductAction(productId: string) {
  try {
    await requireAdminSession();
    await prisma.product.delete({
      where: { productId },
    });
    return { ok: true };
  } catch (error: any) {
    return { ok: false, error: error?.message || "Unable to delete product." };
  }
}
