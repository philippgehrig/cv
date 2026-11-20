// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  css: ['~/assets/css/main.css'],
  // Static images are not content-hashed, so cache for a week (not "immutable").
  routeRules: {
    '/images/**': { headers: { 'cache-control': 'public, max-age=604800, stale-while-revalidate=86400' } },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'theme-color', content: '#f0ede7' }
      ]
    }
  },
})