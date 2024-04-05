import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useIndexStore = defineStore('index', () => {
  const count = ref(0)

  return {
    count
  }
})