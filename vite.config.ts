// import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
// import Components from 'unplugin-vue-components/vite'
// import MotionResolver from 'motion-v/resolver'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    vue(),
    vueJsx(),
    vueDevTools(),
    // Components({
    //   dts: true,
    //   resolvers: [MotionResolver()],
    // }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
