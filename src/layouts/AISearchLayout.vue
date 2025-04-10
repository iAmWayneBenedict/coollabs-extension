<script setup lang="ts">
import SlideTransition from '@/components/animation/SlideTransition.vue'
import Header from '@/components/Header.vue'
import Button from 'primevue/button'
import Listbox from 'primevue/listbox'
import { useGetAISearch } from '@/lib/queries/ai-search'
import { ref, watch, h } from 'vue'
import ResourceCard from '@/components/cards/ResourceCard.vue'
import { useAppModeStore } from '@/store/useAppModeStore'

const search = ref('')
const searchValue = ref('')

const { data, isLoading } = useGetAISearch({
  params: searchValue,
})

const selectedResource = ref<Record<string, any> | null>(null)
const appMode = useAppModeStore()

watch(selectedResource, (value) => {
  if (appMode.hasExtensionContext) {
    chrome.tabs.create({ url: value?.url })
  } else {
    window.open(value?.url, '_blank')
  }
})
</script>

<template>
  <SlideTransition to="right" animKey="add" class="w-full flex flex-col gap-2 overflow-hidden">
    <Header>
      <template #title>
        <span class="flex items-center gap-2 font-bold! text-lg">
          <i class="pi pi-brain text-violet-600"></i>
          AI Compass
        </span>
      </template>
    </Header>
    <div class="flex gap-2 w-full">
      <div class="flex-1 relative gradient-border-wrapper flex items-center">
        <input
          v-model="search"
          @keyup.enter="searchValue = search"
          placeholder="✨ Ask anything about your resources..."
          class="rounded-xl w-full bg-[#f4f4f5] border-none outline-none relative z-10 py-2 px-3 text-sm font-medium"
        />
        <!-- <i class="pi pi-lightbulb absolute right-3 text-violet-500 z-10 opacity-70"></i> -->
      </div>
      <div class="w-fit">
        <Button
          rounded
          @click="searchValue = search"
          size="small"
          type="button"
          label="Search"
          severity="contrast"
          class="w-full h-fit min-w-[5rem] font-bold bg-violet px-0 border-2 border-violet-600"
        />
      </div>
    </div>
    <div class="">
      <Listbox
        v-model="selectedResource"
        :options="data?.data?.resources || []"
        :highlightOnSelect="false"
        :virtualScrollerOptions="{ itemSize: 45 }"
        class="w-full h-full border-0 shadow-none"
        listStyle="min-height:150px;height:300px"
        placeholder="Select resources"
        filterPlaceholder="Search resources"
      >
        <template #empty>
          <p class="text-center">
            {{ isLoading ? 'Generating results...' : data?.data?.message || 'No resources found' }}
          </p>
        </template>
        <template #emptyfilter>
          <p class="text-center">{{ data?.data?.message }}</p>
        </template>
        <template #option="slotProps">
          <ResourceCard :slotProps="slotProps" />
        </template>
      </Listbox>
    </div>
  </SlideTransition>
</template>

<style scoped>
.gradient-border-wrapper {
  position: relative;
  border-radius: 0.75rem;
  padding: 2px;
  background: #e4e4e7; /* Default subtle border color */
  transition: background-color 0.2s ease;
}

.gradient-border-wrapper:hover {
  background: #afb2b6; /* Slightly lighter border on hover */
}

.gradient-border-wrapper::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 0.75rem;
  background: linear-gradient(90deg, #a855f7, #ec4899, #3b82f6, #a855f7);
  background-size: 300% 100%;
  opacity: 0;
  z-index: 0;
  transition: opacity 0.3s ease;
}

.gradient-border-wrapper:has(input:focus)::after {
  opacity: 1;
  animation: gradientMove 3s ease infinite;
}

.gradient-border-wrapper::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  right: 2px;
  bottom: 2px;
  border-radius: 0.7rem;
  background: #f4f4f5;
  z-index: 1;
}

@keyframes gradientMove {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
