import { defineCustomElement } from "vue";
import HelloWorld from "./HelloWorld.ce.vue";

const HelloWorldComponent = defineCustomElement(HelloWorld);
customElements.define("hello-world", HelloWorldComponent);

export { HelloWorldComponent };
