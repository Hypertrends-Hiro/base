<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { cn } from '@/lib/utils'
import UiPopover from '@/components/ui/popover.vue'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const currentYear = new Date().getFullYear()
const YEARS = Array.from({ length: currentYear - 1919 }, (_, i) => currentYear - 1 - i)

const props = withDefaults(
  defineProps<{ modelValue?: Date; inputClass?: string }>(),
  { inputClass: '' }
)
const emit = defineEmits<{ 'update:modelValue': [date: Date] }>()

const open = ref(false)
const viewYear = ref(props.modelValue?.getFullYear() ?? 1990)
const viewMonth = ref(props.modelValue?.getMonth() ?? 0)

watch(() => props.modelValue, (v) => {
  if (v) {
    viewYear.value = v.getFullYear()
    viewMonth.value = v.getMonth()
  }
})

function getDaysInMonth(y: number, m: number) {
  return new Date(y, m + 1, 0).getDate()
}
function getFirstDayOfWeek(y: number, m: number) {
  return new Date(y, m, 1).getDay()
}

const daysInMonth = computed(() => getDaysInMonth(viewYear.value, viewMonth.value))
const firstDayOfWeek = computed(() => getFirstDayOfWeek(viewYear.value, viewMonth.value))
const leadingBlanks = computed(() => firstDayOfWeek.value)
const totalCells = computed(() => Math.ceil((leadingBlanks.value + daysInMonth.value) / 7) * 7)

function prevMonth() {
  if (viewMonth.value === 0) {
    viewMonth.value = 11
    viewYear.value -= 1
  } else {
    viewMonth.value -= 1
  }
}
function nextMonth() {
  if (viewMonth.value === 11) {
    viewMonth.value = 0
    viewYear.value += 1
  } else {
    viewMonth.value += 1
  }
}

const today = new Date()
today.setHours(23, 59, 59, 999)

function isAfter(d: Date) {
  return d.getTime() > today.getTime()
}
function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function handleDayClick(day: number) {
  const selected = new Date(viewYear.value, viewMonth.value, day)
  if (isAfter(selected)) return
  emit('update:modelValue', selected)
  open.value = false
}

const displayValue = computed(() => {
  const v = props.modelValue
  if (!v) return 'MM/DD/YYYY'
  const mm = String(v.getMonth() + 1).padStart(2, '0')
  const dd = String(v.getDate()).padStart(2, '0')
  const yyyy = v.getFullYear()
  return `${mm}/${dd}/${yyyy}`
})

const selectClass = 'h-9 rounded-md border border-border bg-card px-3 text-sm text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary'

interface Cell {
  day: number
  isCurrentMonth: boolean
  isFuture: boolean
  isSelected: boolean
}
const cells = computed<Cell[]>(() => {
  const out: Cell[] = []
  for (let i = 0; i < totalCells.value; i++) {
    const day = i - leadingBlanks.value + 1
    const isCurrentMonth = day >= 1 && day <= daysInMonth.value
    const cellDate = new Date(viewYear.value, viewMonth.value, day)
    const isFuture = isAfter(cellDate)
    const isSelected = !!props.modelValue && isSameDay(cellDate, props.modelValue)
    out.push({ day, isCurrentMonth, isFuture, isSelected })
  }
  return out
})

function cellClass(c: Cell) {
  if (!c.isCurrentMonth) return 'text-foreground/20 cursor-default'
  if (c.isFuture) return 'text-foreground/25 cursor-not-allowed'
  if (c.isSelected) return 'bg-primary text-primary-foreground font-semibold hover:bg-primary/90'
  return 'text-foreground hover:bg-primary/10 cursor-pointer'
}
</script>

<template>
  <UiPopover v-model:open="open" class="w-full">
    <template #trigger>
      <button
        type="button"
        :class="cn(props.inputClass, 'flex items-center justify-between w-full text-left', !modelValue && 'text-foreground/30')"
      >
        {{ displayValue }}
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" class="text-foreground shrink-0">
          <path d="M4.5 1V3M10.5 1V3M1 5.5H14M2.5 2.5H12.5C13.05 2.5 13.5 2.95 13.5 3.5V12.5C13.5 13.05 13.05 13.5 12.5 13.5H2.5C1.95 13.5 1.5 13.05 1.5 12.5V3.5C1.5 2.95 1.95 2.5 2.5 2.5Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </template>
    <div class="w-[300px] p-0 z-50 bg-card border border-border shadow-xl rounded-lg overflow-hidden">
      <div class="flex gap-2 p-3 border-b border-border bg-card">
        <div class="relative flex-1">
          <select
            :value="viewYear"
            class="w-full pr-7"
            :class="selectClass"
            @change="viewYear = Number(($event.target as HTMLSelectElement).value)"
          >
            <option v-for="y in YEARS" :key="y" :value="y">{{ y }}</option>
          </select>
        </div>
        <div class="relative flex-1">
          <select
            :value="viewMonth"
            class="w-full pr-7"
            :class="selectClass"
            @change="viewMonth = Number(($event.target as HTMLSelectElement).value)"
          >
            <option v-for="(m, i) in MONTHS" :key="m" :value="i">{{ m }}</option>
          </select>
        </div>
      </div>
      <div class="flex items-center justify-between px-4 py-2.5">
        <button type="button" class="p-1 rounded hover:bg-background transition-colors text-foreground hover:text-foreground" @click="prevMonth">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <span class="text-sm font-semibold text-foreground">{{ MONTHS[viewMonth] }} {{ viewYear }}</span>
        <button type="button" class="p-1 rounded hover:bg-background transition-colors text-foreground hover:text-foreground" @click="nextMonth">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
      <div class="grid grid-cols-7 px-3 pb-1">
        <div v-for="d in ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']" :key="d" class="text-center text-[11px] font-semibold text-foreground py-1">{{ d }}</div>
      </div>
      <div class="grid grid-cols-7 px-3 pb-3 gap-y-0.5">
        <button
          v-for="(c, i) in cells"
          :key="i"
          type="button"
          :disabled="!c.isCurrentMonth || c.isFuture"
          :class="cn('h-8 w-full text-sm rounded-md transition-colors flex items-center justify-center', cellClass(c))"
          @click="c.isCurrentMonth && !c.isFuture && handleDayClick(c.day)"
        >
          {{ c.isCurrentMonth ? c.day : '' }}
        </button>
      </div>
    </div>
  </UiPopover>
</template>
