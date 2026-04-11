<script setup lang="ts">
const orgStore = useOrgStore()

// On récupère les memberships au montage
onMounted(() => orgStore.fetchMemberships())
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-black p-4 lg:p-8 overflow-x-hidden">
    <div class="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
      <DashboardAside class="col-span-1 lg:col-span-2" />

      <DashboardFlux class="col-span-1 lg:col-span-7 w-full min-w-0" />

      <DashboardOrgs class="col-span-1 lg:col-span-3" />
    </div>
  </div>
</template>
