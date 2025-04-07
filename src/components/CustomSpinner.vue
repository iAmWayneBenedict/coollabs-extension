<script setup lang="ts">
import { ProgressSpinner } from 'primevue'
const props = defineProps({
  width: String,
  height: String,
})
</script>

<template>
  <ProgressSpinner
    :style="{
      '--p-progressspinner-color-one': 'black',
      '--p-progressspinner-color-two': 'black',
      '--p-progressspinner-color-three': 'black',
      '--p-progressspinner-color-four': 'black',
      width: props.width,
      height: props.height,
    }"
    strokeWidth="2"
    fill="transparent"
    aria-label="Custom ProgressSpinner"
  />
</template>
