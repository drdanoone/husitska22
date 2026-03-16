"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";

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

const empty: Omit<EventRow, "id"> = {
  slug: "",
  title: "",
  subtitle: "",
  date: "",
  date_end: "",
  location: "Husitská 22, Praha 3",
  description: "",
  flyer_image: "",
  ticket_url: "",
  lineup: [],
  promoter: "",
  promoter_instagram: "",
};

function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function toLocal(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  const offset = d.getTimezoneOffset();
  const local = new Date(d.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
}

function AdminContent() {
  const searchParams = useSearchParams();
  const adminKey = searchParams.get("key") ?? "";

  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<EventRow, "id">>(empty);
  const [saving, setSaving] = useState(false);
  const [flyerFile, setFlyerFile] = useState<File | null>(null);
  const [flyerPreview, setFlyerPreview] = useState("");
  const [flyerDims, setFlyerDims] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const headers = { "x-admin-key": adminKey, "Content-Type": "application/json" };

  const fetchEvents = useCallback(async () => {
    const res = await fetch("/api/admin/events", {
      headers: { "x-admin-key": adminKey },
    });
    if (res.status === 401) {
      setAuthorized(false);
      setLoading(false);
      return;
    }
    setAuthorized(true);
    const data = await res.json();
    setEvents(data);
    setLoading(false);
  }, [adminKey]);

  useEffect(() => {
    if (adminKey) fetchEvents();
    else {
      setAuthorized(false);
      setLoading(false);
    }
  }, [adminKey, fetchEvents]);

  function openNew() {
    setEditingId(null);
    setForm(empty);
    setFlyerFile(null);
    setFlyerPreview("");
    setFlyerDims("");
    setModalOpen(true);
  }

  function openEdit(ev: EventRow) {
    setEditingId(ev.id);
    setForm({
      slug: ev.slug,
      title: ev.title,
      subtitle: ev.subtitle ?? "",
      date: toLocal(ev.date),
      date_end: toLocal(ev.date_end),
      location: ev.location,
      description: ev.description,
      flyer_image: ev.flyer_image,
      ticket_url: ev.ticket_url,
      lineup: ev.lineup ?? [],
      promoter: ev.promoter ?? "",
      promoter_instagram: ev.promoter_instagram ?? "",
    });
    setFlyerFile(null);
    setFlyerPreview(ev.flyer_image);
    setFlyerDims("");
    setModalOpen(true);
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFlyerFile(file);
    const url = URL.createObjectURL(file);
    setFlyerPreview(url);
    const img = new Image();
    img.onload = () => setFlyerDims(`${img.naturalWidth}×${img.naturalHeight}`);
    img.src = url;
  }

  async function uploadFlyer(): Promise<string> {
    if (!flyerFile) return form.flyer_image;
    const fd = new FormData();
    fd.append("file", flyerFile);
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      headers: { "x-admin-key": adminKey },
      body: fd,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data.url;
  }

  async function save() {
    setSaving(true);
    try {
      const flyerUrl = await uploadFlyer();
      const payload = {
        ...form,
        date: form.date ? new Date(form.date).toISOString() : null,
        date_end: form.date_end ? new Date(form.date_end).toISOString() : null,
        flyer_image: flyerUrl,
        lineup:
          typeof form.lineup === "string"
            ? (form.lineup as unknown as string)
                .split("\n")
                .map((l: string) => l.trim())
                .filter(Boolean)
            : form.lineup,
      };

      if (editingId) {
        await fetch("/api/admin/events", {
          method: "PUT",
          headers,
          body: JSON.stringify({ id: editingId, ...payload }),
        });
      } else {
        await fetch("/api/admin/events", {
          method: "POST",
          headers,
          body: JSON.stringify(payload),
        });
      }
      setModalOpen(false);
      fetchEvents();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error");
    } finally {
      setSaving(false);
    }
  }

  async function deleteEvent() {
    if (!editingId || !confirm("Opravdu smazat tuto akci?")) return;
    await fetch("/api/admin/events", {
      method: "DELETE",
      headers,
      body: JSON.stringify({ id: editingId }),
    });
    setModalOpen(false);
    fetchEvents();
  }

  if (loading)
    return (
      <div className="flex min-h-dvh items-center justify-center text-cream-dim">
        Loading…
      </div>
    );
  if (!authorized)
    return (
      <div className="flex min-h-dvh items-center justify-center text-cream-dim">
        Unauthorized
      </div>
    );

  const now = new Date();
  const upcoming = events.filter((e) => new Date(e.date) >= now);
  const past = events.filter((e) => new Date(e.date) < now);

  return (
    <div className="mx-auto max-w-5xl px-5 pt-20 pb-20 sm:px-8">
      <h1 className="font-heading text-2xl font-bold">H22 Admin</h1>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        {[
          ["Celkem", events.length],
          ["Nadcházející", upcoming.length],
          ["Proběhlé", past.length],
        ].map(([label, count]) => (
          <div
            key={label as string}
            className="rounded border border-cream/10 bg-cream/[0.03] p-4 text-center"
          >
            <p className="text-2xl font-bold">{count as number}</p>
            <p className="text-xs text-cream-dim">{label as string}</p>
          </div>
        ))}
      </div>

      {/* Add button */}
      <button
        onClick={openNew}
        className="mt-8 bg-cream px-5 py-2 text-xs font-bold tracking-widest text-deep uppercase hover:opacity-90"
      >
        + Přidat akci
      </button>

      {/* Events list */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-cream/10 text-xs text-cream-dim uppercase">
            <tr>
              <th className="py-2 pr-4">Datum</th>
              <th className="py-2 pr-4">Název</th>
              <th className="py-2 pr-4">Slug</th>
              <th className="py-2 pr-4">Promoter</th>
              <th className="py-2" />
            </tr>
          </thead>
          <tbody>
            {events.map((ev) => (
              <tr
                key={ev.id}
                className="border-b border-cream/5 hover:bg-cream/[0.03]"
              >
                <td className="py-2 pr-4 text-cream-dim">
                  {new Date(ev.date).toLocaleDateString("cs-CZ")}
                </td>
                <td className="py-2 pr-4 font-medium">{ev.title}</td>
                <td className="py-2 pr-4 text-cream-dim">{ev.slug}</td>
                <td className="py-2 pr-4 text-cream-dim">
                  {ev.promoter ?? "—"}
                </td>
                <td className="py-2">
                  <button
                    onClick={() => openEdit(ev)}
                    className="text-xs text-cream-dim underline hover:text-cream"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-deep/80 p-4 pt-20">
          <div className="w-full max-w-2xl rounded border border-cream/10 bg-surface p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-lg font-bold">
                {editingId ? "Upravit akci" : "Nová akce"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-cream-dim hover:text-cream"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 grid gap-4">
              {/* Title */}
              <div>
                <label className="mb-1 block text-xs text-cream-dim">
                  Název
                </label>
                <input
                  className="w-full rounded border border-cream/10 bg-deep px-3 py-2 text-sm text-cream"
                  value={form.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setForm((f) => ({
                      ...f,
                      title,
                      slug: editingId ? f.slug : slugify(title),
                    }));
                  }}
                />
              </div>

              {/* Slug */}
              <div>
                <label className="mb-1 block text-xs text-cream-dim">
                  Slug
                </label>
                <input
                  className="w-full rounded border border-cream/10 bg-deep px-3 py-2 text-sm text-cream"
                  value={form.slug}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, slug: e.target.value }))
                  }
                />
              </div>

              {/* Subtitle / tags */}
              <div>
                <label className="mb-1 block text-xs text-cream-dim">
                  Subtitle / Tags
                </label>
                <input
                  className="w-full rounded border border-cream/10 bg-deep px-3 py-2 text-sm text-cream"
                  value={form.subtitle ?? ""}
                  placeholder="Techno · Industrial"
                  onChange={(e) =>
                    setForm((f) => ({ ...f, subtitle: e.target.value }))
                  }
                />
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs text-cream-dim">
                    Začátek
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full rounded border border-cream/10 bg-deep px-3 py-2 text-sm text-cream"
                    value={form.date}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, date: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-cream-dim">
                    Konec
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full rounded border border-cream/10 bg-deep px-3 py-2 text-sm text-cream"
                    value={form.date_end ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, date_end: e.target.value }))
                    }
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="mb-1 block text-xs text-cream-dim">
                  Místo
                </label>
                <input
                  className="w-full rounded border border-cream/10 bg-deep px-3 py-2 text-sm text-cream"
                  value={form.location}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, location: e.target.value }))
                  }
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-1 block text-xs text-cream-dim">
                  Popis
                </label>
                <textarea
                  rows={4}
                  className="w-full rounded border border-cream/10 bg-deep px-3 py-2 text-sm text-cream"
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                />
              </div>

              {/* Flyer */}
              <div>
                <label className="mb-1 block text-xs text-cream-dim">
                  Flyer
                </label>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                  className="text-xs text-cream-dim"
                />
                {flyerPreview && (
                  <div className="mt-2 flex items-end gap-3">
                    <img
                      src={flyerPreview}
                      alt="preview"
                      className="h-32 rounded border border-cream/10 object-contain"
                    />
                    <div className="text-xs text-cream-dim">
                      {flyerDims && <p>{flyerDims}</p>}
                      {flyerFile && <p>{flyerFile.name}</p>}
                    </div>
                  </div>
                )}
              </div>

              {/* Ticket URL */}
              <div>
                <label className="mb-1 block text-xs text-cream-dim">
                  Ticket URL
                </label>
                <input
                  className="w-full rounded border border-cream/10 bg-deep px-3 py-2 text-sm text-cream"
                  value={form.ticket_url}
                  placeholder="https://ra.co/events/..."
                  onChange={(e) =>
                    setForm((f) => ({ ...f, ticket_url: e.target.value }))
                  }
                />
              </div>

              {/* Lineup */}
              <div>
                <label className="mb-1 block text-xs text-cream-dim">
                  Lineup (jeden řádek = jeden artist)
                </label>
                <textarea
                  rows={4}
                  className="w-full rounded border border-cream/10 bg-deep px-3 py-2 text-sm text-cream"
                  value={
                    Array.isArray(form.lineup)
                      ? form.lineup.join("\n")
                      : form.lineup
                  }
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      lineup: e.target.value as unknown as string[],
                    }))
                  }
                />
              </div>

              {/* Promoter */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs text-cream-dim">
                    Promoter
                  </label>
                  <input
                    className="w-full rounded border border-cream/10 bg-deep px-3 py-2 text-sm text-cream"
                    value={form.promoter ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, promoter: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-cream-dim">
                    Promoter IG
                  </label>
                  <input
                    className="w-full rounded border border-cream/10 bg-deep px-3 py-2 text-sm text-cream"
                    value={form.promoter_instagram ?? ""}
                    placeholder="https://instagram.com/..."
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        promoter_instagram: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex items-center justify-between">
              <div>
                {editingId && (
                  <button
                    onClick={deleteEvent}
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    Smazat akci
                  </button>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs text-cream-dim hover:text-cream"
                >
                  Zrušit
                </button>
                <button
                  onClick={save}
                  disabled={saving}
                  className="bg-cream px-5 py-2 text-xs font-bold tracking-widest text-deep uppercase hover:opacity-90 disabled:opacity-50"
                >
                  {saving ? "Ukládám…" : "Uložit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center text-cream-dim">
          Loading…
        </div>
      }
    >
      <AdminContent />
    </Suspense>
  );
}
