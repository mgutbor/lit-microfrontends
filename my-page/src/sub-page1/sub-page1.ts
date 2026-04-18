import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("my-app-sub-page1")
export class MyAppSubPage1 extends LitElement {
  static styles = css`
    h1 {
      margin: 0;
      padding: 20px 0;
    }
  `;

  render() {
    return html` <h1>Sub Page 1</h1> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "my-app-sub-page1": MyAppSubPage1;
  }
}
