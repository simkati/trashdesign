import Image from "next/image";
import Link from "next/link";
import { AiOutlineFileAdd } from "react-icons/ai";

export default function Page() {
  return (
    <main className="max-w-4xl mx-auto">
      admin fő oldal
      <Link href="/admin/create" className="float-right mr-5">
        <button className="border p-2">
          <AiOutlineFileAdd className="inline" />
          <span className="ml-2">Új termék</span>
        </button>
      </Link>
    </main>
  );
}
