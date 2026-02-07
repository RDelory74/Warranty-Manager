<script setup lang="ts">
const supabase = useSupabaseClient()

const router = useRouter()

const loading = ref(false)
const files = ref<File[]>([])
const previews = ref<string[]>([])

const form = ref({
  customer_name: '',
  customer_phone: '',
  product_ref: '',
  product_name: '',
  product_problem: '',
  quantity: 1,
  purchase_date: '',
  requested_solution: 'Reparation',
  comments: ''
})

const solutionOptions = ['Echange', 'Avoir', 'Reparation', 'Refus', 'Envoi pieces detachees']

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (!target.files) return
  const selectedFiles = Array.from(target.files).slice(0, 3)
  files.value = selectedFiles
  previews.value = selectedFiles.map(file => URL.createObjectURL(file))
}

const submitTicket = async () => {
  // On récupère l'utilisateur en direct pour être sûr qu'il n'est pas nul
  const { data: { user: currentUser } } = await supabase.auth.getUser()

  if (!currentUser) {
    alert('Vous devez être connecté pour envoyer un ticket.')
    return
  }

  loading.value = true

  try {
    const photoUrls: string[] = []

    // 1. Upload des photos
    for (const file of files.value) {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${currentUser.id}/${fileName}`

      // CORRECTION ICI : l'objet upsert doit être DANS les parenthèses
      const { error: uploadError } = await supabase.storage
        .from('tickets-photos')
        .upload(filePath, file, {
          upsert: true
        })

      if (uploadError) throw uploadError

      const { data: urlData } = supabase.storage
        .from('tickets-photos')
        .getPublicUrl(filePath)

      photoUrls.push(urlData.publicUrl)
    }

    // 2. Insertion BDD
    const { error: dbError } = await supabase
      .from('tickets')
      .insert({
        customer_name: form.value.customer_name,
        customer_phone: form.value.customer_phone,
        product_ref: form.value.product_ref,
        product_name: form.value.product_name,
        product_problem: form.value.product_problem,
        quantity: form.value.quantity,
        // Sécurité : si la date est vide, on envoie null pour éviter une erreur SQL
        purchase_date: form.value.purchase_date === '' ? null : form.value.purchase_date,
        requested_solution: form.value.requested_solution as 'Reparation' | 'Echange' | 'Avoir' | 'Refus' | 'Envoi pieces detachees',
        comments: form.value.comments,
        photo_urls: photoUrls,
        user_id: currentUser.id
      })

    if (dbError) throw dbError
    try {
      await $fetch('/api/send-email', {
        method: 'POST',
        body: {
          customerName: form.value.customer_name,
          productRef: form.value.product_ref,
          productName: form.value.product_name,
          problem: form.value.product_problem,
          photoUrls: photoUrls
        }
      })
    } catch (_e) {
      console.error('L\'email n\'a pas pu être envoyé, mais le ticket est créé.')
    }
    alert('Demande enregistrée avec succès !')
    router.push('/dashboard/dashboard')
  } catch (error: unknown) {
    console.error(error)
    alert(`Erreur: ${(error as any).message}`)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UContainer class="py-10">
    <UCard>
      <template #header>
        <h1 class="text-xl font-bold text-gray-900 dark:text-white">
          Nouvelle demande de SAV
        </h1>
      </template>

      <form
        class="space-y-6"
        @submit.prevent="submitTicket"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-200">Nom du client</label>
            <UInput
              v-model="form.customer_name"
              required
              placeholder="Jean Dupont"
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-200">Téléphone</label>
            <UInput
              v-model="form.customer_phone"
              placeholder="06..."
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-200">Référence Article</label>
            <UInput
              v-model="form.product_ref"
              required
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-200">Désignation</label>
            <UInput
              v-model="form.product_name"
              required
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-200">Quantité</label>
            <UInput
              v-model="form.quantity"
              type="number"
            />
          </div>
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-gray-700 dark:text-gray-200">Description du problème</label>
          <UTextarea
            v-model="form.product_problem"
            required
            placeholder="Décrivez le défaut constaté..."
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-200">Date d'achat</label>
            <UInput
              v-model="form.purchase_date"
              type="date"
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-200">Solution souhaitée</label>
            <USelect
              v-model="form.requested_solution"
              :options="solutionOptions"
            />
          </div>
        </div>

        <div class="flex flex-col gap-1.5 border-t border-gray-100 dark:border-gray-800 pt-4">
          <label class="text-sm font-medium text-gray-700 dark:text-gray-200 text-primary-500">Photos du défaut (Max 3)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            class="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 cursor-pointer"
            @change="handleFileChange"
          >

          <div
            v-if="previews.length"
            class="flex gap-4 mt-2"
          >
            <div
              v-for="(src, index) in previews"
              :key="index"
              class="relative"
            >
              <img
                :src="src"
                class="w-20 h-20 object-cover rounded-lg border-2 border-primary-500"
              >
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-3 pt-4">
          <UButton
            color="info"
            variant="soft"
            @click="router.back()"
          >
            Annuler
          </UButton>
          <UButton
            type="submit"
            :loading="loading"
            color="primary"
            icon="i-heroicons-paper-airplane"
          >
            Envoyer le dossier
          </UButton>
        </div>
      </form>
    </UCard>
  </UContainer>
</template>
