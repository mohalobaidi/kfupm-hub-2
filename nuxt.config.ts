// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    groqApiKey: process.env.GROQ_API_KEY,
    groqApiURL: process.env.GROQ_API_URL
  },
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  nitro: {
    storage: {
      data: { driver: 'vercelKV' },
    }
  }
})