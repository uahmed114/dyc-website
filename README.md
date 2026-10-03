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
   campus city, a testimonial, etc.). Blog photos are added in the
   blog admin instead (see below).
3. Set its `image` (or `photo`) field to `/images/your-file-name.jpg`.

That's it — the placeholder is replaced with the real photo automatically,
cropped to fit its spot. The site is a static export, so images aren't
resized on the fly: save them at a sensible size. See
`public/images/README.md` for recommended sizes per spot.

## Editing copy

Nearly all site copy — destinations (China, Hungary), pathway routes
(Thailand/Armenia → Hungary), Hungary facts and FAQs, nav links, hero stats, the tuition comparison
table, process steps, programs, campuses, testimonials, FAQs, scholarship
info — lives in `lib/content.ts` as plain arrays and
objects. Edit the text there rather than in the page files. Blog posts are
the exception: see **Blog admin** below.

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

### Every time: automatic

Every push to `main` (including posts published from the blog admin)
triggers `.github/workflows/deploy.yml`. It builds the site and uploads the
changed files to Hostinger over FTP. Watch it under the repo's **Actions**
tab. It takes 2–3 minutes. To redeploy without a change, open **Actions →
Deploy to Hostinger → Run workflow**.

One-time setup, in GitHub → repo → **Settings → Secrets and variables →
Actions**:

- Secrets `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`, from hPanel →
  **Files → FTP Accounts**.
- Optional variable `FTP_SERVER_DIR` if the site's folder, as seen from that
  FTP account, isn't `public_html/` (keep the trailing `/`).

The first run uploads everything. It doesn't delete files it didn't upload,
so clear the old WordPress files out of `public_html` before it (keep a
backup). If the run fails to connect, change `protocol: ftps` to `ftp` in
the workflow.

Manual fallback: `npm run build`, then upload the **contents** of `out/` to
`public_html` in hPanel's File Manager.

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

## Blog admin

Posts are written at **dropyourcase.com/admin** (Sveltia CMS, free and
open source). Each post is a Markdown file in `content/blog/`. Publishing
commits it to `main`, and the deploy above puts it live in 2–3 minutes.

- **Body:** rich-text editor with headings, bold and italic, links, lists,
  quotes and images.
- **Custom HTML:** paste your own HTML; it appears after the body. The
  field's help text lists the ready-made styles (callout boxes, stat cards,
  grids, tables) from `app/globals.css`.
- **Images:** uploaded images are converted to WebP and shrunk to at most
  1600px before they're saved to `public/images/blog/`.
- **Drafts:** tick **Draft** to save a post without showing it on the site.
- **Read time:** worked out automatically.
- **Page address:** comes from the title the first time a post is saved.

Settings: `public/admin/config.yml`. Loading posts for the site:
`lib/blog.ts`.

### One-time setup: signing in

The quick way: on the admin's login screen choose **Sign In Using Access Token**.
It links to GitHub with the right permissions pre-selected (Contents: read
and write). Create the token and paste it in. Your browser remembers it.

For a normal **Sign in with GitHub** button:

1. Deploy Sveltia's sign-in helper to your Cloudflare account (free): the
   "Deploy" button at https://github.com/sveltia/sveltia-cms-auth. Note the
   worker's URL.
2. GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**.
   Homepage `https://dropyourcase.com`, callback URL
   `<worker URL>/callback`. Copy the client ID and generate a client secret.
3. In the worker's Cloudflare settings, add the variables `GITHUB_CLIENT_ID`,
   `GITHUB_CLIENT_SECRET` (encrypted) and `ALLOWED_DOMAINS` =
   `dropyourcase.com`.
4. In `public/admin/config.yml`, uncomment `base_url` and set it to the
   worker URL.

Only GitHub accounts with write access to this repo can publish.

### Trying the admin locally

`npm run dev`, open http://localhost:3000/admin/index.html in Chrome or
Edge and choose **Work with Local Repository**, then pick this folder.
Changes are saved straight to `content/blog/`. Nothing is committed, and
no sign-in is needed.

## SEO

- Each page sets its search title and description with `pageMeta()` from
  `lib/seo.tsx`. Keep titles under ~60 characters and descriptions under ~160.
- `app/sitemap.ts` builds `/sitemap.xml`. **Add any new page to its list**;
  blog posts are added automatically.
- Old WordPress URLs are 301-redirected to their new equivalents in
  `public/.htaccess`. If you rename or remove a page, add a redirect there.
- Photos are served as-is (no on-the-fly resizing), so keep each one under
  ~1600px wide and a few hundred KB.

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
