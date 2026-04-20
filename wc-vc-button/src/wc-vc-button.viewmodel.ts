import { LitElement } from "lit";
import { property } from "lit/decorators.js";
import { ButtonConfig } from "./model/wc-vc-button.model";
import { ButtonClickEvent } from "./event/wc-vc-button-click.event";

export class WcVcButtonViewModel extends LitElement {
  @property({ type: String }) public url: string = "#";
  @property({ type: String }) public systemId: string = "Sistema";
  @property({ type: String }) public icon: string = "home";
  @property({ type: String }) public label: string = "Inicio";
  @property({ type: String }) public customEvent: string = "";
  @property({ type: Object }) public customEventDetail: any = undefined;
  @property({ type: Object }) public configData: ButtonConfig = {
    token: "",
    nuhsa: "",
  };

  connectedCallback(): void {
    super.connectedCallback();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  protected clickHandler(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.url && this.url !== "#") {
      const buttonClickEvent = new ButtonClickEvent({
        url: this.url,
        sistemId: this.systemId,
        configData: this.configData,
      });

      this.dispatchEvent(buttonClickEvent);
    }

    if (this.customEvent) {
      const customEvent = new CustomEvent(this.customEvent, {
        bubbles: true,
        composed: true,
        detail: this.customEventDetail,
      });

      this.dispatchEvent(customEvent);
    }
  }
}
