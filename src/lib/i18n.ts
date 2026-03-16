export type Locale = "cs" | "en";

export const translations = {
  cs: {
    nav: {
      contact: "Kontakt",
    },
    home: {
      heroSubline:
        "Soukromý underground prostor v srdci Žižkova.\nSyrovej sklep, pořádnej zvuk.",
      ctaEvents: "Nejbližší akce ↓",
      aboutTitle: "O prostoru",
      aboutText:
        "Sklep na Husitské 22 je nezávislej privátní underground prostor, kterej žije hudbou a komunitou. Žádný VIP, žádnej bullshit — jen syrovej prostor, lidi a zvuk.",
      eventsTitle: "Nejbližší akce",
      pastEventsTitle: "Proběhlé akce",
    },
    event: {
      back: "← Zpět",
      lineup: "Lineup",
      promoter: "Promoter",
      buyTickets: "Koupit vstupenky",
      pastEventCta: "Více o akci",
    },
    footer: {
      address: "130 00 Praha 3 — Žižkov",
    },
    lang: {
      switchToEn: "EN",
      switchToCs: "Česky",
    },
  },
  en: {
    nav: {
      contact: "Contact",
    },
    home: {
      heroSubline:
        "Private underground space in the heart of Žižkov.\nRaw cellar, proper sound.",
      ctaEvents: "Upcoming events ↓",
      aboutTitle: "About",
      aboutText:
        "The cellar at Husitská 22 is a private independent underground space that lives for music and community. No VIP, no bullshit — just raw space, people, and sound.",
      eventsTitle: "Upcoming events",
      pastEventsTitle: "Past events",
    },
    event: {
      back: "← Back",
      lineup: "Lineup",
      promoter: "Promoter",
      buyTickets: "Buy tickets",
      pastEventCta: "More about this event",
    },
    footer: {
      address: "130 00 Praha 3 — Žižkov",
    },
    lang: {
      switchToEn: "EN",
      switchToCs: "Česky",
    },
  },
} as const;

export function t(locale: Locale, key: string): string {
  const keys = key.split(".");
  let value: unknown = translations[locale];
  for (const k of keys) {
    value = (value as Record<string, unknown>)?.[k];
  }
  return (value as string) ?? key;
}
