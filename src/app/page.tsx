import { getUpcomingEvents, getPastEvents } from "@/data/events";
import { HomeContent } from "@/components/HomeContent";

export const revalidate = 3600;

export default async function Home() {
  const [upcoming, past] = await Promise.all([
    getUpcomingEvents(),
    getPastEvents(),
  ]);
  return <HomeContent locale="cs" upcoming={upcoming} past={past} />;
}
