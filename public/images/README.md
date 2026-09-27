# Adding photos

Drop image files in this folder, then reference them in `lib/content.ts`
by setting the relevant `image`/`photo` field to `/images/your-file.jpg`.

Every spot that's currently blank (`image: null`) renders a labeled
placeholder instead of a broken image, so the site never looks unfinished
while you're still collecting photos. Recommended sizes are noted on each
placeholder in the running site (also listed below):

- Hero photo (students on campus): 960 × 640
- Destination cards (China, Hungary): 800 × 450 each
- Study in Hungary page (Budapest skyline or campus): 1000 × 700
- Campus cards (Budapest / Beijing / Shanghai / Chengdu): 600 × 400 each
- Program cards: any 4:3-ish photo works, cropped automatically
- Testimonial photos: square, at least 200 × 200
- About page team/office photo: 800 × 600
- Blog cover images: 1200 × 630 (also used as the list thumbnail, cropped to 16:9)

You don't need to resize precisely — images are cropped to fit
automatically — but matching the aspect ratio avoids awkward cropping.
