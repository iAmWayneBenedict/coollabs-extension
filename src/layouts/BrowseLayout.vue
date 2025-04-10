<script lang="ts" setup>
import Header from '@/components/Header.vue'
import { Tabs, TabsTrigger, TabsList, TabsContent } from '@/components/ui/tabs'
import SlideTransition from '@/components/animation/SlideTransition.vue'
import BrowseCollections from '@/components/browse/BrowseCollections.vue'
import BrowseResources from '@/components/browse/BrowseResources.vue'
import { useUserData } from '@/store/useUserData'
import { computed } from 'vue'

const userData = useUserData()

const resources = computed(() => {
  const allResources = userData?.currentUser?.collectionFolders.flatMap(
    (collection: Record<string, any>) => collection.resources,
  )

  const uniqueResources = []
  const seenIds = new Set()

  for (const resource of allResources) {
    if (!seenIds.has(resource.id)) {
      uniqueResources.push(resource)
      seenIds.add(resource.id)
    }
  }
  return uniqueResources
})
const collectionFolders = computed(() => userData.currentUser?.collectionFolders || [])
</script>

<template>
  <SlideTransition to="right" animKey="browse" class="flex flex-col w-full gap-2">
    <Header title="Browse" />
    <Tabs default-value="resources" class="h-full overflow-hidden">
      <TabsList class="w-full">
        <TabsTrigger value="resources">Resources</TabsTrigger>
        <TabsTrigger value="collections">Collections</TabsTrigger>
      </TabsList>
      <TabsContent value="resources">
        <SlideTransition to="left" :duration="0.3" animKey="resources-list">
          <BrowseResources :resources="resources" />
        </SlideTransition>
      </TabsContent>
      <TabsContent value="collections">
        <SlideTransition to="right" :duration="0.3" animKey="collections-list">
          <BrowseCollections :collections="collectionFolders" />
        </SlideTransition>
      </TabsContent>
    </Tabs>
  </SlideTransition>
</template>
