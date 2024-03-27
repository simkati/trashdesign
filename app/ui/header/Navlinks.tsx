"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Navlinks() {
  const links = [
    { text: "Rólunk", href: "/" },
    { text: "Eladó cuccok", href: "/termekeink" },
    { text: "Régebbi dolgaink", href: "/eladva" },
    { text: "Műhelykedvencek", href: "/gyujtemeny" },
    { text: "Kapcsolat", href: "/kapcsolat" },
    { text: "Információk", href: "/informaciok" },
  ];

  const pathname = usePathname();

  return (
    <>
      <nav className="bg-white z-20 p-2 fixed top-0 right-10 md:right-0 md:z-0 md:relative md:bg-none md:p-0 md:pr-3 inline-block">
        {links.map((link) => {
          return (
            <Link
              className={clsx(
                "md:inline-block hover:underline md:px-1 lg:px-2",
                {
                  "text-orange-600": pathname === link.href,
                }
              )}
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
