<script setup lang="ts">
import { ref } from 'vue'
import { AnimatePresence, motion } from 'motion-v'
import CreateNewCollection from '@/components/add/CreateNewCollection.vue'
import CollectionList from '@/components/add/CollectionList.vue'
import Header from '@/components/Header.vue'
import SlideTransition from '@/components/animation/SlideTransition.vue'

const createCollection = ref(false)

const toggleCollection = () => {
  createCollection.value = !createCollection.value
}
</script>

<template>
  <SlideTransition to="right" animKey="add" class="w-full flex flex-col gap-2 overflow-hidden">
    <Header title="Add to collection" />
    <AnimatePresence mode="wait" :initial="false">
      <template v-if="createCollection">
        <CreateNewCollection :toggleCollection="toggleCollection" />
      </template>
      <template v-else>
        <CollectionList :toggleCollection="toggleCollection" />
      </template>
    </AnimatePresence>
  </SlideTransition>
</template>
