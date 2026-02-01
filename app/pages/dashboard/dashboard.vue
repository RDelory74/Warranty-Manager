<template>
  <UContainer class="py-10">
    <div class="mb-8">
      <h1 class="text-3xl font-bold">
        Tableau de bord
      </h1>
      <p class="text-gray-500">
        Bienvenue, {{ profile?.full_name || user?.email }}
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <UCard v-if="isClient">
        <template #header>
          Mes Garanties
        </template>
        <p class="mb-4">
          Vous avez 0 dossier en cours.
        </p>
        <UButton
          to="/warranty/new"
          icon="i-heroicons-plus"
        >
          Créer un SAV
        </UButton>
      </UCard>

      <UCard v-if="isStaff">
        <template #header>
          Gestion SAV (Staff)
        </template>
        <p>Dossiers à traiter : 12</p>
        <UButton
          color="orange"
          variant="soft"
          class="mt-4"
        >
          Voir la file d'attente
        </UButton>
      </UCard>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const user = useSupabaseUser()
const { profile, isClient, isStaff, fetchProfile } = useProfile()

onMounted(() => {
  fetchProfile()
})
</script>
