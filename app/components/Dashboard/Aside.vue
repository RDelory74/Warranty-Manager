<script setup lang="ts">
const orgStore = useOrgStore()
const user = useSupabaseUser()
</script>

<template>
  <aside class="space-y-6">
    <div
      v-if="orgStore.profile"
      class="p-3 border rounded-xl bg-white dark:bg-gray-900 shadow-sm flex items-start gap-3"
    >
      <UAvatar
        :alt="orgStore.profile.full_name || '?'"
        size="md"
        class="bg-primary-500 shrink-0 mt-1"
      />
      <div class="overflow-hidden min-w-0 flex-1">
        <p class="text-sm font-bold truncate">
          {{ orgStore.profile.full_name }}
        </p>
        <p class="text-[10px] text-gray-500 truncate mb-1">
          {{ orgStore.profile.company_name }}
        </p>
        <UBadge
          color="info"
          variant="soft"
          size="xs"
        >
          Code: {{ orgStore.profile.customer_code }}
        </UBadge>
        <p class="text-[9px] text-gray-400 font-mono mt-1">
          ID: {{ orgStore.profile.id.split('-')[0] }}
        </p>
      </div>
    </div>

    <div class="space-y-4">
      <p class="text-[10px] font-black text-gray-400 uppercase tracking-tighter">
        Actions Rapides
      </p>
      <div class="grid grid-cols-2 lg:flex lg:flex-col gap-2">
        <UButton
          icon="i-heroicons-plus"
          variant="soft"
          block
          class="justify-start"
        >
          SAV
        </UButton>
        <UButton
          icon="i-heroicons-wrench"
          variant="soft"
          block
          class="justify-start"
        >
          Pièce
        </UButton>
        <UButton
          v-if="!orgStore.currentOrgId || orgStore.activeRole === 'technician'"
          icon="i-heroicons-key"
          variant="soft"
          block
          class="justify-start col-span-2"
        >
          Générer Clé
        </UButton>
      </div>
    </div>
  </aside>
</template>
