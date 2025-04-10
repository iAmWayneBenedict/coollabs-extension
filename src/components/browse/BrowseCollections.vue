<script setup lang="ts">
import { Listbox, Button } from 'primevue'
import { ref, watch } from 'vue'
import CollectionCard from '@/components/cards/CollectionCard.vue'
import SlideTransition from '@/components/animation/SlideTransition.vue'
import ResourceCard from '@/components/cards/ResourceCard.vue'
import { AnimatePresence } from 'motion-v'
import { useAppModeStore } from '@/store/useAppModeStore'

const props = defineProps<{
  collections: Record<string, any>[]
}>()

const appMode = useAppModeStore()

const selectedCollection = ref()
const selectedResource = ref()

watch(selectedResource, (value) => {
  if (appMode.hasExtensionContext) {
    chrome.tabs.create({ url: value?.url })
  } else {
    window.open(value?.url, '_blank')
  }
})
</script>

<template>
  <div class="w-full h-full border-1 border-[#e4e4e7] overflow-hidden rounded-2xl px-2 pt-0">
    <AnimatePresence mode="wait" :initial="false">
      <template v-if="!selectedCollection">
        <SlideTransition animKey="collections-list" to="left">
          <Listbox
            filter
            optionLabel="name"
            v-model="selectedCollection"
            :options="props.collections"
            :highlightOnSelect="false"
            :virtualScrollerOptions="{ itemSize: 45 }"
            class="w-full h-full border-0 shadow-none"
            listStyle="min-height:150px;height:300px"
            placeholder="Select collections"
            filterPlaceholder="Search collection"
          >
            <template #empty>
              <p class="text-center">No collections</p>
            </template>
            <template #option="slotProps">
              <CollectionCard :slotProps="slotProps" />
            </template>
          </Listbox>
        </SlideTransition>
      </template>
      <template v-else>
        <SlideTransition animKey="resources-list" to="right">
          <div class="w-full flex flex-col gap-1">
            <Button
              @click="selectedCollection = null"
              label="Back"
              severity="contrast"
              size="small"
              icon="pi pi-arrow-left"
              variant="text"
              rounded
              class="w-fit border-0 mt-1!"
            />
            <Listbox
              filter
              optionLabel="name"
              v-model="selectedResource"
              :options="selectedCollection.resources"
              :highlightOnSelect="false"
              :virtualScrollerOptions="{ itemSize: 45 }"
              class="w-full border-0 shadow-none"
              listStyle="min-height:150px;height:250px"
              placeholder="Select resources"
              filterPlaceholder="Search resources"
            >
              <template #empty>
                <p class="text-center">No resources</p>
              </template>
              <template #option="slotProps">
                <ResourceCard :slotProps="slotProps" />
              </template>
            </Listbox>
          </div>
        </SlideTransition>
      </template>
    </AnimatePresence>
  </div>
</template>
