import { defineStore } from 'pinia'
import type { Database } from '~/types/database.types'

export const useOrgStore = defineStore('org', {
  state: () => ({
    profile: null as Database['public']['Tables']['profiles']['Row'] | null,
    memberships: [] as any[],
    currentOrgId: null as string | null,
    loading: false
  }),

  getters: {
    allOrgs: state => state.memberships.map(m => ({
      id: m.organization_id,
      name: m.organizations?.name,
      role: m.role
    })),
    activeOrg: state =>
      state.memberships.find(m => m.organization_id === state.currentOrgId),
    activeRole(): string | null {
      const m = this.memberships.find(m => m.organization_id === this.currentOrgId)
      return m ? m.role : null
    }
  },

  actions: {
    async fetchMemberships() {
      console.log('[STORE] fetchMemberships démarré...')
      const client = useSupabaseClient<Database>()

      // FIX : On force la récupération de l'user via l'auth directe
      const { data: { user }, error: authError } = await client.auth.getUser()

      if (authError || !user) {
        console.error('[STORE] Erreur Auth:', authError?.message || 'Pas d\'utilisateur')
        return
      }

      const userId = user.id
      console.log('[STORE] ID Utilisateur validé:', userId)

      this.loading = true
      try {
        const [profRes, membRes] = await Promise.all([
          client.from('profiles').select('*').eq('id', userId).single(),
          client.from('memberships').select(`
              organization_id,
              role,
              organizations ( id, name, brands )
            `).eq('profile_id', userId)
        ])

        if (profRes.error) console.error('[STORE] Erreur Profil:', profRes.error.message)
        if (membRes.error) console.error('[STORE] Erreur Memberships:', membRes.error.message)

        if (profRes.data) this.profile = profRes.data

        if (membRes.data) {
          this.memberships = membRes.data
          console.log('[STORE] Orgas trouvées:', membRes.data.length)
        }
      } catch (error) {
        console.error('[STORE] Erreur système:', error)
      } finally {
        this.loading = false
        console.log('[STORE] fetchMemberships terminé.')
      }
    },

    setFocusOrg(id: string | null) {
      console.log('[STORE] Focus changé vers:', id)
      this.currentOrgId = id
    }
  }
})
