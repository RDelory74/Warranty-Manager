<script setup lang="ts">
const supabase = useSupabaseClient()
const email = ref('')
const password = ref('')
const loading = ref(false)
const message = ref('')

const handleSignUp = async () => {
  loading.value = true
  message.value = 'Inscription en cours...'

  const { data: _data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value
  })

  if (error) {
    message.value = `Erreur : ${error.message}`
  } else {
    message.value = 'Succès ! Vérifie tes emails pour confirmer, puis regarde ta table "profiles" dans Supabase.'
  }
  loading.value = false
}

const handleLogin = async () => {
  loading.value = true
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })
  if (error) alert(error.message)
  else navigateTo('/')
  loading.value = false
}
</script>

<template>
  <div class="max-w-md mx-auto mt-20 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
    <h1 class="text-2xl font-bold mb-6 text-center">
      Connexion / Inscription
    </h1>

    <div class="space-y-4">
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="w-full p-2 border rounded dark:bg-gray-700"
      >
      <input
        v-model="password"
        type="password"
        placeholder="Mot de passe"
        class="w-full p-2 border rounded dark:bg-gray-700"
      >

      <div class="flex gap-2">
        <button
          :disabled="loading"
          class="flex-1 bg-primary-500 text-white p-2 rounded hover:bg-primary-600"
          @click="handleLogin"
        >
          Se connecter
        </button>
        <button
          :disabled="loading"
          class="flex-1 bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
          @click="handleSignUp"
        >
          S'inscrire
        </button>
      </div>

      <p
        v-if="message"
        class="text-sm text-center mt-4 text-primary-500 font-medium italic"
      >
        {{ message }}
      </p>
    </div>
  </div>
</template>
