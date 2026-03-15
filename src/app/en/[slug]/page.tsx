import { notFound } from "next/navigation";
import { getAllEvents, getEvent } from "@/data/events";
import { EventPageContent } from "@/components/EventPageContent";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const events = await getAllEvents();
    return events.map((e) => ({ slug: e.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) return {};
  return {
    title: `${event.title} — H22`,
    description: event.description,
    openGraph: {
      title: `${event.title} — H22`,
      description: event.description,
      images: [{ url: event.flyerImage }],
    },
  };
}

export default async function EnEventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) notFound();
  return <EventPageContent locale="en" event={event} />;
}
