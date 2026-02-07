<script setup lang="ts">
const client = useSupabaseClient()

// Futur appel API pour les pièces
const { data: parts } = await useAsyncData('parts', async () => {
  const { data } = await client.from('parts').select('*')
  return data
})
</script>

<template>
  <UContainer class="py-8">
    <UPageHeader
      title="Catalogue Pièces"
      description="Gérez les stocks et les références de pièces détachées."
    />

    <UCard class="mt-6">
      <template #header>
        <div class="flex justify-between items-center">
          <h3 class="font-semibold">
            Inventaire
          </h3>
          <UButton
            icon="i-heroicons-plus"
            label="Ajouter une pièce"
            size="sm"
          />
        </div>
      </template>

      <div class="text-center py-12 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
        La liste des pièces s'affichera ici (Données Supabase)
      </div>
    </UCard>
  </UContainer>
</template>
