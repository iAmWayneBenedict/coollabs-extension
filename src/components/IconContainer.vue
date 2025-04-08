<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps<{
  align: 'left' | 'center' | 'right'
}>()
const alignmentTw = ref('justify-center')

if (props.align === 'left') alignmentTw.value = 'justify-start'
else if (props.align === 'right') alignmentTw.value = 'justify-end'
</script>

<template>
  <div class="w-full flex py-2" :class="alignmentTw">
    <div class="flex gap-2 w-fit">
      <img class="w-10" src="/favicon.svg" alt="" />
      <span class="font-playfair-display text-lg font-black uppercase" style="font-weight: 900">
        Coollabs
      </span>
    </div>
  </div>
</template>
