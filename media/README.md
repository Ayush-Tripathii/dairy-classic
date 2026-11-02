# /media

All media here is Dairy Classic's own. It was downloaded from dairyclassics.com, then resized and converted to WebP. There are no stock or placeholder images.

```
brand/logo.png              DC pennant logo, cut out of the site's white-background JPG
brand/icons/*.png           the site's own category menu icons (cone, stick, cup, biscuit, cassatta, tub)

products/hero-<id>.webp     hero cut-outs (pack + unwrapped product), ~800px, transparent
products/hero-<id>-sm.webp  same, 560px (range hover card, mobile thumbnails)
products/<slug>.webp        every catalogue product from the six category pages (42 of 44 have their own image)
products/thumb/<slug>.webp  200px catalogue thumbnails

photos/*.webp               site photography (About page, home page sections, Instagram posts, banners)

film/billboard-1280.mp4     the brand's 3D billboard spot (Super Bricket), first 27.5 s,
film/billboard-720.mp4      re-encoded for scroll scrubbing (keyframe every 4–6 frames, no B-frames, no audio)
film/billboard.jpg          first-frame poster
```

The two tubs without their own photo (Ambroziya, Choco Chips) show the tub category icon in the catalogue. The site reuses another product's image for them.

Optional future hero clips go in `hero/<id>-1280.mp4` and `hero/<id>-720.mp4`. Set `hero.video: true` in `js/config.js` to use them. `scripts/process.sh` encodes raw renders into that format.
