"use client";

import { HiMenu } from "react-icons/hi";
import clsx from "clsx";
import LangSelector from "./Language";
import Navlinks from "./Navlinks";
import { useState } from "react";

export default function BtnSection() {
  const [mobilMenu, setMobilMenu] = useState(false);

  return (
    <div className="float-right mt-2">
      <div
        className={clsx("right-10 inline-block md:visible", {
          invisible: !mobilMenu,
        })}
      >
        <Navlinks />
      </div>
      <LangSelector />
      <button
        className="ml-3 md:ml-0 md:invisible inline-block md:w-0 lg:w-fit"
        onClick={() => setMobilMenu(!mobilMenu)}
      >
        <HiMenu className="h-7 w-7 inline" />
      </button>
    </div>
  );
}
