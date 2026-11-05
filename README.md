# Grim Origin

Website of Grim Origin, a solo indie mobile studio from Poland.

Live: https://grrim.github.io/GrimOrigin/

## Stack

React 19, TypeScript, Vite, Tailwind CSS 4, Lenis (smooth scroll).

## Development

```bash
npm ci
npm run dev      # local dev server
npm run build    # type-check + production build to dist/
npm run lint
```

Pushing to `main` deploys to GitHub Pages (`.github/workflows/deploy.yml`).
The site is served under `/GrimOrigin/`, so reference files from `public/`
with `import.meta.env.BASE_URL` (e.g. `` `${import.meta.env.BASE_URL}avatar.webp` ``),
not with a leading `/`.

## App privacy policies

Static pages in `public/`, linked from each app card and from the store listings:

- LUMINIS: `/GrimOrigin/luminis/privacy-policy.html`
- Luna: `/GrimOrigin/luna/privacy-policy.html`
- VARDEN FILES: `/GrimOrigin/varden-files/privacy-policy.html`
