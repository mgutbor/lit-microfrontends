import { CSSResultGroup, CSSResultOrNative, html, nothing, TemplateResult } from 'lit';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';
import { until } from 'lit/directives/until.js';
import '@sas/wc-stic-icon';
import { WcVacunasEcuIndicatorTheme } from './css/wc-vacunas-ecu-indicator-theme.css';
import { WcVacunasEcuIndicatorViewModel } from './wc-vacunas-ecu-indicator.viewmodel';
import { EcuIndicatorBadge, EcuIndicatorCriticality } from './model/wc-vacunas-ecu-indicator.model';

export class WcVacunasEcuIndicatorView extends WcVacunasEcuIndicatorViewModel {
  static finalizeStyles = (styles?: CSSResultGroup): CSSResultOrNative[] => [
    ...super.finalizeStyles(styles),
    ...WcVacunasEcuIndicatorTheme.wcVacunasEcuIndicatorTheme,
  ];

  render() {
    return html`
      <div class="wrapper ecu-indicator-container">
        <div class="icon-button-wrapper">
          <button
            @click=${this.clickHandler}
          >
            ${this.renderStateLayer()}
            <stic-icon
              icon='syringe'
              size='sm'
            ></stic-icon>
          </button>

          ${when(this.computedBadges.length > 0, () => this.renderBadges())}

          ${when(this._shouldShowTooltip(), () => this._renderCustomTooltip())}
        </div>
      </div>
    `;
  }

  private _shouldShowTooltip(): boolean {
    return this._hasTechnicalError || (this.computedTags?.length > 0);
  }

  protected renderStateLayer(): TemplateResult {
    return html`<div class="state-layer">
        ${until(this.renderRipple())}
      </div>`;
  }

  protected async renderRipple(): Promise<TemplateResult> {
    await import('@sas/wc-stic-ripple');
    return html` <stic-ripple
      class="ripple"
      ?primary="${false}"
    ></stic-ripple>`;
  }

  private _renderCustomTooltip(): TemplateResult {
    return html`
      <div class="ecu-indicator-tooltip">
        <div class="tooltip-title">Vacunas</div>
        ${when(this._hasTechnicalError,
      () => html`<div class="tooltip-error-text">Ha habido un error en la carga de datos</div>`,
      () => html`
            <div class="tooltip-tags">
              ${map(this.computedTags, tag => html`
                <div class="tooltip-tag-item">
                  <div class="custom-tag ${tag.status}">
                    ${when(tag.icon, () => html`
                      <div class="custom-tag-icon">
                        <stic-icon icon=${tag.icon!}></stic-icon>
                      </div>
                    `)}
                    <div class="custom-tag-text">${tag.text}</div>
                  </div>
                </div>
              `)}
            </div>
          `
    )}
      </div>
    `;
  }

  protected renderBadges(): TemplateResult {
    const maxDisplayed = 2;
    const badgesToDisplay = this.computedBadges.slice(0, maxDisplayed);
    const hasMore = this.computedBadges.length > maxDisplayed;

    return html`
      <div class="badges-container">
        ${map(badgesToDisplay, (badge) => this.renderSingleBadge(badge))}
        ${when(hasMore, () => this.renderMoreBadge())}
      </div>
    `;
  }

  protected renderSingleBadge(badge: EcuIndicatorBadge): TemplateResult {
    return html`
      <div class="badge-item">
        <div class="icon-badge ${this._getCriticalityClass(badge.criticality)}">
          ${this._renderSvgIcon(badge.criticality)}
        </div>
      </div>
    `;
  }

  private _renderSvgIcon(criticality: EcuIndicatorCriticality): TemplateResult | typeof nothing {
    switch (criticality) {
      case EcuIndicatorCriticality.CRITICAL:
        return html`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 9 9" fill="none">
            <path d="M3.83043e-05 0.810158L4.80139 5.5615L5.60311 4.75135L0.801758 0L3.83043e-05 0.810158Z" fill="white"/>
          </svg>`;
      case EcuIndicatorCriticality.ON_TIME:
        return html`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -1 3 10" fill="none">
            <path d="M4 6.67733L3.12606 7.55127L0 4.42497V0H1.22295V3.90052L4 6.67733Z" fill="#333333"/>
          </svg>`;
      case EcuIndicatorCriticality.HEALTHY:
        return html`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 10 8" fill="none">
            <path d="M2.72281 5.97895L0 3.27018L0.715789 2.54035L2.72281 4.54737L7.28421 0L8 0.715789L2.72281 5.97895Z" fill="white"/>
          </svg>`;
      case EcuIndicatorCriticality.TECHNICAL_ERROR:
        return html`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 11 11" fill="none">
            <path d="M3.5 4.29251L0.792506 7L0 6.20749L2.70749 3.5L0 0.792506L0.792506 0L3.5 2.70749L6.20749 0L7 0.792506L4.29251 3.5L7 6.20749L6.20749 7L3.5 4.29251Z" fill="white"/>
          </svg>`;
      default:
        return nothing;
    }
  }

  private _getCriticalityClass(criticality: EcuIndicatorCriticality): string {
    const map: Record<number, string> = {
      [EcuIndicatorCriticality.CRITICAL]: 'critical',
      [EcuIndicatorCriticality.ON_TIME]: 'on-time',
      [EcuIndicatorCriticality.HEALTHY]: 'healthy',
      [EcuIndicatorCriticality.TECHNICAL_ERROR]: 'technical-error',
    };
    return map[criticality] || '';
  }

  protected renderMoreBadge(): TemplateResult {
    return html`
      <div class="plus-one">
        +1
      </div>
    `;
  }
}

window.customElements.define('wc-vacunas-ecu-indicator', WcVacunasEcuIndicatorView);

declare global {
  interface HTMLElementTagNameMap {
    'wc-vacunas-ecu-indicator': WcVacunasEcuIndicatorView;
  }
}
