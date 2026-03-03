# Final verification — manual navigation checklist (22 routes)

Use this checklist to verify every route renders the expected page. Navigate to each path and confirm the **Expected page title/identifier** appears.

| # | Route path | Expected page title/identifier |
|---|------------|--------------------------------|
| 1 | `/` | Landing: hero "KWILT", "Redefine your age."; JOIN TODAY / LOGIN in header |
| 2 | `/login` | Auth: "Member Login" or login form |
| 3 | `/register` | Register: "Become a KWILT™ member" or "Your Information" |
| 4 | `/welcome` | Welcome: "You're officially a KWILT™ member" or "Payment successful" |
| 5 | `/assessment` | Assessment: "Exit", "1 of 13" progress; first section (e.g. Biometrics) |
| 6 | `/assessment-complete` | Assessment complete: "Assessment complete", "Thank you for completing your health profile.", "Go to My Dashboard" |
| 7 | `/shop` | Shop: Shop/treatments listing; header JOIN TODAY / LOGIN |
| 8 | `/dashboard` | Dashboard: "Dashboard" or "Your biological age" / longevity snapshot |
| 9 | `/results` | Results: "KWILT™ longevity pillars" or "Awaiting lab results" (blank state) |
| 10 | `/plan` | Plan: "Your KWILT plan", "Top Actions" / "Today's Agenda" |
| 11 | `/plan/nutrition` | Plan detail: "Nutrition optimization" (or other category title from route) |
| 12 | `/plan/exercise` | Plan detail: "Exercise & Movement" |
| 13 | `/treatments` | Treatments: treatments list; "Book appointment" / therapy cards |
| 14 | `/treatments/manage/semaglutide` | Manage subscription: "Manage Semaglutide subscription" (or "Subscription not found." if invalid) |
| 15 | `/lifestyle` | Lifestyle: "Track your meals", meal cards / "Add a meal" |
| 16 | `/profile` | Profile: "KWILT™ profile", "Account settings", intake categories (Demographics, Health Goals, etc.) |
| 17 | `/info` | Info: "How to use KWILT", "Your portal at a glance", "Getting started tips" |
| 18 | `/order-history` | Order history: "Order history", "ALL" / "SHIPPED" / "DELIVERED" / "CANCELLED" |
| 19 | `/patient-portal` | Patient portal: "Patient Portal", "Upcoming" / "Recent" / "Visit summaries" |
| 20 | `/payment` | Payment: "Become a KWILT™ member", "Annual Membership", "$449", "Complete Purchase" |
| 21 | `/checkout` | Checkout: "Summary", "1 of 3" / "Info", "Shipping", "Payment", "Place order" (or "Your cart is empty.") |
| 22 | `/thank-you` | Thank you: "Order #", "Thank you", "Back to dashboard", "Summary" (or redirect to dashboard if no order state) |
| — | Any other path (e.g. `/foo`) | NotFound: "404", "Oops! Page not found", "Return to Home" |

## Notes

- **AppShell routes** (2–22 except login, register, welcome, assessment, assessment-complete): Page content is shown below the main app header (with nav/logo). Top-level routes 1, 5, 6, and login/register/welcome may use a different or no shell.
- **Dynamic segments:** `/plan/:categoryId` (e.g. `nutrition`, `exercise`, `sleep`, `diagnostics`, `wellness`, `supplements`) and `/treatments/manage/:treatmentName` (e.g. `semaglutide`, `metformin`) show content based on the param.
- **Thank-you:** Expect redirect to `/dashboard` if navigated to without prior checkout state; with state, order summary and "Back to dashboard" appear.
- **Results/Plan/Dashboard:** Blank states may show when scenario is not `none` (e.g. "Awaiting lab results", "Complete your health assessment...").

## Automated checklist run

To execute the checklist automatically (requires Node and Playwright):

```bash
npm run dev   # in one terminal
npx playwright install chromium   # one-time
BASE_URL=http://localhost:5173 node scripts/verify-routes.mjs
```

Last run: **23/23 routes passed** (all paths return expected page content or valid redirect).
