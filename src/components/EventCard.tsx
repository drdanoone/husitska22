import Link from "next/link";
import Image from "next/image";
import type { Event } from "@/data/events";
import { formatDate } from "@/lib/utils";

export function EventCard({ event }: { event: Event }) {
  return (
    <Link
      href={`/${event.slug}`}
      className="group block overflow-hidden rounded-sm border border-cream/10 bg-cream/[0.03] transition-all hover:border-cream/25 hover:bg-cream/[0.06]"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <Image
          src={event.flyerImage}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-4 sm:p-5">
        <p className="font-heading text-xs tracking-widest text-cream-dim uppercase">
          {formatDate(event.date)}
        </p>
        <h3 className="font-heading mt-1 text-lg font-bold tracking-tight sm:text-xl">
          {event.title}
        </h3>
        {event.subtitle && (
          <p className="mt-0.5 text-sm text-cream-dim">{event.subtitle}</p>
        )}
      </div>
    </Link>
  );
}
