// Helpers for writing consultation requests into a Zoho Sheet.
// Credentials are Worker secrets (see worker/README.md and docs/ZOHO_SETUP.md).

export interface ZohoEnv {
  ZOHO_DC?: string; // "com", "eu", "in", "com.au", ...
  ZOHO_CLIENT_ID?: string;
  ZOHO_CLIENT_SECRET?: string;
  ZOHO_REFRESH_TOKEN?: string;
  ZOHO_SHEET_RESOURCE_ID?: string;
  ZOHO_SHEET_WORKSHEET?: string;
  ZOHO_SHEET_HEADER_ROW?: string;
}

type CachedToken = { value: string; expiresAt: number };
// Lives as long as the Worker instance, so warm requests skip the token refresh.
let cached: CachedToken | null = null;

export function zohoConfigured(env: ZohoEnv) {
  return Boolean(
    env.ZOHO_CLIENT_ID && env.ZOHO_CLIENT_SECRET && env.ZOHO_REFRESH_TOKEN && env.ZOHO_SHEET_RESOURCE_ID
  );
}

/** Exchange the long-lived refresh token for a short-lived access token (cached ~55 min). */
async function getAccessToken(env: ZohoEnv): Promise<string> {
  if (cached && Date.now() < cached.expiresAt) return cached.value;

  const params = new URLSearchParams({
    refresh_token: env.ZOHO_REFRESH_TOKEN!,
    client_id: env.ZOHO_CLIENT_ID!,
    client_secret: env.ZOHO_CLIENT_SECRET!,
    grant_type: "refresh_token",
  });
  const res = await fetch(`https://accounts.zoho.${env.ZOHO_DC || "com"}/oauth/v2/token`, {
    method: "POST",
    body: params,
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
export async function addSheetRow(env: ZohoEnv, row: Record<string, string>) {
  const token = await getAccessToken(env);
  const body = new URLSearchParams({
    method: "worksheet.records.add",
    worksheet_name: env.ZOHO_SHEET_WORKSHEET || "Leads",
    header_row: env.ZOHO_SHEET_HEADER_ROW || "1",
    json_data: JSON.stringify([row]),
  });
  const res = await fetch(`https://sheet.zoho.${env.ZOHO_DC || "com"}/api/v2/${env.ZOHO_SHEET_RESOURCE_ID}`, {
    method: "POST",
    headers: { Authorization: `Zoho-oauthtoken ${token}` },
    body,
  });
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
