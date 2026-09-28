import { NextResponse } from "next/server";
import { addSheetRow, zohoConfigured } from "@/lib/zoho";

// Runs on the server for every submission (never cached or pre-rendered).
export const dynamic = "force-dynamic";

const clean = (v: unknown, max = 500) =>
  typeof v === "string" ? v.trim().replace(/\s+/g, " ").slice(0, max) : "";

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field; bots often do.
  if (clean(data.company)) return NextResponse.json({ ok: true });

  const name = clean(data.name, 120);
  const phone = clean(data.phone, 40);
  const email = clean(data.email, 160);
  if (!name || !phone || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please fill in your name, phone number and a valid email." },
      { status: 400 }
    );
  }

  if (!zohoConfigured()) {
    console.error("Consultation form: Zoho environment variables are not set.");
    return NextResponse.json(
      { ok: false, error: "The form isn't connected yet. Please reach us on WhatsApp instead." },
      { status: 503 }
    );
  }

  // Keys must match the header row of the Zoho Sheet exactly.
  const row = {
    "Submitted At": new Date().toLocaleString("en-GB", { timeZone: "Asia/Karachi" }) + " PKT",
    Name: name,
    Phone: phone,
    Email: email,
    City: clean(data.city, 80),
    Destination: clean(data.destination, 40),
    Level: clean(data.level, 40),
    "Field of Study": clean(data.field, 120),
    "Last Result %": clean(data.result, 20),
    Intake: clean(data.intake, 40),
    "Best Time to Call": clean(data.callTime, 60),
    Message: clean(data.message, 1500),
    "Source Page": clean(data.sourcePage, 200),
    "UTM Source": clean(data.utmSource, 80),
    "UTM Campaign": clean(data.utmCampaign, 120),
    Status: "New",
  };

  try {
    await addSheetRow(row);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: "We couldn't save your request just now. Please try again or reach us on WhatsApp." },
      { status: 502 }
    );
  }
}
