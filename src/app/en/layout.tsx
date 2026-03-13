import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "H22 — Husitská 22",
  description:
    "Underground space in the heart of Žižkov. Events, music, community. Husitská 22, Prague 3.",
  openGraph: {
    title: "H22 — Husitská 22",
    description: "Underground space in the heart of Žižkov.",
    url: "https://husitska22.cz/en",
    locale: "en_GB",
  },
};

export default function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
