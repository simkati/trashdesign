"use server";

import { ProductFormSchema } from "./schema";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { z } from "zod";

const CreateProduct = ProductFormSchema.omit({
  id: true,
  modifyDate: true,
  gallery: true,
});

export async function createProduct(formData: FormData) {
  const validateForm = CreateProduct.safeParse(
    Object.fromEntries(formData.entries())
  );

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

  try {
    await sql`
    INSERT INTO products (titleHu, titleDe, titleGb, price, status, category, descriptionHu, descriptionDe, descriptionGb, modifyDate, gallery)
    VALUES (${titleHu}, ${titleDe}, ${titleGb}, ${price}, ${status}, ${category}, ${descriptionHu}, ${descriptionDe}, ${descriptionGb}, ${date}, '{}') 
  `;
  } catch (error) {
    return {
      error: "Something went wrong " + error,
      status: 500,
    };
  }
  revalidatePath("/admin/create");
  redirect("/admin");
}
