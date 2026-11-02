# Dairy Classic: dairyclassics.com

A cinematic, scroll-driven B2B site for Dairy Classic ice cream. It is a static site with no build step: GSAP 3 + ScrollTrigger, Lenis smooth scroll and Google Fonts.

```
index.html          page skeleton (copy comes from config)
css/style.css       design tokens → shared UI → sections → mobile
js/config.js        EVERYTHING editable: products, colours, copy (EN/RU), contacts, hours, media paths
js/main.js          scrub engine, transitions, section choreography
scripts/process.sh  ffmpeg pipeline: raw renders → scrub-ready clips + posters
media/              Dairy Classic's own photos, product cut-outs, logo, icons and billboard film (see media/README.md)
raw/                drop generator output here before running process.sh
```

## Run it

```bash
npx serve .
```

Open the URL it prints. That is normally http://localhost:3000. If port 3000 is busy, serve picks another port and prints it. You can also force one with `npx serve . -l 4000`.

Serve it over http rather than opening it from disk. The shatter effect reads the product photos' pixels, and browsers block that for `file://` pages.

All content and media come from the brand's live site, dairyclassics.com. That covers 44 real products across six categories, the About-page facts (since 1996, 80,000 litres a day, the "Healthy Living" motto), the contacts and opening hours, the product photography, the DC logo and the 3D billboard film. The hero **shatters the real product photos**: each pack and product cracks into shards and crumbs (coloured from the photo itself) as you scroll, and reassembles when you scroll back.

## Common edits (all in `js/config.js`)

| I want to… | Edit |
|---|---|
| Rename a product, change its description or ingredient line | `products[n].name / desc / notes` (both `en` and `ru`) |
| Change a product colour | `products[n].accent`. It recolours the number, italic title, list, progress bar, giant word and badge |
| Change the giant hero word | `products[n].word` |
| Add/remove a hero product | Add/remove an entry in `products` with a transparent cut-out in `image` / `imageSm`. The list, counters and scroll length adapt |
| Change scroll length per product | `hero.vhPerProduct` (default 120) |
| Edit any heading or paragraph | `copy.en.*` and `copy.ru.*`. Wrap a word in `*asterisks*` to make it italic + accent |
| Phone, Telegram, WhatsApp, email, addresses | `contact` |
| Office hours / time zone (header status + live clocks) | `office`, `clocks` |
| Catalogue tabs and items | `catalogue`. Tab counts are computed from the items |
| Stats | `stats` |
| Connect the enquiry form | `form.endpoint`. The form POSTs JSON there. Empty = local stub that logs to the console |
| Ingredient rows | `ingredients`. `match` is a regex. Each row lists the real products whose descriptions mention it |

The live site gives no pack sizes, except "1 LTR" for tubs and cassatta. The site also lists two emails: support@dairyclassic.uz (About page, used here) and a personal-looking footer address (not used). Its floating WhatsApp button points to a UAE number, so the site uses the Tashkent and Samarkand WhatsApp lines from the contact page instead. The brand team should confirm which contacts are official for B2B.

## Media

Everything in `media/` is the brand's own (see `media/README.md`). To change a picture, replace the file, or point the config at a new one:

- hero product: `products[n].image` / `imageSm` (a transparent cut-out works best, because the shatter skips empty areas)
- catalogue: `catalogue[c].items[i].thumb` / `image`
- sections: `steps[n].image`, `manifestoPills`, `flythrough.image`, `ingredientsImage`, `reach.cards`, `film.*`, `partnerImage`

Optional exploding product videos can replace the photo shatter later. Render them start-frame to end-frame, run `bash scripts/process.sh` (it writes `media/hero/<id>-1280.mp4` and `-720.mp4`), then set `hero.video: true`.

## Fonts & Russian

Fraunces and Instrument Serif have no Cyrillic glyphs on Google Fonts. Russian text therefore falls back, glyph by glyph, to **Cormorant Garamond** (serif) and **Playfair Display** (display). Inter and JetBrains Mono cover Cyrillic natively. The font stacks are in the `--f-*` tokens at the top of `style.css`.

## Performance notes

- The hero shatter pre-renders its shards once per canvas size, so each frame is only transformed `drawImage` calls. The playhead is lerped (`hero.lerp`).
- The billboard film is lazy-loaded with IntersectionObserver when its section approaches, and scrubbed (never played). Photos are lazy-loaded and fade in once decoded.
- The frost particle canvas only runs while the reach section (80,000 litres a day) is on screen.
- `prefers-reduced-motion`: there is no smooth scroll, the hero shows each product's exploded end frame with plain crossfades, and the scramble, zoom and blur effects are skipped.
