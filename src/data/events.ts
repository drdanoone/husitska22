export interface Event {
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  dateEnd?: string;
  location: string;
  description: string;
  flyerImage: string;
  ticketUrl: string;
  lineup?: string[];
  promoter?: string;
  promoterInstagram?: string;
  soundSystemInstagram?: string;
}

export const events: Event[] = [
  {
    slug: "zlutas10-party",
    title: "Žluťas10 Party",
    subtitle: "Popičí · Tuff",
    date: "2026-04-17T17:00:00",
    dateEnd: "2026-04-18T02:00:00",
    location: "Husitská 22, Praha 3",
    description:
      "Přijďte brzo, zůstaňte co nejdýl. Čekejte širokej repertoár artistů, který jsou osobně curated by Žluťas. První oficiální akce. Zero bullshit policy. Tuff atmosféra: Syrovej prostor, pořádnej zvuk.",
    flyerImage: "/events/zlutas10-party.jpg",
    ticketUrl:
      "https://connect.boomevents.org/cs/husitska-22/zlutas10-party",
    lineup: ["TBA"],
  },
  {
    slug: "blood-circle-year-anniversary",
    title: "Blood Circle TV Husitska Year Anniversary",
    subtitle: "Techno · Industrial",
    date: "2026-03-13T21:00:00",
    dateEnd: "2026-03-14T06:00:00",
    location: "Husitská 22, Praha 3",
    description:
      "It's crazy to think that the first Husitska was a year ago already. It was a huge stepping stone for us and we would like to celebrate this occasion by a classic Blood Circle Husitska rave Sound as always by @vesellka_soundsystem so expect maximum quality.",
    flyerImage: "/events/bloodcircle-anniv.webp",
    ticketUrl: "https://ra.co/events/2379830",
    lineup: ["Z.L.O", "Paul Krist", "KOBOV", "Diva", "WAISS", "N3ØZEN"],
    promoter: "Blood Circle",
    promoterInstagram: "https://www.instagram.com/blood_circle_tv",
    soundSystemInstagram: "https://www.instagram.com/vesellka_soundsystem",
  },
  {
    slug: "vesellka-sub-terra-kr104",
    title: "VESELLKA sub terra: KR104",
    subtitle: "Techno · Tekno",
    date: "2026-04-10T19:00:00",
    dateEnd: "2026-04-11T07:00:00",
    location: "Husitská 22, Praha 3",
    description:
      "Old Roots. New Blood. Pure Tekno. KR104 – 13,000 tons of steel and a pulse that won't quit. Someone hit the switch, and the first spring shift is officially underway. We're going back to the mines for a pure tekno session. We've invited select techno heavyweights to shift gears and strip their sound back to the core, playing dedicated TEKNO sets alongside us. No egos, no poses—just the wall, the dust, and the rhythm of the machine.\n\nPLAN:\n19:00 – Free open air party (beers & tekno)\n22:00 – Indoor party (heavy digging with the KR104 and beers & tekno)\n08:00? – Ende\n\nVISUALS: @adamssoukupicovic & @sebastian_baalbaki\nFLYER: Illustration: @adamssoukupicovic / Graphic: @zilvardelatlove",
    flyerImage: "/events/vesellka.jpg",
    ticketUrl: "https://connect.boomevents.org/cs/vesellka/kr104",
    lineup: [
      "2NDRA",
      "AhojSwagg",
      "DAVIDOFFWHITE",
      "Franta Masakr",
      "Nøteleks",
      "shirker",
      "TOD",
      "Pedro, Šoumi, Spliff (VARAN sound system)",
    ],
    promoter: "VESELLKA sound system",
    promoterInstagram: "https://www.instagram.com/vesellka_soundsystem",
    soundSystemInstagram: "https://www.instagram.com/vesellka_soundsystem",
  },
];

export function getEvent(slug: string): Event | undefined {
  return events.find((e) => e.slug === slug);
}

export function getUpcomingEvents(): Event[] {
  return events
    .filter((e) => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
