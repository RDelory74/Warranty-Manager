<script setup lang="ts">
const props = defineProps<{ tickets: any[] }>()
// Il faut que ce emit soit déclaré pour que le dashboard l'entende
defineEmits(['select-ticket'])
const orgStore = useOrgStore()
</script>

<template>
  <main class="space-y-6">
    <div class="space-y-4">
      <UCard
        v-for="ticket in tickets"
        :key="ticket.id"
        class="hover:border-primary-500 transition-colors cursor-pointer shadow-sm"
        @click="$emit('select-ticket', ticket)"
      >
        <div class="flex justify-between items-start gap-2 text-sm">
          <div>
            <p class="text-[10px] text-primary-500 font-bold uppercase">
              {{ ticket.brand }} - {{ ticket.model }}
            </p>
            <p class="font-medium mt-1">
              {{ ticket.id }} : {{ ticket.clientName }}
            </p>
          </div>
          <UBadge
            size="xs"
            color="info"
            variant="soft"
          >
            {{ ticket.status }}
          </UBadge>
        </div>
      </UCard>
    </div>
  </main>
</template>
