# CONTRACT v2 (ABSOLUTE PARITY): PORT EVERYTHING React→Vue IDENTICAL

You must port the ENTIRE React app into the Vue app. The result must be IDENTICAL in:

- routes
- visible text/copy
- images/assets/fonts
- layout & styling (Tailwind classes/tokens)
- component behaviors (modals/drawers/toasts/navigation)
  This is NOT “similar”. This is strict parity.

## NON-NEGOTIABLE RULES

1. `react/` is READ-ONLY. Never modify it.
2. DO NOT invent ANY copy, labels, or UI text. Every visible string must match React exactly.
3. DO NOT invent layouts. Port the DOM structure and Tailwind classes as close as possible.
4. DO NOT call network/APIs. Replace all API calls with deterministic mocks under `vue/src/services/mock/` until explicitly told otherwise.
5. TypeScript strict. No `any`, no `@ts-ignore`, no disabling lint. If types are hard, create proper types under `vue/src/types/`.
6. Port must be driven by an INVENTORY extracted from React. No coding before inventory is produced.
7. Build gates: after each checkpoint, Vue must pass:
   - `npm run build`
   - `npm run typecheck` (use `vue-tsc --noEmit`)
   - `npm run lint` (if configured)

## REQUIRED OUTPUT ARTIFACTS (create these files in vue/)

A) `vue/ROUTES_PARITY.md`

- A table listing every React route → corresponding Vue route + Vue file path.
- Must cover ALL routes.

B) `vue/PAGES_PARITY.md`

- For each route/page: list required assets (images), key visible texts, and major components used.

C) `vue/PORTING_PROGRESS.md`

- Checklist with percentage completion by route/page.
- Every route must be marked: NOT STARTED / IN PROGRESS / DONE (build verified).

D) `vue/src/services/mock/README.md`

- Explain how mocks work and where to switch to real APIs later.

## MANDATORY WORK PLAN (DO NOT DEVIATE)

Phase 0 — Inventory (STOP after this and report)

1. Inspect React router config and list ALL routes and their page components.
2. List all pages under `react/src/pages/`.
3. List shared components under `react/src/components/` and contexts/hooks used globally.
4. List assets and fonts used by pages (imports + public assets).
5. Produce `ROUTES_PARITY.md` and `PAGES_PARITY.md` in Vue.
   Do NOT implement pages yet. STOP and report findings.

Phase 1 — Foundation

1. Copy fonts/assets with identical paths (or create a mapping layer if paths differ).
2. Port Tailwind config & global CSS to match React.
3. Create AppShell + base layouts matching React.
4. Add Router with ALL routes (placeholders allowed), so navigation never 404s.
5. Add `typecheck` script using `vue-tsc --noEmit`.
   Build must pass.

Phase 2 — Shared UI primitives
Port minimal UI equivalents to `vue/src/components/ui/`:
Button, Input, Card, Dialog, Drawer/Sheet, Toast/Toaster, Tabs, etc.
Match behavior and props as needed for parity.
Build must pass.

Phase 3 — Page-by-page port (FULL COVERAGE)
For EACH route in `ROUTES_PARITY.md`:

1. Port the page UI to Vue: same copy, same images, same layout.
2. Wire navigation actions to the correct routes.
3. Replace any data needs with mock service calls (NO NETWORK).
4. Update `PORTING_PROGRESS.md`.
   After every 2–3 pages, STOP and ensure build/typecheck pass.

Phase 4 — State parity
Port React contexts to Pinia stores where appropriate (cart, scenario).
No global store sprawl.

Phase 5 — Hardening & parity verification

1. Ensure all routes render without errors.
2. Ensure no copy mismatches on key pages (use the PAGES_PARITY checklist).
3. Ensure build passes.

## START NOW

Execute Phase 0 (Inventory) only. Create the parity docs in Vue, then stop and report.
