// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  // Add runtime config for API URL
  runtimeConfig: {},
  // Optimize data fetching
  vite: {
    optimizeDeps: {
      include: []
    }
  },
})