<script setup lang="ts">
import { Button, Listbox } from 'primevue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import Pinned from './Pinned.vue'
import Recent from '@/components/home/Recent.vue'
</script>

<template>
  <div class="w-full h-full mt-5!">
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
    <Button
      rounded
      severity="contrast"
      variant="outlined"
      size="small"
      icon="pi pi-objects-column"
      label="Browse"
      class="px-4 border-1 py-1 hover:bg-black transition-colors duration-300 hover:text-white"
    />
  </div>
</template>
