import Image from "next/image";
import { getUpcomingEvents } from "@/data/events";
import { EventCard } from "@/components/EventCard";

export default function Home() {
  const upcoming = getUpcomingEvents();

  return (
    <>
      {/* Hero */}
      <section className="flex min-h-dvh flex-col items-center justify-center px-5 text-center">
        <Image
          src="/logo.jpg"
          alt="H22"
          width={280}
          height={224}
          className="rounded-sm"
          priority
        />
        <h1 className="font-heading mt-8 text-4xl font-bold tracking-tight sm:text-5xl">
          Husitská 22
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-cream-dim sm:text-base">
          Underground prostor v srdci Žižkova.
          <br />
          Syrovej sklep, pořádnej zvuk.
        </p>
        {upcoming.length > 0 && (
          <a
            href="#akce"
            className="mt-8 inline-block border border-cream/20 px-6 py-2.5 text-xs tracking-widest text-cream transition-all hover:border-cream/50 hover:bg-cream/5 uppercase"
          >
            Nejbližší akce ↓
          </a>
        )}
      </section>

      {/* About */}
      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-xs tracking-widest text-cream-dim uppercase">
            O prostoru
          </h2>
          <p className="mt-4 text-lg leading-relaxed sm:text-xl">
            Sklep na Husitské 22 je nezávislej underground prostor, kterej žije
            hudbou a komunitou. Žádný VIP, žádnej bullshit — jen syrovej
            prostor, lidi a zvuk.
          </p>
        </div>
      </section>

      {/* Events */}
      {upcoming.length > 0 && (
        <section id="akce" className="px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-heading text-center text-xs tracking-widest text-cream-dim uppercase">
              Nejbližší akce
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
