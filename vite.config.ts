import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import vuejsx from '@vitejs/plugin-vue-jsx'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    Pages(),
    Components({
      resolvers: [AntDesignVueResolver()]
    }),
    AutoImport({ imports: ['vue', '@vueuse/core', 'pinia', 'vue-router'] }),
    vue(),
    vuejsx()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variables.scss";`,
        javascriptEnabled: true
      }
    }
  }
})
