<script setup lang="ts">
import { usePage } from '@/store/usePage'
import HomeHeader from './header/HomeHeader.vue'
import DynamicHeader from './header/DynamicHeader.vue'

const page = usePage()
</script>
<template>
  <div class="flex flex-col gap-2 w-full">
    <template v-if="page.getPage === 'home'">
      <HomeHeader />
    </template>
    <template v-else>
      <DynamicHeader>
        <template #title>
          <slot name="title" />
        </template>
      </DynamicHeader>
    </template>
  </div>
</template>
