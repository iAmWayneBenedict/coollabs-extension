<script setup lang="ts">
import { motion } from 'motion-v'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<{
    duration?: number
    to?: 'left' | 'right'
    classes?: string
    animKey?: string
  }>(),
  {
    duration: 0.2,
    to: 'left',
    classes: '',
    animKey: '',
  },
)

const x = props.to === 'left' ? -150 : 150
</script>

<template>
  <motion.div
    :class="cn('h-full', props.classes)"
    :key="props.animKey"
    :initial="{ opacity: 0, x }"
    :animate="{ opacity: 1, x: 0 }"
    :exit="{ opacity: 0, x }"
    :transition="{
      type: 'tween',
      ease: 'easeInOut',
      duration: props.duration,
    }"
  >
    <slot />
  </motion.div>
</template>
