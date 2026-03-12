import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
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
    "Underground prostor v srdci Žižkova. Akce, hudba, komunita. Husitská 22, Praha 3.",
  keywords: ["Husitská 22", "H22", "underground", "Praha", "Žižkov", "akce"],
  openGraph: {
    title: "H22 — Husitská 22",
    description: "Underground prostor v srdci Žižkova.",
    url: "https://husitska22.cz",
    siteName: "H22",
    locale: "cs_CZ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="antialiased">
        <header className="fixed top-0 z-50 flex w-full items-center justify-between px-5 py-4 sm:px-8">
          <a
            href="/"
            className="font-heading text-xl font-bold tracking-tighter text-cream"
          >
            H22
          </a>
          <a
            href="mailto:info@husitska22.cz"
            className="text-xs tracking-widest text-cream-dim transition-colors hover:text-cream uppercase"
          >
            Kontakt
          </a>
        </header>

        <main className="min-h-dvh">{children}</main>

        <footer className="border-t border-cream/10 px-5 py-10 sm:px-8">
          <div className="mx-auto flex max-w-5xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-heading text-sm font-bold tracking-tight">
                Husitská 22
              </p>
              <p className="mt-1 text-xs text-cream-dim">
                130 00 Praha 3 — Žižkov
              </p>
            </div>
            <div className="flex gap-6 text-xs text-cream-dim">
              <a
                href="mailto:info@husitska22.cz"
                className="transition-colors hover:text-cream"
              >
                info@husitska22.cz
              </a>
              <a
                href="tel:+420704486559"
                className="transition-colors hover:text-cream"
              >
                +420 704 486 559
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
