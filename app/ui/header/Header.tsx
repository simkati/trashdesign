import Navlinks from "./Navlinks";
import Link from "next/link";
import NextImage from "next/image";
import { signOut, auth } from "@/auth";
import { FaPowerOff } from "react-icons/fa";
import LangSelector from "./Language";
import FixNavBar from "./FixNavBar";

export default async function Header() {
  const authc = await auth();

  return (
    <header className="mt-2 pb-5 lg:pb-0 lg:my-5 w-full px-3 lg:px-10 relative">
      <Link href="/" className="inline-block">
        <NextImage
          alt="logo"
          width={150}
          height={20}
          src="/logoOrange.png"
          className="mx-auto inline lg:block"
        />
        <p className="text-xl inline ml-3 lg:ml-0 lg:block">
          Régi tárgyak új szerepben
        </p>
      </Link>
      <LangSelector />
      {!authc && (
        <div className="absolute bottom-1 lg:bottom-0 right-10">
          <Navlinks />
        </div>
      )}
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
      {!authc && <FixNavBar />}
    </header>
  );
}
