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
      <nav className="gap-3 flex">
        {links.map((link) => {
          return (
            <Link
              className={clsx("inline-block hover:underline", {
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
