export const useProfile = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  // Utilisation de useState pour partager l'état du profil entre tous les composants
  const profile = useState('user-profile', () => null)

  const fetchProfile = async () => {
    if (!user.value) {
      profile.value = null
      return null
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.value.id)
      .single()

    if (!error) {
      profile.value = data
    }
    return data
  }

  // Helpers pour vérifier les droits d'accès facilement dans les pages
  const roleCheck = {
    isClient: computed(() => profile.value?.role === 'client'),
    isCommercial: computed(() => profile.value?.role === 'commercial'),
    isTechnicien: computed(() => profile.value?.role === 'technicien'),
    isAdmin: computed(() => profile.value?.role === 'admin'),
    // Rôle "Staff" (tous ceux qui ne sont pas clients)
    isStaff: computed(() => ['commercial', 'technicien', 'admin'].includes(profile.value?.role))
  }

  return {
    profile,
    fetchProfile,
    ...roleCheck
  }
}
