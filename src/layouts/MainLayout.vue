<script setup lang="ts">
import AddResource from '@/components/AddResource.vue'
import AISearch from '@/components/AISearch.vue'
import HomeTab from '@/components/home/HomeTab.vue'
import Pinned from '@/components/home/Pinned.vue'
import Recent from '@/components/home/Recent.vue'
import HomeHeader from '@/components/HomeHeader.vue'
import { Button } from 'primevue'
</script>

<template>
  <div class="flex flex-col w-full px-2">
    <!-- <Button
      text
      rounded
      size="small"
      label="Add"
      severity="contrast"
      icon="pi pi-plus"
      class="bg-violet text-white border-0"
    /> -->

    <!-- <AddResource /> -->

    <HomeHeader />
    <AISearch />
    <!-- <Pinned />
    <Recent /> -->
    <HomeTab />
  </div>
</template>
