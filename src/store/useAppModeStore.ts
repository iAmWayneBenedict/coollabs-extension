import { defineStore } from 'pinia'

export const useAppModeStore = defineStore('appMode', {
  state: () => ({
    isExtension: true,
  }),
  actions: {
    hasExtensionContext() {
      return !!chrome?.runtime?.id
    },
  },
  //   getters: {
  //     hasExtensionContext(): boolean {
  //       return this.isExtension
  //     },
  //   },
})
