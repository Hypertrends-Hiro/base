import { defineStore } from 'pinia'
import { ref } from 'vue'

export type ScenarioKey =
  | 'none'
  | 'default-with-wizard'
  | 'new-rx-ordered'
  | 'assessment-not-started'
  | 'intake-complete'
  | 'preparing-lab-requisition'
  | 'labs-ordered'

export const useScenarioStore = defineStore('scenario', () => {
  const scenario = ref<ScenarioKey>('none')
  function setScenario(key: ScenarioKey) {
    scenario.value = key
  }
  return { scenario, setScenario }
})
