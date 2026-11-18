import { NextResponse } from "next/server";

// Receives RSVPs. By default it just logs them (visible in Vercel → Logs).
// Hook this up to Google Sheets, Supabase, Resend email, etc. as you like.
export async function POST(req: Request) {
  const data = await req.json().catch(() => null);
  if (!data?.name) return NextResponse.json({ ok: false }, { status: 400 });
  console.log("RSVP", JSON.stringify(data));
  return NextResponse.json({ ok: true });
}
