import { defineStore } from 'pinia'

export const useUserData = defineStore('userData', {
  state: () => ({
    user: null,
  }),
  actions: {
    setUser(user: Record<string, any> | null) {
      this.user = user
    },
  },
  getters: {
    currentUser(state: Record<string, any> | null) {
      return state?.user
    },
  },
})
