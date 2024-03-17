import { z } from "zod";

export const ProductFormSchema = z.object({
  id: z.string().uuid(),
  title_hu: z.string().min(1),
  title_de: z.string(),
  title_gb: z.string(),
  price: z.coerce.number(),
  status: z.enum(["SALE", "BOOKED", "SOLD", "INACTIVE"]),
  category: z.enum([
    "FURNITURE",
    "LAMP",
    "ORNAMENT",
    "TRIFLE",
    "MATERIALS",
    "COFFEE",
    "COLLECTION",
  ]),
  description_hu: z.string(),
  description_de: z.string(),
  description_gb: z.string(),
  gallery: z.array(z.string()),
  modify_date: z.string(),
});
