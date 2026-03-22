<script setup lang="ts">
const orgStore = useOrgStore()
const user = useSupabaseUser()
const { tickets, isLoading, filterStatus, fetchTickets } = useTickets()

const emit = defineEmits(['select-ticket'])

const statusOptions = [
  { label: 'Tous les statuts', value: null },
  { label: 'Nouveau', value: 'Nouveau' },
  { label: 'En cours', value: 'En cours' },
  { label: 'En attente pièce', value: 'En attente piece' },
  { label: 'Terminé', value: 'Termine' }
]
// 1. On surveille le chargement global du store
// Dès que loading passe de true à false, on tire !
watch(() => orgStore.loading, (isStoreLoading) => {
  if (!isStoreLoading && orgStore.profile) {
    console.log('[Flux] Store prêt (loading: false), lancement fetchTickets')
    fetchTickets()
  }
}, { immediate: true })

// 2. Sécurité : Si l'utilisateur change manuellement d'organisation
watch(() => orgStore.currentOrgId, () => {
  console.log('[Flux] Changement d\'organisation détecté:', orgStore.currentOrgId)
  fetchTickets()
})

// 3. Sécurité : Si le filtre de statut change
watch(filterStatus, () => fetchTickets())

// 4. Au cas où le store était DEJÀ prêt avant le watch
onMounted(() => {
  if (!orgStore.loading && orgStore.profile) {
    fetchTickets()
  }
})
</script>

<template>
  <main class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 dark:border-gray-800">
      <h2 class="text-lg lg:text-xl font-bold tracking-tight">
        {{ orgStore.currentOrgId ? orgStore.activeOrg?.organizations.name : 'Toutes mes demandes' }}
      </h2>

      <div class="flex items-center gap-2">
        <USelectMenu
          v-model="filterStatus"
          :options="statusOptions"
          option-attribute="label"
          value-attribute="value"
          placeholder="Filtrer par statut"
          icon="i-heroicons-funnel"
          size="sm"
          class="w-48"
        />
      </div>
    </div>

    <div
      v-if="isLoading"
      class="space-y-4"
    >
      <USkeleton
        v-for="i in 3"
        :key="i"
        class="h-28 w-full rounded-xl"
      />
    </div>

    <div
      v-else-if="tickets.length === 0"
      class="text-center py-12 border-2 border-dashed rounded-xl border-gray-200 dark:border-gray-800"
    >
      <p class="text-sm text-gray-500">
        Aucun ticket trouvé pour cette sélection.
      </p>
    </div>

    <div
      v-else
      class="space-y-4"
    >
      <DashboardTicketCard
        v-for="ticket in tickets"
        :key="ticket.id"
        :ticket="ticket"
        @click="emit('select-ticket', ticket)"
      />
    </div>
  </main>
</template>
