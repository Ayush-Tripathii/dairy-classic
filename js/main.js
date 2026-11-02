/* ==========================================================================
   Dairy Classic — main.js
   Reads everything editable from window.DC_CONFIG (js/config.js).

   1. Utilities & i18n          6. Renderers (DOM from config)
   2. Smooth scroll (Lenis)     7. Section builders (inside gsap.matchMedia)
   3. Cursor                    8. Language switch
   4. Header status & clocks    9. Boot
   5. Hero films (scrub engine)
   ========================================================================== */
(() => {
  'use strict';

  const C = window.DC_CONFIG;
  if (!C || !window.gsap || !window.ScrollTrigger) {
    document.body.classList.remove('is-loading');
    document.querySelector('.loader')?.remove();
    console.error('[Dairy Classic] config.js or GSAP failed to load.');
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  /* ======================================================================
     1. Utilities & i18n
     ====================================================================== */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const pad = n => String(n).padStart(2, '0');
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const root = document.documentElement;
  const N = C.products.length;
  const BP = C.media.mobileBreakpoint;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const minus = v => (v < 0 ? '−' + Math.abs(v) : String(v));     // typographic minus

  let lang = (() => { try { return localStorage.getItem('dc-lang'); } catch (e) { return null; } })() || C.defaultLang || 'en';
  if (!C.copy[lang]) lang = 'en';

  // T(): resolve a bilingual value { en, ru } or pass a plain value through
  const T = v => (v && typeof v === 'object' && !Array.isArray(v) && ('en' in v || 'ru' in v)) ? (v[lang] ?? v.en) : (v ?? '');
  const dig = (obj, key) => key.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);
  const copy = key => dig(C.copy[lang], key) ?? dig(C.copy.en, key) ?? '';
  const fmt = s => String(s).replace(/\*(.+?)\*/g, '<em>$1</em>');
  const fill = (s, vars) => String(s).replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const mediaPath = (tpl, id) => `${C.media.base}/${tpl.replace('{id}', id)}`;
  const media = p => `${C.media.base}/${p}`;
  const isSmall = () => innerWidth < BP;

  // Split into masked words: <span class="w"><span class="w__in">word</span></span>
  const words = s => String(s).split(/\s+/).filter(Boolean)
    .map(w => `<span class="w"><span class="w__in">${w}</span></span>`).join(' ');

  // Real photo in a rounded frame (lazy, fades in once decoded)
  const photo = (src, alt = '', cls = '', position = '') =>
    `<div class="media ${cls}"><img src="${esc(media(src))}" alt="${esc(alt)}" loading="lazy" decoding="async"${position ? ` style="object-position:${esc(position)}"` : ''}></div>`;

  // Category icon from the site's own menu (cone, stick, cup, biscuit, cassatta, tub)
  const icon = name => `<img src="${esc(media(`brand/icons/${name}.png`))}" alt="" width="36" height="46">`;
  const fmtNum = (n, l = lang) => Math.round(n).toLocaleString(l === 'ru' ? 'ru-RU' : 'en-US').replace(/ | /g, ' ');
  const STAR = '<svg class="star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0z"/></svg>';

  function setAccent(color, duration = 0.6) {
    gsap.to(root, { '--accent': color, duration, ease: 'power2.out', overwrite: 'auto' });
  }

  // Scramble a text node through Latin + Cyrillic glyphs, resolving left → right
  const GLYPHS_UP = 'ABCDEFGHJKLMNPRSTUVWXYZБГДЖЗИЛПФЦЧШЩЭЮЯ#%&';
  const GLYPHS_LO = 'abcdefghjkmnpqrstuvwxyzбгджзилпфцчшщэюя';
  function scramble(el, text, dur = 0.8) {
    cancelAnimationFrame(el._scr);
    if (reduced) { el.textContent = text; return; }
    const start = performance.now();
    const len = text.length;
    const step = now => {
      const p = clamp((now - start) / (dur * 1000), 0, 1);   // rAF stamps can precede `start`
      const solved = Math.floor(p * len);
      let out = text.slice(0, solved);
      for (let i = solved; i < len; i++) {
        const ch = text[i];
        if (ch === ' ') { out += ' '; continue; }
        const set = ch === ch.toLowerCase() ? GLYPHS_LO : GLYPHS_UP;
        out += set[(Math.random() * set.length) | 0];
      }
      el.textContent = out;
      if (p < 1) el._scr = requestAnimationFrame(step);
    };
    el._scr = requestAnimationFrame(step);
  }

  /* ======================================================================
     2. Smooth scroll
     ====================================================================== */
  let lenis = null;
  if (!reduced && window.Lenis) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  }
  const scrollToY = (y, { immediate = false, duration = 1.4 } = {}) => {
    if (lenis) lenis.scrollTo(y, { immediate, duration, force: true });
    else window.scrollTo({ top: y, behavior: immediate || reduced ? 'auto' : 'smooth' });
  };
  const scrollToEl = sel => {
    if (sel === '#top') return scrollToY(0);
    const el = $(sel);
    if (!el) return;
    // pinned sections are wrapped in a pin-spacer: measure that so we land at the pin start
    const target = el.parentElement?.classList.contains('pin-spacer') ? el.parentElement : el;
    scrollToY(target.getBoundingClientRect().top + scrollY);
  };

  /* ======================================================================
     3. Cursor (dot + lagging ring)
     ====================================================================== */
  function initCursor() {
    if (!finePointer || reduced) return;
    document.body.classList.add('has-cursor');
    const cur = $('.cursor'), dot = $('.cursor__dot'), ring = $('.cursor__ring'), label = $('.cursor__label');
    const setDot = { x: gsap.quickSetter(dot, 'x', 'px'), y: gsap.quickSetter(dot, 'y', 'px') };
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    let scale = 0.5, targetScale = 0.5;
    addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; setDot.x(mx); setDot.y(my); }, { passive: true });
    document.addEventListener('pointerover', e => {
      const media = e.target.closest('[data-cursor]');
      const link = e.target.closest('a, button, .sig__row, .hero__list li');
      if (media) { label.textContent = media.dataset.cursor; cur.classList.add('is-active'); targetScale = 1; }
      else { cur.classList.remove('is-active'); targetScale = link ? 0.75 : 0.5; }
    });
    document.addEventListener('pointerleave', () => cur.classList.add('is-hidden'));
    document.addEventListener('pointerenter', () => cur.classList.remove('is-hidden'));
    gsap.ticker.add(() => {
      const k = 1 - Math.pow(1 - 0.16, gsap.ticker.deltaRatio(60));
      const dragging = document.body.classList.contains('is-dragging');
      const effTarget = dragging ? targetScale * 0.82 : targetScale;
      rx += (mx - rx) * k; ry += (my - ry) * k; scale += (effTarget - scale) * k;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) scale(${scale})`;
    });
  }

  /* ======================================================================
     4. Header status & live clocks (Intl, office time zone)
     ====================================================================== */
  const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  function tzNow(tz) {
    const parts = {};
    new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', weekday: 'short', hourCycle: 'h23' })
      .formatToParts(new Date()).forEach(p => { parts[p.type] = p.value; });
    return { h: +parts.hour, m: +parts.minute, hh: parts.hour, mm: parts.minute, ss: parts.second, wd: WEEKDAYS.indexOf(parts.weekday) };
  }
  function officeStatus() {
    const { open, close, days, timeZone } = C.office;
    const now = tzNow(timeZone);
    const toMin = s => { const [a, b] = s.split(':'); return +a * 60 + +b; };
    const mins = now.h * 60 + now.m;
    if (days.includes(now.wd) && mins >= toMin(open) && mins < toMin(close)) {
      return { open: true, text: fill(copy('status.open'), { t: close }) };
    }
    // next opening: today (before hours), tomorrow, or a named day
    let d = now.wd, ahead = 0;
    if (!(days.includes(d) && mins < toMin(open))) {
      do { d = (d + 1) % 7; ahead++; } while (!days.includes(d) && ahead < 8);
    }
    const day = ahead > 1 ? copy('days')[d] + ' ' : '';
    return { open: false, text: fill(copy('status.closed'), { t: open, d: day }) };
  }
  let lastStatus = '';
  function tickClocks() {
    const st = officeStatus();
    const key = st.text + st.open;
    if (key !== lastStatus) {
      lastStatus = key;
      $$('.status__text').forEach(el => { el.textContent = st.text; });
      $$('.status, .live__title').forEach(el => el.classList.toggle('is-closed', !st.open));
    }
    $$('.clock__time').forEach(el => {
      const t = tzNow(el.dataset.tz);
      el.textContent = el.dataset.seconds ? `${t.hh}:${t.mm}:${t.ss}` : `${t.hh}:${t.mm}`;
    });
  }

  /* ======================================================================
     5. Hero films — the scrub engine
     A "film" is anything with { el, duration, current, shown, threshold, seek(t) }.
     ImageFilm shatters the real product photo into shards that hang mid-air;
     VideoFilm seeks an in-memory <video> (used when hero.video is on and the
     clip exists). Both are driven identically by the scroll playhead.
     ====================================================================== */
  class VideoFilm {
    constructor(p) {
      const v = document.createElement('video');
      v.className = 'film';
      v.muted = true; v.playsInline = true; v.preload = 'auto';
      v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.disablePictureInPicture = true;
      v.addEventListener('loadedmetadata', () => { if (isFinite(v.duration) && v.duration > 0) this.duration = v.duration; });
      Object.assign(this, { p, el: v, duration: 5, current: 0, shown: -1, threshold: 1 / 60 });
    }
    seek(t) {
      const v = this.el;
      if (v.readyState < 1 || v.seeking) return false;          // never queue seeks
      v.currentTime = Math.min(t, this.duration - 0.001);
      return true;
    }
  }

  function mulberry32(a) {
    return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  const hexA = (hex, a) => {
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
  };
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const easeInOut = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  /* The real product photo, scrubbed: still and whole → cracks into triangular
     shards that drift outward, tumble and hang in the air, with crumbs whose
     colours are sampled from the photo itself. Shards are pre-rendered once per
     size, so each frame is only transformed drawImage calls. */
  const FILM_BLEED = { x: 0.14, y: 0.2 };     // keep in sync with .film--image in style.css
  class ImageFilm {
    constructor(p, i, img) {
      const c = document.createElement('canvas');
      c.className = 'film film--image';
      c.setAttribute('role', 'img');
      c.setAttribute('aria-label', p.name);
      Object.assign(this, { p, i, img, el: c, ctx: c.getContext('2d'), duration: 1, current: 0, shown: -1, threshold: 1 / 900, key: '' });
    }
    resize() {
      const dpr = Math.min(devicePixelRatio || 1, 1.75);
      const w = Math.max(1, Math.round(this.el.offsetWidth * dpr));
      const h = Math.max(1, Math.round(this.el.offsetHeight * dpr));
      if (w !== this.el.width || h !== this.el.height) { this.el.width = w; this.el.height = h; }
      const key = w + 'x' + h;
      if (key !== this.key && w > 2) { this.key = key; this.build(w, h); }
      this.draw(this.current);
    }
    build(W, H) {
      const img = this.img;
      const fit = (C.hero.productScale || 0.8) * (this.p.scale || 1);
      // the canvas is larger than the stage (see .film--image bleed); size the product to the stage
      const sw = W / (1 + 2 * FILM_BLEED.x), sh = H / (1 + 2 * FILM_BLEED.y);
      this.stage = { w: sw, h: sh };
      const s = Math.min((sw * fit) / img.naturalWidth, (sh * fit) / img.naturalHeight);
      const iw = img.naturalWidth * s, ih = img.naturalHeight * s;
      this.rect = { x: (W - iw) / 2, y: (H - ih) / 2 + sh * 0.02, w: iw, h: ih };

      // full image at this size (whole state)
      const whole = document.createElement('canvas');
      whole.width = Math.ceil(iw); whole.height = Math.ceil(ih);
      const wctx = whole.getContext('2d', { willReadFrequently: true });
      wctx.drawImage(img, 0, 0, iw, ih);
      this.whole = whole;
      let data = null;
      try { data = wctx.getImageData(0, 0, whole.width, whole.height).data; } catch (e) { /* tainted: skip alpha tests */ }
      const alphaAt = (x, y) => (data ? data[((Math.min(whole.height - 1, Math.max(0, y | 0)) * whole.width) + Math.min(whole.width - 1, Math.max(0, x | 0))) * 4 + 3] : 255);

      // jittered grid → two triangles per cell
      const rnd = mulberry32(this.i * 7919 + 101);
      const cols = 10, rows = 12;
      const pts = [];
      for (let r = 0; r <= rows; r++) {
        pts.push([]);
        for (let q = 0; q <= cols; q++) {
          const edge = r === 0 || q === 0 || r === rows || q === cols;
          const jx = edge ? 0 : (rnd() - 0.5) * 0.65, jy = edge ? 0 : (rnd() - 0.5) * 0.65;
          pts[r].push([((q + jx) / cols) * iw, ((r + jy) / rows) * ih]);
        }
      }
      const tris = [];
      for (let r = 0; r < rows; r++) for (let q = 0; q < cols; q++) {
        const a = pts[r][q], b = pts[r][q + 1], c = pts[r + 1][q + 1], d = pts[r + 1][q];
        if (rnd() < 0.5) tris.push([a, b, c], [a, c, d]); else tris.push([a, b, d], [b, c, d]);
      }
      const cx0 = iw / 2, cy0 = ih * 0.55, maxR = Math.hypot(iw, ih) / 2;
      this.shards = [];
      for (const t of tris) {
        const minX = Math.floor(Math.min(t[0][0], t[1][0], t[2][0])) - 1, minY = Math.floor(Math.min(t[0][1], t[1][1], t[2][1])) - 1;
        const maxX = Math.ceil(Math.max(t[0][0], t[1][0], t[2][0])) + 1, maxY = Math.ceil(Math.max(t[0][1], t[1][1], t[2][1])) + 1;
        const gx = (t[0][0] + t[1][0] + t[2][0]) / 3, gy = (t[0][1] + t[1][1] + t[2][1]) / 3;
        // skip shards that are empty (transparent background of the cut-out)
        let solid = 0;
        for (let k = 0; k < 9; k++) {
          const u = (k % 3 + 0.5) / 3, v = (Math.floor(k / 3) + 0.5) / 3;
          const px = t[0][0] + (t[1][0] - t[0][0]) * u * (1 - v) + (t[2][0] - t[0][0]) * v * u;
          const py = t[0][1] + (t[1][1] - t[0][1]) * u * (1 - v) + (t[2][1] - t[0][1]) * v * u;
          if (alphaAt(px, py) > 40) solid++;
        }
        if (alphaAt(gx, gy) < 40 && solid < 2) continue;
        const cv = document.createElement('canvas');
        cv.width = Math.max(1, maxX - minX); cv.height = Math.max(1, maxY - minY);
        const sc = cv.getContext('2d');
        sc.beginPath();
        sc.moveTo(t[0][0] - minX, t[0][1] - minY); sc.lineTo(t[1][0] - minX, t[1][1] - minY); sc.lineTo(t[2][0] - minX, t[2][1] - minY); sc.closePath();
        sc.clip();
        sc.drawImage(whole, -minX, -minY);
        const dx = gx - cx0, dy = gy - cy0, len = Math.hypot(dx, dy) || 1;
        this.shards.push({
          cv, ox: minX, oy: minY, gx, gy,
          nx: dx / len, ny: dy / len, rad: len / maxR,
          dist: 0.35 + rnd() * 0.65, lift: (rnd() - 0.65) * 0.25,
          spin: (rnd() - 0.5) * 2.2, flip: 0.5 + rnd() * 1.4, delay: rnd() * 0.16,
        });
      }
      // crumbs coloured from the photo itself
      this.crumbs = [];
      for (let k = 0, tries = 0; k < 90 && tries < 900; tries++) {
        const x = rnd() * iw, y = rnd() * ih;
        if (!data || alphaAt(x, y) < 180) continue;
        const o = (((y | 0) * whole.width) + (x | 0)) * 4;
        this.crumbs.push({ x, y, c: `rgb(${data[o]},${data[o + 1]},${data[o + 2]})`, a: rnd() * Math.PI * 2, d: 0.35 + rnd() * 0.95, s: 1 + rnd() * 3.4, ph: rnd() * 6.28 });
        k++;
      }
    }
    seek(t) { this.draw(t); return true; }
    draw(time) {
      const { ctx, p, rect } = this;
      const W = this.el.width, H = this.el.height;
      if (W < 2 || !rect) return;
      const t = clamp(time / this.duration, 0, 1);
      const pre = clamp(t / 0.14, 0, 1);                         // settle + subtle push-in before the break
      const e = clamp((t - 0.12) / 0.88, 0, 1);                  // burst amount
      const u = Math.min(this.stage.w, this.stage.h) * 0.62;
      const dpr = W / Math.max(1, this.el.offsetWidth);
      ctx.clearRect(0, 0, W, H);

      // key light behind the product, tinted with the product accent
      const cx = rect.x + rect.w / 2, cy = rect.y + rect.h * 0.55;
      const g = ctx.createRadialGradient(cx - rect.w * 0.1, cy - rect.h * 0.15, 0, cx, cy, Math.max(rect.w, rect.h) * 0.85);
      g.addColorStop(0, hexA(p.accent, 0.26 - e * 0.1));
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

      // cold vapour drifting off the still product
      if (e < 1) {
        for (let k = 0; k < 3; k++) {
          const ph = (time * 0.55 + k / 3 + this.i * 0.13) % 1;
          const vx = cx + (k - 1) * rect.w * 0.18 + Math.sin(ph * 5 + k) * rect.w * 0.05;
          const vy = rect.y + rect.h * 0.08 - ph * rect.h * 0.3;
          const r = rect.w * (0.12 + ph * 0.14);
          const vg = ctx.createRadialGradient(vx, vy, 0, vx, vy, r);
          vg.addColorStop(0, `rgba(232,238,244,${0.075 * Math.sin(ph * Math.PI) * (1 - e)})`);
          vg.addColorStop(1, 'rgba(232,238,244,0)');
          ctx.fillStyle = vg; ctx.fillRect(vx - r, vy - r, r * 2, r * 2);
        }
      }

      const push = 1 + easeInOut(pre) * 0.04;

      // Keep whole product visible underneath during the fracture onset (smooth fade 0 -> 0.22)
      // This prevents harsh black gaps and jagged cuts when the burst begins
      if (e < 0.22) {
        ctx.save();
        ctx.globalAlpha = 1 - (e / 0.22);
        ctx.translate(cx, cy); ctx.scale(push, push); ctx.translate(-cx, -cy);
        ctx.drawImage(this.whole, rect.x, rect.y, rect.w, rect.h);
        ctx.restore();
      }

      if (e <= 0.001) return;

      // crumbs
      const ce = easeOut(clamp(e * 1.15, 0, 1));
      for (const q of this.crumbs) {
        const r = q.d * u * 0.42 * ce;
        const x = rect.x + q.x + Math.cos(q.a) * r;
        const y = rect.y + q.y + Math.sin(q.a) * r * 0.8 + Math.sin(time * 4 + q.ph) * 3 * dpr * ce;
        ctx.globalAlpha = clamp(ce * 2.5, 0, 1) * 0.9;
        ctx.fillStyle = q.c;
        ctx.beginPath(); ctx.arc(x, y, q.s * dpr * (0.6 + ce * 0.6), 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;

      // shards: outer pieces leave first, inner pieces follow
      for (const s of this.shards) {
        const local = easeOut(clamp((e - s.delay * (1 - s.rad)) / (1 - s.delay * 0.5), 0, 1));
        if (local <= 0.001) continue;
        const travel = u * (0.08 + s.dist * 0.38) * local * (0.55 + s.rad * 0.6);
        const x = rect.x + s.gx + s.nx * travel;
        const y = rect.y + s.gy + s.ny * travel * 0.85 + s.lift * u * local;
        const rot = s.spin * Math.pow(local, 1.25);
        const flipT = Math.sin(Math.min(1, local * 1.4) * Math.PI * 0.5);
        const flip = Math.cos(s.flip * flipT * Math.PI * 0.5);     // tumbling in depth
        const depth = 1 + local * (s.rad - 0.5) * 0.25;
        const shardAlpha = clamp(local * 3.5, 0, 1);
        ctx.save();
        ctx.globalAlpha = shardAlpha;
        ctx.translate(x, y);
        ctx.rotate(rot);
        ctx.scale(push * depth * (0.35 + 0.65 * Math.abs(flip)), push * depth);
        ctx.drawImage(s.cv, s.ox - s.gx, s.oy - s.gy);
        ctx.restore();
      }
    }
  }

  async function fetchClip(url, onProgress) {
    const res = await fetch(url, { cache: 'force-cache' });
    const type = res.headers.get('content-type') || '';
    if (!res.ok || /text\/html/.test(type)) return null;                 // no clip → use the photo
    const total = +res.headers.get('content-length') || 0;
    if (!res.body || !total) { const b = await res.blob(); onProgress(1); return URL.createObjectURL(b); }
    const reader = res.body.getReader();
    const chunks = [];
    let got = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value); got += value.length; onProgress(Math.min(1, got / total));
    }
    return URL.createObjectURL(new Blob(chunks, { type: type || 'video/mp4' }));
  }

  function loadVideo(film, src, timeout) {
    return new Promise(resolve => {
      const v = film.el;
      let done = false;
      const finish = ok => {
        if (done) return; done = true; clearTimeout(timer);
        v.removeEventListener('loadeddata', onOk); v.removeEventListener('error', onErr);
        resolve(ok);
      };
      const onOk = () => finish(true), onErr = () => finish(false);
      const timer = setTimeout(() => finish(v.readyState >= 1), timeout);
      v.addEventListener('loadeddata', onOk); v.addEventListener('error', onErr);
      v.src = src; v.load();
    });
  }

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => (img.decode ? img.decode().catch(() => {}).then(() => resolve(img)) : resolve(img));
      img.onerror = () => reject(new Error('image ' + src));
      img.src = src;
    });
  }

  async function prepareFilms(onProgress) {
    const small = isSmall();
    const prog = new Array(N).fill(0);
    const report = () => onProgress(prog.reduce((a, b) => a + b, 0) / N);
    return Promise.all(C.products.map(async (p, i) => {
      let film = null;
      if (C.hero.video) {
        const url = mediaPath(small ? C.media.heroMobile : C.media.heroDesktop, p.id);
        try {
          const blobUrl = await fetchClip(url, f => { prog[i] = f * 0.95; report(); });
          if (blobUrl) {
            const vf = new VideoFilm(p);
            if (await loadVideo(vf, blobUrl, C.hero.fetchTimeout)) film = vf;
          }
        } catch (err) {
          // fetch() unavailable (file://, offline): stream instead — rougher scrub
          const vf = new VideoFilm(p);
          if (await loadVideo(vf, url, 8000)) film = vf;
        }
      }
      if (!film) {
        try { film = new ImageFilm(p, i, await loadImage(`${C.media.base}/${p.image}`)); }
        catch (err) { console.error('[Dairy Classic] hero image missing:', p.image); }
      }
      prog[i] = 1; report();
      return film;
    }));
  }

  /* ======================================================================
     6. Renderers — build DOM from config (re-run on language change)
     ====================================================================== */
  function applyI18n() {
    root.lang = lang;
    document.title = copy('meta.title');
    $$('[data-i18n]').forEach(el => { el.innerHTML = fmt(copy(el.dataset.i18n)); });
    $$('[data-i18n-roll]').forEach(el => {
      const t = copy(el.dataset.i18nRoll);
      el.innerHTML = `<span class="roll"><span>${t}</span><span aria-hidden="true">${t}</span></span>`;
    });
    $$('.lang button').forEach(b => b.classList.toggle('is-active', b.dataset.lang === lang));
    lastStatus = '';
    tickClocks();
  }

  function renderHero() {
    $('.hero__total').textContent = '/ ' + pad(N);
    const ring = $('.badge__text');
    ring.textContent = copy('hero.badge');
    ring.setAttribute('textLength', (2 * Math.PI * 38 - 2).toFixed(1));   // fit the text exactly once around the r=38 ring
    ring.setAttribute('lengthAdjust', 'spacing');
    $('.hero__list ol').innerHTML = C.products.map((p, i) =>
      `<li data-i="${i}"><span class="n">${pad(i + 1)}</span><span class="t">${T(p.name).join(' ')}</span></li>`).join('');
    $('.hero__dots-row').innerHTML = C.products.map((p, i) =>
      `<button type="button" data-i="${i}" aria-label="${esc(T(p.name).join(' '))}"><i></i></button>`).join('');
  }

  function renderMarquee() {
    $$('.marquee__track').forEach((track, r) => {
      const items = C.marquee[r] || [];
      const group = items.map(([text, style]) => `<span class="mq mq--${style}">${text}</span>${STAR}`).join('');
      // two identical groups → seamless loop at xPercent -50
      track.innerHTML = `<div class="marquee__group">${group}${group}</div><div class="marquee__group">${group}${group}</div>`;
    });
  }

  function renderManifesto() {
    let inEm = false;
    const html = copy('manifesto.text').split(/\s+/).map(tok => {
      const pill = tok.match(/^\{pill:(\w+)\}([.,;:!?]*)$/);
      if (pill) return `<span class="mf-w mf-pill" data-cursor="VIEW">${photo(C.manifestoPills[pill[1]])}</span>${pill[2]}`;
      let w = tok;
      if (w.startsWith('*')) { inEm = true; w = w.slice(1); }
      const closes = /\*[.,;:!?]*$/.test(w);
      if (closes) w = w.replace(/\*([.,;:!?]*)$/, '$1');
      const out = `<span class="mf-w${inEm ? ' is-em' : ''}">${w}</span>`;
      if (closes) inEm = false;
      return out;
    }).join(' ');
    $('.manifesto__text').innerHTML = html;
  }

  function renderSteps() {
    $('.steps__track').innerHTML = C.steps.map((s, i) => `
      <article class="step">
        <div class="step__media-wrap" data-cursor="VIEW">${photo(s.image, T(s.name), 'step__media', s.position)}</div>
        <div class="step__meta">
          <span class="step__num">${pad(i + 1)}</span>
          <h3 class="step__name">${T(s.name)}${lang === 'en' ? ` <small>${s.ruName}</small>` : ''}</h3>
          <p class="step__desc">${T(s.desc)}</p>
        </div>
        <div class="step__shade"></div>
      </article>`).join('');
  }

  function renderFly() {
    $('.fly__text').textContent = C.flythrough.word;
    $('.fly__media').innerHTML = photo(C.flythrough.image, 'Dairy Classic range');
  }

  // every product with its category, for cross-referencing ingredients
  const allProducts = () => C.catalogue.flatMap(c => c.items.map(it => ({ ...it, cat: c })));

  function renderIngredients() {
    $('.ingredients__media').innerHTML = photo(C.ingredientsImage, 'Dairy Classic range');
    const prods = allProducts();
    $('.ingredients__list').innerHTML = C.ingredients.map((g, i) => {
      const main = T(g.name);
      const alt = lang === 'en' ? g.name.ru : g.name.en;
      const sub = lang === 'en' ? `${g.name.ru} · ${g.translit}` : `${g.name.en} · ${g.translit}`;
      const re = new RegExp(g.match, 'i');
      const found = prods.filter(p => re.test(p.desc.en) || re.test(p.name));
      const shown = found.slice(0, 3).map(p => (lang === 'ru' ? p.ru : p.name)).join(', ');
      const more = found.length > 3 ? ` ${fill(copy('ingredients.more'), { n: found.length - 3 })}` : '';
      return `<li class="ing">
        <span class="ing__num">${pad(i + 1)}</span>
        <div><span class="ing__name" data-final="${esc(main)}" data-alt="${esc(alt)}">${main}</span><span class="ing__sub">${sub}</span></div>
        <p class="ing__desc"><span class="mono ing__count">${copy('ingredients.in')} ${found.length}</span>${shown}${more}</p>
      </li>`;
    }).join('');
  }

  let catIndex = 0;
  function renderRange() {
    $('.range__note').textContent = copy(finePointer ? 'range.note' : 'range.noteTouch');
    $('.sig').innerHTML = C.products.map((p, i) => {
      const [a, b] = T(p.name);
      return `<li class="sig__row" data-i="${i}" style="--c:${p.accent}">
        <span class="sig__num">${pad(i + 1)}</span>
        <div class="sig__main"><h3 class="sig__name">${a} <em>${b}</em></h3><p class="sig__desc">${T(p.desc)}</p></div>
        <span class="tag">${T(p.category).split(' · ')[0]}</span>
        <span class="sig__pack">${T(p.notes)}</span>
        ${photo(p.imageSm, '', 'sig__thumb')}
      </li>`;
    }).join('');
    $('.float').innerHTML = C.products.map(p =>
      `<div class="float__card" style="--c:${p.accent}">${photo(p.imageSm, T(p.name).join(' '), 'float__img')}</div>`).join('');
    $('.cat__tabs').innerHTML = C.catalogue.map((c, i) =>
      `<button type="button" role="tab" class="cat__tab${i === catIndex ? ' is-active' : ''}" data-i="${i}" aria-selected="${i === catIndex}"><img src="${esc(media(`brand/icons/${c.icon}.png`))}" alt="" class="cat__icon">${T(c.label)}<sup>${pad(c.items.length)}</sup></button>`).join('');
    renderCatalogueList();
  }
  function renderCatalogueList() {
    $('.cat__list').innerHTML = C.catalogue[catIndex].items.map(it => `
      <li class="cat__item${it.featured ? ' is-best' : ''}">
        <div class="cat__thumb">${it.thumb ? `<img src="${esc(media(it.thumb))}" alt="" loading="lazy" decoding="async">` : `<img src="${esc(media(`brand/icons/${C.catalogue[catIndex].icon}.png`))}" alt="" class="is-icon">`}</div>
        <div><div class="cat__top"><span class="cat__name">${lang === 'ru' ? it.ru : it.name}</span>${it.tag ? `<span class="cat__pack">${T(it.tag)}</span>` : ''}</div>
        ${lang === 'ru' ? '' : `<span class="cat__ru">${it.ru}</span>`}
        ${T(it.desc) ? `<p class="cat__detail">${T(it.desc)}</p>` : ''}
        ${it.featured ? `<span class="cat__feat mono">● ${copy('range.featured')}</span>` : ''}</div>
      </li>`).join('');
  }

  function renderCold() {
    $('.cold__num').textContent = fmtNum(C.reach.from);
    $('.cold__counter sup').textContent = T(C.reach.unit);
    $('.cold__cards').innerHTML = C.reach.cards.map(c =>
      `<figure class="cold__card" data-cursor="VIEW" style="margin:0">${photo(c.image, T(c.caption))}<p class="mono">${T(c.caption)}</p></figure>`).join('');
  }

  function renderPour() {
    const f = C.film;
    $('.pour__media').innerHTML =
      `<div class="media is-film"><img class="pour__poster" src="${esc(media(f.poster))}" alt="" decoding="async"><video muted playsinline preload="none" data-film="1" data-src="${esc(media(f.desktop))}" data-src-sm="${esc(media(f.mobile))}"></video></div>`;
    const [a, b, c] = copy('pour.words');
    $('.pour__words').innerHTML =
      `<span class="pour__word pour__word--a">${a}</span><span class="pour__word pour__word--b">${b}</span><span class="pour__word pour__word--a">${c}</span>`;
    $('.pour__cards').innerHTML = f.polaroids.map((p, i) =>
      `<figure class="polaroid polaroid--${i ? 'r' : 'l'}" style="margin:0">${photo(p.image, T(p.caption), 'polaroid__img')}<p>${T(p.caption)}</p></figure>`).join('') +
      `<p class="pour__caption mono">${copy('pour.caption')}</p>`;
  }

  function renderPromises() {
    $('.promises__stage').innerHTML = C.promises.map(q =>
      `<blockquote class="promise"><span class="pw promise__q">“</span>${T(q).split(/\s+/).map(w => `<span class="pw">${w}</span>`).join(' ')}</blockquote>`).join('');
  }

  function renderPartner() {
    const ct = C.contact;
    $('.partner__bg').innerHTML = photo(C.partnerImage, '', 'partner__photo');
    $('.stats').innerHTML = C.stats.map(s =>
      `<div class="stat"><span class="stat__num" data-value="${s.value}" data-from="${s.from || 0}" data-prefix="${s.prefix || ''}" data-suffix="${s.suffix || ''}"></span><span class="stat__unit">${T(s.unit)}</span><span class="stat__cap mono">${T(s.caption)}</span></div>`).join('');
    $('.live__clocks').innerHTML = C.clocks.map(c =>
      `<div class="clock${c.primary ? '' : ' clock--small'}"><span class="clock__time" data-tz="${c.tz}"${c.primary ? ' data-seconds="1"' : ''}>--:--</span><span class="clock__label mono">${T(c.label)}</span></div>`).join('');
    const ig = ct.socials.find(s => s.name === 'Instagram');
    const wa = r => `<a href="tel:+${r.whatsapp}">${r.phone}</a> <a class="info__wa mono" href="https://wa.me/${r.whatsapp}" target="_blank" rel="noopener">WhatsApp ↗</a>`;
    const info = [
      ['office', T(ct.address)],
      ['hours', copy('partner.hoursValue')],
      ['phone', `<a href="tel:${ct.phoneHref}">${ct.phone}</a><br><a href="tel:${ct.phone2Href}">${ct.phone2}</a>`],
      ['email', `<a href="mailto:${ct.email}">${ct.email}</a>`],
      ['tashkent', wa(ct.tashkent)],
      ['samarkand', wa(ct.samarkand)],
      ['telegram', `<a href="https://t.me/${ct.telegram}" target="_blank" rel="noopener">@${ct.telegram}</a>`],
      ['instagram', `<a href="${ig.url}" target="_blank" rel="noopener">${ig.handle}</a>`],
    ];
    $('.info').innerHTML = info.map(([k, v]) => `<div><dt class="mono">${copy('partner.info.' + k)}</dt><dd>${v}</dd></div>`).join('');

    const F = k => copy('partner.form.' + k);
    const opts = list => `<option value="" disabled selected hidden></option>` + list.map(o => `<option value="${o.value}">${T(o.label)}</option>`).join('');
    const input = (name, type, ac, req, full) =>
      `<div class="field${full ? ' field--full' : ''}"><input id="f-${name}" name="${name}" type="${type}" placeholder=" " autocomplete="${ac}"${req ? ' required' : ''}><label for="f-${name}">${F(name)}</label></div>`;
    const select = (name, list) =>
      `<div class="field field--select"><select id="f-${name}" name="${name}" required>${opts(list)}</select><label for="f-${name}">${F(name)}</label></div>`;
    $('.form__grid').innerHTML = [
      input('name', 'text', 'name', true),
      input('company', 'text', 'organization', true),
      input('city', 'text', 'address-level2', false),
      select('country', C.form.countries),
      select('type', C.form.businessTypes),
      select('volume', C.form.volumes),
      input('contact', 'text', 'tel', true, true),
      `<div class="field field--full"><textarea id="f-message" name="message" placeholder=" " rows="3"></textarea><label for="f-message">${F('message')}</label></div>`,
    ].join('');
    $('[data-href="call"]').href = `tel:${ct.phoneHref}`;
    $('[data-href="telegram"]').href = `https://t.me/${ct.telegram}`;
    $('[data-href="instagram"]').href = ig.url;
  }

  function renderBrand() {
    const logo = media(C.brand.logo);
    $$('[data-logo]').forEach(img => { img.src = logo; });
  }

  function renderFooter() {
    const ct = C.contact;
    const cols = [
      ['find', `<p>${T(ct.address)}</p><p>${copy('footer.tagline')}</p>`],
      ['hours', `<p>${copy('footer.hoursLine')}</p><p>${copy('footer.hoursTz')}</p>`],
      ['contact', `<a href="tel:${ct.phoneHref}">${ct.phone} / 78</a><a href="tel:+${ct.tashkent.whatsapp}">${T(ct.tashkent.label)} · ${ct.tashkent.phone}</a><a href="tel:+${ct.samarkand.whatsapp}">${T(ct.samarkand.label)} · ${ct.samarkand.phone}</a><a href="mailto:${ct.email}">${ct.email}</a>`],
      ['elsewhere', ct.socials.map(s => `<a href="${s.url}" target="_blank" rel="noopener">${s.name} ↗</a>`).join('') + `<a href="https://t.me/${ct.telegram}" target="_blank" rel="noopener">Telegram ↗</a>`],
    ];
    $('.footer__cols').innerHTML = cols.map(([k, html]) => `<div class="footer__col"><h4>${copy('footer.' + k)}</h4>${html}</div>`).join('');
    $('.footer__year').textContent = new Date().getFullYear();
    $('.footer__word').innerHTML = [...'DAIRY CLASSIC'].map(ch => `<span>${ch === ' ' ? '&nbsp;' : ch}</span>`).join('');
  }

  function renderAll() {
    renderBrand(); renderHero(); renderMarquee(); renderManifesto(); renderSteps(); renderFly();
    renderIngredients(); renderRange(); renderCold(); renderPour(); renderPromises();
    renderPartner(); renderFooter();
    // photos fade in once decoded
    $$('.media img').forEach(img => {
      const ok = () => img.closest('.media')?.classList.add('is-loaded');
      if (img.complete && img.naturalWidth) ok();
      else img.addEventListener('load', ok, { once: true });
    });
  }

  /* ======================================================================
     7. Section builders — run inside gsap.matchMedia so a breakpoint change
     or language switch reverts every tween/ScrollTrigger and rebuilds cleanly.
     Each builder receives { desktop, signal, onCleanup }.
     ====================================================================== */
  let films = [];
  let heroST = null;
  let active = -1;
  let heroTarget = 0;        // 0–1 playhead target inside the active segment
  let heroProgress = 0;
  let textTweens = [];

  /* ---------- Hero ---------- */
  function swapWord(i, dir, immediate) {
    const wrap = $('.hero__word');
    $$('.gw.is-out', wrap).forEach(el => { gsap.killTweensOf(el.children); el.remove(); });
    const old = $('.gw', wrap);
    const el = document.createElement('div');
    el.className = 'gw';
    el.innerHTML = [...C.products[i].word].map(ch => (ch === ' ' ? '<span class="gw__l gw__sp">&nbsp;</span>' : `<span class="gw__l">${ch}</span>`)).join('');
    wrap.appendChild(el);
    // fit long words (STRAWBERRY) inside the viewport
    const avail = wrap.clientWidth * 0.97;
    const w = el.scrollWidth;
    if (w > avail) el.style.fontSize = (parseFloat(getComputedStyle(el).fontSize) * avail / w) + 'px';

    if (immediate || reduced) {
      old?.remove();
      if (reduced && !immediate) gsap.from(el, { opacity: 0, duration: 0.5 });
      return;
    }
    if (old) {
      old.classList.add('is-out');
      gsap.to(old.children, { yPercent: -108 * dir, duration: 0.55, ease: 'power3.in', stagger: 0.03, onComplete: () => old.remove() });
    }
    gsap.fromTo(el.children, { yPercent: 108 * dir }, { yPercent: 0, duration: 0.85, ease: 'power3.out', stagger: 0.03, delay: 0.1 });
  }

  function heroTextHTML(i) {
    const p = C.products[i];
    const [a, b] = T(p.name);
    return [
      words(pad(i + 1)),
      words(T(p.category)),
      `<span class="line">${words(a)}</span><span class="line"><em>${words(b)}</em></span>`,
      words(T(p.desc)),
      words(T(p.notes)),
    ];
  }
  function swapText(i, dir, immediate) {
    const els = ['.hero__idx', '.hero__cat', '.hero__title', '.hero__desc', '.hero__pack-text'].map(s => $(s));
    const write = () => { const h = heroTextHTML(i); els.forEach((el, k) => { el.innerHTML = h[k]; }); };
    textTweens.forEach(t => t.kill());
    textTweens = [];
    if (immediate) { write(); return; }
    if (reduced) {
      textTweens.push(gsap.timeline().to(els, { opacity: 0, duration: 0.2 }).add(write).to(els, { opacity: 1, duration: 0.3 }));
      return;
    }
    const outs = els.flatMap(el => $$('.w__in', el));
    textTweens.push(gsap.to(outs, {
      yPercent: -112 * dir, duration: 0.3, ease: 'power2.in', stagger: 0.006,
      onComplete: () => {
        write();
        const ins = els.flatMap(el => $$('.w__in', el));
        textTweens.push(gsap.fromTo(ins, { yPercent: 112 * dir }, { yPercent: 0, duration: 0.62, ease: 'power3.out', stagger: 0.012 }));
      },
    }));
  }

  function setProduct(i, dir, immediate) {
    const prev = active;
    if (i === prev) return;
    active = i;
    const p = C.products[i];
    const f = films[i];
    if (f) { f.current = heroTarget * f.duration; if (f.seek(f.current)) f.shown = f.current; }

    films.forEach((fl, k) => { if (fl && k !== i && k !== prev) { gsap.killTweensOf(fl.el); gsap.set(fl.el, { opacity: 0 }); } });
    const d = immediate ? 0 : 0.5;
    if (prev > -1 && films[prev]) gsap.to(films[prev].el, { opacity: 0, scale: reduced ? 1 : 0.94, duration: d, ease: 'power2.inOut', overwrite: true });
    if (f) gsap.fromTo(f.el, { opacity: 0, scale: reduced ? 1 : 1.06 }, { opacity: 1, scale: 1, duration: d, ease: 'power2.out', overwrite: true });

    if (heroProgress < 1) setAccent(p.accent, immediate ? 0 : 0.6);
    swapWord(i, dir, immediate);
    swapText(i, dir, immediate);

    $$('.hero__list li').forEach((li, k) => li.classList.toggle('is-active', k === i));
    $$('.hero__dots button').forEach((b, k) => b.classList.toggle('is-active', k === i));
    $('.hero__dots-name').textContent = T(p.name).join(' ');
    const badge = $('.badge__icon');
    badge.innerHTML = icon(p.icon);
    if (!immediate && !reduced) gsap.fromTo(badge, { scale: 0.3 }, { scale: 1, duration: 0.5, ease: 'back.out(3)' });
  }

  function onHeroProgress(p, dir, immediate) {
    heroProgress = p;
    const x = p * N;
    const i = Math.min(N - 1, Math.floor(x));
    const local = clamp(x - i, 0, 1);
    heroTarget = reduced ? 1 : clamp(local / (1 - C.hero.holdEnd), 0, 1);
    if (i !== active) setProduct(i, active === -1 ? 1 : (i > active ? 1 : -1), immediate || active === -1);
    gsap.set('.hero__progress i', { scaleX: p });
  }

  function heroTick() {
    const f = films[active];
    if (!f) return;
    const target = heroTarget * f.duration;
    const diff = target - f.current;
    if (Math.abs(diff) < 1e-4 && f.shown === f.current) return;
    const k = 1 - Math.pow(1 - C.hero.lerp, gsap.ticker.deltaRatio(60));    // frame-rate independent lerp
    f.current += diff * k;
    if (Math.abs(target - f.current) < 0.002) f.current = target;
    if (Math.abs(f.current - f.shown) > f.threshold || f.current === target) {
      if (f.seek(f.current)) f.shown = f.current;
    }
  }

  function goToProduct(k) {
    if (!heroST) return;
    const y = heroST.start + (heroST.end - heroST.start) * (k / N) + 2;
    scrollToY(y, Math.abs(k - active) > 1 ? { immediate: true } : { duration: 1.2 });
  }

  function buildHero({ signal, onCleanup }) {
    active = -1;
    const hero = $('.hero');
    films.forEach(f => f && f.resize && f.resize());
    heroST = ScrollTrigger.create({
      trigger: hero,
      start: 'top top',
      end: () => '+=' + innerHeight * (C.hero.vhPerProduct / 100) * N,
      pin: true,
      onUpdate: self => onHeroProgress(self.progress, self.direction),
      onRefresh: self => { films.forEach(f => f && f.resize && f.resize()); onHeroProgress(self.progress, 1, true); },
      onLeave: () => setAccent(C.brand.accent),
      onEnterBack: () => setAccent(C.products[Math.max(active, 0)].accent),
    });
    onHeroProgress(heroST.progress, 1, true);
    gsap.ticker.add(heroTick);
    onCleanup(() => {
      document.body.classList.remove('is-dragging');
      gsap.ticker.remove(heroTick);
      textTweens.forEach(t => t.kill());
      heroST = null;
    });

    $$('.hero__list li, .hero__dots button').forEach(el =>
      el.addEventListener('click', () => goToProduct(+el.dataset.i), { signal }));

    // Drag to scrub hero section
    const stage = $('.hero__stage');
    if (stage) {
      let isDragging = false, startY = 0, startProgress = 0;

      const onPointerDown = e => {
        if (e.button !== 0 && e.pointerType === 'mouse') return;
        if (!heroST) return;
        isDragging = true;
        startY = e.clientY;
        startProgress = heroST.progress;
        document.body.classList.add('is-dragging');
        try { stage.setPointerCapture(e.pointerId); } catch (_) {}
      };

      const onPointerMove = e => {
        if (!isDragging || !heroST) return;
        const dy = startY - e.clientY;
        const deltaProgress = dy / (480 * N);
        const targetP = clamp(startProgress + deltaProgress, 0, 1);
        const targetY = heroST.start + (heroST.end - heroST.start) * targetP;
        if (lenis) lenis.scrollTo(targetY, { immediate: true });
        else window.scrollTo(0, targetY);
      };

      const onPointerUp = e => {
        if (!isDragging) return;
        isDragging = false;
        document.body.classList.remove('is-dragging');
        try { stage.releasePointerCapture(e.pointerId); } catch (_) {}
      };

      stage.addEventListener('pointerdown', onPointerDown, { signal });
      stage.addEventListener('pointermove', onPointerMove, { signal });
      stage.addEventListener('pointerup', onPointerUp, { signal });
      stage.addEventListener('pointercancel', onPointerUp, { signal });
    }
  }

  /* ---------- Header hide/show + backdrop ---------- */
  let menuOpen = false;
  function buildHeader() {
    const header = $('.header');
    ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: self => {
        const y = self.scroll();
        header.classList.toggle('is-hidden', !menuOpen && self.direction === 1 && y > innerHeight * 0.4);
        header.classList.toggle('is-solid', y > (heroST ? heroST.end - 2 : innerHeight));
      },
    });
  }

  /* ---------- Marquee ---------- */
  function buildMarquee() {
    const tweens = $$('.marquee__track').map((tr, k) => k % 2 === 0
      ? gsap.to(tr, { xPercent: -50, ease: 'none', duration: 46, repeat: -1 })
      : gsap.fromTo(tr, { xPercent: -50 }, { xPercent: 0, ease: 'none', duration: 52, repeat: -1 }));
    if (reduced) { tweens.forEach(t => t.timeScale(0.25)); return; }
    ScrollTrigger.create({
      trigger: '.marquee', start: 'top bottom', end: 'bottom top',
      onToggle: self => tweens.forEach(t => (self.isActive ? t.play() : t.pause())),
      onUpdate: self => {
        const boost = 1 + clamp(Math.abs(self.getVelocity()) / 400, 0, 5);
        gsap.to(tweens, { timeScale: boost, duration: 0.2, overwrite: true, onComplete: () => gsap.to(tweens, { timeScale: 1, duration: 1.2, ease: 'power2.out' }) });
      },
    });
  }

  /* ---------- Manifesto word-by-word light-up ---------- */
  function buildManifesto() {
    const w = $$('.manifesto__text .mf-w');
    if (reduced) return;
    gsap.fromTo(w, { opacity: 0.15 }, {
      opacity: 1, ease: 'none', stagger: 0.1,
      scrollTrigger: { trigger: '.manifesto__text', start: 'top 78%', end: 'bottom 42%', scrub: true },
    });
  }

  /* ---------- Steps: horizontal pin (desktop) / snap carousel (mobile) ---------- */
  function buildSteps({ desktop, signal }) {
    const track = $('.steps__track');
    const bar = $('.steps__progress i');
    const cards = $$('.step', track);
    if (!desktop) {
      const upd = () => gsap.set(bar, { scaleX: track.scrollLeft / Math.max(1, track.scrollWidth - track.clientWidth) });
      track.addEventListener('scroll', upd, { passive: true, signal });
      upd();
      return;
    }
    const dist = () => Math.max(0, track.scrollWidth - innerWidth);
    const tween = gsap.to(track, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: {
        trigger: '.steps', start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 0.8, invalidateOnRefresh: true,
        onUpdate: self => gsap.set(bar, { scaleX: self.progress }),
      },
    });
    cards.forEach(card => {
      const shade = $('.step__shade', card);
      gsap.timeline({ scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } })
        .fromTo(card, { scale: 0.92 }, { scale: 1, ease: 'power1.out', duration: 1 })
        .fromTo(shade, { opacity: 0.6 }, { opacity: 0, ease: 'power1.out', duration: 1 }, 0)
        .to(card, { scale: 0.92, ease: 'power1.in', duration: 1 })
        .to(shade, { opacity: 0.6, ease: 'power1.in', duration: 1 }, '<');
    });
  }

  /* ---------- Fly-through mask ---------- */
  function buildFly() {
    const svg = $('.fly__svg'), text = $('.fly__text'), line = $('.fly__line');
    const media = $('.fly__media');
    // Zoom origin: centre of the most solid glyph (I, L, or the middle letter), mapped viewBox → px.
    // The word also glides so that glyph ends up at screen centre — the camera flies *into* the stem.
    const target = () => {
      const W = svg.clientWidth, H = svg.clientHeight;
      try {
        const word = C.flythrough.word;
        let k = ['I', 'L', '1', 'l'].map(ch => word.indexOf(ch)).find(n => n >= 0);   // solid stems only
        if (k === undefined) k = Math.floor(word.length / 2);
        const ex = text.getExtentOfChar(k);
        const s = Math.min(W / 1600, H / 900);
        return { ox: (W - 1600 * s) / 2 + (ex.x + ex.width / 2) * s, oy: (H - 900 * s) / 2 + (450 - 330 * 0.06) * s, W, H };
      } catch (e) { return { ox: W / 2, oy: H / 2, W, H }; }
    };
    const origin = () => { const o = target(); return `${o.ox}px ${o.oy}px`; };
    const tl = gsap.timeline({
      scrollTrigger: { trigger: '.fly', start: 'top top', end: () => '+=' + innerHeight * 2.4, pin: true, scrub: true, invalidateOnRefresh: true },
    });
    if (reduced) {
      tl.to(svg, { opacity: 0, duration: 0.5 }).to(line, { opacity: 1, duration: 0.3 }).to({}, { duration: 0.3 });
      return;
    }
    tl.fromTo(media, { scale: 1.25 }, { scale: 1, ease: 'none', duration: 1 }, 0)
      .fromTo(svg, { scale: 1, x: 0, y: 0 }, { scale: 40, transformOrigin: origin, ease: 'power3.in', duration: 0.72 }, 0.12)
      .to(svg, { x: () => { const o = target(); return o.W / 2 - o.ox; }, y: () => { const o = target(); return o.H / 2 - o.oy; }, ease: 'power2.inOut', duration: 0.5 }, 0.12)
      .to(svg, { opacity: 0, duration: 0.12, ease: 'none' }, 0.72)
      .fromTo(line, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.14, ease: 'power2.out' }, 0.84)
      .to({}, { duration: 0.14 });
  }

  /* ---------- Ingredients: scramble reveal + centre highlight ---------- */
  function buildIngredients({ desktop, signal }) {
    $$('.ing').forEach(row => {
      const name = $('.ing__name', row);
      ScrollTrigger.create({
        trigger: row, start: 'top 88%', once: true,
        onEnter: () => { gsap.to(row, { opacity: 1, duration: 0.6, ease: 'power2.out' }); scramble(name, name.dataset.final, 0.8); },
      });
      ScrollTrigger.create({ trigger: row, start: 'top 52%', end: 'bottom 48%', toggleClass: { targets: row, className: 'is-active' } });
      if (desktop && finePointer) {
        row.addEventListener('mouseenter', () => scramble(name, name.dataset.alt, 0.55), { signal });
        row.addEventListener('mouseleave', () => scramble(name, name.dataset.final, 0.55), { signal });
      }
    });
  }

  /* ---------- Range: clip reveal + cursor-following photo ---------- */
  function buildRange({ desktop, signal, onCleanup }) {
    const list = $('.sig');
    const rows = $$('.sig__row', list);
    rows.forEach(r => gsap.fromTo(r, { clipPath: 'inset(0 100% 0 0)' }, {
      clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'power3.inOut', clearProps: 'clipPath',
      scrollTrigger: { trigger: r, start: 'top 92%', once: true },
    }));

    if (!desktop || !finePointer) {
      rows.forEach(r => r.addEventListener('click', () => setAccent(C.products[+r.dataset.i].accent), { signal }));
      return;
    }
    const float = $('.float');
    const cards = $$('.float__card', float);
    let mx = innerWidth / 2, my = innerHeight / 2, fx = mx, fy = my, rot = -4, on = false;
    gsap.set(float, { opacity: 0, scale: 0.85 });
    addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; }, { passive: true, signal });
    rows.forEach((r, i) => r.addEventListener('mouseenter', () => {
      if (!on) { fx = mx; fy = my; }
      on = true;
      list.classList.add('is-hovering');
      rows.forEach(x => x.classList.toggle('is-hover', x === r));
      cards.forEach((c, k) => c.classList.toggle('is-on', k === i));
      gsap.to(float, { opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out', overwrite: 'auto' });
      setAccent(C.products[i].accent, 0.5);
    }, { signal }));
    list.addEventListener('mouseleave', () => {
      on = false;
      list.classList.remove('is-hovering');
      rows.forEach(x => x.classList.remove('is-hover'));
      gsap.to(float, { opacity: 0, scale: 0.85, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
      setAccent(C.brand.accent, 0.5);
    }, { signal });
    const tick = () => {
      if (!on && +gsap.getProperty(float, 'opacity') < 0.01) return;
      const k = 1 - Math.pow(1 - 0.14, gsap.ticker.deltaRatio(60));
      const px = fx;
      fx += (mx - fx) * k; fy += (my - fy) * k;
      rot += ((-4 + clamp((fx - px) * 0.4, -9, 9)) - rot) * 0.12;
      gsap.set(float, { x: fx, y: fy, rotation: rot });
    };
    gsap.ticker.add(tick);
    onCleanup(() => gsap.ticker.remove(tick));
  }

  function buildCatalogue({ signal }) {
    $$('.cat__tab').forEach(tab => tab.addEventListener('click', () => {
      const i = +tab.dataset.i;
      if (i === catIndex) return;
      catIndex = i;
      $$('.cat__tab').forEach(t => { const on = t === tab; t.classList.toggle('is-active', on); t.setAttribute('aria-selected', on); });
      const items = $$('.cat__item');
      gsap.to(items, {
        opacity: 0, y: -8, duration: 0.22, stagger: 0.012, ease: 'power2.in', overwrite: true,
        onComplete: () => {
          renderCatalogueList();
          gsap.fromTo('.cat__item', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.035, ease: 'power3.out' });
          ScrollTrigger.refresh();        // list height changes → later pins move
        },
      });
    }, { signal }));
  }

  /* ---------- Cold chain: counter, frost particles, fog ---------- */
  function buildCold({ desktop, signal, onCleanup }) {
    const num = $('.cold__num');
    const state = { v: C.reach.from };
    ScrollTrigger.create({
      trigger: '.cold__counter', start: 'top 80%', once: true,
      onEnter: () => gsap.to(state, { v: C.reach.to, duration: reduced ? 0 : 2.6, ease: 'power3.out', onUpdate: () => { num.textContent = fmtNum(state.v); } }),
    });

    const canvas = $('.cold__canvas');
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    const sprite = document.createElement('canvas');
    sprite.width = sprite.height = 32;
    const sg = sprite.getContext('2d');
    const grad = sg.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(240,248,255,1)'); grad.addColorStop(0.35, 'rgba(220,235,250,.5)'); grad.addColorStop(1, 'rgba(220,235,250,0)');
    sg.fillStyle = grad; sg.fillRect(0, 0, 32, 32);
    let W = 0, H = 0, running = false, t0 = performance.now();
    const count = desktop ? 150 : 60;
    let parts = [];
    const resize = () => {
      W = canvas.width = canvas.offsetWidth * dpr; H = canvas.height = canvas.offsetHeight * dpr;
      parts = Array.from({ length: count }, () => ({
        x: Math.random() * W, y: Math.random() * H, s: (1.5 + Math.random() * 5) * dpr * (Math.random() < 0.08 ? 3 : 1),
        vy: (0.12 + Math.random() * 0.45) * dpr, sway: 0.2 + Math.random() * 0.6, f: 0.3 + Math.random(), ph: Math.random() * 6.28, a: 0.2 + Math.random() * 0.5,
      }));
    };
    const frame = () => {
      if (!running) return;
      const t = (performance.now() - t0) / 1000;
      ctx.clearRect(0, 0, W, H);
      for (const p of parts) {
        p.y -= p.vy; p.x += Math.sin(t * p.f + p.ph) * p.sway;
        if (p.y < -20) { p.y = H + 20; p.x = Math.random() * W; }
        ctx.globalAlpha = p.a * (0.55 + 0.45 * Math.sin(t * 2.2 * p.f + p.ph));   // shimmer
        ctx.drawImage(sprite, p.x - p.s, p.y - p.s, p.s * 2, p.s * 2);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };
    let raf = 0;
    resize();
    if (!reduced) {
      ScrollTrigger.create({
        trigger: '.cold', start: 'top bottom', end: 'bottom top',
        onToggle: self => { running = self.isActive; cancelAnimationFrame(raf); if (running) raf = requestAnimationFrame(frame); },
        onRefresh: resize,
      });
    }
    onCleanup(() => { running = false; cancelAnimationFrame(raf); });

    if (finePointer && !reduced) {
      const [f1, f2] = $$('.cold__fog i');
      const q = [gsap.quickTo(f1, 'x', { duration: 2 }), gsap.quickTo(f1, 'y', { duration: 2 }), gsap.quickTo(f2, 'x', { duration: 2.6 }), gsap.quickTo(f2, 'y', { duration: 2.6 })];
      $('.cold').addEventListener('pointermove', e => {
        const dx = e.clientX - innerWidth / 2, dy = e.clientY - innerHeight / 2;
        q[0](dx * 0.08); q[1](dy * 0.08); q[2](dx * -0.05); q[3](dy * -0.05);
      }, { signal });
    }
  }

  /* ---------- The film: Dairy Classic's billboard spot, scrubbed by scroll + parallax words ---------- */
  function buildPour({ onCleanup }) {
    const video = $('.pour__media video');
    const wordsEl = $$('.pour__word');
    const cards = $$('.polaroid');
    let target = 0, current = 0;
    const tl = gsap.timeline({
      scrollTrigger: { trigger: '.pour', start: 'top top', end: () => '+=' + innerHeight * 2.2, pin: true, scrub: true, invalidateOnRefresh: true, onUpdate: self => { target = self.progress; } },
    });
    tl.fromTo('.pour__media', { scale: 1.12 }, { scale: 1, ease: 'none', duration: 1 }, 0);
    const drift = [0.06, 0.12, 0.18];
    wordsEl.forEach((w, i) => {
      tl.fromTo(w, { opacity: 0, scale: 0.9, yPercent: 25 }, { opacity: 1, scale: 1, yPercent: 0, duration: 0.22, ease: 'power2.out' }, 0.05 + i * 0.2);
      tl.fromTo(w, { y: 0 }, { y: () => -innerHeight * drift[i], ease: 'none', duration: 1 }, 0);
    });
    cards.forEach((c, i) => {
      tl.fromTo(c, { y: () => -innerHeight * 0.1, rotation: i ? 5 : -6 }, { y: () => innerHeight * (0.14 + i * 0.06), rotation: i ? 9 : -11, ease: 'none', duration: 1 }, 0);
    });
    const tick = () => {
      if (!video || video.readyState < 1 || !video.duration) return;
      const k = 1 - Math.pow(1 - 0.12, gsap.ticker.deltaRatio(60));
      current += (target - current) * k;
      const t = current * (video.duration - 0.05);
      if (Math.abs(video.currentTime - t) > 1 / 60 && !video.seeking) video.currentTime = t;
    };
    gsap.ticker.add(tick);
    onCleanup(() => gsap.ticker.remove(tick));
  }

  /* ---------- Promises: blur-to-sharp lines, pinned crossfade ---------- */
  function buildPromises() {
    const stage = $('.promises__stage');
    const quotes = $$('.promise', stage);
    const no = $('.promises__no');
    // line index per word, measured from layout
    let tallest = 0;
    quotes.forEach(q => {
      q.style.visibility = 'hidden'; q.style.opacity = 1;
      let line = -1, lastTop = null;
      $$('.pw', q).forEach(w => { if (w.offsetTop !== lastTop) { line++; lastTop = w.offsetTop; } w._line = line; });
      tallest = Math.max(tallest, q.offsetHeight);
      q.style.visibility = '';
    });
    stage.style.height = tallest + 'px';
    const n = quotes.length;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.promises', start: 'top top', end: () => '+=' + innerHeight * 0.9 * n, pin: true, scrub: true, invalidateOnRefresh: true,
        onUpdate: self => { no.textContent = pad(Math.min(n, Math.floor(self.progress * n * 0.999) + 1)); },
      },
    });
    gsap.set(quotes, { opacity: 1 });
    quotes.forEach((q, k) => {
      const ws = $$('.pw', q);
      const from = reduced ? { opacity: 0 } : { opacity: 0, filter: 'blur(14px)', y: 18 };
      const to = reduced ? { opacity: 1 } : { opacity: 1, filter: 'blur(0px)', y: 0 };
      tl.fromTo(ws, from, { ...to, duration: 0.5, ease: 'power2.out', stagger: (i, el) => el._line * 0.14 + (i % 6) * 0.01 }, k);
      if (k < n - 1) tl.to(ws, { opacity: 0, filter: reduced ? 'none' : 'blur(10px)', duration: 0.28, ease: 'power1.in' }, k + 0.72);
    });
  }

  /* ---------- Partner: stat counters ---------- */
  function buildPartner() {
    $$('.stat__num').forEach(el => {
      const v = +el.dataset.value, from = +el.dataset.from || 0;
      const { prefix = '', suffix = '' } = el.dataset;
      const show = n => { el.textContent = prefix + (v >= 10000 ? fmtNum(n) : minus(Math.round(n))) + suffix; };
      const s = { v: from };
      show(from);
      ScrollTrigger.create({
        trigger: el, start: 'top 88%', once: true,
        onEnter: () => gsap.to(s, { v, duration: reduced ? 0 : 2, ease: 'power2.out', onUpdate: () => show(s.v) }),
      });
    });
  }

  /* ---------- Footer: full-width wordmark rising in ---------- */
  function buildFooter() {
    const mark = $('.footer__mark'), word = $('.footer__word');
    const fit = () => {
      mark.style.fontSize = '13vw';
      const w = word.scrollWidth;
      if (w) mark.style.fontSize = (parseFloat(getComputedStyle(mark).fontSize) * (mark.clientWidth * 0.985) / w) + 'px';
    };
    fit();
    ScrollTrigger.addEventListener('refreshInit', fit);
    const letters = word.children;
    if (!reduced) gsap.set(letters, { y: 60, opacity: 0 });
    ScrollTrigger.create({
      trigger: '.footer', start: 'top 85%', once: true,
      onEnter: () => gsap.to(letters, { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', stagger: 0.045 }),
    });
    return () => ScrollTrigger.removeEventListener('refreshInit', fit);
  }

  /* ---------- Lazy film (IntersectionObserver): loads only when the section is near ---------- */
  function buildLazyVideos() {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      const v = e.target;
      if (!e.isIntersecting || v.dataset.loaded) return;
      v.dataset.loaded = '1';
      v.addEventListener('loadeddata', () => v.closest('.media').classList.add('is-ready'), { once: true });
      v.preload = 'auto';
      v.src = isSmall() ? v.dataset.srcSm : v.dataset.src;
      v.load();
    }), { rootMargin: '120% 0px' });
    $$('video[data-film]').forEach(v => io.observe(v));
    return () => io.disconnect();
  }

  /* ---------- Orchestration ---------- */
  let mm = null;
  function setup() {
    mm = gsap.matchMedia();
    mm.add({ desktop: `(min-width: ${BP}px)`, mobile: `(max-width: ${BP - 0.02}px)` }, context => {
      const ac = new AbortController();
      const cleanups = [];
      const api = { desktop: context.conditions.desktop, signal: ac.signal, onCleanup: fn => cleanups.push(fn) };
      // order matters: pins are created top → bottom so ScrollTrigger measures correctly
      buildHero(api);
      buildHeader(api);
      buildMarquee(api);
      buildManifesto(api);
      buildSteps(api);
      buildFly(api);
      buildIngredients(api);
      buildRange(api);
      buildCatalogue(api);
      buildCold(api);
      buildPour(api);
      buildPromises(api);
      buildPartner(api);
      cleanups.push(buildFooter(api));
      cleanups.push(buildLazyVideos(api));
      return () => { ac.abort(); cleanups.forEach(fn => fn && fn()); };
    });
  }

  /* ======================================================================
     8. Language switch — curtain, re-render, rebuild, restore position
     ====================================================================== */
  async function switchLang(next) {
    if (next === lang || !C.copy[next]) return;
    const curtain = $('.curtain');
    await gsap.to(curtain, { opacity: 1, duration: 0.35, ease: 'power2.in' });
    const y = scrollY;
    lang = next;
    try { localStorage.setItem('dc-lang', lang); } catch (e) { /* private mode */ }
    mm.revert();
    $$('.gw').forEach(el => el.remove());
    applyI18n();
    renderAll();
    setup();
    ScrollTrigger.refresh();
    scrollToY(y, { immediate: true });
    gsap.to(curtain, { opacity: 0, duration: 0.6, delay: 0.1, ease: 'power2.out' });
  }

  /* ---------- Global UI that survives rebuilds ---------- */
  function initGlobalUI() {
    document.addEventListener('click', e => {
      const a = e.target.closest('[data-scroll-to]');
      if (a) { e.preventDefault(); if (menuOpen) toggleMenu(false); scrollToEl(a.dataset.scrollTo); }
      const l = e.target.closest('.lang button');
      if (l) switchLang(l.dataset.lang);
    });

    const menu = $('.menu'), burger = $('.burger');
    let menuTl = null;
    function toggleMenu(open) {
      menuOpen = open;
      document.body.classList.toggle('menu-open', open);
      burger.setAttribute('aria-expanded', open);
      menu.setAttribute('aria-hidden', !open);
      $('.burger span').textContent = copy(open ? 'nav.close' : 'nav.menu');
      menuTl?.kill();
      if (open) {
        lenis?.stop();
        $('.header').classList.remove('is-hidden');
        menuTl = gsap.timeline()
          .set(menu, { visibility: 'visible' })
          .fromTo(menu, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'power4.inOut' })
          .fromTo('.menu__links a > span:last-child', { yPercent: 110 }, { yPercent: 0, duration: 0.8, stagger: 0.06, ease: 'power3.out' }, 0.3)
          .fromTo('.menu__foot', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.55);
      } else {
        lenis?.start();
        menuTl = gsap.timeline()
          .to(menu, { clipPath: 'inset(0 0 100% 0)', duration: 0.6, ease: 'power4.inOut' })
          .set(menu, { visibility: 'hidden' });
      }
    }
    burger.addEventListener('click', () => toggleMenu(!menuOpen));
    addEventListener('keydown', e => { if (e.key === 'Escape' && menuOpen) toggleMenu(false); });

    // Enquiry form
    const form = $('.form');
    let sending = false;
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = $('.btn--submit', form), label = $('.btn__label', btn), msg = $('.form__msg');
      if (sending || btn.classList.contains('is-success')) return;
      let ok = true;
      $$('[required]', form).forEach(f => {
        const bad = !String(f.value).trim();
        f.closest('.field').classList.toggle('is-invalid', bad);
        if (bad) ok = false;
      });
      if (!ok) { msg.textContent = copy('partner.form.required'); return; }
      const data = Object.fromEntries(new FormData(form));
      Object.assign(data, { lang, page: location.href, sentAt: new Date().toISOString() });
      sending = true;
      label.textContent = copy('partner.form.sending');
      msg.textContent = '';
      try {
        if (C.form.endpoint) {
          const r = await fetch(C.form.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
          if (!r.ok) throw new Error('HTTP ' + r.status);
        } else {
          console.info('[Dairy Classic] Enquiry (stub — set DC_CONFIG.form.endpoint to send):', data);
          await wait(900);
        }
        const w = btn.offsetWidth, h = btn.offsetHeight;
        btn.classList.add('is-success');
        gsap.fromTo(btn, { width: w }, { width: h, paddingLeft: 0, paddingRight: 0, duration: 0.55, ease: 'power3.inOut' });
        msg.textContent = copy('partner.form.success');
        form.reset();
      } catch (err) {
        label.textContent = copy('partner.form.submit');
        msg.textContent = copy('partner.form.error');
      } finally {
        sending = false;
      }
    });
    form.addEventListener('input', e => e.target.closest('.field')?.classList.remove('is-invalid'));
  }
  /* ======================================================================
     9. Boot
     ====================================================================== */
  async function boot() {
    applyI18n();
    renderAll();
    initGlobalUI();
    initCursor();
    setInterval(tickClocks, 1000);

    const bar = $('.loader__bar i');
    const shown = { p: 0 };
    const minTime = wait(reduced ? 200 : 1200);
    const fontsReady = document.fonts ? Promise.race([document.fonts.ready, wait(3000)]) : Promise.resolve();
    films = await prepareFilms(p => gsap.to(shown, { p, duration: 0.4, overwrite: true, onUpdate: () => gsap.set(bar, { scaleX: shown.p }) }));
    await Promise.all([fontsReady, minTime]);
    gsap.set(bar, { scaleX: 1 });

    const filmsWrap = $('.hero__films');
    films.forEach(f => f && filmsWrap.appendChild(f.el));

    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    setup();

    // loader out → hero up from black
    const loader = $('.loader');
    await gsap.timeline()
      .to('.loader__mark', { scale: 0.94, opacity: 0, duration: 0.7, ease: 'power3.in' })
      .to(loader, { opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.1');
    loader.remove();
    document.body.classList.remove('is-loading');
    lenis?.start();
    ScrollTrigger.refresh();
    if (!reduced) {
      gsap.timeline()
        .fromTo('.hero__inner', { opacity: 0 }, { opacity: 1, duration: 1.3, ease: 'power2.out' })
        .fromTo('.hero__stage', { scale: 1.04 }, { scale: 1, duration: 1.8, ease: 'power3.out', clearProps: 'scale' }, 0)
        .fromTo('.header', { yPercent: -100 }, { yPercent: 0, duration: 1, ease: 'power3.out', clearProps: 'transform' }, 0.4)
        .fromTo('.hero__list li, .hero__bar', { opacity: 0, y: 12 }, { opacity: (i, el) => (el.classList.contains('is-active') || el.classList.contains('hero__bar') ? 1 : 0.4), y: 0, duration: 0.8, stagger: 0.04, ease: 'power3.out', clearProps: 'opacity,transform' }, 0.5);
    }
  }

  boot();
})();
