// app/composables/useProfile.ts
export const useProfile = () => {
  const orgStore = useOrgStore()

  // On crée des raccourcis vers le store
  const profile = computed(() => orgStore.profile)
  const currentOrg = computed(() => orgStore.activeOrg)

  // On met à jour la logique des rôles pour qu'elle soit dynamique
  // Elle regarde maintenant le rôle de l'organisation SELECTIONNÉE
  const roleCheck = {
    isAdmin: computed(() => orgStore.activeRole === 'admin'),
    isTechnicien: computed(() => orgStore.activeRole === 'technician'),
    isClient: computed(() => orgStore.activeRole === 'client'),
    // Utile pour l'affichage conditionnel dans le menu
    hasSelectedOrg: computed(() => !!orgStore.currentOrgId)
  }

  return {
    profile,
    currentOrg,
    ...roleCheck,
    fetchProfile: orgStore.fetchMemberships // On réutilise l'action du store
  }
}
