import { defineStore } from 'pinia'

export const useOrgStore = defineStore('org', {
  state: () => ({
    profile: null as any,
    memberships: [] as any[],
    currentOrgId: null as string | null,
    loading: false
  }),

  getters: {
    // Liste pour la colonne de droite
    allOrgs: state => state.memberships.map(m => ({
      id: m.organization_id,
      name: m.organizations?.name,
      role: m.role
    })),

    // L'organisation active (si focus)
    activeOrg: state =>
      state.memberships.find(m => m.organization_id === state.currentOrgId),

    // Le rôle actuel (crucial pour tes conditions d'affichage)
    activeRole: (state) => {
      if (!state.currentOrgId) return null
      return state.memberships.find(m => m.organization_id === state.currentOrgId)?.role
    },

    // Détermine si l'utilisateur peut gérer l'entité actuelle
    canManage: getters => ['technician', 'commercial'].includes(getters.activeRole)
  },

  actions: {
    async initDashboard() {
      const client = useSupabaseClient()
      const user = useSupabaseUser()
      if (!user.value) return

      this.loading = true

      // On récupère Profil + Memberships en parallèle pour aller vite
      const [profRes, membRes] = await Promise.all([
        client.from('profiles').select('*').eq('id', user.value.id).single(),
        client.from('memberships').select(`
          organization_id,
          role,
          organizations ( id, name, brands )
        `).eq('profile_id', user.value.id)
      ])

      if (!profRes.error) this.profile = profRes.data
      if (!membRes.error) this.memberships = membRes.data

      this.loading = false
    },

    setFocusOrg(id: string | null) {
      this.currentOrgId = id
    }
  }
})
