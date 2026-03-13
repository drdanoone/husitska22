import { events, getEvent } from "@/data/events";
import { EventPageContent } from "@/components/EventPageContent";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return params.then(({ slug }) => {
    const event = getEvent(slug);
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
  });
}

export default async function EnEventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <EventPageContent locale="en" slug={slug} />;
}
