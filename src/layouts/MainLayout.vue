<script setup lang="ts">
import Header from '@/components/Header.vue'
import { usePage } from '@/store/usePage'
import { AnimatePresence, motion } from 'motion-v'
import HomeLayout from '@/layouts/HomeLayout.vue'
import AddLayout from './AddLayout.vue'
import BrowseLayout from './BrowseLayout.vue'
import { useUserData } from '@/store/useUserData'
import { useGetAllUserData } from '@/lib/queries/user-data'
import { watch } from 'vue'
import AISearchLayout from '@/layouts/AISearchLayout.vue'

const page = usePage()
const userData = useUserData()

const { data } = useGetAllUserData()

watch(data, (value) => {
  if (value?.data) {
    userData.setUser(value?.data)
  }
})
</script>

<template>
  <div class="flex flex-col w-full px-2">
    <AnimatePresence mode="wait" :initial="false">
      <template v-if="page.getPage === 'home'">
        <HomeLayout />
      </template>

      <template v-else-if="page.getPage === 'add'">
        <AddLayout />
      </template>

      <template v-else-if="page.getPage === 'browse'">
        <BrowseLayout />
      </template>

      <template v-else-if="page.getPage === 'search'">
        <AISearchLayout />
      </template>
    </AnimatePresence>
  </div>
</template>
