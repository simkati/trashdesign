import type { Metadata } from "next";
import { Jaldi } from "next/font/google";
import "./globals.css";
import Header from "./ui/header/Header";
import Footer from "./ui/footer";
import { SessionProvider } from "next-auth/react";

const jaldi = Jaldi({ subsets: ["latin-ext"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Trash design",
  description:
    "Unique utility items and furniture. Used old objects redesigned with a new function",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <body className={jaldi.className}>
        <Header />
        <div className="mt-14">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
