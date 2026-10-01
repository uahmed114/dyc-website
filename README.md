# Drop Your Case — website

Next.js 14 (App Router) + Tailwind CSS rebuild of dropyourcase.com.

## Running it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000. Fonts (Fraunces, Public Sans, IBM Plex
Mono) are self-hosted from npm, so the site builds without calling out to
Google Fonts.

## Changing theme colors

Every color in the site is a CSS variable defined once, at the top of
`app/globals.css`:

```css
:root {
  --color-ink: #14231f;
  --color-ink-soft: #3e4e48;
  --color-jade: #1f6f5c;
  --color-jade-deep: #154a3e;
  --color-gold: #c6912f;
  --color-paper: #eff2ed;
  --color-paper-raised: #ffffff;
  --color-line: #d6dcd3;
  --color-muted: #6e7c74;
}
```

Change a hex value there and it updates everywhere that color is used,
site-wide — nav, buttons, section backgrounds, text. You don't need to
touch `tailwind.config.ts` or any component file.

## Adding photos

Placeholders (dashed boxes with a camera icon) mark every spot in the
design where a real photo belongs. To add one:

1. Drop the image file into `public/images/`.
2. Open `lib/content.ts` and find the relevant entry (a program, a
   campus city, a testimonial, a blog post, etc.).
3. Set its `image` (or `photo`) field to `/images/your-file-name.jpg`.

That's it — the placeholder is replaced with the real photo automatically,
cropped to fit its spot. The site is a static export, so images aren't
resized on the fly: save them at a sensible size. See
`public/images/README.md` for recommended sizes per spot.

## Editing copy

Nearly all site copy — destinations (China, Hungary), pathway routes
(Thailand/Armenia → Hungary), Hungary facts and FAQs, nav links, hero stats, the tuition comparison
table, process steps, programs, campuses, testimonials, FAQs, scholarship
info, and blog posts — lives in `lib/content.ts` as plain arrays and
objects. Edit the text there rather than in the page files.

## Project structure

```
app/                 pages (App Router) — one folder per route
  page.tsx           home page
  destinations/      /destinations (overview of every country + pathways)
  study-in-china/    /study-in-china
  study-in-hungary/  /study-in-hungary (incl. #pathways section)
  scholarships/      /scholarships
  universities/      /universities
  blog/              /blog and /blog/[slug]
  about/             /about
  apply/             /apply (contact/application form UI)
  privacy/           /privacy
components/          shared UI (Nav, Footer, cards, ImagePlaceholder, etc.)
lib/content.ts       all site copy, stats, and image paths
public/images/       put your photos here
```

The "Book a Free Call" buttons open `/apply`, a consultation request form.
Submissions go to a small Cloudflare Worker (`worker/src/index.ts`), which
appends a row to a Zoho Sheet in WorkDrive. Setup (credentials and spreadsheet):
`docs/ZOHO_SETUP.md`. Dropdown options for the form live in
`consultationForm` in `lib/content.ts`.

## Deploying

The site is two pieces:

- **The website**: a static export (`output: "export"` in `next.config.mjs`).
  `npm run build` writes plain HTML/CSS/JS to `out/`, which is uploaded to
  Hostinger. No Node.js needed, so it runs on the Premium plan.
- **The form handler**: `worker/`, a Cloudflare Worker (free plan) that
  receives `/apply` submissions and writes them to Zoho. It only accepts
  posts from the origins in `ALLOWED_ORIGINS` in `worker/wrangler.toml`.

The domain, DNS and email all stay at Hostinger. Nothing about them changes.

### First time: deploy the worker

```bash
cd worker
npm install
npx wrangler login            # opens a browser; free Cloudflare account
npx wrangler secret put ZOHO_CLIENT_ID
npx wrangler secret put ZOHO_CLIENT_SECRET
npx wrangler secret put ZOHO_REFRESH_TOKEN
npx wrangler secret put ZOHO_SHEET_RESOURCE_ID
npm run deploy
```

`deploy` prints the worker's URL (`https://dyc-consultation.<name>.workers.dev`).
Paste it into `.env.production` as `NEXT_PUBLIC_CONSULTATION_URL`. It's
public, not a secret, so commit it.

### Every time: build and upload the website

1. `npm run build` (from the project root).
2. In hPanel → **Files → File Manager**, open `public_html`.
3. Upload the **contents** of `out/` (not the folder itself), replacing what's
   there. Easiest: zip the contents of `out/`, upload the zip, then right-click
   → Extract. `out/` includes the `.htaccess` that forces HTTPS, redirects
   `www` to the bare domain, and serves the 404 page.

Re-deploy the worker (`npm run deploy` in `worker/`) only when you change
something under `worker/`.

### Testing the form locally

1. In `worker/`, copy `.dev.vars.example` to `.dev.vars`, fill it in, and run
   `npm run dev` (serves on http://localhost:8787).
2. In the project root, create `.env.development.local` containing
   `NEXT_PUBLIC_CONSULTATION_URL=http://localhost:8787` and run `npm run dev`.
   Use `.env.development.local`, not `.env.local`: `.env.local` also applies
   to `npm run build` and would point the live site at your laptop.

Submitting locally writes a real row to the Zoho Sheet.

## Partner universities and the disclaimer

The site describes destinations and routes without naming partner
universities or publishing fees, scholarship amounts, or entry-requirement
tables. Those are shared in the consultation. The footer disclaimer
(`site.disclaimer` in `lib/content.ts`) states that DYC is an independent
consultancy, not an official office of any university; keep it in place.

To add a new destination, append an entry to `destinations` in
`lib/content.ts` (it appears automatically on the home page and
/destinations) and copy `app/study-in-hungary/` as a starting point for its
page.
