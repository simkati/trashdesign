import Link from "next/link";
import { Product } from "../../util/types";

type ProductCardProp = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProp) {
  return (
    <Link href={`/create/${product.id}`} className="cursor-pointer">
      <div className="w-60 h-60 border border-gray-300 rounded shadow-gray-300">
        <p className="text-center py-2">{product.title_hu}</p>
      </div>
    </Link>
  );
}
