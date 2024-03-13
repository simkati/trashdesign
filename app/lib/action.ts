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
  modifyDate: true,
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
    titleHu,
    titleDe,
    titleGb,
    price,
    status,
    category,
    descriptionHu,
    descriptionDe,
    descriptionGb,
  } = validateForm.data;

  const date = new Date().toISOString().split("T")[0];
  const galleryFolder = slugify(titleHu);

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
      createFolder(galleryFolder);
    }

    // insert product into database

    const gallery = urls.join(",");

    try {
      await sql`
      INSERT INTO products (titleHu, titleDe, titleGb, price, status, category, descriptionHu, descriptionDe, descriptionGb, modifyDate, galleryFolder, gallery)
      VALUES (${titleHu}, ${titleDe}, ${titleGb}, ${price}, ${status}, ${category}, ${descriptionHu}, ${descriptionDe}, ${descriptionGb}, ${date}, ${galleryFolder}, ARRAY [${gallery}]) 
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
