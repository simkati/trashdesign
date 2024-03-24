"use client";

import Link from "next/link";
import { Product } from "../../util/types";
import NextImage from "next/image";
import { MdDoNotDisturb } from "react-icons/md";
import { useEffect, useState } from "react";

type LatestProdCardProp = {
  product: Product;
};

export default function LatestProdCard({ product }: LatestProdCardProp) {
  const ImageUrl = product.gallery[0];
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    setDescription(product.description_hu);
  }, [product]);

  return (
    <Link href={`/prod/${product.id}/edit`} className="cursor-pointer">
      <div className="w-[360] lg:w-[410px] h-60 border border-gray-300 rounded shadow-gray-300 shadow-md relative">
        <p className="text-center py-2 capitalize">{product.title_hu}</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="w-48 h-48 overflow-hidden rounded inline-block mx-2">
            {product.gallery.length > 0 ? (
              <NextImage
                src={ImageUrl}
                alt="termek"
                width={190}
                style={{ objectFit: "cover", width: "190px", height: "190px" }}
                height={190}
              />
            ) : (
              <div className="bg-gray-300 w-48 h-48">
                <p className="text-center pt-6">Nincs kép</p>
                <MdDoNotDisturb className="mx-auto mt-4 text-4xl" />
              </div>
            )}
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: description }}
            className="mx-2"
          ></div>
        </div>
      </div>
    </Link>
  );
}
