import BtnSection from "./BtnSection";
import Link from "next/link";
import NextImage from "next/image";
import { signOut, auth } from "@/auth";
import { FaPowerOff } from "react-icons/fa";
import FixNavBar from "./FixNavBar";

export default async function Header() {
  const authc = await auth();

  return (
    <header className="  w-full px-3 top-0 fixed z-20 bg-white md:mt-2 md:pb-5 md:relative md:bg-none lg:pl-10 lg:pb-0 lg:my-5">
      <Link href="/" className="inline-block">
        <NextImage
          alt="logo"
          width={150}
          height={20}
          src="/logoOrange.png"
          className="mx-auto block md:inline lg:block w-24 md:w-[150px] h-auto "
        />
        <p className="text-xs sm:text-base block ml-0 md:text-xl md:inline md:ml-3 lg:ml-0 lg:block">
          Régi tárgyak új szerepben
        </p>
      </Link>
      {!authc && <BtnSection />}
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
