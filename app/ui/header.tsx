import Navlinks from "./navlinks";
import Link from "next/link";
import NextImage from "next/image";
import { signOut, auth } from "@/auth";
import { FaPowerOff } from "react-icons/fa";

export default async function Header() {
  const authc = await auth();

  return (
    <header className="my-5 mx-10">
      <Link href="/" className="inline-block">
        <NextImage
          alt="logo"
          width={150}
          height={20}
          src="/logoOrange.png"
          className="mx-auto"
        />
        <p className="text-xl">Régi tárgyak új szerepben</p>
      </Link>
      {!authc && <Navlinks />}
      {authc && (
        <div className="float-right mr-4">
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:text-green-800 hover:underline md:flex-none md:justify-start md:p-2 md:px-3">
              <FaPowerOff className="w-6" />
              <div className="hidden md:block">Kijelentkezés</div>
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
