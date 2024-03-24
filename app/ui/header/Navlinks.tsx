"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Navlinks() {
  const links = [
    { text: "rólunk", href: "/" },
    { text: "termékeink", href: "/termekeink" },
    { text: "kapcsolat", href: "/kapcsolat" },
    { text: "vásárlói információk", href: "/informaciok" },
    { text: "gyüjtemény", href: "/gyujtemeny" },
    { text: "régi dicsőségünk", href: "/eladva" },
  ];

  const pathname = usePathname();

  return (
    <>
      <nav className="bg-white z-20 p-2 fixed top-0 right-10 md:right-0 md:z-0 md:relative md:bg-none md:p-0 md:gap-3 md:flex">
        {links.map((link) => {
          return (
            <Link
              className={clsx("md:inline-block hover:underline", {
                "text-orange-600": pathname === link.href,
              })}
              key={link.text}
              href={link.href}
            >
              <p>{link.text}</p>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
