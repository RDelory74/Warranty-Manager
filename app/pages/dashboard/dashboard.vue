<script setup lang="ts">
const orgStore = useOrgStore()
const isTicketModalOpen = ref(false)
const selectedTicket = ref<any>(null)

const showTicket = (ticket: any) => {
  selectedTicket.value = ticket
  isTicketModalOpen.value = true
}

// On récupère les memberships au montage
onMounted(() => orgStore.fetchMemberships())
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-black p-4 lg:p-8">
    <div class="max-w-[1440px] mx-auto grid grid-cols-12 gap-8">
      <DashboardAside class="col-span-12 lg:col-span-2" />

      <DashboardFlux
        class="col-span-12 lg:col-span-7"
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
