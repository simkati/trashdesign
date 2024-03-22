import NextImage from "next/image";

export default function Home() {
  return (
    <main className="items-center h-screen justify-between">
      <div className="w-full h-1/3 relative">
        <NextImage src="/kert.jpg" fill alt="carusel" />
      </div>
    </main>
  );
}
