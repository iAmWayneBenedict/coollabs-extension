<script setup lang="ts">
import { useGetCollectionsQuery } from '@/lib/queries/collection-folders'
import { DEFAULT_FALLBACK_THUMBNAIL } from '@/lib/utils'
import { useAuth } from '@/store/useAuth'
import { motion } from 'motion-v'
import { Button, Listbox } from 'primevue'
import { ref } from 'vue'

const props = defineProps<{
  toggleCollection: (e: MouseEvent) => void
}>()

const icon = {
  public: 'pi pi-globe',
  private: 'pi pi-lock',
  shared: 'pi pi-users',
}

const selectedCollection = ref(null)
const user = useAuth()
const { data } = useGetCollectionsQuery({ enabled: !!user })
</script>

<template>
  <motion.div
    class="w-full flex flex-col gap-2"
    key="collections-list"
    :initial="{ opacity: 0, x: -150 }"
    :animate="{ opacity: 1, x: 0 }"
    :exit="{ opacity: 0, x: -150 }"
    :transition="{
      type: 'tween',
      ease: 'easeInOut',
      duration: 0.25,
    }"
  >
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
          <div><i :class="icon[slotProps.option.access_level as keyof typeof icon]" /></div>
        </div>
      </template>
    </Listbox>
  </motion.div>
</template>
