import { defineConfig } from "vite";
import { federation } from "@module-federation/vite";

const VITE_PORT = +(process.env.VITE_PORT || 3004);

// https://vitejs.dev/config/
export default defineConfig({
  base: '/app/wc-vc-button/',
  build: {
    target: "esnext",
  },
  plugins: [
    federation({
      name: "wcVcButton",
      filename: "remoteEntry.js",
      exposes: {
        "./wcVcButton": "./index.ts",
      },
      shared: {
        lit: {},
        "lit-html": {},
        "lit-element": {},
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
