import Image from "next/image";
import Link from "next/link";
import { AiOutlineFileAdd } from "react-icons/ai";
import { fetchFilteredProducts } from "../lib/data";
import { Product } from "../util/types";
import ProductCard from "../ui/admin/ProductCard";

export default async function Page() {
  const products: Product[] = await fetchFilteredProducts("", 1);

  return (
    <main className="max-w-4xl mx-auto">
      <Link href="/admin/create" className="float-right mr-5">
        <button className="border p-2">
          <AiOutlineFileAdd className="inline" />
          <span className="ml-2">Új termék</span>
        </button>
      </Link>
      {products.length === 0 && (
        <div className="justify-center align-middle fixed top-1/2 left-1/2 h-screen">
          <p className="text-lg  mx-auto">Nincsenek termékek</p>
        </div>
      )}
      <div>
        <ul className="grid-cols-3 grid gap-2">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
