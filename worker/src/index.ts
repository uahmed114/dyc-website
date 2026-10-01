// Cloudflare Worker that receives the /apply consultation form and appends it to the Zoho Sheet.
// The website itself is static files on Hostinger; this is the only server-side code.

import { addSheetRow, zohoConfigured, type ZohoEnv } from "./zoho";

interface Env extends ZohoEnv {
  /** Comma-separated origins allowed to submit, e.g. "https://dropyourcase.com,https://www.dropyourcase.com". */
  ALLOWED_ORIGINS?: string;
}

const clean = (v: unknown, max = 500) =>
  typeof v === "string" ? v.trim().replace(/\s+/g, " ").slice(0, max) : "";

function corsHeaders(origin: string): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const origin = req.headers.get("Origin") || "";
    const allowed = (env.ALLOWED_ORIGINS || "").split(",").map((o) => o.trim()).filter(Boolean);
    // Only our own site may submit; other websites' requests are refused.
    if (!allowed.includes(origin)) {
      return Response.json({ ok: false, error: "Forbidden." }, { status: 403 });
    }
    const cors = corsHeaders(origin);
    const json = (body: unknown, status = 200) => Response.json(body, { status, headers: cors });

    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (req.method !== "POST") return json({ ok: false, error: "Method not allowed." }, 405);

    let data: Record<string, unknown>;
    try {
      data = await req.json();
    } catch {
      return json({ ok: false, error: "Invalid request." }, 400);
    }

    // Honeypot: real visitors never see or fill this field; bots often do.
    if (clean(data.company)) return json({ ok: true });

    const name = clean(data.name, 120);
    const phone = clean(data.phone, 40);
    const email = clean(data.email, 160);
    if (!name || !phone || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ ok: false, error: "Please fill in your name, phone number and a valid email." }, 400);
    }

    if (!zohoConfigured(env)) {
      console.error("Consultation form: Zoho secrets are not set on the Worker.");
      return json({ ok: false, error: "The form isn't connected yet. Please reach us on WhatsApp instead." }, 503);
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
      await addSheetRow(env, row);
      return json({ ok: true });
    } catch (err) {
      console.error(err);
      return json(
        { ok: false, error: "We couldn't save your request just now. Please try again or reach us on WhatsApp." },
        502
      );
    }
  },
};
