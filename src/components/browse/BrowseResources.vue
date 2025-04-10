<script setup lang="ts">
import { Listbox } from 'primevue'
import { ref, watch } from 'vue'
import ResourceCard from '@/components/cards/ResourceCard.vue'
import { useAppModeStore } from '@/store/useAppModeStore'

const props = defineProps<{
  resources: any
}>()

const selectedResources = ref<Record<string, any> | null>(null)
const appMode = useAppModeStore()

watch(selectedResources, (value) => {
  if (appMode.hasExtensionContext) {
    chrome.tabs.create({ url: value?.url })
  } else {
    window.open(value?.url, '_blank')
  }
})
</script>

<template>
  <div class="w-full h-full border-1 border-[#e4e4e7] rounded-2xl px-2 pt-0">
    <Listbox
      filter
      v-model="selectedResources"
      optionLabel="name"
      :options="props.resources"
      :highlightOnSelect="false"
      :virtualScrollerOptions="{ itemSize: 45 }"
      class="w-full h-full border-0 shadow-none"
      listStyle="min-height:150px;height:300px"
      filterPlaceholder="Search resources"
    >
      <template #empty>
        <p class="text-center">No pinned items</p>
      </template>
      <template #option="slotProps">
        <ResourceCard :slotProps="slotProps" />
      </template>
    </Listbox>
  </div>
</template>
