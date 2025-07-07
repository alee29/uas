import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
    test: {
    environment: 'jsdom',      // ⬅ gunakan DOM virtual untuk testing komponen
    globals: true,             // ⬅ agar tidak perlu import 'describe', 'it', dll
    setupFiles: './tests/setup.js' // opsional jika butuh file setup
  }
})
