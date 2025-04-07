<script setup lang="ts">
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { IftaLabel, InputText, Button, Message, Divider } from 'primevue'
import { toTypedSchema } from '@vee-validate/zod'
import { useAuth } from '@/store/useAuth'
import { authClient } from '@/lib/auth'
import { ref } from 'vue'
import config from '@/lib/config'

// states
const loading = ref(false)
const error = ref('')

// form handler
const validationSchema = toTypedSchema(
  z.object({
    email: z
      .string()
      .email()
      .min(5)
      .max(255)
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email is invalid'),
    password: z.string().min(8).max(255, 'Password must contain at least 8 characters'),
  }),
)
const { handleSubmit, defineField, errors } = useForm({
  validationSchema,
})
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const auth = useAuth()

// event handlers
const onSubmit = handleSubmit(async (values) => {
  loading.value = true
  const response = await authClient.signIn.email({
    email: values.email,
    password: values.password,
  })
  loading.value = false

  if (response.error?.code === 'INVALID_EMAIL_OR_PASSWORD') {
    error.value = 'Invalid email or password'
    return
  }

  auth.setUser(response.data?.user || null)
})

const onClickSocial = async (provider: 'google' | 'github') => {
  loading.value = true
  await authClient.signIn.social({
    provider,
    callbackURL: config.CALLBACK_URL,
  })
  loading.value = false
}

const onClickSignUp = () => {
  chrome.tabs.create({ url: config.WEB_APP_URL + '/auth/signup' })
}

const getSession = () => {
  console.log(auth.user)
}
</script>

<template>
  <div class="flex flex-col gap-2 w-82">
    <div class="w-full flex justify-center py-2">
      <div class="flex gap-2 w-fit">
        <img class="w-10" src="/favicon.svg" alt="" />
        <span
          class="font-playfair-display text-lg font-black uppercase"
          style="font-weight: 900"
          @click="getSession"
        >
          Coollabs
        </span>
      </div>
    </div>
    <template v-if="error">
      <Message
        severity="error"
        icon="pi pi-times-circle"
        class="mb-2"
        size="small"
        variant="simple"
        >{{ error }}</Message
      >
    </template>
    <form @submit="onSubmit" class="w-full flex flex-col! gap-3">
      <IftaLabel>
        <InputText
          id="email"
          :="emailAttrs"
          :invalid="!!errors.email"
          v-model="email"
          variant="filled"
          size="small"
          class="rounded-xl w-full"
          placeholder="Enter your email"
        />
        <label for="username">Username</label>
        <Message v-if="errors.email" severity="error" size="small" variant="simple">
          {{ errors.email }}
        </Message>
      </IftaLabel>
      <IftaLabel>
        <InputText
          id="password"
          :="passwordAttrs"
          :invalid="!!errors.password"
          v-model="password"
          variant="filled"
          size="small"
          class="rounded-xl w-full"
          placeholder="Enter your password"
        />
        <label for="password">Password</label>
        <Message v-if="errors.password" severity="error" size="small" variant="simple">
          {{ errors.password }}
        </Message>
      </IftaLabel>
      <Button
        :disabled="loading"
        type="submit"
        class="w-full bg-violet text-white border-0"
        label="Login"
        rounded
      />
    </form>

    <div class="flex items-center justify-center w-full text-sm">
      <span>Don't have an account?</span>
      <Button
        variant="link"
        type="button"
        label="Sign up"
        class="p-1 underline text-sm"
        @click="onClickSignUp"
      />
    </div>

    <Divider align="center">
      <b>or</b>
    </Divider>
    <div class="flex flex-col gap-2">
      <Button
        :loading="loading"
        class="w-full flex justify-center items-center gap-2 hover:bg-black transition-all ease-in-out duration-300 group"
        rounded
        label="Login with Google"
        variant="outlined"
        type="button"
        @click="onClickSocial('google')"
      >
        <img class="w-[20px] ease-in-out duration-300" src="/google-icon.svg" alt="" />
        <span class="group-hover:text-white ease-in-out duration-300">Login with Google</span>
      </Button>
      <Button
        :loading="loading"
        class="w-full flex justify-center items-center gap-2 hover:bg-black transition-all ease-in-out duration-300 group"
        rounded
        label="Login with GitHub"
        variant="outlined"
        type="button"
        @click="onClickSocial('github')"
        icon="github-icon.svg"
      >
        <img
          class="w-[20px] group-hover:[filter:invert(1)] ease-in-out duration-300"
          src="/github-icon.svg"
          alt=""
        />
        <span class="group-hover:text-white ease-in-out duration-300">Login with GitHub</span>
      </Button>
    </div>
  </div>
</template>
