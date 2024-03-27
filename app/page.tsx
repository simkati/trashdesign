import NextImage from "next/image";
import Title from "./ui/content/Title";
import LatestProducts from "./ui/content/LatestProducts";

export default function Home() {
  return (
    <main className="">
      <div className="w-full relative">
        <NextImage
          src="/hegy.jpg"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          alt="carusel"
        />
      </div>
      <div className="mt-10 mx-auto max-w-4xl px-6">
        <Title title="rólunk" />
        <p className="text-gray-600 text-center">
          A használati tárgyaink megöregednek, elromlanak, kimennek a divatból,
          vagy egyszerűen már nincs rá szükségünk. A legtöbbjük ilyenkor a
          kukában végzi.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 text-gray-600 text-center mt-4  mb-12">
          <p className="">
            Vannak azonban olyan tárgyak, amelyek sokkal többet érdemelnek
            ennél. Letűnt korok lenyomatai, elfeledett mesterségek eszközei,
            nagymama süteményillatú emléke. Mindegyiknek története van. Ezeknek
            a tárgyaknak igyekszünk új szerepet találni. Néha eredeti funkcióban
            modernebb belsővel, néha új szerepben, néha csak dísztárgyként,
            némelyiket pedig teljesen felújítva. Mellé pedig elmondjuk a
            történetét.
          </p>
          <p className="">
            Trash? Loft? Industrial? Steampunk? Nem tudjuk. Talán egyik sem,
            talán mindegyikből egy csipet. De nem is számít. A lényeg, hogy ha
            ezekből a tárgyakból választasz, akkor örökbe fogadod a múlt egy
            darabkáját. Egy tárgy történetét, amit aztán Te írhatsz majd tovább.
          </p>
        </div>
      </div>
    </main>
  );
}
