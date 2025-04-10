<script setup lang="ts">
import IconContainer from '@/components/IconContainer.vue'
import { usePage } from '@/store/usePage'
import { Button } from 'primevue'

const page = usePage()
</script>
<template>
  <div class="flex justify-between items-center gap-2">
    <IconContainer align="left" />
    <div class="flex gap-2 items-center">
      <Button
        @click="page.setPage('browse')"
        icon="pi pi-search"
        variant="text"
        class="rounded-full"
      />
      <Button
        @click="page.setPage('add')"
        size="small"
        icon="pi pi-plus"
        label="Add"
        class="bg-violet text-white rounded-full border-0 px-4"
      />
    </div>
  </div>
</template>
