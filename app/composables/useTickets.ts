import type { Database } from '~/types/database.types'

type TicketStatus = Database['public']['Enums']['ticket_status']
type TicketRow = Database['public']['Tables']['tickets']['Row'] & {
  organizations: { name: string } | null
}

export const useTickets = () => {
  const supabase = useSupabaseClient<Database>()
  const user = useSupabaseUser()
  const orgStore = useOrgStore()

  const tickets = ref<TicketRow[]>([])
  const isLoading = ref(false)
  const filterStatus = ref<any>(null)
  const filterBrand = ref('')

  const fetchTickets = async () => {
    // RÉCUPÉRATION ID : On prend celui du store (plus fiable au chargement) ou de l'auth
    const userId = user.value?.id || orgStore.profile?.id

    if (!userId) {
      console.warn('[useTickets] Annulation : Aucun ID utilisateur trouvé (Store ou Auth)')
      return
    }

    isLoading.value = true
    console.log('[useTickets] Envoi de la requête à Supabase pour User:', userId)
    console.log('[useTickets] Valeur brute du filtre avant envoi:', filterStatus.value)

    try {
      let query = supabase
        .from('tickets')
        .select(`
          *,
          organizations ( name )
        `)
        .order('created_at', { ascending: false })

      // LOGIQUE DE SCOPE (Orga vs Global)
      if (orgStore.currentOrgId) {
        query = query.eq('organization_id', orgStore.currentOrgId)
      } else {
        const orgIds = orgStore.allOrgs.map(org => org.id).filter(Boolean) as string[]

        if (orgIds.length > 0) {
          // On utilise le userId récupéré plus haut
          query = query.or(`organization_id.in.(${orgIds.join(',')}),user_id.eq.${userId}`)
        } else {
          query = query.eq('user_id', userId)
        }
      }

      // --- LE FIX POUR LE FILTRE ---
      if (filterStatus.value) {
        let statusToApply: string | null = null

        // On vérifie si c'est un objet { label, value } ou juste une string
        if (typeof filterStatus.value === 'object' && filterStatus.value !== null) {
          statusToApply = filterStatus.value.value
        } else {
          statusToApply = filterStatus.value
        }

        // Si on a bien récupéré une string (et pas null/undefined)
        if (statusToApply) {
          console.log('[useTickets] Application du filtre:', statusToApply)
          query = query.eq('status', statusToApply)
        }
      }

      const { data, error } = await query

      if (error) {
        console.error('[useTickets] Erreur API Supabase:', error.message)
        throw error
      }

      console.log('[DEBUG] Réponse reçue de la base :', data?.length || 0, 'tickets')
      tickets.value = (data as TicketRow[]) || []
    } catch (e) {
      console.error('[useTickets] Erreur attrapée:', e)
    } finally {
      isLoading.value = false
    }
  }

  // On garde le watch pour réagir aux changements d'orga dans le store
  watch(() => orgStore.currentOrgId, fetchTickets)

  return {
    tickets,
    isLoading,
    filterStatus,
    filterBrand,
    fetchTickets
  }
}
