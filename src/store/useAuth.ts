import { defineStore } from 'pinia'
import { useAppModeStore } from './useAppModeStore'

export const useAuth = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  actions: {
    setUser(user: any) {
      const appMode = useAppModeStore()
      const data = user ?? null
      if (appMode.hasExtensionContext()) {
        // chrome.storage.local.set({ user })
        localStorage.setItem('user', JSON.stringify(data))
      } else {
        localStorage.setItem('user', JSON.stringify(data))
      }
      this.user = user
    },
  },
  getters: {
    currentUser(): Record<string, string> | null {
      const appMode = useAppModeStore()
      if (appMode.hasExtensionContext()) {
        // chrome.storage.local.get('user', (result) => {
        //   this.user = result.user
        // })
        // return this.user
        return JSON.parse(localStorage.getItem('user') ?? 'null')
      }
      return JSON.parse(localStorage.getItem('user') ?? 'null')
    },
  },
})
