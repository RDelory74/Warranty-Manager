<script setup lang="ts">
const isOpen = defineModel<boolean>()

defineProps<{
  ticket: any
}>()

const emit = defineEmits(['update-sav'])

// --- CONFIGURATION DU DROPDOWN MESSAGE ---
const messageOptions = [
  [{
    label: 'Pièces manquantes',
    icon: 'i-heroicons-puzzle-piece',
    click: () => console.log('Action: Pièces manquantes')
  }],
  [{
    label: 'Image supplémentaire',
    icon: 'i-heroicons-photo',
    click: () => console.log('Action: Image supplémentaire')
  }],
  [{
    label: 'Infos supplémentaires',
    icon: 'i-heroicons-information-circle',
    click: () => console.log('Action: Infos supplémentaires')
  }]
]
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :title="ticket ? `Détails du SAV : ${ticket.display_ref || 'Sans Réf'}` : 'Chargement...'"
    :description="ticket ? `${ticket.product_name || 'Produit inconnu'} - ${ticket.product_ref || ''}` : ''"
    :close="{ color: 'primary', variant: 'outline', class: 'rounded-full' }"
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
              {{ ticket.contact_first_name }} {{ ticket.contact_last_name }}
            </p>
          </div>
          <div>
            <p class="text-[10px] font-black text-primary-500 uppercase tracking-widest">
              Organisation
            </p>
            <p class="font-mono text-sm">
              {{ ticket.organizations?.name || 'Aucune' }}
            </p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-[10px] font-black text-gray-400 uppercase">
              Produit
            </p>
            <p class="text-sm font-medium">
              {{ ticket.product_name }}
            </p>
          </div>
          <div>
            <p class="text-[10px] font-black text-gray-400 uppercase">
              Référence
            </p>
            <p class="text-sm font-medium">
              {{ ticket.product_ref || 'N/A' }}
            </p>
          </div>
        </div>

        <div class="space-y-2">
          <p class="text-[10px] font-black text-gray-400 uppercase">
            Description du problème
          </p>
          <div class="text-sm leading-relaxed text-gray-700 dark:text-gray-300 bg-white dark:bg-black p-4 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
            {{ ticket.product_problem || 'Aucune description fournie.' }}
          </div>
        </div>

        <div
          v-if="ticket.photo_urls"
          class="space-y-2"
        >
          <p class="text-[10px] font-black text-gray-400 uppercase">
            Photo jointe
          </p>
          <img
            :src="ticket.photo_urls"
            class="rounded-xl w-full h-64 object-cover border border-gray-200 dark:border-gray-800"
            alt="Photo du produit"
          >
        </div>

        <div class="pt-4 flex justify-end gap-3 border-t border-gray-100 dark:border-gray-800">
          <UDropdownMenu
            :items="messageOptions"
            :popper="{ placement: 'bottom-end' }"
          >
            <UButton
              label="Message"
              icon="i-heroicons-chat-bubble-left-right"
              color="info"
              variant="solid"
              trailing-icon="i-heroicons-chevron-down-20-solid"
            />
          </UDropdownMenu>

          <UButton
            label="Mettre à jour"
            icon="i-heroicons-pencil-square"
            color="primary"
            @click="emit('update-sav', ticket.id)"
          />
        </div>
      </div>
    </template>
  </UModal>
</template>
