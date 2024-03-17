import Link from "next/link";
import { Product } from "../../util/types";
import { getCategory, getStatus } from "../../util/commonUtils";
import NextImage from "next/image";
import { MdDoNotDisturb } from "react-icons/md";

type ProductCardProp = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProp) {
  const ImageUrl = product.gallery[0];

  return (
    <Link href={`/admin/${product.id}/edit`} className="cursor-pointer">
      <div className="w-70 h-56 border border-gray-300 rounded shadow-gray-300 shadow-md relative">
        <p className="text-center py-2 capitalize">{product.title_hu}</p>
        <div className="grid grid-cols-5 gap-3">
          <div className="w-40 h-40 overflow-hidden rounded inline-block mx-2 col-span-3">
            {product.gallery.length > 0 ? (
              <NextImage
                src={ImageUrl}
                alt="termek"
                width={160}
                style={{ objectFit: "cover", width: "160px", height: "160px" }}
                height={160}
              />
            ) : (
              <div className="bg-gray-300 w-40 h-40">
                <p className="text-center pt-6">Nincs kép</p>
                <MdDoNotDisturb className="mx-auto mt-4 text-4xl" />
              </div>
            )}
          </div>
          <div className="mr-3">
            <p className="">{getCategory(product.category)}</p>
          </div>
        </div>
        <p className="absolute right-3 bottom-3">{getStatus(product.status)}</p>
      </div>
    </Link>
  );
}
