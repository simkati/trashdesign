import Link from "next/link";
import { AiOutlineFileAdd } from "react-icons/ai";
import { fetchFilteredProducts, fetchProductsPages } from "../lib/data";
import { Product } from "../util/types";
import ProductCard from "../ui/admin/ProductCard";
import Pagination from "../ui/admin/Pagination";
import Search from "../ui/admin/Search";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    status?: string;
    category?: string;
  };
}) {
  const query = searchParams?.query || "";
  const status = searchParams?.status || "";
  const category = searchParams?.category || "";
  const currentPage = Number(searchParams?.page) || 1;
  const products: Product[] = await fetchFilteredProducts(
    query,
    status,
    category,
    currentPage
  );
  const totalPages = await fetchProductsPages(query, status, category);

  return (
    <main className="max-w-4xl mx-auto">
      <div className="mb-3">
        <Search />
        <Link href="/admin/create" className="float-right">
          <button className="bg-green-800 font-semibold text-white p-2 rounded">
            <AiOutlineFileAdd className="inline" />
            <span className="ml-2">Új termék</span>
          </button>
        </Link>
      </div>
      {products.length === 0 && (
        <div className="justify-center align-middle fixed top-1/2 left-1/2 h-screen">
          <p className="text-lg  mx-auto">Nincsenek termékek</p>
        </div>
      )}
      <div className="pt-5 clear-both">
        <ul className="grid-cols-3 grid gap-3">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
      {totalPages > 1 && (
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </main>
  );
}
