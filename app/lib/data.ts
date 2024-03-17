import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { Product, ProductCategory, ProductStatus } from "../util/types";

export async function fetchProductById(id: string) {
  noStore();
  try {
    const product = await sql<Product>`
    SELECT
      id,
      title_hu,
      status,
      category,
      modify_date,
      gallery
    FROM products
    WHERE id = ${id};
    `;

    return product;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch product.");
  }
}

const ITEMS_PER_PAGE = 15;

export async function fetchFilteredProducts(
  query: string,
  status: ProductStatus | string,
  category: ProductCategory | string,
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
      WHERE
        title_hu ILIKE ${`%${query}%`} AND
        status ILIKE ${`%${status}%`} AND
        category ILIKE ${`%${category}%`}
      ORDER BY modify_date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};
    `;

    return products.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch products.");
  }
}

export async function fetchProductsPages(
  query: string,
  status: ProductStatus | string,
  category: ProductCategory | string
) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM products
    WHERE
      title_hu ILIKE ${`%${query}%`} AND
      status ILIKE ${`%${status}%`} AND
      category ILIKE ${`%${category}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of products.");
  }
}
