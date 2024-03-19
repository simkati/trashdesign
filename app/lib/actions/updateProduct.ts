"use server";

import { ProductFormSchema } from "../schema";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadImages, deleteImages } from "../images";

const updateProductSchema = ProductFormSchema.omit({
  modify_date: true,
});

export default async function updateProduct(formData: FormData) {
  // form validation

  const validateForm = updateProductSchema.safeParse(
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
    id,
    title_hu,
    title_de,
    title_gb,
    price,
    status,
    category,
    description_hu,
    description_de,
    description_gb,
    gallery,
    gallery_folder,
    deletedImages,
  } = validateForm.data;

  const date = new Date().toISOString();

  // upload images to cloudinary and get urls

  const images: FormDataEntryValue[] = formData.getAll("file");
  let { urls, error } = await uploadImages(images, gallery_folder);

  if (error) {
    return {
      error: "Képfeltöltés hiba: " + error,
      status: 500,
    };
  }

  const deletedUrls = deletedImages?.split(",");

  if (urls) {
    // update product into database
    const databaseUrls = gallery.length > 0 ? gallery.split(",") : [];
    const galleryUrls = databaseUrls.concat(urls);
    console.log("urls server " + urls);
    console.log("galleryUrls server lendth " + galleryUrls.length);

    if (deletedUrls) {
      deleteImages(deletedUrls);
    }

    try {
      // @ts-ignore
      await sql` UPDATE products SET title_hu=${title_hu}, title_de=${title_de}, title_gb=${title_gb}, price=${price}, status=${status}, category=${category}, description_hu=${description_hu}, description_de=${description_de}, description_gb=${description_gb}, modify_date=${date}, gallery=${galleryUrls} WHERE id=${id} 
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
