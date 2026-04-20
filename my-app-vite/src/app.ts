import { LitElement, unsafeCSS, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import myElementStyle from "./app.style.scss?inline";

import "wcVcEcInd/wcVcEcInd";
import "wcVcButton/wcVcButton";

import { router } from "./bootstrap";

@customElement("my-app")
export class MyApp extends LitElement {
  private $baseURL: string = "/";

  @property({ type: String })
  set baseURL(value: string) {
    value.endsWith("/") || (value += "/");
    this.$baseURL = value;
  }

  get baseURL() {
    return this.$baseURL;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener(
      "externalApp:open",
      this.handleExternalAppOpen as EventListener,
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener(
      "externalApp:open",
      this.handleExternalAppOpen as EventListener,
    );
  }

  private handleExternalAppOpen(event: CustomEvent) {
    event.stopPropagation();
    event.preventDefault();

    const { url } = event.detail;
    if (url) {
      router.render(url);
    }
  }

  render() {
    return html`
      <div class="app">
        <nav>
          <wc-vc-button
            systemId="Navigation"
            icon="home"
            label="Home"
            customEvent="counter:increment"
            .customEventDetail=${{ value: 7 }}
          ></wc-vc-button>
          <a href="${this.baseURL}page1">Page 1</a>
          <a href="${this.baseURL}page2">Page 2</a>
          <a href="${this.baseURL}my-vue">My Vue</a>
          <a href="${this.baseURL}my-vue-comp">My Vue Comp</a>
        </nav>
        <div class="ecu-indicator-container">
          <wc-vacunas-ecu-indicator
            url="/my-vue-comp"
            .vaccinationStatus=${["Bien vacunado", "Vacunas pendientes"]}
            systemId="Vacunas"
          ></wc-vacunas-ecu-indicator>
        </div>
        <div class="slot">
          <slot></slot>
        </div>
      </div>
    `;
  }

  static styles = unsafeCSS(myElementStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    "my-app": MyApp;
  }
}
