import { createApp, App as VueApp } from "vue";
import { Route } from "@vaadin/router";
import "./style.css";
import App from "./App.vue";
import createAppRouter from "./router";

let $baseURL = "/";

class MyVueElement extends HTMLElement {
  private app: VueApp<Element> | undefined = undefined;
  private router: any | undefined = undefined;
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
  }

  disconnectedCallback() {
    this.app?.unmount();
    this.app = undefined;

    this.router?.cleanUp();
  }
}

const MyVueTag = "my-vue-app";

customElements.get(MyVueTag) || customElements.define(MyVueTag, MyVueElement);

function getComponent(baseURL: string = "/") {
  $baseURL = baseURL;
  console.log("My Vue: getComponent", baseURL);
  return MyVueTag;
}

let routes: Route[] | undefined = undefined;

function getRoutes(baseURL: string = "/") {
  $baseURL = baseURL;
  console.log("My Vue: getRoutes", baseURL);

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
