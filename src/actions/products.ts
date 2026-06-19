"use server";

import { capabilities, portfolio, services } from "../../data/site";
import { productLibrary } from "../../data/clientPortal";

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
  return productLibrary;
}
