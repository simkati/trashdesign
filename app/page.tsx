import NextImage from "next/image";

export default function Home() {
  return (
    <main className="items-center h-screen justify-between">
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
    </main>
  );
}
