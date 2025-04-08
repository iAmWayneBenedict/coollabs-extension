<script setup lang="ts">
import IconContainer from '@/components/IconContainer.vue'
import { Button } from 'primevue'
</script>
<template>
  <div class="flex flex-col gap-2 w-full">
    <div class="flex justify-between items-center gap-2">
      <IconContainer align="left" />
      <div class="flex gap-2 items-center">
        <Button icon="pi pi-search" variant="text" class="rounded-full" />
        <Button
          size="small"
          icon="pi pi-plus"
          label="Add"
          class="bg-violet text-white rounded-full border-0 px-4"
        />
      </div>
    </div>
  </div>
</template>
