import { ButtonClickEventData } from "../model/wc-vc-button.model";

export class ButtonClickEvent extends CustomEvent<ButtonClickEventData> {
  static readonly eventName = "externalApp:open";

  constructor(data: ButtonClickEventData) {
    super(ButtonClickEvent.eventName, {
      bubbles: true,
      composed: true,
      detail: data,
    });
  }
}

declare global {
  interface HTMLElementEventMap {
    [ButtonClickEvent.eventName]: ButtonClickEvent;
  }
}
