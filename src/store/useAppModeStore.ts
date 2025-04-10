import { defineStore } from 'pinia'

export const useAppModeStore = defineStore('appMode', {
  getters: {
    hasExtensionContext() {
      return !!chrome?.runtime?.id
    },
  },
})
