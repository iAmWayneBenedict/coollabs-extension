<script setup lang="ts">
import { usePage } from '@/store/usePage'
import { Button } from 'primevue'
import IconContainer from '@/components/IconContainer.vue'

const page = usePage()
</script>
<template>
  <div class="flex justify-between items-center gap-2 w-full">
    <Button
      @click="page.setPage('home')"
      size="small"
      icon="pi pi-arrow-left"
      label="Back"
      variant="text"
      class="rounded-full border-0 px-0"
    />
    <h1 class="font-semibold! text-lg"><slot name="title" /></h1>
    <Button variant="text" class="rounded-full border-0 px-0 bg-transparent">
      <IconContainer :hideText="true" classes="w-fit" align="left" />
    </Button>
  </div>
</template>
