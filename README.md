# Maison Rubis

A scroll-driven 3D site for a rose atelier. On desktop, two packed flower walls open as you scroll, revealing a looping video portal and drifting petals. On phones and machines without WebGL, a still plus video take over.

Live stack: Vite, React 19, Three.js (React Three Fiber), GSAP ScrollTrigger, Motion, Tailwind CSS v4. Deploys to Netlify.

## Features

- **Rose gate hero** — instanced flower walls, video portal, petal particles, bloom and vignette
- **Scroll camera** — GSAP ScrollTrigger drives the camera through the gate; pointer tilt follows the mouse
- **Mobile fallback** — below 768px (or without WebGL), a still and muted autoplay video replace the 3D scene
- **Reduced motion** — `prefers-reduced-motion` freezes the camera and skips scroll-linked animation
- **Editorial page** — collections grid, atelier story (browse / order / delivered), visit footer

## Quick start

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

| Script | What it does |
| --- | --- |
| `npm run dev` | Local Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |

Node 18+ is enough. No extra env vars are required.

## Project layout

```
src/
  App.jsx                 Hero choice (3D vs mobile) + scroll wiring
  components/
    Scene.jsx             Canvas, lights, camera rig, postprocessing
    FlowerWall.jsx        Instanced rose walls
    VideoPortal.jsx       Center video screen
    PetalParticles.jsx    Ambient petal drift
    HeroOverlay.jsx       Desktop copy + nav
    MobileHero.jsx        Phone / no-WebGL hero
    Sections.jsx          Collections, atelier, footer
    NavBar.jsx
  hooks/useIsMobile.js    Breakpoint + WebGL detect
  lib/assets.js           Paths for video, roses, petals, stills
  lib/scrollState.js      Shared scroll / mouse / motion flags
public/
  flower-loop.mp4
  textures/               rose-01…14.png, petal.png, fallback stills
  images/                 Collection and atelier photos
```

## Swap media

Paths live in `src/lib/assets.js`. Drop files into `public/` and keep the names, or change the constants.

| Asset | Path | Notes |
| --- | --- | --- |
| Hero video | `public/flower-loop.mp4` | Muted, looping; portrait 9:16 works best |
| Rose sprites | `public/textures/rose-01.png` … `rose-14.png` | Square PNGs with soft circular alpha, ~256–512px |
| Petal sprite | `public/textures/petal.png` | Small oval PNG with alpha |
| Mobile still | `public/textures/rose-wall-fallback.jpg` | Shown when 3D is skipped |
| Collections | `public/images/*.jpg` | Referenced from `Sections.jsx` |

Netlify caches `/flower-loop.mp4` and `/textures/*` for a year (`netlify.toml`).

## Deploy

This repo is set up for Netlify: build command `npm run build`, publish directory `dist`, SPA rewrite to `index.html`.

```bash
npx netlify deploy --prod
```

Or connect the GitHub repo (`KanchanaSW/flower-shop-3d-site`) in the Netlify dashboard and let Git deploys handle the rest.
