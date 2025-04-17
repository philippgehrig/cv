// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  // Add runtime config for API URL
  runtimeConfig: {
    public: {
      directusUrl: process.env.DIRECTUS_URL || 'http://localhost:8055',
    }
  },
  // Optimize data fetching
  vite: {
    optimizeDeps: {
      include: ['@directus/sdk']
    }
  }
})
