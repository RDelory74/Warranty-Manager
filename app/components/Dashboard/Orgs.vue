<script setup lang="ts">
const orgStore = useOrgStore()
</script>

<template>
  <section class="space-y-4">
    <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">
      Mes Organisations
    </p>

    <div class="flex flex-col gap-2">
      <UButton
        label="Toutes mes activités"
        variant="ghost"
        color="neutral"
        icon="i-heroicons-squares-2x2"
        :class="[!orgStore.currentOrgId ? 'bg-primary-50 dark:bg-primary-950/30 text-primary-600' : '']"
        @click="orgStore.setFocusOrg(null)"
      />

      <UButton
        v-for="membership in orgStore.allOrgs"
        :key="membership.id"
        variant="ghost"
        color="neutral"
        class="justify-start truncate w-full"
        :class="[orgStore.currentOrgId === membership.id ? 'bg-primary-50 dark:bg-primary-950/30 text-primary-600 font-bold' : '']"
        @click="orgStore.setFocusOrg(membership.id)"
      >
        <div class="flex flex-col items-start overflow-hidden">
          <span class="truncate text-sm">{{ membership.name }}</span>
          <span class="text-[9px] uppercase opacity-60">{{ membership.role }}</span>
        </div>
      </UButton>
    </div>
  </section>
</template>
