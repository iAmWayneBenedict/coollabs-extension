<script setup lang="ts">
import { Listbox } from 'primevue'
</script>

<template>
  <div class="w-full h-full">
    <Listbox
      optionLabel="name"
      :highlightOnSelect="false"
      :virtualScrollerOptions="{ itemSize: 45 }"
      class="w-full h-full border-0 shadow-none"
      listStyle="min-height:150px;height:100%"
    >
      <template #empty>
        <p class="text-center">No pinned items</p>
      </template>
      <template #option="slotProps">
        <div class="flex justify-between gap-2 w-full items-center">
          <div class="flex items-center gap-2">
            <img
              :alt="slotProps.option.name"
              :src="slotProps.option.thumbnail"
              class="w-16 h-9 rounded-lg"
            />
            <div>
              <p class="text-sm font-semibold!">{{ slotProps.option.name }}</p>
              <p class="text-xs text-zinc-500">{{ slotProps.option.resourceCount }} item(s)</p>
            </div>
          </div>
        </div>
      </template>
    </Listbox>
  </div>
</template>
