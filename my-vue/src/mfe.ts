import { createApp, App as VueApp } from "vue";
import { Route } from "@vaadin/router";
import "./style.css";
import App from "./App.vue";
import createAppRouter from "./router";
import { incrementCounter } from "./store/counterStore";

let $baseURL = "/";

class MyVueElement extends HTMLElement {
  private app: VueApp<Element> | undefined = undefined;
  private router: any | undefined = undefined;
  private counterIncrementHandler: EventListener | undefined = undefined;

  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = `:host { display: block; }`;
    this.shadowRoot?.appendChild(style);
    this.shadowRoot?.appendChild(document.createElement("slot"));

    this.router = createAppRouter($baseURL);

    this.app = createApp(App);
    this.app.use(this.router.router);
    this.app.mount(this);

    this.counterIncrementHandler = ((event: CustomEvent) => {
      const incrementValue = event.detail?.value || 1;
      incrementCounter(incrementValue);
    }) as EventListener;

    document.addEventListener(
      "counter:increment",
      this.counterIncrementHandler,
    );
  }

  disconnectedCallback() {
    this.app?.unmount();
    this.app = undefined;

    this.router?.cleanUp();

    if (this.counterIncrementHandler) {
      document.removeEventListener(
        "counter:increment",
        this.counterIncrementHandler,
      );
    }
  }
}

const MyVueTag = "my-vue-app";

customElements.get(MyVueTag) || customElements.define(MyVueTag, MyVueElement);

function getComponent(baseURL: string = "/") {
  $baseURL = baseURL;
  return MyVueTag;
}

let routes: Route[] | undefined = undefined;

function getRoutes(baseURL: string = "/") {
  $baseURL = baseURL;

  if (!routes) {
    routes = [
      {
        path: "/",
        component: MyVueTag,
      },
    ];
  }

  return routes;
}

export { MyVueElement, getRoutes, getComponent };
export default getRoutes;
