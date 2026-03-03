import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CartItem, CartItemInput } from '@/types/cart'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const cartOpen = ref(false)

  const totalItems = computed(() =>
    items.value.reduce((sum, i) => sum + i.quantity, 0)
  )

  const subtotal = computed(() =>
    items.value.reduce((sum, i) => sum + i.pricePerMonth * i.months * i.quantity, 0)
  )

  function addToCart(item: CartItemInput) {
    const existing = items.value.find(
      (i) => i.name === item.name && i.plan === item.plan
    )
    if (existing) {
      items.value = items.value.map((i) =>
        i.name === item.name && i.plan === item.plan
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )
    } else {
      items.value = [...items.value, { ...item, quantity: 1 }]
    }
    cartOpen.value = true
  }

  function removeFromCart(name: string, plan: string) {
    items.value = items.value.filter(
      (i) => !(i.name === name && i.plan === plan)
    )
  }

  function updateQuantity(name: string, plan: string, delta: number) {
    items.value = items.value
      .map((i) =>
        i.name === name && i.plan === plan
          ? { ...i, quantity: Math.max(0, i.quantity + delta) }
          : i
      )
      .filter((i) => i.quantity > 0)
  }

  function clearCart() {
    items.value = []
  }

  function setCartOpen(open: boolean) {
    cartOpen.value = open
  }

  return {
    items,
    cartOpen,
    totalItems,
    subtotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    setCartOpen,
  }
})
