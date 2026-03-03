# Audit: Copy parity (React vs Vue)

## Purpose

Ensure **zero invented copy** in Vue. Every user-visible string in Vue must exist in React (same page or global).

## How to run

From repo root (parent of `vue/`):

```bash
cd vue && npm run audit:copy
```

Or from `vue/`:

```bash
npm run audit:copy
```

Script: `vue/scripts/audit-copy.mjs`. Output: `vue/audit-copy.json`.

## What the script does

1. Extracts literal strings from `react/src` (`.tsx`, `.ts`) and `vue/src` (`.vue`, `.ts`) using regex for:
   - Double- and single-quoted strings
   - Template literals
   - JSX/template text content
2. Builds sets: `reactStrings`, `vueStrings`.
3. **Invented copy**: Vue strings that:
   - Contain "coming soon" and are not in React (short strings only, to avoid template chunks), or
   - Contain forbidden substrings: "local fixture", "Meal cards for the selected day", "to test HMR", "Check out", "official Vue + Vite", "Learn more about IDE Support", "Vue Docs Scaling up", "Click on the Vite and Vue logos".
4. Writes `audit-copy.json` with `inventedInVue`, `comingSoon`, and `onlyInVueCandidates`.

## Expected result after fixes

- **inventedInVue**: `[]` (empty array).
- **comingSoon.inVue**: Only strings that also appear in React (e.g. "Content coming soon." in Profile).
- Exit code: `0` when no invented copy; `1` when any invented copy is found.

## Command used for scan

```bash
node vue/scripts/audit-copy.mjs
```

## Post-audit status

- **Coming soon**: "Content coming soon." exists in both React (Profile CollapsibleRow fallback) and Vue (ProfileView collapsibles). Allowed.
- **Removed**: Default Vite template copy in `HelloWorld.vue` and `HomeView.vue` (replaced with minimal content / "KWILT").
- **Removed**: "Meal cards for the selected day (local fixture)." from `MealPlanSection.vue`; replaced with fixture-driven meal cards (Day 1 Breakfast from React).
- **TreatmentsView**: assessment/instructions use exact long Lorem from React for two treatments; newRxTreatment uses "Pending provider consultation..." and "Please schedule your virtual consultation...".

## Grep reference (manual check)

```bash
# Case-insensitive "coming soon" in Vue
rg -i "coming soon" vue/src --glob "*.vue" --glob "*.ts"

# Forbidden phrases
rg "local fixture|Meal cards for the selected day" vue/src
```
