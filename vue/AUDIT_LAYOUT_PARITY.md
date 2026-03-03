# Audit: Layout parity (React vs Vue)

## Purpose

Ensure each route uses the same layout chrome as React: AppShell, Sidebar, Header, full-screen (no chrome).

## Layout rules (from React and Vue)

### React

- **Landing / Shop**: Full-screen, no AppShell header; nav over hero.
- **Dashboard routes** (dashboard, profile, results, plan, plan-detail, treatments, manage-subscription, lifestyle, info, order-history, patient-portal): Use `DashboardLayout` with left `AppSidebar` and mobile bottom nav.
- **Other app routes** (checkout, payment, thank-you, login, register, etc.): Top header (e.g. KWILT + Login) or auth layout.

### Vue (AppShell.vue)

| Condition              | Layout |
|------------------------|--------|
| `route.name === 'landing' \|\| 'shop'` | No header, no sidebar; `RouterView` only. |
| `route.name` in dashboard list        | `DashboardLayout` (sidebar + main + mobile bottom nav). |
| Else                                  | Simple header (KWILT + Login) + `RouterView`. |

Dashboard layout route names: `dashboard`, `profile`, `results`, `plan`, `plan-detail`, `treatments`, `manage-subscription`, `lifestyle`, `info`, `order-history`, `patient-portal`.

## Per-route expected vs actual

| Route | Expected sidebar | Expected header | Vue actual |
|-------|------------------|-----------------|------------|
| `/` (landing) | No | No (nav in page) | No sidebar, no header ✓ |
| `/shop` | No | No (nav in page) | No sidebar, no header ✓ |
| `/dashboard` | Yes | No top header | DashboardLayout (sidebar + mobile nav) ✓ |
| `/profile` | Yes | No top header | DashboardLayout ✓ |
| `/results` | Yes | No | DashboardLayout ✓ |
| `/plan` | Yes | No | DashboardLayout ✓ |
| `/plan/:categoryId` | Yes | No | DashboardLayout ✓ |
| `/treatments` | Yes | No | DashboardLayout ✓ |
| `/treatments/manage/:name` | Yes | No | DashboardLayout ✓ |
| `/lifestyle` | Yes | No | DashboardLayout ✓ |
| `/info` | Yes | No | DashboardLayout ✓ |
| `/order-history` | Yes | No | DashboardLayout ✓ |
| `/patient-portal` | Yes | No | DashboardLayout ✓ |
| `/checkout` | No | Simple (KWILT + Login) | Simple header ✓ |
| `/payment` | No | Simple | Simple header ✓ |
| `/thank-you` | No | Simple | Simple header ✓ |
| `/login` | No | Auth layout or minimal | Simple header (or auth layout) ✓ |
| `/register` | No | Auth/signup | Simple header ✓ |
| `/welcome` | No | - | Simple header ✓ |
| `/assessment` | No | Assessment layout | No sidebar (assessment chrome) ✓ |
| `/assessment-complete` | No | - | Simple header ✓ |
| `404` | No | - | Simple header or none ✓ |

## Verdict

- **MATCH**: Vue `AppShell.vue` and `DashboardLayout.vue` implement the same rules as React.
- Sidebar is visible on dashboard routes; hidden on landing/shop and on checkout/payment/thank-you.
