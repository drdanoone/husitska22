import Image from "next/image";
import Link from "next/link";
import type { Event } from "@/data/events";
import { formatDateRange } from "@/lib/utils";
import { t, type Locale } from "@/lib/i18n";

function renderDescription(event: {
  description: string;
  soundSystemInstagram?: string | null;
}) {
  const handle = "@vesellka_soundsystem";
  if (!event.soundSystemInstagram || !event.description.includes(handle)) {
    return event.description;
  }

  const parts = event.description.split(handle);
  return (
    <>
      {parts[0]}
      <a
        href={event.soundSystemInstagram}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-cream/30 underline-offset-4 transition-colors hover:text-cream"
      >
        {handle}
      </a>
      {parts.slice(1).join(handle)}
    </>
  );
}

export function EventPageContent({
  locale,
  event,
}: {
  locale: Locale;
  event: Event;
}) {
  const backHref = locale === "en" ? "/en" : "/";

  return (
    <article className="px-5 pt-24 pb-20 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href={backHref}
          className="font-heading inline-block text-xs tracking-widest text-cream-dim transition-colors hover:text-cream uppercase"
        >
          {t(locale, "event.back")}
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm">
            <Image
              src={event.flyerImage}
              alt={event.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="font-heading text-xs tracking-widest text-cream-dim uppercase">
              {formatDateRange(event.date, event.dateEnd, locale)}
            </p>

            <h1 className="font-heading mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {event.title}
            </h1>

            {event.subtitle && (
              <p className="mt-1 text-lg text-cream-dim">{event.subtitle}</p>
            )}

            <p className="mt-6 leading-relaxed text-cream-dim whitespace-pre-line">
              {renderDescription(event)}
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm text-cream-dim">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0 1 15 0Z"
                />
              </svg>
              {event.location}
            </div>

            {event.lineup && event.lineup.length > 0 && (
              <div className="mt-6">
                <p className="font-heading text-xs tracking-widest text-cream-dim uppercase">
                  {t(locale, "event.lineup")}
                </p>
                <p className="mt-1 text-sm">{event.lineup.join(" · ")}</p>
              </div>
            )}

            {event.promoter && (
              <div className="mt-6 text-sm text-cream-dim">
                <p className="font-heading text-xs tracking-widest text-cream-dim uppercase">
                  {t(locale, "event.promoter")}
                </p>
                {event.promoterInstagram ? (
                  <a
                    href={event.promoterInstagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-2 text-sm transition-colors hover:text-cream"
                  >
                    <span>{event.promoter}</span>
                  </a>
                ) : (
                  <p className="mt-1 text-sm">{event.promoter}</p>
                )}
              </div>
            )}

            <a
              href={event.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-fit items-center gap-2 bg-cream px-7 py-3 text-xs font-bold tracking-widest text-deep transition-opacity hover:opacity-90 uppercase"
            >
              {t(locale, "event.buyTickets")}
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
