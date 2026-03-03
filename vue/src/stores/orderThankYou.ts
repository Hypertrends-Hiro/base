import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface ThankYouOrderState {
  items: { name: string; image: string; plan: string; pricePerMonth: number; months: number; quantity: number }[]
  subtotal: number
  orderNumber: string
  firstName: string
}

export const useOrderThankYouStore = defineStore('orderThankYou', () => {
  const state = ref<ThankYouOrderState | null>(null)
  function setState(s: ThankYouOrderState | null) {
    state.value = s
  }
  return { state, setState }
})
