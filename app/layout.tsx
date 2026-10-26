import { Inter, Manrope } from "next/font/google";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
