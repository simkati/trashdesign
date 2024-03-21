"use server";

import { ProductFormSchema } from "../schema";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { slugify } from "../../util/commonUtils";
import { uploadImages, createFolder } from "../images";
import { fetchProductByTitleHu } from "@/app/lib/data";

const createProductSchema = ProductFormSchema.omit({
  id: true,
  modify_date: true,
  gallery: true,
  gallery_folder: true,
  deletedImages: true,
});

export default async function createProduct(formData: FormData) {
  const authc = await auth();

  // form validation
  if (authc) {
    const validateForm = createProductSchema.safeParse(
      Object.fromEntries(formData.entries())
    );

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

    //check title_hu is unique
    try {
      const titleExist = await fetchProductByTitleHu(title_hu);
      console.log("exist" + titleExist);
      if (titleExist) {
        return {
          error:
            "A magyar név már létezik az adatbázisban. Válasszon másik nevet.",
          status: 500,
        };
      }
    } catch (error) {
      return {
        error: "Adatbázis hiba: " + error,
        status: 500,
      };
    }
    const date = new Date().toISOString();
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
        // @ts-ignore
        await sql` INSERT INTO products (title_hu, title_de, title_gb, price, status, category, description_hu, description_de, description_gb, modify_date, gallery_folder, gallery) VALUES (${title_hu}, ${title_de}, ${title_gb}, ${price}, ${status}, ${category}, ${description_hu}, ${description_de}, ${description_gb}, ${date}, ${galleryFolder}, ${urls}) 
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
  } else {
    return {
      error: "No permission",
      status: 500,
    };
  }
}
