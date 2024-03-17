import Image from "next/image";
import { fetchProductById } from "../../../lib/data";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [product] = await Promise.all([fetchProductById(id)]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      termék szerkesztése
    </main>
  );
}
