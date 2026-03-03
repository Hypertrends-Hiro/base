# Audit: Component parity (React vs Vue pages)

## Purpose

For each React page, verify that the corresponding Vue page uses equivalent components (same sections, same UI primitives). Diffs may be acceptable when React uses library-specific components (e.g. Lucide icons) and Vue uses inline SVG or different primitives.

## How to run

```bash
cd vue && npm run audit:components
```

Script: `vue/scripts/audit-components.mjs`. Output: `vue/audit-components.json`.

## What the script does

- For each React page `react/src/pages/<Name>.tsx` and Vue page `vue/src/pages/<Name>View.vue` (with mapping Landing2→LandingView, Auth→LoginView):
  - Extracts imported symbols and JSX/template component tags from React.
  - Extracts imports and PascalCase component tags from Vue.
  - Compares and reports `inReactOnly` / `inVueOnly` and verdict MATCH/DIFF.

## Page mapping

| React page   | Vue page        |
|-------------|------------------|
| Welcome     | WelcomeView     |
| Landing2    | LandingView     |
| Register    | RegisterView    |
| Auth        | LoginView       |
| Dashboard   | DashboardView   |
| Shop        | ShopView        |
| Treatments  | TreatmentsView  |
| Assessment  | AssessmentView  |
| AssessmentComplete | AssessmentCompleteView |
| Results     | ResultsView     |
| Plan        | PlanView        |
| PlanDetail  | PlanDetailView  |
| Lifestyle   | LifestyleView   |
| Profile     | ProfileView     |
| Checkout    | CheckoutView    |
| Payment     | PaymentView     |
| ThankYou    | ThankYouView    |
| ManageSubscription | ManageSubscriptionView |
| OrderHistory | OrderHistoryView |
| PatientPortal | PatientPortalView |
| Info        | InfoView        |
| NotFound    | NotFoundView    |

## Expected result

- **Verdict DIFF** can be acceptable when:
  - React uses Lucide components (e.g. `ChevronDown`) and Vue uses inline SVG or no icon.
  - React uses a wrapper (e.g. `SignupLayout`) and Vue inlines or uses a different layout component.
- **Verdict MATCH** when the same logical sections and UI primitives (Button, Input, Card, etc.) are present.

## Definition of done

- All pages have a corresponding Vue file.
- No missing *sections* (e.g. Profile must have Account settings + Intake responses + collapsibles).
- Missing/extra *library* components (icons, layout wrappers) are documented and accepted.
