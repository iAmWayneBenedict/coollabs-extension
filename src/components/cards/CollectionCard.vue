<script setup lang="ts">
import { ACCESS_LEVEL_ICONS, DEFAULT_FALLBACK_THUMBNAIL } from '@/lib/utils'
const props = defineProps<{ slotProps: any }>()
</script>

<template>
  <div class="flex justify-between gap-2 w-full items-center">
    <div class="flex items-center gap-2">
      <img
        :alt="props.slotProps.option.name"
        :src="props.slotProps.option.thumbnail || DEFAULT_FALLBACK_THUMBNAIL"
        @error="(e) => ((e.target as HTMLImageElement).src = DEFAULT_FALLBACK_THUMBNAIL)"
        class="w-16 h-9 rounded-lg"
      />
      <div>
        <p class="text-sm font-semibold!">{{ props.slotProps.option.name }}</p>
        <p class="text-xs text-zinc-500">{{ props.slotProps.option.resourceCount }} item(s)</p>
      </div>
    </div>
    <div>
      <i
        :class="
          ACCESS_LEVEL_ICONS[props.slotProps.option.access_level as keyof typeof ACCESS_LEVEL_ICONS]
        "
      />
    </div>
  </div>
</template>
