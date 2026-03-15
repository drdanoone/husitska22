import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

function checkKey(request: NextRequest) {
  const key = request.headers.get("x-admin-key");
  if (key !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function GET(request: NextRequest) {
  const err = checkKey(request);
  if (err) return err;

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: false });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const err = checkKey(request);
  if (err) return err;

  const body = await request.json();
  const { data, error } = await supabase
    .from("events")
    .insert(body)
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const err = checkKey(request);
  if (err) return err;

  const body = await request.json();
  const { id, ...rest } = body;
  const { data, error } = await supabase
    .from("events")
    .update(rest)
    .eq("id", id)
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(request: NextRequest) {
  const err = checkKey(request);
  if (err) return err;

  const { id } = await request.json();
  const { error } = await supabase.from("events").delete().eq("id", id);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
