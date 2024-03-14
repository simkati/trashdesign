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
  title_hu: string;
  title_de: string;
  title_gb: string;
  price: number;
  category: ProductCategory;
  status: ProductStatus;
  description_hu: string;
  description_de: string;
  description_gb: string;
  gallery: string[];
  modify_date: string;
  gallery_folder: string;
}
