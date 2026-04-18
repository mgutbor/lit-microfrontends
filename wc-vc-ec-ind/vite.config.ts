import { defineConfig } from "vite";
import { federation } from "@module-federation/vite";

const VITE_PORT = +(process.env.VITE_PORT || 3003);

// https://vitejs.dev/config/
export default defineConfig({
  base: '/app/wc-vc-ec-ind/',
  build: {
    target: "esnext",
  },
  plugins: [
    federation({
      name: "wcVcEcInd",
      filename: "remoteEntry.js",
      exposes: {
        "./wcVcEcInd": "./index.ts",
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
