<script lang="ts" setup>
import config from '@/lib/config'
import { cn } from '@/lib/utils'
import { useAppModeStore } from '@/store/useAppModeStore'
import { usePage } from '@/store/usePage'
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    align: 'left' | 'center' | 'right'
    classes?: string
    hideText?: boolean
  }>(),
  {
    align: 'center',
    classes: '',
    hideText: false,
  },
)

const appMode = useAppModeStore()
const alignmentTw = ref('justify-center')
const page = usePage()

if (props.align === 'left') alignmentTw.value = 'justify-start'
else if (props.align === 'right') alignmentTw.value = 'justify-end'

const onClick = () => {
  if (page.getPage === 'home' && appMode.hasExtensionContext) {
    chrome.tabs.create({ url: config.WEB_APP_URL })
  }
  page.setPage('home')
}
</script>

<template>
  <div :class="cn('w-full', alignmentTw, classes)" class="flex py-2">
    <div class="flex gap-2 w-fit cursor-pointer" @click="onClick">
      <img class="w-10" src="/favicon.svg" alt="" />
      <template v-if="!props.hideText">
        <span class="font-playfair-display text-lg font-black uppercase" style="font-weight: 900">
          Coollabs
        </span>
      </template>
    </div>
  </div>
</template>
