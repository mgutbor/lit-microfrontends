import { css } from "lit";

export const wcVcButtonTheme = css`
  :host {
    display: inline-block;
  }

  md-filled-button {
    --md-filled-button-container-color: var(--button-bg-color, #1976d2);
    --md-filled-button-label-text-color: var(--button-text-color, #ffffff);
    --md-filled-button-hover-state-layer-color: var(
      --button-hover-color,
      rgba(255, 255, 255, 0.08)
    );
    --md-filled-button-pressed-state-layer-color: var(
      --button-pressed-color,
      rgba(255, 255, 255, 0.12)
    );
    --md-filled-button-focus-state-layer-color: var(
      --button-focus-color,
      rgba(255, 255, 255, 0.12)
    );
  }
`;
