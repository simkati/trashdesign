import { z } from "zod";

export const ProductFormSchema = z.object({
  id: z.string().uuid(),
  titleHu: z.string().min(1),
  titleDe: z.string(),
  titleGb: z.string(),
  price: z.coerce.number(),
  status: z.enum(["SALE", "BOOKED", "SOLED", "INACTIVE"]),
  category: z.enum([
    "FURNITURE",
    "LAMP",
    "ORNAMENT",
    "TRIFLE",
    "MATERIALS",
    "COFFEE",
    "COLLECTION",
  ]),
  descriptionHu: z.string(),
  descriptionDe: z.string(),
  descriptionGb: z.string(),
  gallery: z.array(z.string()),
  modifyDate: z.string(),
});
