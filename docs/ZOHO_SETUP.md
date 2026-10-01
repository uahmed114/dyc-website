# Connecting the consultation form to Zoho

Every submission on `/apply` is added as a new row in a Zoho Sheet in your
WorkDrive. This takes about 15 minutes to set up, once.

## 1. Prepare the spreadsheet

The API writes to **Zoho Sheet** files. A plain `.xlsx` sitting in WorkDrive
can't be appended to directly, so:

1. Upload `docs/consultation-leads-template.xlsx` to WorkDrive (or use your
   own `.xlsx`).
2. Open it in WorkDrive. It opens in Zoho Sheet, which saves an editable Zoho
   Sheet version. Use that version from now on. You can still download it as
   `.xlsx` any time (File → Download as).
3. Make sure the tab is named **Leads** and row 1 has exactly these headers
   (spelling and capitals matter; extra columns to the right are fine):

   `Submitted At | Name | Phone | Email | City | Destination | Level | Field of Study | Last Result % | Intake | Best Time to Call | Message | Source Page | UTM Source | UTM Campaign | Status`

4. Copy the spreadsheet's **resource ID** from the address bar. It's the long
   code after `/sheet/open/` (or `/sheet/` in some views):
   `https://sheet.zoho.com/sheet/open/`**`abc123xyz...`**`/sheets/Leads`

## 2. Create API credentials (Self Client)

1. Go to https://api-console.zoho.com (use the `.eu`/`.in` etc. version if
   your Zoho account is in that data centre) and sign in with the account
   that owns or can edit the spreadsheet.
2. **Add Client → Self Client → Create**. Copy the **Client ID** and
   **Client Secret**.
3. Open the **Generate Code** tab:
   - Scope: `ZohoSheet.dataAPI.UPDATE,ZohoSheet.dataAPI.READ`
   - Time duration: 10 minutes
   - Description: `DYC website form`
   - Click **Create** and copy the code. It expires in 10 minutes, so do the
     next step straight away.
4. Exchange the code for a **refresh token**. In PowerShell:

   ```powershell
   Invoke-RestMethod -Method Post -Uri "https://accounts.zoho.com/oauth/v2/token" -Body @{
     grant_type    = "authorization_code"
     client_id     = "<your client ID>"
     client_secret = "<your client secret>"
     code          = "<the code from step 3>"
   }
   ```

   Copy the `refresh_token` from the response. It doesn't expire unless you
   revoke it. Treat it like a password.

## 3. Add the values to the site

The form is handled by the Cloudflare Worker in `worker/`, so the secrets
live there, not in the website build.

- **Live:** from the `worker/` folder, run `npx wrangler secret put <NAME>`
  for each of `ZOHO_CLIENT_ID`, `ZOHO_CLIENT_SECRET`, `ZOHO_REFRESH_TOKEN` and
  `ZOHO_SHEET_RESOURCE_ID`, and paste the value when asked. The non-secret
  settings (`ZOHO_DC`, `ZOHO_SHEET_WORKSHEET`, `ZOHO_SHEET_HEADER_ROW`) are in
  `worker/wrangler.toml`.
- **Locally:** copy `worker/.dev.vars.example` to `worker/.dev.vars` and fill
  it in. It's ignored by git, so the secrets never get pushed.

## 4. Test

Submit the form at `/apply`. A new row should appear in the Leads tab within a
couple of seconds. If it doesn't, run `npm run logs` in `worker/` while you
submit; it shows the exact error from Zoho. The usual causes are a
header that doesn't match exactly, the wrong tab name, or the wrong data
centre in `ZOHO_DC`.

## Tracking which ads bring leads

The form records `utm_source` and `utm_campaign` from the page link. Add them
to your ad URLs, for example:

`https://dropyourcase.com/apply?utm_source=meta&utm_campaign=hungary-no-ielts`
