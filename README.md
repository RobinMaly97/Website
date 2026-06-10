# Maly Development — Website

Premium, scroll-driven 3D portfolio for **Robin Maly / Maly Development** — freelance
app & software developer. Dark theme, violet→cyan neon accents, bilingual (DE/EN).

Built with **React + Vite + TypeScript**, **React Three Fiber** (WebGL 3D),
**GSAP + Lenis** (scroll), **Tailwind CSS**, and **Framer Motion**.

---

## Quick start

```bash
npm install        # install dependencies
npm run dev        # start dev server → http://localhost:5173
```

## Build & preview

```bash
npm run build      # production build → dist/
npm run preview    # serve the production build locally
npm run typecheck  # optional: TypeScript check
```

## Deploy (Netlify)

The repo includes `netlify.toml`. Connect the repo to Netlify (or drag-drop after
`npm run build`):

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Contact form:** uses **Netlify Forms**. `public/__forms.html` registers the
  form at deploy time; the React form posts to it. Submissions appear under
  *Netlify → Forms → contact*. A `mailto:` fallback is always shown too.
- **Legal pages** (`/impressum.html`, `/datenschutz.html`, `/agb.html`) are served
  as static files from `public/` — required by German law and preserved as-is.

---

## Editing content

**All text lives in one bilingual file:** [`src/i18n/content.ts`](src/i18n/content.ts).
Edit the `de` and `en` objects (they share the same TypeScript shape, so nothing can
get out of sync). Project links, tags and App Store URLs are in the `projectAssets`
array in the same file.

## Images

Optimized images live in `public/images/` (WebP + raster fallback). To regenerate
them from the originals in `legacy-site/`:

```bash
npm run optimize:images
```

Edit sizes/sources in [`scripts/optimize-images.mjs`](scripts/optimize-images.mjs).

---

## Project structure

```
src/
  App.tsx                 # layout, smooth-scroll setup, lazy 3D background, scrim
  components/             # Nav, Hero, Services, Showcase, About, Process, Contact, Footer
    ui/                   # Button, Reveal, SectionHeading, LanguageToggle, CanvasLoader
  three/                  # WebGL scene
    Scene.tsx             # <Canvas> + camera rig (lazy-loaded chunk)
    Centerpiece.tsx       # scroll-driven morphing sphere
    Particles.tsx         # drifting point field
    Lighting.tsx          # neon environment + lights
    scrollStore.ts        # DOM↔WebGL scroll/pointer bridge
  hooks/                  # useSmoothScroll (Lenis+GSAP), useReducedMotion, useMediaQuery
  i18n/                   # content.ts (all copy), LanguageContext.tsx
public/                   # legal pages, images, favicon, robots, __forms.html
```

## Accessibility & performance

- Respects `prefers-reduced-motion` (disables smooth scroll + heavy 3D, static frame).
- Lighter 3D scene on mobile (fewer particles, capped DPR); keyboard-navigable,
  semantic HTML, skip link, WCAG-AA contrast, focus rings.
- The heavy three.js bundle is code-split and lazy-loaded so text paints first.

---

## Reverting to the original site

The previous vanilla HTML/CSS/JS site is preserved in **two** places:

1. **Git branch** `backup/original-site` (recommended):
   ```bash
   git checkout backup/original-site -- .
   ```
2. **Folder** `legacy-site/` — a plain copy of every original file.

Either restores the exact original site.
