<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const supabase = useSupabaseClient()
const router = useRouter()
const loading = ref(false)

// 1. On définit le schéma (Le "Contrat")
const schema = z.object({
  email: z.string().email('Format email incorrect'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'] // L'erreur s'affichera sous ce champ
})

// On extrait le type automatiquement du schéma
type Schema = z.output<typeof schema>

const state = reactive({
  email: '',
  password: '',
  confirmPassword: ''
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  try {
    const { error } = await supabase.auth.signUp({
      email: event.data.email,
      password: event.data.password
    })
    if (error) throw error

    alert('Vérifiez vos emails pour confirmer l\'inscription !')
    router.push('/login')
  } catch (error: any) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UContainer class="max-w-md py-10">
    <UCard>
      <template #header>
        <h2 class="text-xl font-bold">
          Inscription
        </h2>
      </template>

      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField
          label="Email"
          name="email"
        >
          <UInput
            v-model="state.email"
            class="w-full"
            placeholder="exemple@mail.com"
          />
        </UFormField>

        <UFormField
          label="Mot de passe"
          name="password"
        >
          <UInput
            v-model="state.password"
            type="password"
            class="w-full"
          />
        </UFormField>

        <UFormField
          label="Confirmation"
          name="confirmPassword"
        >
          <UInput
            v-model="state.confirmPassword"
            type="password"
            class="w-full"
          />
        </UFormField>

        <div class="pt-4">
          <UButton
            type="submit"
            block
            :loading="loading"
          >
            Créer mon compte
          </UButton>
          <UButton
            icon="i-heroicons-arrow-left"
            variant="ghost"
            color="info"
            to="/"
          >
            Retour au menu
          </UButton>
        </div>
      </UForm>
    </UCard>
  </UContainer>
</template>
