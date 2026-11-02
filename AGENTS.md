# AGENTS.md: architecture notes for coding agents

Static site with no build step and no framework. Read this before editing `js/main.js`.

## Ground rules

- **Nothing editable is hard-coded in `main.js`.** Copy, colours, contacts, hours, media paths and product data all live in `js/config.js` (`window.DC_CONFIG`). If you add a string, add it to both `copy.en` and `copy.ru` and read it with `copy('path.to.key')`.
- Bilingual values are `{ en, ru }` objects resolved by `T(value)`. Plain strings pass through unchanged.
- `*word*` in copy becomes `<em>word</em>`, which is styled italic + `var(--accent)`.
- `--accent` is the single theme colour. Change it only through `setAccent(color)`, which tweens it.
- Libraries load from cdnjs/jsDelivr with pinned versions in `index.html`: gsap 3.12.5, ScrollTrigger, lenis 1.1.13.

## File map (main.js)

1. **Utilities & i18n**: `$`, `$$`, `T`, `copy`, `fmt`, `words()` (masked-word splitter), `photo()` (real image in a rounded, fade-in frame), `icon()` (the site's category icons), `fmtNum()`, `scramble()`.
2. **Lenis**: drives `ScrollTrigger.update` from the GSAP ticker. Use `scrollToY` / `scrollToEl` for all programmatic scrolling. They fall back to native scrolling and resolve pin-spacers.
3. **Cursor**: dot + lerped ring. Any element with `data-cursor="VIEW"` enlarges the ring and shows the label. Disabled on touch and with reduced motion.
4. **Header status & clocks**: `tzNow(tz)` uses `Intl.DateTimeFormat`, and `officeStatus()` reads `config.office`. `tickClocks()` runs every second and updates every `.status__text` and `.clock__time[data-tz]`.
5. **Hero films (scrub engine)**: see below.
6. **Renderers**: `render*()` functions build DOM from config. They are idempotent and re-run on language change.
7. **Builders**: `build*()` functions create tweens, ScrollTriggers and listeners. They run inside one `gsap.matchMedia()` in `setup()`.
8. **Language switch**: curtain → `mm.revert()` → `applyI18n()` + `renderAll()` → `setup()` → restore scroll.
9. **Boot**: render → load hero films (loader bar = download progress) → fonts → `setup()` → loader out → intro.

## The scrub engine

A *film* is any object with:

```js
{ el, duration, current, shown, threshold, seek(t) -> boolean, resize?() }
```

- `ImageFilm` (default): the real product cut-out. It is pre-rendered once per canvas size into ~100 triangular shards (empty transparent shards are skipped), plus crumbs whose colours are sampled from the photo. `draw(t)` only applies transforms (outer shards leave first, with tumbling via scaleX = cos). The canvas bleeds past the stage (`FILM_BLEED` in main.js must match `.film--image` in style.css).
- `VideoFilm` (when `hero.video` is true and `media/hero/<id>-*.mp4` exists): a muted `<video>` whose `src` is a blob URL. `seek()` refuses while `video.seeking`, so seeks never queue. If the clip is missing, the product falls back to `ImageFilm`.
- Both share one interface, so the rest of the system cannot tell them apart.
- **Never call `play()` on hero clips.**

Flow per frame:

```
ScrollTrigger(hero, pinned, length = vhPerProduct × N)
  onUpdate → onHeroProgress(p)
      i      = floor(p × N)                 active product
      local  = p × N − i                     0–1 inside segment
      heroTarget = local / (1 − holdEnd)     last holdEnd fraction holds the exploded frame
      if i changed → setProduct(i, dir)
gsap.ticker → heroTick()
      current += (target − current) × lerp   (frame-rate independent)
      seek(current) only if |current − shown| > threshold
```

`setProduct(i, dir, immediate)` is the **transition system**. It handles:

- media crossfade (out → scale .94, in → from 1.06)
- `swapWord()`: the slot-machine giant word, letter stagger .03s, direction aware
- `swapText()`: masked words slide out, content is rewritten, words slide in from the opposite side
- `setAccent()`, list/dots highlight, badge icon pop

The incoming film's `current` is set straight to the target, so scrolling back into a product starts it at its end frame without a lerp jump. `dir` is +1 when scrolling down and −1 when scrolling up.

## Builder contract

Every builder receives `{ desktop, signal, onCleanup }`:

- Register DOM listeners with `{ signal }`. They are removed on revert.
- Anything not owned by GSAP (ticker callbacks, rAF loops, observers) must be released through `onCleanup(fn)`, or by returning a function from `buildFooter`/`buildLazyVideos`-style builders.
- Tweens and ScrollTriggers created synchronously inside a builder are reverted automatically by `gsap.matchMedia`.
- **Order matters**: builders are called top → bottom of the page so pinned sections are measured correctly. Insert new pinned sections in page order.
- `desktop` is `min-width: 800px` (`config.media.mobileBreakpoint`). Crossing it rebuilds everything.

Pinned sections: hero, steps (desktop only), fly-through, pour, promises.

## Media conventions

- `photo(src, alt, cls)` outputs `.media > img[loading=lazy]`. `renderAll()` adds `.is-loaded` on decode, which fades it in.
- The film section: `.media.is-film > img.pour__poster + video[data-film]`. `buildLazyVideos()` sets the src when the section is within ~1 viewport, and `buildPour()` scrubs `currentTime` from scroll progress.
- All paths are relative to `config.media.base` (`media/`).

## Testing checklist

- Hero, scrolling forward: number, title, giant word, accent and list highlight change at each segment. Do the same scrolling backward: words must come in from above and the clip must play in reverse with no stutter.
- Clicking items in the hero range list (desktop) or the dots (mobile) jumps to that product.
- EN/RU toggle keeps the scroll position and leaves no duplicate pin-spacers (`document.querySelectorAll('.pin-spacer').length` = 5 on desktop, 4 on mobile).
- Resizing across 800 px rebuilds without errors.
- `prefers-reduced-motion` (DevTools → Rendering) shows end frames and crossfades only.
