import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./ui/header";
import Footer from "./ui/footer";

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
        <div className="min-h-[calc(100vh-150px)]">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
