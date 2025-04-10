<script setup lang="ts">
import { useGetCollectionsQuery } from '@/lib/queries/collection-folders'
import { DEFAULT_FALLBACK_THUMBNAIL, ACCESS_LEVEL_ICONS } from '@/lib/utils'
import { useAuth } from '@/store/useAuth'
import { motion } from 'motion-v'
import { Button, Listbox } from 'primevue'
import { ref } from 'vue'
import SlideTransition from '../animation/SlideTransition.vue'

const props = defineProps<{
  toggleCollection: (e: MouseEvent) => void
}>()

const selectedCollection = ref(null)
const user = useAuth()
const { data } = useGetCollectionsQuery({ enabled: !!user })
</script>

<template>
  <SlideTransition to="left" animKey="collections-list" class="w-full flex flex-col gap-2">
    <h1 class="font-semibold!">Save to collection</h1>
    <Button
      @click="props.toggleCollection"
      label="Create new collection"
      severity="contrast"
      size="small"
      icon="pi pi-plus"
      variant="outlined"
      rounded
      class="w-full border-2 hover:bg-zinc-900 dark:hover:bg-zinc-100 hover:text-white dark:hover:text-black"
    />
    <div class="w-full h-full border-1 border-[#e4e4e7] rounded-2xl px-2 pt-0">
      <Listbox
        filter
        multiple
        checkmark
        optionLabel="name"
        v-model="selectedCollection"
        :options="data?.data"
        :highlightOnSelect="false"
        :virtualScrollerOptions="{ itemSize: 45 }"
        class="w-full border-0 shadow-none"
        listStyle="max-height:250px"
        placeholder="Select collections"
        filterPlaceholder="Search collection"
      >
        <template #option="slotProps">
          <div class="flex justify-between gap-2 w-full items-center">
            <div class="flex items-center gap-2">
              <img
                :alt="slotProps.option.name"
                :src="slotProps.option.thumbnail || DEFAULT_FALLBACK_THUMBNAIL"
                @error="(e) => ((e.target as HTMLImageElement).src = DEFAULT_FALLBACK_THUMBNAIL)"
                class="w-16 h-9 rounded-lg"
              />
              <div>
                <p class="text-sm font-semibold!">{{ slotProps.option.name }}</p>
                <p class="text-xs text-zinc-500">{{ slotProps.option.resourceCount }} item(s)</p>
              </div>
            </div>
            <div>
              <i
                :class="
                  ACCESS_LEVEL_ICONS[
                    slotProps.option.access_level as keyof typeof ACCESS_LEVEL_ICONS
                  ]
                "
              />
            </div>
          </div>
        </template>
      </Listbox>
    </div>
    <Button
      rounded
      size="small"
      type="button"
      label="Done"
      severity="contrast"
      class="w-full h-fit min-w-[5rem] font-bold bg-violet px-0 border-2 border-violet-600"
    />
  </SlideTransition>
</template>
