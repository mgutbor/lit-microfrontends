import { html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { WcVcButtonViewModel } from "./wc-vc-button.viewmodel";
import { wcVcButtonTheme } from "./css/wc-vc-button-theme.css";
import "@material/web/button/filled-button.js";

@customElement("wc-vc-button")
export class WcVcButtonView extends WcVcButtonViewModel {
  static override styles = [wcVcButtonTheme];

  protected override render(): TemplateResult {
    return html`
      <md-filled-button @click="${this.clickHandler}">
        ${this.label}
      </md-filled-button>
    `;
  }
}

export default WcVcButtonView;
