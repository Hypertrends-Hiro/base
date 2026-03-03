# STATE PARITY

Mapping of React global state to Vue Pinia stores.

## 1. CartContext → vue/src/stores/cart.ts

- **React:** `react/src/contexts/CartContext.tsx`
- **Vue target:** `vue/src/stores/cart.ts` (Pinia store)

**API to replicate:**
- State: `items` (CartItem[]), `cartOpen` (boolean)
- CartItem: `{ name, category, image, plan, pricePerMonth, months, quantity }`
- Actions: `addToCart(item)`, `removeFromCart(name, plan)`, `updateQuantity(name, plan, delta)`, `clearCart()`, `setCartOpen(open)`
- Derived: `totalItems`, `subtotal`

## 2. ScenarioContext → vue/src/stores/scenario.ts

- **React:** `react/src/contexts/ScenarioContext.tsx`
- **Vue target:** `vue/src/stores/scenario.ts` (Pinia store)

**API to replicate:**
- State: `scenario` (ScenarioKey)
- ScenarioKey: `"none" | "assessment-not-started" | "intake-complete" | "labs-ordered" | "preparing-lab-requisition" | "default-with-wizard" | "new-rx-ordered"`
- Action: `setScenario(key: ScenarioKey)`

## Other global state

- **React Query (QueryClient):** Used in App.tsx via `QueryClientProvider`. No direct context; data-fetching layer. In Vue: use a composable or Pinia for server state, or a library (e.g. TanStack Query Vue or similar).
- **TooltipProvider:** React context for tooltip root. In Vue: provide at app root or via plugin if using a tooltip component.
- No other React contexts found under `react/src/contexts/`.
