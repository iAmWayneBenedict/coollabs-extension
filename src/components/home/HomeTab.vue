<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import Pinned from './Pinned.vue'
import Recent from '@/components/home/Recent.vue'
</script>

<template>
  <div class="w-full h-full mt-0!">
    <Tabs default-value="pinned" class="h-full">
      <TabsList class="w-full">
        <TabsTrigger value="pinned">Pinned</TabsTrigger>
        <TabsTrigger value="recent">Recent</TabsTrigger>
      </TabsList>
      <TabsContent value="pinned">
        <Pinned />
      </TabsContent>
      <TabsContent value="recent">
        <Recent />
      </TabsContent>
    </Tabs>
  </div>
</template>
