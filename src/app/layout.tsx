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
            href="#kontakt"
            className="text-xs tracking-widest text-cream-dim transition-colors hover:text-cream uppercase"
          >
            Kontakt
          </a>
        </header>

        <main className="min-h-dvh">{children}</main>

        <footer id="kontakt" className="border-t border-cream/10 px-5 py-10 sm:px-8">
          <div className="mx-auto flex max-w-5xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-heading text-sm font-bold tracking-tight">
                Husitská 22
              </p>
              <p className="mt-1 text-xs text-cream-dim">
                130 00 Praha 3 — Žižkov
              </p>
            </div>
            <div className="flex items-center gap-5 text-xs text-cream-dim">
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
              <a
                href="https://www.instagram.com/husitska22"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transition-colors hover:text-cream"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.403a4.088 4.088 0 0 1 1.47.957c.453.453.778.898.957 1.47.163.46.35 1.26.404 2.43.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.404 2.43a4.088 4.088 0 0 1-.957 1.47 4.088 4.088 0 0 1-1.47.957c-.46.163-1.26.35-2.43.404-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.404a4.088 4.088 0 0 1-1.47-.957 4.088 4.088 0 0 1-.957-1.47c-.163-.46-.35-1.26-.404-2.43C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.054-1.17.24-1.97.404-2.43a4.088 4.088 0 0 1 .957-1.47A4.088 4.088 0 0 1 5.063 2.3c.46-.163 1.26-.35 2.43-.404C8.759 1.838 9.139 1.826 12 1.826V2.163zM12 0C8.741 0 8.333.014 7.053.072 5.775.131 4.903.333 4.14.63a5.876 5.876 0 0 0-2.126 1.384A5.876 5.876 0 0 0 .63 4.14C.333 4.903.131 5.775.072 7.053.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.059 1.278.261 2.15.558 2.913a5.876 5.876 0 0 0 1.384 2.126A5.876 5.876 0 0 0 4.14 23.37c.763.297 1.635.499 2.913.558C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.278-.059 2.15-.261 2.913-.558a5.876 5.876 0 0 0 2.126-1.384 5.876 5.876 0 0 0 1.384-2.126c.297-.763.499-1.635.558-2.913.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.059-1.278-.261-2.15-.558-2.913a5.876 5.876 0 0 0-1.384-2.126A5.876 5.876 0 0 0 19.86.63c-.763-.297-1.635-.499-2.913-.558C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/husitska22/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="transition-colors hover:text-cream"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.025 4.388 11.022 10.125 11.927v-8.437H7.078v-3.49h3.047V9.41c0-3.026 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.971H15.83c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796v8.437C19.612 23.095 24 18.098 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
