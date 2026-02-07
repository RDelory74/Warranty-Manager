<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const client = useSupabaseClient()
const user = useSupabaseUser()
const route = useRoute()

// Actions
const logout = async () => {
  await client.auth.signOut()
  navigateTo('/login')
}

// Toute la logique de navigation centralisée
const links = computed<NavigationMenuItem[]>(() => {
  if (user.value) {
    // Menu pour les utilisateurs connectés
    return [
      {
        label: 'Nouveau SAV',
        icon: 'i-heroicons-plus-circle',
        to: '/warranty/new',
        active: route.path === '/warranty/new'
      },
      {
        label: 'Pièces',
        icon: 'i-heroicons-cog-6-tooth',
        to: '/parts/parts',
        active: route.path.startsWith('/parts/parts')
      },
      {
        label: 'Mon compte',
        icon: 'i-heroicons-user',
        to: '/dashboard/dashboard',
        active: route.path === '/dashboard/dashboard'
      },
      {
        label: 'Déconnexion',
        icon: 'i-heroicons-power',
        onSelect: logout,
        class: 'text-warning-500 hover:text-warning-600 font-bold'
      }
    ]
  } else {
    // Menu pour les visiteurs (Non connectés)
    return [
      {
        label: 'Connexion',
        icon: 'i-heroicons-arrow-left-on-rectangle',
        to: '/login',
        active: route.path === '/login'
      },
      {
        label: 'S\'enregistrer',
        icon: 'i-heroicons-user-plus',
        to: '/login', // Ou ton lien spécifique register
        class: 'text-primary-500 font-bold'
      }
    ]
  }
})
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
      <UNavigationMenu
        :items="links"
        variant="pill"
        class="hidden lg:flex"
      />
    </template>

    <template #body>
      <UNavigationMenu
        :items="links"
        orientation="vertical"
        class="-mx-2.5"
      />
    </template>
  </UHeader>
</template>
