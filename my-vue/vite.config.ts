import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { federation } from "@module-federation/vite";

const VITE_PORT = +(process.env.VITE_PORT || 3001);

// https://vitejs.dev/config/
export default defineConfig({
  base: '/app/my-vue/',
  build: {
    target: "esnext",
  },
  plugins: [
    vue(),
    federation({
      name: 'myVue',
      filename: "remoteEntry.js",
      exposes: {
        './myVue': './src/mfe.ts'
      },
      shared: {
        vue: {},
      },
      dts: false,
    })
  ],
  server: {
    port: VITE_PORT,
    fs: {
      allow: [".."],
    },
  },
  preview: {
    port: VITE_PORT,
  },
})
