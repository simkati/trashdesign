import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./ui/header/Header";
import Footer from "./ui/footer";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <Header />
        <div className="mt-16 md:mt-0">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
