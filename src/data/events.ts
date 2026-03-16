import { getSupabase } from "@/lib/supabase";

export interface Event {
  id: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  date: string;
  dateEnd?: string | null;
  location: string;
  description: string;
  flyerImage: string;
  ticketUrl: string;
  lineup: string[];
  promoter?: string | null;
  promoterInstagram?: string | null;
}

interface EventRow {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  date: string;
  date_end: string | null;
  location: string;
  description: string;
  flyer_image: string;
  ticket_url: string;
  lineup: string[];
  promoter: string | null;
  promoter_instagram: string | null;
}

function mapRow(row: EventRow): Event {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle,
    date: row.date,
    dateEnd: row.date_end,
    location: row.location,
    description: row.description ?? "",
    flyerImage: row.flyer_image ?? "",
    ticketUrl: row.ticket_url ?? "",
    lineup: row.lineup ?? [],
    promoter: row.promoter,
    promoterInstagram: row.promoter_instagram,
  };
}

export async function getAllEvents(): Promise<Event[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true });
  if (error) throw error;
  return (data as EventRow[]).map(mapRow);
}

export async function getEvent(slug: string): Promise<Event | undefined> {
  const supabase = getSupabase();
  if (!supabase) return undefined;
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) return undefined;
  return mapRow(data as EventRow);
}

export async function getUpcomingEvents(): Promise<Event[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .gte("date", new Date().toISOString())
    .order("date", { ascending: true });
  if (error) return [];
  return (data as EventRow[]).map(mapRow);
}

export async function getPastEvents(): Promise<Event[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .lt("date", new Date().toISOString())
    .order("date", { ascending: false });
  if (error) return [];
  return (data as EventRow[]).map(mapRow);
}
