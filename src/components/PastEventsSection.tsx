"use client";

import { useState } from "react";
import { EventCard } from "@/components/EventCard";
import { t, type Locale } from "@/lib/i18n";
import type { Event } from "@/data/events";

export function PastEventsSection({
  events: pastEvents,
  locale,
}: {
  events: Event[];
  locale: Locale;
}) {
  const [open, setOpen] = useState(false);

  if (pastEvents.length === 0) return null;

  return (
    <section className="px-5 pb-20 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="font-heading flex w-full items-center justify-center gap-2 text-xs tracking-widest text-cream-dim transition-colors hover:text-cream uppercase"
          aria-expanded={open}
        >
          {t(locale, "home.pastEventsTitle")}
          <svg
            className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {open && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pastEvents.map((event) => (
              <EventCard key={event.slug} event={event} locale={locale} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
