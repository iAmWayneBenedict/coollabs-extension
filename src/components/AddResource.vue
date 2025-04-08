<script setup lang="ts">
import { ref } from 'vue'
import { AnimatePresence } from 'motion-v'
import CreateNewCollection from '@/components/add/CreateNewCollection.vue'
import CollectionList from '@/components/add/CollectionList.vue'

const createCollection = ref(false)

const toggleCollection = () => {
  createCollection.value = !createCollection.value
}
</script>

<template>
  <div class="flex flex-col gap-2 overflow-hidden">
    <AnimatePresence mode="wait" :initial="false">
      <template v-if="createCollection">
        <CreateNewCollection :toggleCollection="toggleCollection" />
      </template>
      <template v-else>
        <CollectionList :toggleCollection="toggleCollection" />
      </template>
    </AnimatePresence>
  </div>
</template>
