"use server";

import { ProductFormSchema } from "./schema";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { z } from "zod";
import { slugify } from "../util/commonUtils";
import { uploadImages, createFolder } from "./images";

const CreateProduct = ProductFormSchema.omit({
  id: true,
  modify_date: true,
  gallery: true,
});

export async function createProduct(formData: FormData) {
  // form validation

  const validateForm = CreateProduct.safeParse(
    Object.fromEntries(formData.entries())
  );

  // TODO check titleHu is not exist in database

  if (!validateForm.success) {
    return {
      error: "Hibás űrlap",
      fieldErrors: validateForm.error.flatten().fieldErrors,
    };
  }

  const {
    title_hu,
    title_de,
    title_gb,
    price,
    status,
    category,
    description_hu,
    description_de,
    description_gb,
  } = validateForm.data;

  const date = new Date().toISOString().split("T")[0];
  const galleryFolder = slugify(title_hu);

  // upload images to cloudinary and get urls

  const images: FormDataEntryValue[] = formData.getAll("file");
  const { urls, error } = await uploadImages(images, galleryFolder);

  if (error) {
    return {
      error: "Képfeltöltés hiba: " + error,
      status: 500,
    };
  }

  if (urls) {
    // if no image create empty folder

    if (urls.length === 0) {
      await createFolder(galleryFolder);
    }

    // insert product into database

    const gallery = `'${urls.join("', '")}'`;

    try {
      await sql`
      INSERT INTO products (title_hu, title_de, title_gb, price, status, category, description_hu, description_de, description_gb, modify_date, gallery_folder, gallery)
      VALUES (${title_hu}, ${title_de}, ${title_gb}, ${price}, ${status}, ${category}, ${description_hu}, ${description_de}, ${description_gb}, ${date}, ${galleryFolder}, ${urls}) 
    `;
    } catch (error) {
      return {
        error: "Adatbázis hiba: " + error,
        status: 500,
      };
    }
  }
  revalidatePath("/admin/create");
  redirect("/admin");
}
