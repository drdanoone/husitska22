#!/usr/bin/env node
/**
 * Nastaví flyer_image pro Žižkovská noc 2026 na /events/zizkovksanoc.jpg
 */
const fs = require("fs");
const path = require("path");

const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim().replace(/^[\"']|[\"']$/g, "");
  }
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!url || !key) {
  console.error(
    "Chybí NEXT_PUBLIC_SUPABASE_URL nebo NEXT_PUBLIC_SUPABASE_ANON_KEY v .env.local"
  );
  process.exit(1);
}

async function main() {
  const { createClient } = require("@supabase/supabase-js");
  const supabase = createClient(url, key);
  const { data, error } = await supabase
    .from("events")
    .update({ flyer_image: "/events/zizkovksanoc.jpg" })
    .eq("slug", "zizkovska-noc-2026")
    .select("id, flyer_image")
    .single();
  if (error) {
    console.error("Chyba:", error.message);
    process.exit(1);
  }
  console.log("OK, flyer:", data);
}

main();

