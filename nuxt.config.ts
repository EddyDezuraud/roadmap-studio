// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/google-fonts", "@nuxtjs/supabase"],
  googleFonts: {
    families: {
      Inter:  [400, 500, 600, 700],
      Poppins: [400, 500, 600, 700],
      "Inria Serif": [400, 700],
    },
  },
  css: [
    '~/assets/css/reset.css',
    '~/assets/css/variables.css',
  ],
  supabase: {
    redirect: false
  }
})