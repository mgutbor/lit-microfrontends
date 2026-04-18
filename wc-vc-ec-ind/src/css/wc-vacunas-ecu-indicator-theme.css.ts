import { css, CSSResult, CSSResultOrNative } from 'lit';

export class WcVacunasEcuIndicatorTheme {
  static cssBase: CSSResult = css`
    :host {
      display: inline-block;
      position: relative;
      cursor: pointer;
    }

    .wrapper {
      position: relative;
      display: inline-flex;
      flex-direction: column;
      align-items: center;
    }

    .icon-button-wrapper {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: var(--sizing-height-4xl);
    }

    .icon-button-wrapper button{
      position: relative;
      border-radius: var(--shape-sm);
      border: none;
      outline: none;
      cursor: pointer;
      background: transparent;
      text-decoration: var(--font-text-decoration-underline);
      text-decoration-color: var(--stic-tertiary-button-text-decoration-color);
      --stic-text-color: var(--color-text-action-secondary-default);
      height: var(--sizing-height-4xl);
    }

    .state-layer {
      --stic-ripple-shape: var(--shape-sm);
      --stic-ripple-shape-top-left: var(--stic-button-v2-ripple-shape-top-left, var(--shape-sm));
      --stic-ripple-shape-top-right: var(--stic-button-v2-ripple-shape-top-right, var(--shape-sm));
      --stic-ripple-shape-bottom-left: var(
        --stic-button-v2-ripple-shape-bottom-left,
        var(--shape-sm)
      );
      --stic-ripple-shape-bottom-right: var(
        --stic-button-v2-ripple-shape-bottom-right,
        var(--shape-sm)
      );
    }

    .badges-container {
      position: absolute;
      top: 22px;
      left: 5%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
    }

    .badge-item {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--shape-full, 50%);
      background-color: var(--color-background-primary-default, #fff);
      border: 2px solid #ffffff;
      z-index: 1;
      width: 14px;
      height: 14px;
      flex-shrink: 0;
      overflow: hidden;
    }

    .badge-item:not(:first-child) {
      margin-left: -4px;
      z-index: 0;
    }

    .plus-one {
      font-family: var(--font-family-primary, sans-serif);
      font-size: 10px;
      font-weight: 700;
      color: #333;
      margin-left: 2px;
      pointer-events: none;
      z-index: 2;
    }

    .icon-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 14px;
      height: 14px;
      border-radius: var(--shape-full, 50%);
      color: #ffffff;
      pointer-events: none;
      overflow: hidden;
    }

    .icon-badge svg {
      width: 100%;
      height: 100%;
    }

    .icon-badge.critical { background-color: #B01A22; }
    .icon-badge.on-time svg {
      width: 85%;
      height: 85%;
      fill: #000000;
      color: #000000;
    }

    .icon-badge.on-time { 
      background-color: #F5CE47; 
    }
    .icon-badge.healthy { background-color: #028465; }
    .icon-badge.technical-error { background-color: #828282; }

    .ecu-indicator-tooltip {
      position: absolute;
      top: calc(100% + 15px);
      left: 50%;
      transform: translateX(-50%) translateY(10px);
      width: max-content;
      padding: 16px;
      background-color: #ffffff;
      border-radius: 6px;
      box-shadow: var(--shadow-sm);
      z-index: 9999;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s ease, visibility 0.2s ease, transform 0.2s ease;
      display: flex;
      flex-direction: column;
      gap: 12px;
      pointer-events: none;
    }

    .ecu-indicator-tooltip::before {
      content: "";
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-width: 8px;
      border-style: solid;
      border-color: transparent transparent #ccc transparent;
    }

    .ecu-indicator-tooltip::after {
      content: "";
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-width: 7px;
      border-style: solid;
      border-color: transparent transparent #fff transparent;
    }

    .wrapper:hover .ecu-indicator-tooltip {
      opacity: 1;
      visibility: visible;
      transform: translateX(-50%) translateY(4px);
    }

    .tooltip-title {
      font-size: 18px;
      font-weight: 500;
      color: #333333;
      margin-bottom: 2px;
      text-align: left;
      font-family: var(--font-family-primary, sans-serif);
    }

    .tooltip-tags {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .tooltip-error-text {
      font-family: var(--font-family-primary, sans-serif);
      font-size: 14px;
      color: #666666;
      line-height: 1.4;
      padding: 24px;
    }

    .tooltip-tag-item {
      display: flex;
      width: 100%;
    }

    .custom-tag {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      border-radius: 4px;
      font-family: var(--font-family-primary, sans-serif);
      font-size: 14px;
      line-height: 1.2;
      box-sizing: border-box;
      min-height: 32px;
      color: #333333;
    }

    .custom-tag.critical { background-color: #F5E4E4; color: #460A0E}
    .custom-tag.on-time { background-color: #FCF2CF; color: #443504;}
    .custom-tag.healthy { background-color: #E1F0ED; color: #013528;}

    .custom-tag-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .custom-tag-icon stic-icon {
      --stic-icon-size: 16px;
    }

    .custom-tag.critical .custom-tag-icon stic-icon{
      --stic-icon-fill-color: #460A0E;
    }

    .custom-tag.on-time .custom-tag-icon stic-icon{
      --stic-icon-fill-color: #532800;
    }

    .custom-tag.healthy .custom-tag-icon stic-icon{
      --stic-icon-fill-color: #013528;
    }

    .custom-tag-text {
      flex: 1;
      white-space: nowrap;
    }
  `;

  static wcVacunasEcuIndicatorTheme: CSSResultOrNative[] = [
    WcVacunasEcuIndicatorTheme.cssBase,
  ];
}
