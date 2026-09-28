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
resized and cropped by Next.js's image optimizer. See
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
Submissions go to `app/api/consultation/route.ts`, which appends a row to a
Zoho Sheet in WorkDrive. Setup (credentials and spreadsheet):
`docs/ZOHO_SETUP.md`. Dropdown options for the form live in
`consultationForm` in `lib/content.ts`.

## Deploying

Your domain stays on Hostinger; only where the site is *hosted* changes
from WordPress.

**Easiest path — Vercel (recommended for Next.js):**
1. Push this project to a GitHub repo.
2. Import it at vercel.com — it detects Next.js automatically and builds/
   deploys on every push.
3. In Vercel, add `dropyourcase.com` as a custom domain.
4. In Hostinger's DNS settings for the domain, update the records Vercel
   gives you (usually an A record and a CNAME for `www`). Propagation
   typically takes a few minutes to a few hours.
5. Once it resolves, remove/replace the old WordPress hosting.

**Alternative — keep everything on Hostinger:** if your Hostinger plan
supports Node.js apps (Business/Cloud plans do), you can deploy this
project directly there instead of moving to Vercel. The steps are more
manual (uploading the build, configuring the Node app, restart on
deploy), so Vercel is the simpler default unless you'd rather keep a
single host.

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
