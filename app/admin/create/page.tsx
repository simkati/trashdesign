import Image from "next/image";
import { IoArrowBackSharp } from "react-icons/io5";
import { HU, GB, DE } from "country-flag-icons/react/3x2";
import Link from "next/link";
import Tooltip from "@/app/ui/common/Tooltip";
import { productCategory, productStatus } from "@/app/util/types";
import Tiptap from "@/app/ui/common/TipTapEditor";

export default function Page() {
  const status: { value: productStatus; label: string }[] = [
    { value: productStatus.Inactive, label: "Inaktív" },
    { value: productStatus.For_Sale, label: "Eladó" },
    { value: productStatus.Booked, label: "Lefoglalva" },
    { value: productStatus.Sold, label: "Eladva" },
  ];

  const category: { value: productCategory; label: string }[] = [
    { value: productCategory.Furniture, label: "Bútor" },
    { value: productCategory.Lamp, label: "Lámpa" },
    { value: productCategory.Ornament, label: "Dísztárgy" },
    { value: productCategory.Trifle, label: "Aprócikk" },
    { value: productCategory.Materials, label: "Alapanyag" },
    { value: productCategory.Coffee, label: "Kávé mánia" },
    { value: productCategory.Collection, label: "Gyüjtemény" },
  ];

  return (
    <main className="max-w-4xl mx-auto">
      <Tooltip message="vissza">
        <Link href="/admin">
          <IoArrowBackSharp size={30} />
        </Link>
      </Tooltip>
      <form className="mt-10">
        <fieldset>
          <legend>Termék neve</legend>
          <div className="my-2">
            <HU title="Magyar" className="mr-3 w-8 inline" />
            <input
              type="text"
              name="name_hu"
              className="border w-[calc(100%-44px)]"
            />
          </div>
          <div className="my-2">
            <DE title="Német" className="mr-3 w-8 inline" />
            <input
              type="text"
              name="name_de"
              className="border w-[calc(100%-44px)]"
            />
          </div>
          <div className="my-2">
            <GB title="Angol" className="mr-3 w-8 inline" />
            <input
              type="text"
              name="name_gb"
              className="border w-[calc(100%-44px)]"
            />
          </div>
        </fieldset>
        <fieldset className="grid grid-cols-3 gap-2">
          <div className="my-2">
            <label>
              Ár:
              <input type="number" name="price" className="border ml-4 w-20" />
            </label>
            <span className="pl-2">Euro</span>
          </div>
          <label className="my-2">
            Státusz:
            <select className="ml-3 px-3 py-2">
              {status.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
          <label className="my-2">
            Kategória:
            <select className="ml-3 px-3 py-2">
              {category.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
        </fieldset>
        <Tiptap />
      </form>
    </main>
  );
}
