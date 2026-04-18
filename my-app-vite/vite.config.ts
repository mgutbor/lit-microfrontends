import { defineConfig } from "vite";
import { federation } from "@module-federation/vite";

const proxy = {
  "/app/my-page": {
    target: "http://localhost:3000",
    changeOrigin: true,
  },
  "/app/my-vue-comp": {
    target: "http://localhost:3002",
    changeOrigin: true,
  },
  "/app/my-vue": {
    target: "http://localhost:3001",
    changeOrigin: true,
  }
};

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: "esnext",
  },
  plugins: [
    federation({
      name: "myApp",
      filename: "remoteEntry.js",
      exposes: {
        "./myApp": "./src/routes.ts",
      },
      remotes: {
        myPage: {
          type: "module",
          name: "myPage",
          entry: "/app/my-page/remoteEntry.js",
        },
        myVue: {
          type: "module",
          name: "myVue",
          entry: "/app/my-vue/remoteEntry.js",
        },
        myVueComp: {
          type: "module",
          name: "myVueComp",
          entry: "/app/my-vue-comp/remoteEntry.js",
        },
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
    proxy,
    fs: {
      allow: [".."],
    },
  },
  preview: { proxy },
});
