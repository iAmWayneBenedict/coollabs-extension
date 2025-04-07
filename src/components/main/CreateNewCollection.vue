<script lang="ts" setup>
import { usePostCreateCollectionsMutation } from '@/lib/mutations/collectoin-folders'
import { useQueryClient } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import { motion } from 'motion-v'
import { Button, InputText, Message, useToast } from 'primevue'
import { useForm } from 'vee-validate'
import { z } from 'zod'

const props = defineProps<{
  toggleCollection: (e?: MouseEvent) => void
}>()

const toast = useToast()
const queryClient = useQueryClient()

const validationSchema = toTypedSchema(z.object({ name: z.string().max(20) }))
const { handleSubmit, defineField, errors } = useForm({
  validationSchema,
})
const [name, nameAttrs] = defineField('name')

const mutation = usePostCreateCollectionsMutation({
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['collections'] })
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Collection created successfully',
      life: 3000,
    })
    props.toggleCollection()
  },
  onError: (err: any) => {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: err.response.data.message,
      life: 3000,
    })
  },
})

const handleCreateCollection = handleSubmit(async (values) => {
  mutation.mutate(values)
})
</script>

<template>
  <motion.div
    class="w-full"
    key="create-form"
    :initial="{ opacity: 0, x: 150 }"
    :animate="{ opacity: 1, x: 0 }"
    :exit="{ opacity: 0, x: 150 }"
    :transition="{
      type: 'tween',
      ease: 'easeInOut',
      duration: 0.25,
    }"
  >
    <Button
      text
      rounded
      @click="props.toggleCollection"
      label="Create new collection"
      severity="contrast"
      icon="pi pi-arrow-left"
      class="justify-start w-full font-bold hover:bg-transparent px-0"
    />
    <form @submit="handleCreateCollection" class="flex gap-2">
      <div class="flex flex-col">
        <InputText
          v-model="name"
          :="nameAttrs"
          :invalid="!!errors.name"
          :disabled="mutation.isPending.value"
          id="username"
          variant="filled"
          size="small"
          class="rounded-xl w-full bg-[#f4f4f5]"
          placeholder="Collection name"
        />
        <Message v-if="errors.name" severity="error" size="small" variant="simple">
          {{ errors.name }}
        </Message>
      </div>
      <Button
        rounded
        :loading="mutation.isPending.value"
        size="small"
        type="submit"
        label="Create"
        severity="contrast"
        class="w-fit h-fit min-w-[5rem] font-bold bg-violet px-0 border-0"
      />
    </form>
  </motion.div>
</template>
