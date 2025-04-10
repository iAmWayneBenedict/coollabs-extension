import { defineStore } from 'pinia'
import { useAppModeStore } from './useAppModeStore'

export const useAuth = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  actions: {
    setUser(user: any) {
      const data = user ?? null
      const appMode = useAppModeStore()
      if (appMode.hasExtensionContext) chrome.storage.local.set({ user: data })
      else localStorage.setItem('user', JSON.stringify(data))
      this.user = user
    },
  },
  getters: {
    async currentUser(): Promise<Record<string, string> | null> {
      const appMode = useAppModeStore()
      if (appMode.hasExtensionContext) {
        const user = await chrome.storage.local.get('user')
        return user
      }
      return JSON.parse(localStorage.getItem('user') ?? 'null')
    },
  },
})
