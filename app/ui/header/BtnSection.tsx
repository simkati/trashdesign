"use client";

import { HiMenu } from "react-icons/hi";
import clsx from "clsx";
import LangSelector from "./Language";
import Navlinks from "./Navlinks";
import { useState } from "react";

export default function BtnSection() {
  const [mobilMenu, setMobilMenu] = useState(false);

  return (
    <div className="float-right flex mt-2 md:mt-0">
      <LangSelector />
      <button
        className="ml-3 md:ml-0 md:invisible flex"
        onClick={() => setMobilMenu(!mobilMenu)}
      >
        <HiMenu className="h-7 w-7 inline align-top mt-1" />
      </button>
      <div
        className={clsx("absolute bottom-1 lg:bottom-0 right-10 md:visible", {
          invisible: !mobilMenu,
        })}
      >
        <Navlinks />
      </div>
    </div>
  );
}
