<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const supabase = useSupabaseClient()
const router = useRouter()
const loading = ref(false)
const errorMessage = ref('')

// On garde Zod pour la validation, c'est plus propre
const schema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Mot de passe requis')
})

type Schema = z.output<typeof schema>

const state = reactive({
  email: '',
  password: ''
})

const handleLogin = async (event: FormSubmitEvent<Schema>) => {
  loading.value = true
  errorMessage.value = ''

  const { error } = await supabase.auth.signInWithPassword({
    email: event.data.email,
    password: event.data.password
  })

  if (error) {
    errorMessage.value = 'Identifiants incorrects'
  } else {
    // Redirection vers l'accueil ou le dashboard
    router.push('/')
  }
  loading.value = false
}
</script>

<template>
  <UContainer class="flex flex-col justify-center items-center min-h-[80vh] gap-4">
    <div class="w-full max-w-md">
      <UButton
        icon="i-heroicons-arrow-left"
        variant="ghost"
        color="info"
        to="/"
      >
        Retour au menu
      </UButton>
    </div>

    <UCard class="w-full max-w-md shadow-xl">
      <template #header>
        <h1 class="text-2xl font-bold text-center">
          Connexion
        </h1>
      </template>

      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="handleLogin"
      >
        <UFormField
          label="Email"
          name="email"
        >
          <UInput
            v-model="state.email"
            placeholder="votre@email.com"
            icon="i-heroicons-envelope"
            size="lg"
            class="w-full"
          />
        </UFormField>

        <UFormField
          label="Mot de passe"
          name="password"
        >
          <UInput
            v-model="state.password"
            type="password"
            icon="i-heroicons-lock-closed"
            size="lg"
            class="w-full"
          />
        </UFormField>

        <UAlert
          v-if="errorMessage"
          color="error"
          variant="soft"
          icon="i-heroicons-exclamation-triangle"
          :title="errorMessage"
        />

        <UButton
          type="submit"
          block
          :loading="loading"
          color="primary"
        >
          Se connecter
        </UButton>
      </UForm>

      <template #footer>
        <p class="text-sm text-center">
          Nouveau ici ?
          <ULink
            to="/signup"
            class="text-primary font-medium hover:underline"
          >
            Créer un compte
          </ULink>
        </p>
      </template>
    </UCard>
  </UContainer>
</template>
