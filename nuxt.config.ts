// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // ACTIVER LE MODE NUXT 4

  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxtjs/supabase'],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],
  srcDir: 'app/',

  // routeRules: {
  //  '/': { prerender: true }
  // },

  future: {
    compatibilityVersion: 4
  },
  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  // CONFIG SUPABASE : Pour autoriser l'accès à la page d'accueil
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/']
    }
  }
})
