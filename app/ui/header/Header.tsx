import BtnSection from "./BtnSection";
import Link from "next/link";
import NextImage from "next/image";
import { signOut, auth } from "@/auth";
import { FaPowerOff } from "react-icons/fa";

export default async function Header() {
  const authc = await auth();

  return (
    <header className="  w-full px-3 pt-2 top-0 fixed z-20 bg-white lg:pl-10 lg:pb-0">
      <Link href="/" className="inline-block">
        <NextImage
          alt="logo"
          width={100}
          height={15}
          src="/logoOrange.png"
          className="mx-auto block w-24 md:w-[100px] h-auto "
        />
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
    </header>
  );
}
