"use server";

import { capabilities, portfolio, services } from "@/data/site";
import prisma from "@/lib/prisma";

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
