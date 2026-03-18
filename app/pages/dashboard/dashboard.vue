<script setup lang="ts">
const orgStore = useOrgStore()
const isTicketModalOpen = ref(false)
const selectedTicket = ref<any>(null)

const showTicket = (ticket: any) => {
  selectedTicket.value = ticket
  isTicketModalOpen.value = true
}

// Données mockées (à mettre dans un service plus tard)
const mockTickets = [
  { id: 'SAV-1042', brand: 'Samsung', model: 'Galaxy S23', status: 'En cours', clientName: 'Jean Dupont', customer_code: 'CLI-8890', description: 'Écran brisé.', purchaseDate: '2023-05-12', imageUrl: 'https://via.placeholder.com/300x200' },
  { id: 'SAV-1043', brand: 'Apple', model: 'iPhone 14', status: 'En attente', clientName: 'Entreprise XYZ', customer_code: 'PRO-1102', description: 'Batterie HS.', purchaseDate: '2022-11-04' }
]

onMounted(() => orgStore.fetchMemberships())
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-black p-4 lg:p-8">
    <div class="max-w-[1440px] mx-auto grid grid-cols-12 gap-8">
      <DashboardAside class="col-span-12 lg:col-span-2" />

      <DashboardFlux
        class="col-span-12 lg:col-span-7"
        :tickets="mockTickets"
        @select-ticket="showTicket"
      />

      <DashboardOrgs class="col-span-12 lg:col-span-3" />
    </div>

    <TicketModal
      v-model="isTicketModalOpen"
      :ticket="selectedTicket"
    />
  </div>
</template>
