import { fetchLatestProducts } from "@/app/lib/data";
import { Product } from "@/app/util/types";
import LatestProdCard from "./LatestProdCard";

export default async function LatestProducts() {
  const products: Product[] = await fetchLatestProducts();

  return (
    <div className="mt-10">
      <div className="grid md:grid-cols-2 gap-3">
        {products.map((product: Product) => (
          <div key={product.id}>
            <LatestProdCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
