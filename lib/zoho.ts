// Server-only helpers for writing consultation requests into a Zoho Sheet.
// Credentials come from environment variables (see .env.example and
// docs/ZOHO_SETUP.md). Never import this file from a client component.

const DC = process.env.ZOHO_DC || "com"; // "com", "eu", "in", "com.au", ...

type CachedToken = { value: string; expiresAt: number };
let cached: CachedToken | null = null;

export function zohoConfigured() {
  return Boolean(
    process.env.ZOHO_CLIENT_ID &&
      process.env.ZOHO_CLIENT_SECRET &&
      process.env.ZOHO_REFRESH_TOKEN &&
      process.env.ZOHO_SHEET_RESOURCE_ID
  );
}

/** Exchange the long-lived refresh token for a short-lived access token (cached ~55 min). */
async function getAccessToken(): Promise<string> {
  if (cached && Date.now() < cached.expiresAt) return cached.value;

  const params = new URLSearchParams({
    refresh_token: process.env.ZOHO_REFRESH_TOKEN!,
    client_id: process.env.ZOHO_CLIENT_ID!,
    client_secret: process.env.ZOHO_CLIENT_SECRET!,
    grant_type: "refresh_token",
  });
  const res = await fetch(`https://accounts.zoho.${DC}/oauth/v2/token`, {
    method: "POST",
    body: params,
    cache: "no-store",
  });
  const text = await res.text();
  let data: { access_token?: string; expires_in?: number } = {};
  try {
    data = JSON.parse(text);
  } catch {
    /* non-JSON error page; reported below */
  }
  if (!res.ok || !data.access_token) {
    throw new Error(`Zoho token refresh failed (${res.status}): ${text.slice(0, 300)}`);
  }
  const ttlMs = (Number(data.expires_in) || 3600) * 1000;
  cached = { value: data.access_token, expiresAt: Date.now() + ttlMs - 5 * 60 * 1000 };
  return cached.value;
}

/**
 * Append one row to the worksheet. Keys must match the sheet's header row
 * exactly (row 1 by default); unknown keys are ignored by Zoho.
 */
export async function addSheetRow(row: Record<string, string>) {
  const token = await getAccessToken();
  const body = new URLSearchParams({
    method: "worksheet.records.add",
    worksheet_name: process.env.ZOHO_SHEET_WORKSHEET || "Leads",
    header_row: process.env.ZOHO_SHEET_HEADER_ROW || "1",
    json_data: JSON.stringify([row]),
  });
  const res = await fetch(
    `https://sheet.zoho.${DC}/api/v2/${process.env.ZOHO_SHEET_RESOURCE_ID}`,
    {
      method: "POST",
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
      body,
      cache: "no-store",
    }
  );
  const text = await res.text();
  let data: { status?: string } = {};
  try {
    data = JSON.parse(text);
  } catch {
    /* non-JSON error page; reported below */
  }
  if (!res.ok || data.status !== "success") {
    throw new Error(`Zoho Sheet write failed (${res.status}): ${text.slice(0, 300)}`);
  }
  return data;
}
