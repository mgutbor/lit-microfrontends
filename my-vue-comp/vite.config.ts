import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { federation } from "@module-federation/vite";

const VITE_PORT = +(process.env.VITE_PORT || 3002);

// https://vitejs.dev/config/
export default defineConfig({
  base: '/app/my-vue-comp/',
  build: {
    target: "esnext",
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes("-"),
        },
      },
    }),
    federation({
      name: "myVueComp",
      filename: "remoteEntry.js",
      exposes: {
        "./myVueComp": "./src/mfe.ts",
      },
      shared: {
        vue: {},
      },
      dts: false,
    }),
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
});
