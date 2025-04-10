import { defineStore } from 'pinia'

export const usePage = defineStore('store', {
  state: () => ({
    page: 'home',
  }),
  actions: {
    setPage(page: string) {
      this.page = page
    },
  },
  getters: {
    getPage: (state) => state.page,
  },
})
