const localeToIntl = { cs: "cs-CZ", en: "en-GB" } as const;

export function formatDate(iso: string, locale: "cs" | "en" = "cs"): string {
  const d = new Date(iso);
  return d.toLocaleDateString(localeToIntl[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatTime(iso: string, locale: "cs" | "en" = "cs"): string {
  const d = new Date(iso);
  return d.toLocaleTimeString(localeToIntl[locale], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDateRange(
  start: string,
  end?: string,
  locale: "cs" | "en" = "cs"
): string {
  const startDate = formatDate(start, locale);
  const startTime = formatTime(start, locale);
  if (!end) return `${startDate}, ${startTime}`;
  const endTime = formatTime(end, locale);
  return `${startDate}, ${startTime} – ${endTime}`;
}
