# Audit: Styles parity (React vs Vue)

## Purpose

Evidence-based comparison of computed styles for key selectors on each route so that Tailwind tokens and layout match React.

## How to run

1. **Baseline (React)** – run React app (e.g. port 5174), then:
   ```bash
   cd vue && SAVE_BASELINE=1 BASE_URL=http://localhost:5174 node scripts/audit-styles.mjs
   ```
   Writes `vue/audit-styles-react.json`.

2. **Vue** – run Vue app (e.g. port 5173), then:
   ```bash
   cd vue && BASE_URL=http://localhost:5173 node scripts/audit-styles.mjs
   ```
   Writes `vue/audit-styles.json`.

3. **Diff** – compare the two JSON files (e.g. manually or with a diff tool). Key properties: `fontFamily`, `fontSize`, `fontWeight`, `lineHeight`, `color`, `backgroundColor`, padding/margin, `borderRadius`, `boxShadow`.

## Script

`vue/scripts/audit-styles.mjs` (Playwright-based).

- **Routes**: `/`, `/login`, `/register`, `/dashboard`, `/profile`, `/shop`, `/plan`, `/treatments`, `/checkout`.
- **Selectors**: `main`, `header`, `aside` (sidebar), primary button (e.g. `.bg-primary`), hero section, card (e.g. `.bg-card`, `[class*="shadow-soft"]`).
- **Properties**: `fontFamily`, `fontSize`, `fontWeight`, `lineHeight`, `color`, `backgroundColor`, `padding*`, `margin*`, `borderRadius`, `boxShadow`.

## npm script

```bash
npm run audit:styles
```

Uses `BASE_URL=http://localhost:5173` by default. Override for React baseline:

```bash
SAVE_BASELINE=1 BASE_URL=http://localhost:5174 npm run audit:styles
```

## Expected result

- **MATCH**: Same (or equivalent) computed values for the same selector on the same route.
- **DIFF**: Document acceptable tolerances (e.g. minor spacing, different default font stack). Fix any missing Tailwind class or token (e.g. `bg-sidebar`, `font-heading`, `text-foreground`).

## Tolerances

- Font rendering may differ slightly between environments.
- `boxShadow` and `borderRadius` should match when the same Tailwind classes are used (e.g. `rounded-md`, `shadow-soft`).
