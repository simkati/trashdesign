import Navlinks from "./navlinks";
import Link from "next/link";
import NextImage from "next/image";

export default function Header() {
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
      <Navlinks />
    </header>
  );
}
