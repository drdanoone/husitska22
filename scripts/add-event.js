#!/usr/bin/env node
/**
 * Přidá event do Supabase. Načte data z scripts/event.json (nebo cesty jako 1. argument).
 * Použití: node --env-file=.env.local scripts/add-event.js [event.json]
 */
const fs = require("fs");
const path = require("path");

const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "");
  }
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!url || !key) {
  console.error("Chybí NEXT_PUBLIC_SUPABASE_URL nebo NEXT_PUBLIC_SUPABASE_ANON_KEY v .env.local");
  process.exit(1);
}

const jsonPath = process.argv[2] || path.join(__dirname, "event.json");
const raw = fs.readFileSync(jsonPath, "utf8");
const event = JSON.parse(raw);

const row = {
  slug: event.slug,
  title: event.title,
  subtitle: event.subtitle ?? null,
  date: event.date,
  date_end: event.date_end ?? null,
  location: event.location ?? "Husitská 22, Praha 3",
  description: event.description ?? "",
  flyer_image: event.flyer_image ?? "",
  ticket_url: event.ticket_url ?? "",
  lineup: Array.isArray(event.lineup) ? event.lineup : [],
  promoter: event.promoter ?? null,
  promoter_instagram: event.promoter_instagram ?? null,
};

async function main() {
  const { createClient } = require("@supabase/supabase-js");
  const supabase = createClient(url, key);
  const { data, error } = await supabase.from("events").insert(row).select("id, slug").single();
  if (error) {
    console.error("Chyba:", error.message);
    process.exit(1);
  }
  console.log("OK:", data.slug, data.id);
}

main();
