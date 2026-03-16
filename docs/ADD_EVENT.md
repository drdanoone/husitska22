# Přidání akce přes prompt / skript

## Přes Cursor (AI)

Napiš v chatu např.: *„Přidej event: [název], [datum], [místo], [link na lístky], [krátký popis].“*  
AI vyplní `scripts/event.json` a spustí `npm run add-event`.

**Pro AI:** Při žádosti o přidání akce uprav `scripts/event.json` (slug z názvu, date v ISO, lineup jako pole) a spusť `npm run add-event`. Nepřepisuj celý soubor zbytečně – jen potřebná pole.

## Formát `scripts/event.json`

```json
{
  "slug": "url-slug",
  "title": "Název",
  "subtitle": "podtitul",
  "date": "ISO 8601",
  "date_end": "ISO 8601 nebo null",
  "location": "Husitská 22, Praha 3",
  "description": "krátký popis",
  "flyer_image": "/events/nebo-url",
  "ticket_url": "https://...",
  "lineup": ["A", "B"],
  "promoter": null,
  "promoter_instagram": null
}
```

Povinné: `slug`, `title`, `date`, `ticket_url`. Zbytek volitelný.

## Ruční spuštění

```bash
node scripts/add-event.js
# nebo s jiným souborem:
node scripts/add-event.js cesta/k-event.json
```

Vyžaduje `.env.local` s `NEXT_PUBLIC_SUPABASE_URL` a `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
