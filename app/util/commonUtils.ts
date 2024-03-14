import { ProductStatus, ProductCategory } from "./types";

export function slugify(str: string) {
  const slug = str
    .normalize("NFD")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug;
}

export function getStatus(status: ProductStatus) {
  switch (status) {
    case ProductStatus.Booked:
      return "Lefoglalva";
    case ProductStatus.Inactive:
      return "Inaktív";
    case ProductStatus.Sale:
      return "Eladó";
    case ProductStatus.Sold:
      return "Eladva";
    default:
      return "error";
  }
}

export function getCategory(category: ProductCategory) {
  switch (category) {
    case ProductCategory.Coffee:
      return "Kávé";
    case ProductCategory.Collection:
      return "Gyűjtemény";
    case ProductCategory.Furniture:
      return "Bútor";
    case ProductCategory.Lamp:
      return "Lámpa";
    case ProductCategory.Materials:
      return "Anyagok";
    case ProductCategory.Ornament:
      return "Dísztárgy";
    case ProductCategory.Trifle:
      return "Aprócikk";
    default:
      return "error";
  }
}
