<script setup lang="ts">
import AISearch from '@/components/AISearch.vue'
import SlideTransition from '@/components/animation/SlideTransition.vue'
import Header from '@/components/Header.vue'
import HomeTab from '@/components/home/HomeTab.vue'
import { usePage } from '@/store/usePage'
import { Button } from 'primevue'

const page = usePage()
</script>
<template>
  <SlideTransition
    to="left"
    animKey="home"
    class="flex flex-col w-full justify-between h-full gap-2"
  >
    <div class="flex flex-col h-full w-full gap-2">
      <Header />
      <AISearch />
      <HomeTab />
    </div>
    <div class="w-full">
      <Button
        rounded
        @click="page.setPage('browse')"
        severity="contrast"
        variant="outlined"
        size="small"
        icon="pi pi-search"
        label="Browse all resources"
        class="w-full px-4 border-1 py-1 hover:bg-black transition-colors duration-300 hover:text-white"
      />
    </div>
  </SlideTransition>
</template>
