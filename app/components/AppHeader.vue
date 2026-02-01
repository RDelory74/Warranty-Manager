<script setup lang="ts">
const client = useSupabaseClient()
const user = useSupabaseUser()

// Liens de navigation pour les utilisateurs connectés
const links = [
  {
    label: 'Nouveau SAV',
    icon: 'i-heroicons-plus-circle',
    to: '/warranty/new'
  },
  {
    label: 'Pièces',
    icon: 'i-heroicons-cog-6-tooth',
    to: '/parts'
  },
  {
    label: 'Mon compte',
    icon: 'i-heroicons-user',
    to: '/dashboard'
  }
]

// Fonction de déconnexion
const logout = async () => {
  await client.auth.signOut()
  navigateTo('/login')
}
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink
        to="/"
        class="flex items-center gap-2"
      >
        <UIcon
          name="i-heroicons-shield-check"
          class="w-8 h-8 text-primary"
        />
        <span class="font-bold text-xl hidden sm:block">Warranty Manager</span>
      </NuxtLink>
    </template>

    <template #right>
      <div
        v-if="!user"
        class="flex items-center gap-x-2"
      >
        <UButton
          to="/login"
          label="Connexion"
          icon="i-heroicons-arrow-left-on-rectangle"
          color="info"
          variant="ghost"
        />
        <UButton
          to="/login"
          label="S'enregistrer"
          color="primary"
        />
      </div>

      <div
        v-else
        class="flex items-center gap-x-4"
      >
        <UNavigationMenu
          :items="links"
          class="hidden lg:flex"
        />

        <UButton
          icon="i-heroicons-power"
          color="warning"
          variant="soft"
          label="Déconnexion"
          class="hidden sm:flex"
          @click="logout"
        />

        <div
          v-if="user"
          class="lg:hidden"
        >
          <UButton
            label="Menu"
            icon="i-heroicons-bars-3"
            color="gray"
            variant="ghost"
            @click="navigateTo('/dashboard')"
          />
        </div>
      </div>
    </template>
  </UHeader>
</template>
