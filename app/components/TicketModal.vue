<script setup lang="ts">
// On relie le v-model du parent à cette variable
const isOpen = defineModel<boolean>()

defineProps<{
  ticket: any
}>()

defineEmits(['update-sav'])
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :title="ticket ? `Détails du SAV : ${ticket.id}` : 'Chargement...'"
    :description="ticket ? `${ticket.brand} - ${ticket.model}` : ''"
    :close="{
      color: 'primary',
      variant: 'outline',
      class: 'rounded-full'
    }"
  >
    <template #body>
      <div
        v-if="ticket"
        class="space-y-6"
      >
        <div class="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
          <div>
            <p class="text-[10px] font-black text-primary-500 uppercase tracking-widest">
              Client
            </p>
            <p class="font-bold text-sm">
              {{ ticket.clientName }}
            </p>
          </div>
          <div>
            <p class="text-[10px] font-black text-primary-500 uppercase tracking-widest">
              Code Client
            </p>
            <p class="font-mono text-sm">
              {{ ticket.customer_code }}
            </p>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-4">
          <div>
            <p class="text-[10px] font-black text-gray-400 uppercase">
              Marque
            </p>
            <p class="text-sm font-medium">
              {{ ticket.brand }}
            </p>
          </div>
          <div>
            <p class="text-[10px] font-black text-gray-400 uppercase">
              Modèle
            </p>
            <p class="text-sm font-medium">
              {{ ticket.model }}
            </p>
          </div>
          <div>
            <p class="text-[10px] font-black text-gray-400 uppercase">
              Achat le
            </p>
            <p class="text-sm font-medium">
              {{ ticket.purchaseDate }}
            </p>
          </div>
        </div>

        <div class="space-y-2">
          <p class="text-[10px] font-black text-gray-400 uppercase">
            Description du problème
          </p>
          <div class="text-sm leading-relaxed text-gray-700 dark:text-gray-300 bg-white dark:bg-black p-4 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
            {{ ticket.description }}
          </div>
        </div>

        <div
          v-if="ticket.imageUrl"
          class="space-y-2"
        >
          <p class="text-[10px] font-black text-gray-400 uppercase">
            Photo jointe
          </p>
          <img
            :src="ticket.imageUrl"
            class="rounded-xl w-full h-64 object-cover border border-gray-200 dark:border-gray-800"
            alt="Photo du produit"
          >
        </div>

        <div class="pt-4 flex justify-end gap-3 border-t border-gray-100 dark:border-gray-800">
          <UButton
            label="Mettre à jour"
            icon="i-heroicons-pencil-square"
            color="primary"
            @click="$emit('update-sav', ticket.id)"
          />
        </div>
      </div>
    </template>
  </UModal>
</template>
