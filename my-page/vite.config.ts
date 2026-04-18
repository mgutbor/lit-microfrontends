import { defineConfig } from "vite";
import { federation } from "@module-federation/vite";

const VITE_PORT = +(process.env.VITE_PORT || 3000);

// https://vitejs.dev/config/
export default defineConfig({
  base: '/app/my-page/',
  build: {
    target: "esnext",
  },
  plugins: [
    federation({
      name: "myPage",
      filename: "remoteEntry.js",
      exposes: {
        "./myPage": "./src/routes.ts",
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
