import { ref, readonly } from 'vue'

export interface Toast {
  id: string
  title?: string
  description?: string
  variant?: 'default' | 'destructive'
  open?: boolean
}

const TOAST_LIMIT = 1
let count = 0
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

const toasts = ref<Toast[]>([])

export function toast(options: Omit<Toast, 'id' | 'open'>) {
  const id = genId()
  const t: Toast = { ...options, id, open: true }
  toasts.value = [t, ...toasts.value].slice(0, TOAST_LIMIT)
  return {
    id,
    dismiss: () => {
      toasts.value = toasts.value.filter((x) => x.id !== id)
    },
    update: (updates: Partial<Toast>) => {
      toasts.value = toasts.value.map((x) => (x.id === id ? { ...x, ...updates } : x))
    },
  }
}

export function useToast() {
  return {
    toasts: readonly(toasts),
    toast,
    dismiss: (id?: string) => {
      if (id) toasts.value = toasts.value.filter((x) => x.id !== id)
      else toasts.value = []
    },
  }
}
