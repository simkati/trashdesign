export enum ProductStatus {
  Sale = "SALE",
  Booked = "BOOKED",
  Sold = "SOLD",
  Inactive = "INACTIVE",
}

export enum ProductCategory {
  Furniture = "FURNITURE",
  Lamp = "LAMP",
  Ornament = "ORNAMENT",
  Trifle = "TRIFLE",
  Materials = "MATERIALS",
  Coffee = "COFFEE",
  Collection = "COLLECTION",
}

export interface Product {
  id: string;
  titleHu: string;
  titleDe: string;
  titleGb: string;
  price: number;
  category: ProductCategory;
  status: ProductStatus;
  descriptionHu: string;
  descriptionDe: string;
  descriptionGb: string;
  gallery: string[];
  modifyDate: string;
}
