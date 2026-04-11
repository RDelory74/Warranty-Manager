<script setup lang="ts">
const orgStore = useOrgStore()
const { tickets, isLoading, filterStatus, fetchTickets } = useTickets()

// --- GESTION DE LA MODALE ---
const isTicketModalOpen = ref(false)
const selectedTicket = ref<any>(null)

const openTicket = (ticket: any) => {
  selectedTicket.value = ticket
  isTicketModalOpen.value = true
}

// --- GESTION DU FILTRE ---
const statusOptions = [
  { label: 'Tous les statuts', value: null },
  { label: 'Nouveau', value: 'Nouveau' },
  { label: 'En cours', value: 'En cours' },
  { label: 'En attente pièce', value: 'En attente piece' },
  { label: 'Terminé', value: 'Termine' },
  { label: 'Annulé', value: 'Annule' }
]

// --- SYNCHRONISATION DES DONNÉES (Ne pas toucher, ça marche !) ---
watch(() => orgStore.loading, (isStoreLoading) => {
  if (!isStoreLoading && orgStore.profile) {
    console.log('[Flux] Store prêt (loading: false), lancement fetchTickets')
    fetchTickets()
  }
}, { immediate: true })

watch(() => orgStore.currentOrgId, () => {
  console.log('[Flux] Changement d\'organisation détecté:', orgStore.currentOrgId)
  fetchTickets()
})

watch(filterStatus, () => fetchTickets())

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
        {{ orgStore.currentOrgId ? orgStore.activeOrg?.organizations?.name : 'Toutes mes demandes' }}
      </h2>

      <div class="flex items-center gap-2">
        <USelectMenu
          v-model="filterStatus"
          :items="statusOptions"
          :search-input="false"
          value-attribute="value"
          option-attribute="label"
          placeholder="Filtrer par statut"
          icon="i-heroicons-funnel"
          class="w-full sm:w-48"
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
      class="text-center py-12 border-2 border-dashed rounded-xl dark:border-gray-800"
    >
      <p
        v-if="filterStatus"
        class="text-sm text-gray-500 font-medium"
      >
        Il n'y a pas de ticket avec le statut "{{ statusOptions.find(o => o.value === filterStatus)?.label }}".
      </p>
      <p
        v-else
        class="text-sm text-gray-500"
      >
        Aucun ticket trouvé.
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
        @click="openTicket(ticket)"
      />
    </div>

    <TicketModal
      v-model="isTicketModalOpen"
      :ticket="selectedTicket"
      @update-sav="fetchTickets"
    />
  </main>
</template>
