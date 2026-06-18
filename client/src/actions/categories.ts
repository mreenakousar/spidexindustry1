"use server";

import { productCategories } from "../../data/site";

export async function getProductCategoriesAction() {
  return productCategories;
}
