<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue'
import { authClient } from '@/lib/auth'
import { useAuth } from '@/store/useAuth'
import { ref, watch } from 'vue'
import Toast from 'primevue/toast'
import { useAppModeStore } from '@/store/useAppModeStore'
import MainLayout from '@/layouts/MainLayout.vue'
import 'primeicons/primeicons.css'

const auth = useAuth()

// const extensionId = chrome.runtime.id

const ogTitle = ref('')
const message = ref('')

const handleClick = async () => {
  const [tab] = await chrome.tabs.query({ active: true })
  chrome.scripting.executeScript({
    target: { tabId: tab.id! },
    func: async () => {
      const ogTitle = document.querySelector('head [property="og:title"]')?.getAttribute('content')
      chrome.runtime.sendMessage({ action: 'sendOGTitle', ogTitle })
    },
  })
  // const response = await fetch('https://resource-collab.vercel.app/api/v1/rest/categories', {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // })
  // const data = await response.json()
  // console.log(data)
}
// Listen for messages in the Vue popup
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === 'sendOGTitle') {
//     ogTitle.value = message.ogTitle
//   }
// })

// watch(ogTitle, async (value) => {
//   const response = await fetch('http://localhost:8080/api/v1/rest/categories')
//   const data = await response.json()
//   message.value = data.data.message
// })

const session = authClient.useSession()
const appMode = useAppModeStore()

watch(session, (value) => {
  if (value) {
    message.value = 'You are logged in'
  } else {
    message.value = 'You are not logged in'
  }

  auth.setUser(value.data?.user)
})

const getCategories = async () => {
  // const response = await authClient.signIn.social({
  //   provider: 'google',
  //   callbackURL: `http://localhost:8080/external/${extensionId}/callback`,
  // })
  // chrome.tabs.create({ url: response.data?.url })
}
</script>

<template>
  <Toast />
  <div class="w-[25rem] min-h-[30rem] max-h-auto overflow-x-hidden p-3 flex justify-center">
    <template v-if="!!auth.currentUser">
      <MainLayout />
    </template>
    <template v-else>
      <LoginForm />
    </template>
  </div>
</template>
