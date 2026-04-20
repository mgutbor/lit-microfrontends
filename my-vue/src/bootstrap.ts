import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import createAppRouter from "./router";
import { incrementCounter } from "./store/counterStore";

const { router } = createAppRouter();

createApp(App).use(router).mount("#app");

document.addEventListener("counter:increment", ((event: CustomEvent) => {
  const incrementValue = event.detail?.value || 1;
  incrementCounter(incrementValue);
}) as EventListener);
