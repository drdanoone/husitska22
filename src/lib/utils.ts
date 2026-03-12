export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString("cs-CZ", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDateRange(start: string, end?: string): string {
  const startDate = formatDate(start);
  const startTime = formatTime(start);
  if (!end) return `${startDate}, ${startTime}`;
  const endTime = formatTime(end);
  return `${startDate}, ${startTime} – ${endTime}`;
}
