/**
 * Cart item shape — parity with React CartContext.CartItem
 */
export interface CartItem {
  name: string
  category: string
  image: string
  plan: string
  pricePerMonth: number
  months: number
  quantity: number
}

export type CartItemInput = Omit<CartItem, 'quantity'>
