-- Run this in Supabase SQL Editor to set up the events table and storage.

-- 1. Events table
create table events (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  subtitle text,
  date timestamptz not null,
  date_end timestamptz,
  location text default 'Husitská 22, Praha 3',
  description text default '',
  flyer_image text default '',
  ticket_url text default '',
  lineup text[] default '{}',
  promoter text,
  promoter_instagram text,
  sound_system_instagram text,
  created_at timestamptz default now()
);

-- 2. RLS – public reads, unrestricted writes (admin protected by app-level key)
alter table events enable row level security;
create policy "Public read" on events for select using (true);
create policy "Allow insert" on events for insert with check (true);
create policy "Allow update" on events for update using (true) with check (true);
create policy "Allow delete" on events for delete using (true);

-- 3. Storage bucket for flyers
insert into storage.buckets (id, name, public) values ('flyers', 'flyers', true);
create policy "Public read flyers" on storage.objects for select using (bucket_id = 'flyers');
create policy "Upload flyers" on storage.objects for insert with check (bucket_id = 'flyers');
create policy "Update flyers" on storage.objects for update using (bucket_id = 'flyers');
create policy "Delete flyers" on storage.objects for delete using (bucket_id = 'flyers');

-- 4. Seed existing events
insert into events (slug, title, subtitle, date, date_end, location, description, flyer_image, ticket_url, lineup, promoter, promoter_instagram, sound_system_instagram) values
  ('zlutas10-party', 'Žluťas10 Party', 'Popičí · Tuff', '2026-04-17T17:00:00+02:00', '2026-04-18T02:00:00+02:00', 'Husitská 22, Praha 3', 'Přijďte brzo, zůstaňte co nejdýl. Čekejte širokej repertoár artistů, který jsou osobně curated by Žluťas. První oficiální akce. Zero bullshit policy. Tuff atmosféra: Syrovej prostor, pořádnej zvuk.', '/events/zlutas10-party.jpg', 'https://connect.boomevents.org/cs/husitska-22/zlutas10-party', '{"TBA"}', null, null, null),
  ('blood-circle-year-anniversary', 'Blood Circle TV Husitska Year Anniversary', 'Techno · Industrial', '2026-03-13T21:00:00+01:00', '2026-03-14T06:00:00+01:00', 'Husitská 22, Praha 3', E'It''s crazy to think that the first Husitska was a year ago already. It was a huge stepping stone for us and we would like to celebrate this occasion by a classic Blood Circle Husitska rave Sound as always by @vesellka_soundsystem so expect maximum quality.', '/events/bloodcircle-anniv.webp', 'https://ra.co/events/2379830', '{"Z.L.O","Paul Krist","KOBOV","Diva","WAISS","N3ØZEN"}', 'Blood Circle', 'https://www.instagram.com/blood_circle_tv', 'https://www.instagram.com/vesellka_soundsystem'),
  ('vesellka-sub-terra-kr104', 'VESELLKA sub terra: KR104', 'Tekno', '2026-04-10T19:00:00+02:00', '2026-04-11T07:00:00+02:00', 'Husitská 22, Praha 3', E'Old Roots. New Blood. Pure Tekno. KR104 – 13,000 tons of steel and a pulse that won''t quit. Someone hit the switch, and the first spring shift is officially underway.', '/events/vesellka.jpg', 'https://connect.boomevents.org/cs/vesellka/kr104', '{"2NDRA","AhojSwagg","DAVIDOFFWHITE","Franta Masakr","Nøteleks","shirker","TOD","Pedro, Šoumi, Spliff (VARAN sound system)"}', 'VESELLKA sound system', 'https://www.instagram.com/vesellka_soundsystem', 'https://www.instagram.com/vesellka_soundsystem'),
  ('one-plus-one-round-2', 'ONE PLUS ONE – Round 2', 'Techno', '2026-04-24T22:00:00+02:00', '2026-04-25T05:00:00+02:00', 'Husitská 22, Praha 3', E'We''re back for more! After an incredible first night together, we''re gearing up for Round 2, with some killer matchups on deck.', '/events/oneplusone.webp', 'https://ra.co/events/2378191', '{"Fembot + Kaotic","DJames (2) + Big Lil","2NDRA (vinyl) + Electro rite (live)"}', 'ONE PLUS ONE', 'https://www.instagram.com/oneplusone.prg/', null);
