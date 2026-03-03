# PHASE 0 — INVENTORY REPORT (MUST PROVIDE TREE + PARITY DOCS)

You must generate inventory reports from BOTH folders:

- `react/` (READ-ONLY)
- `vue/` (target)

## NON-NEGOTIABLE

1. Do NOT implement any pages/components yet. This phase is INVENTORY ONLY.
2. Output must be exact, complete, and verifiable (counts + file paths).
3. Provide the report as plain text in the response (not screenshots).

## TASKS (DO NOW)

### A) TREE REPORTS (REQUIRED)

1. Provide a full tree for `react/src/` and `react/public/` (depth enough to show all pages, components, contexts, hooks, assets).
2. Provide a full tree for `vue/src/` and `vue/public/` (current baseline).
3. Provide counts:
   - total React pages under `react/src/pages/`
   - total React UI primitives under `react/src/components/ui/`
   - total React feature components under `react/src/components/` (excluding ui)
   - total React contexts under `react/src/contexts/`
   - total assets under `react/src/assets/` and fonts under `react/public/fonts/`

### B) PARITY DOCS (CREATE THESE FILES IN `vue/`)

Create the following files under the `vue/` root directory:

1. `vue/ROUTES_PARITY.md`

- List EVERY file in `react/src/pages/*.tsx`
- For each page:
  - React file path
  - Proposed Vue route path
  - Target Vue page file path (to be created under `vue/src/pages/`)
- Include a TOTAL count and it must match the number of files in `react/src/pages/`.

2. `vue/PAGES_PARITY.md`
   For EACH page in ROUTES_PARITY:

- List key components it depends on (from `react/src/components/**`)
- List assets it uses (from `react/src/assets/**` and/or `react/public/**`)
- List 5–15 key visible strings that must match exactly.

3. `vue/UI_PRIMITIVES_LIST.md`

- List EVERY file under `react/src/components/ui/`
- Mark which ones are required for initial page rendering (Welcome/Landing2/Register/Auth/Dashboard)
- Note the target location in Vue: `vue/src/components/ui/`

4. `vue/STATE_PARITY.md`

- Map:
  - `react/src/contexts/CartContext.tsx` → `vue/src/stores/cart.ts`
  - `react/src/contexts/ScenarioContext.tsx` → `vue/src/stores/scenario.ts`
- List any other global state sources if found.

5. `vue/ASSETS_PARITY.md`

- Provide the copy/mapping plan for:
  - `react/public/fonts/*` → Vue location
  - `react/src/assets/*` → Vue location
- Explicitly list filenames and intended paths.

6. `vue/PORTING_PROGRESS.md`

- Checklist of ALL pages (NOT STARTED for all).
- Include columns: Status, Build Verified (true/false), Notes.

## STOP CONDITION

After completing A + B, STOP. Do not proceed to Phase 1 or implement any UI.

## RESPONSE FORMAT (IMPORTANT)

At the end of your response, output:

- A short summary with counts
- The list of created files (paths)
- Any gaps/risks discovered

Proceed.
