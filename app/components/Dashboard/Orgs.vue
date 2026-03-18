<script setup lang="ts">
const orgStore = useOrgStore()
</script>

<template>
  <section>
    <p class="text-[10px] font-black text-gray-400 uppercase tracking-tighter mb-4">
      Mes Organisations
    </p>
    <div class="grid grid-cols-1 gap-2">
      <div
        :class="[!orgStore.currentOrgId ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-transparent']"
        class="p-3 border rounded-lg cursor-pointer text-xs font-medium bg-white dark:bg-gray-900 hover:border-gray-300 transition-all"
        @click="orgStore.setFocusOrg(null)"
      >
        Toutes mes activités
      </div>
      <div
        v-for="org in orgStore.allOrgs"
        :key="org.id"
        :class="[orgStore.currentOrgId === org.id ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-transparent']"
        class="p-3 border rounded-lg cursor-pointer bg-white dark:bg-gray-900 hover:border-gray-300 transition-all"
        @click="orgStore.setFocusOrg(org.id)"
      >
        <p class="text-xs font-bold truncate">
          {{ org.name }}
        </p>
        <p class="text-[10px] text-gray-500 uppercase">
          {{ org.role }}
        </p>
      </div>
    </div>
  </section>
</template>
