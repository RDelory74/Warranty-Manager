// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // ACTIVER LE MODE NUXT 4

  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxtjs/supabase'],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    resendApiKey: process.env.RESEND_API_KEY // accessible uniquement côté serveur
  },
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
      exclude: ['/', '/signup'],
      cookieRedirect: true
    }
  }
})
