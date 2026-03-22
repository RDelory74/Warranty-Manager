<script setup lang="ts">
defineProps<{ ticket: any }>()

const getStatusGlow = (status: string) => {
  switch (status) {
    case 'Nouveau': return 'shadow-[0_0_15px_rgba(249,115,22,0.3)] border-orange-300 dark:border-orange-500/50'
    case 'En cours': return 'shadow-[0_0_15px_rgba(59,130,246,0.3)] border-blue-300 dark:border-blue-500/50'
    case 'En attente piece': return 'shadow-[0_0_15px_rgba(168,85,247,0.3)] border-purple-300 dark:border-purple-500/50'
    case 'Termine': return 'shadow-[0_0_15px_rgba(34,197,94,0.3)] border-green-300 dark:border-green-500/50'
    default: return 'border-gray-200 dark:border-gray-800 shadow-sm'
  }
}

const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case 'Nouveau': return 'warning'
    case 'En cours': return 'info'
    case 'En attente piece': return 'primary' // Ou la couleur violette de ton thème
    case 'Termine': return 'success'
    default: return 'neutral'
  }
}

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
}
</script>

<template>
  <div
    class="relative flex gap-4 p-4 rounded-xl bg-white dark:bg-gray-900 border transition-all duration-300 cursor-pointer hover:scale-[1.01] hover:z-10"
    :class="getStatusGlow(ticket.status)"
  >
    <div class="w-20 h-20 shrink-0 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden border border-gray-200 dark:border-gray-700">
      <img
        v-if="ticket.photo_urls && ticket.photo_urls.length > 0"
        :src="ticket.photo_urls[0]"
        class="w-full h-full object-cover"
        alt="Aperçu"
      >
      <UIcon
        v-else
        name="i-heroicons-photo"
        class="w-8 h-8 m-auto mt-6 text-gray-300"
      />
    </div>

    <div class="flex-1 min-w-0 flex flex-col justify-between">
      <div class="flex justify-between items-start gap-2">
        <div class="truncate">
          <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider truncate">
            {{ ticket.organizations?.name || 'Demande directe' }} • {{ formatDate(ticket.created_at) }}
          </p>
          <h4 class="text-sm font-bold text-gray-900 dark:text-white truncate mt-0.5">
            {{ ticket.display_ref || ticket.product_name }}
          </h4>
          <p class="text-xs text-gray-500 truncate mt-1">
            Client : {{ ticket.customer_name }}
          </p>
        </div>

        <UBadge
          :color="getStatusBadgeColor(ticket.status)"
          variant="soft"
          size="xs"
          class="shrink-0"
        >
          {{ ticket.status }}
        </UBadge>
      </div>

      <p class="text-xs text-gray-600 dark:text-gray-400 line-clamp-1 mt-2">
        {{ ticket.product_problem }}
      </p>
    </div>
  </div>
</template>
