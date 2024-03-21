"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useSession } from "next-auth/react";

export default function Navlinks() {
  const links = [
    { text: "rólunk", href: "/" },
    { text: "termékeink", href: "/termekeink" },
    { text: "kapcsolat", href: "/kapcsolat" },
    { text: "vásárlói információk", href: "/informaciok" },
    { text: "gyüjtemény", href: "/gyujtemeny" },
    { text: "korábbi munkáink", href: "/eladva" },
  ];

  const pathname = usePathname();
  /* const { data, status } = useSession();

  console.log("auth ", status);
  console.log("data ", data);

  if (status === "authenticated") {
    return <p>sign out</p>;
  }
 */
  return (
    <>
      <nav className="float-right mr-4">
        {links.map((link) => {
          return (
            <Link
              className={clsx("inline-block p-2 hover:underline", {
                "text-blue-600": pathname === link.href,
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
