<script setup lang="ts">
// On récupère l'état de l'utilisateur via Supabase
const user = useSupabaseUser()
</script>

<template>
  <div class="py-12 sm:py-24 px-4 md:px-8">
    <div class="text-center">
      <h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
        Gestion des Garanties <span class="text-primary">Simplifiée</span>
      </h1>
      <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Une plateforme moderne pour enregistrer vos demandes de SAV, suivre vos échanges produits et gérer vos pièces détachées en un clic.
      </p>

      <div class="mt-10 flex items-center justify-center gap-x-4">
        <UButton
          v-if="user"
          to="/warranty/new"
          size="xl"
          icon="i-heroicons-plus-circle"
          label="Demande SAV"
        />
        <UButton
          v-else
          to="/login"
          size="xl"
          icon="i-heroicons-arrow-right"
          label="Démarrer"
        />

        <UButton
          to="/about"
          variant="ghost"
          size="xl"
          label="En savoir plus"
          color="info"
        />
      </div>
    </div>

    <div class="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3">
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon
              name="i-heroicons-clock"
              class="w-6 h-6 text-primary"
            />
            <h3 class="font-semibold">
              Suivi en temps réel
            </h3>
          </div>
        </template>
        Consultez l'avancement de vos dossiers de garantie 24h/24.
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon
              name="i-heroicons-wrench-screwdriver"
              class="w-6 h-6 text-primary"
            />
            <h3 class="font-semibold">
              Pièces Détachées
            </h3>
          </div>
        </template>
        Accédez à notre catalogue de pièces de récupération et neuves.
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon
              name="i-heroicons-device-phone-mobile"
              class="w-6 h-6 text-primary"
            />
            <h3 class="font-semibold">
              Interface Mobile
            </h3>
          </div>
        </template>
        Prenez des photos de vos produits défectueux et envoyez-les directement.
      </UCard>
    </div>
  </div>
</template>
