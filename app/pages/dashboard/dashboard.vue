<script setup lang="ts">
const client = useSupabaseClient()

// État pour stocker les tickets
const { data: tickets, refresh: _refresh } = await useAsyncData('tickets', async () => {
  const { data } = await client
    .from('tickets')
    .select('*')
    .order('created_at', { ascending: false })
  return data
})
</script>

<template>
  <UContainer class="py-8">
    <UPageHeader
      title="Mon compte"
      description="Suivez l'état de vos demandes de SAV en temps réel."
      class="mb-8"
    />

    <div
      v-if="tickets?.length"
      class="grid gap-4"
    >
      <UCard
        v-for="ticket in tickets"
        :key="ticket.id"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="font-bold text-lg">
              {{ ticket.product_name }}
            </p>
            <p class="text-sm text-gray-500">
              Réf: {{ ticket.product_ref }} - Client: {{ ticket.customer_name }}
            </p>
          </div>
          <UBadge
            :label="ticket.status || 'Nouveau'"
            color="primary"
            variant="subtle"
          />
        </div>
      </UCard>
    </div>

    <UCard
      v-else
      class="text-center py-10"
    >
      <p class="text-gray-500">
        Aucune demande trouvée.
      </p>
      <UButton
        to="/warranty/new"
        label="Créer ma première demande"
        class="mt-4"
      />
    </UCard>
  </UContainer>
</template>
