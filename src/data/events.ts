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
      "Je šílený, že první Husitská byla už před rokem. Byl to pro nás velkej milník a chceme to oslavit klasickým Blood Circle Husitska ravem. Zvuk jako vždy od @vesellka_soundsystem, takže čekej maximální kvalitu.",
    flyerImage: "/events/bloodcircle-anniv.webp",
    ticketUrl: "https://ra.co/events/2379830",
    lineup: ["Z.L.O", "Paul Krist", "KOBOV", "Diva", "WAISS", "N3ØZEN"],
    promoter: "Blood Circle",
    promoterInstagram: "https://www.instagram.com/blood_circle_tv",
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
