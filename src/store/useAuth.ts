import { defineStore } from 'pinia'

export const useAuth = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  actions: {
    setUser(user: any) {
      const data = user ?? null
      localStorage.setItem('user', JSON.stringify(data))
      this.user = user
    },
  },
  getters: {
    currentUser(): Record<string, string> | null {
      return JSON.parse(localStorage.getItem('user') ?? 'null')
    },
  },
})
