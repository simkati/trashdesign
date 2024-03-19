import { fetchProductById } from "../../../lib/data";
import ProductForm from "@/app/ui/admin/productForm/ProductForm";
import Link from "next/link";
import Tooltip from "@/app/ui/common/Tooltip";
import { IoArrowBackSharp } from "react-icons/io5";
import { Product } from "@/app/util/types";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const product = await fetchProductById(id);

  return (
    <main className="max-w-4xl mx-auto">
      <div className="grid grid-cols-3">
        <Tooltip message="vissza">
          <Link href="/admin">
            <IoArrowBackSharp size={30} />
          </Link>
        </Tooltip>
        <h1 className="text-2xl col-span-2">Termék szerkesztése</h1>
      </div>
      <ProductForm product={product} />
    </main>
  );
}
