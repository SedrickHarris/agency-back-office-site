import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { siteUrl } from "@/lib/site";
import "../styles/globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-manrope",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Agency Back Office",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body className={inter.className}>
        <header />
        <main>{children}</main>
        <footer />
      </body>
    </html>
  );
}
