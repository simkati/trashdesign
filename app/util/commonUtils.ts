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

//export function statuses() {
export const statusOptions: { value: ProductStatus; label: string }[] = [
  { value: ProductStatus.Inactive, label: "Inaktív" },
  { value: ProductStatus.Sale, label: "Eladó" },
  { value: ProductStatus.Booked, label: "Lefoglalva" },
  { value: ProductStatus.Sold, label: "Eladva" },
];
//return status;
//}

//export function categories() {
export const categoryOptions: { value: ProductCategory; label: string }[] = [
  { value: ProductCategory.Furniture, label: "Bútor" },
  { value: ProductCategory.Lamp, label: "Lámpa" },
  { value: ProductCategory.Ornament, label: "Dísztárgy" },
  { value: ProductCategory.Trifle, label: "Aprócikk" },
  { value: ProductCategory.Materials, label: "Alapanyag" },
  { value: ProductCategory.Coffee, label: "Kávé mánia" },
  { value: ProductCategory.Collection, label: "Gyüjtemény" },
];
// return category;
//}

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
