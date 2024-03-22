"use client";

import Navlinks from "./Navlinks";
import { useState, useEffect } from "react";
import clsx from "clsx";
import Link from "next/link";
import NextImage from "next/image";

export default function FixNavBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const listenToScroll = () => {
      let heightToHideFrom = 100;
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;

      if (winScroll > heightToHideFrom) {
        !isVisible && // to limit setting state only the first time
          setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, [isVisible]);

  return (
    <div
      className={clsx(
        "fixed top-0 w-full z-20 right-0 bg-white h-0 overflow-hidden transition-[height]",
        { "h-12 my-auto": isVisible }
      )}
    >
      {isVisible && (
        <Link
          href="/"
          className="fixed left-2 lg:left-6 top-1 ml:0 lg:ml-5 invisible md:visible"
        >
          <NextImage
            alt="logo"
            width={100}
            height={12}
            src="/logoOrange.png"
            className="mx-auto"
          />
        </Link>
      )}
      <div className="absolute  right-5 lg:right-10 top-3">
        <Navlinks />
      </div>
    </div>
  );
}
