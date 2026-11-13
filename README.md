# Grim Origin

Website of Grim Origin, an independent studio from Poland — *three worlds, one origin*.

Live: https://grrim.github.io/GrimOrigin/

## Concept

One page, one WebGL particle field. As you scroll, the field morphs from the
studio's first point of light into each world and back, and the whole page
re-tints itself (`html[data-world]`):

| Stage | Section | Particles |
|---|---|---|
| 0 | Games, news, studio, press | a nebula expanding from a single point |
| 1–3 | Hero slider | follows the featured game |
| 1 | LUMINIS (repo `LUMINIS`) | twelve constellations on a zodiac ring, falling stars, Ognik |
| 2 | VARDEN FILES (repo `OFFLINE`) | a phone with notifications, in the rain |
| 3 | Luna (repo `Lune`) | a crescent inside a four-phase cycle ring |
| 4 | Contact, footer | everything collapses back into the point |

## Stack

React 19, TypeScript, Vite, three.js (lazy-loaded), GSAP + ScrollTrigger + SplitText,
Lenis smooth scroll, Tailwind preflight only (all styling is in `index.css`).

```
src/
  content.ts            all copy and facts about the three worlds
  scene/cosmos.ts       the particle field (five morph targets in one shader)
  components/           CosmosCanvas, Nav, shared UI (rails, feature lists, cursor), Legal
  sections/             Opening (hero, manifesto), Luminis, Varden, Luna, Closing (studio, contact, footer)
  hooks/useReveals.ts   data-attribute scroll choreography (data-split, data-reveal, data-count, …)
  motion.ts             GSAP/Lenis setup, reduced-motion helpers
```

Any element with `data-stage="0..4"` and `data-world="…"` retargets the particle
field when it crosses the middle of the viewport. Under `prefers-reduced-motion`
there is no smooth scroll, no reveal animation and the field renders static frames.

## Editing content

- Copy, stats, case files and features: `src/content.ts`.
- Screenshots: `public/apps/<id>/shot-N.webp` (portrait, 720 px wide), listed in
  `WORLDS[id].shots` with their `ratio` (height / width). `heroShots` picks the three
  phones in the front-page slider, `cardShot` the capsule art. Current sources (12 Nov 2026):
  - LUMINIS 2.4: `node tools/qa/screens.cjs` in the LUMINIS repo (release/2.4-rc), plus
    `docs/media/luminis-2.4-gameplay.mp4` as the looping video.
  - VARDEN FILES 2.0: `flutter build web` of the newest branch, played in headless Edge
    at 390×844 (2.5×), plus `SCREENSHOTS=1 SCREENSHOT_LOCALE=en flutter test
    test/visual/screenshot_harness_test.dart` for the Varden Board.
  - Luna 4.0: debug build on an Android 16 emulator (1080×2400), English, sample history
    from Settings → Test mode. Screenshots are blocked by default (FLAG_SECURE), so the
    capture build sets `HIDE_IN_RECENTS_DEFAULT` to false locally — never commit that.
- News items live in `NEWS` and come from each project's CHANGELOG.
- When a title goes live on Google Play, set `links.googlePlay` — the
  "Join the closed test" button becomes "Get it on Google Play".

## Development

```bash
npm ci
npm run dev      # local dev server
npm run build    # type-check + production build to dist/
npm run lint
```

Pushing to `main` deploys to GitHub Pages (`.github/workflows/deploy.yml`).
GitHub Pages must be enabled with **Source: GitHub Actions** (Settings → Pages).
The site is served under `/GrimOrigin/`, so reference files from `public/`
with `asset()` / `import.meta.env.BASE_URL`, not with a leading `/`.

## App privacy policies

Static pages in `public/`, linked from each world and from the store listings:

- LUMINIS: `/GrimOrigin/luminis/privacy-policy.html`
- Luna: `/GrimOrigin/luna/privacy-policy.html`
- VARDEN FILES: `/GrimOrigin/varden-files/privacy-policy.html`
