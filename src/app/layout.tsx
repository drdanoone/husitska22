import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://husitska22.cz"),
  title: "H22 — Husitská 22",
  description:
    "Private underground prostor v srdci Žižkova. Akce, hudba, komunita. Husitská 22, Praha 3.",
  keywords: ["Husitská 22", "H22", "underground", "Praha", "Žižkov", "akce"],
  icons: {
    icon: "/logo.jpg",
  },
  openGraph: {
    title: "H22 — Husitská 22",
    description: "Underground prostor v srdci Žižkova.",
    url: "https://husitska22.cz",
    siteName: "H22",
    locale: "cs_CZ",
    type: "website",
  },
};

import { SiteLayout } from "@/components/SiteLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="antialiased">
        <SiteLayout>{children}</SiteLayout>
        <Analytics />
      </body>
    </html>
  );
}
