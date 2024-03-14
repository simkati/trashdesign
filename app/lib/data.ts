import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { Product } from "../util/types";

const ITEMS_PER_PAGE = 15;
export async function fetchFilteredProducts(
  query: string,
  currentPage: number
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const products = await sql<Product>`
      SELECT
        id,
        title_hu,
        status,
        category,
        modify_date,
        gallery
      FROM products
      ORDER BY modify_date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};
    `;

    return products.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch products.");
  }
}
