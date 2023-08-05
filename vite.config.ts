import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
export default defineConfig({
  base:"/gif-service-gp/",
  plugins: [
    vue(),
    VitePWA({
        registerType: 'autoUpdate',
        devOptions: {
          enabled: true
        },
        manifest: {
          name: 'Gif app',
          short_name: 'Giffy',
          description: 'Gif app for search and view gif',
          theme_color: '#ffffff',
          icons: [
            {
              src: '/gif-service-gp/icons/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: '/gif-service-gp/icons/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
