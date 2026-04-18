import { isNotNull } from '@sas/lib-stic-kernel';
import { LitElement, PropertyValues } from 'lit';
import { property, queryAsync, state } from 'lit/decorators.js';
import { EcuIndicatorCriticality, ECU_INDICATOR_BADGE_CONFIGS, EcuIndicatorBadge, EcuIndicatorTagData, VaccinationStatus, VACCINATION_STATUS_CRITICALITY_MAP, VACCINATION_STATUS_TAG_MAP } from './model/wc-vacunas-ecu-indicator.model';
import { AperturasistemaTerceroEvent, AperturasistemaTerceroEventData } from './event/wc-vacunas-ecu-indicator-click.event';
import { EcuIndicatorConfig } from './model/wc-vacunas-ecu-indicator.model';
import {
    SticMWCRippleAddEventListener,
    SticMWCRippleHandler,
    SticMWCRippleRemoveEventListener,
    SticRippleView,
} from '@sas/wc-stic-ripple';

export class WcVacunasEcuIndicatorViewModel extends LitElement {
    @property({ type: String }) public url: string = '#';
    @property({ type: String }) public systemId: string = 'Vacunas';
    @property({ type: Object }) public configData: EcuIndicatorConfig = { token: '', nuhsa: '' };

    @property({ type: Array, attribute: false }) public vaccinationStatus: VaccinationStatus[] = [];

    @state() protected computedBadges: EcuIndicatorBadge[] = [];
    @state() protected computedTags: EcuIndicatorTagData[] = [];
    @state() protected _hasTechnicalError: boolean = false;

    @queryAsync('stic-ripple')
    protected sticRipple?: Promise<SticRippleView | null>;

    protected rippleHandlers = new SticMWCRippleHandler(() => this.sticRipple || Promise.resolve(null));

    connectedCallback(): void {
        super.connectedCallback();
        SticMWCRippleAddEventListener(this, this.rippleHandlers);
        
        // Computar badges si ya hay vaccinationStatus al conectar
        if (this.vaccinationStatus && this.vaccinationStatus.length > 0) {
            this._computeBadges();
        }
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        SticMWCRippleRemoveEventListener(this, this.rippleHandlers);
    }

    protected override willUpdate(changedProperties: PropertyValues): void {
        super.willUpdate(changedProperties);
        
        if (changedProperties.has('vaccinationStatus')) {
            this._computeBadges();
        }
    }

    private _computeBadges(): void {
        if (!this.vaccinationStatus || this.vaccinationStatus.length === 0) {
            this.computedBadges = [];
            this.computedTags = [];
            this._hasTechnicalError = false;
            return;
        }

        this._hasTechnicalError = this.vaccinationStatus.includes('Error técnico');

        const uniqueCriticalities = new Set<EcuIndicatorCriticality>();
        this.computedTags = [];

        for (const status of this.vaccinationStatus) {
            const crit = VACCINATION_STATUS_CRITICALITY_MAP[status];
            if (isNotNull(crit)) {
                uniqueCriticalities.add(crit);
            }

            const tag = VACCINATION_STATUS_TAG_MAP[status];
            if (tag) {
                this.computedTags.push(tag);
            }
        }

        let badges: EcuIndicatorBadge[] = Array.from(uniqueCriticalities).map(crit => ECU_INDICATOR_BADGE_CONFIGS[crit]);

        badges.sort((a, b) => {
            if (a.criticality === EcuIndicatorCriticality.TECHNICAL_ERROR) return -1;
            if (b.criticality === EcuIndicatorCriticality.TECHNICAL_ERROR) return 1;
            return a.criticality - b.criticality;
        });

        this.computedBadges = badges;
    }

    protected clickHandler(_e: Event) {
        this.dispatchEvent(
            new AperturasistemaTerceroEvent(
                new AperturasistemaTerceroEventData(this.url, this.systemId, { token: this.configData.token, nuhsa: this.configData.nuhsa })
            )
        );
    }
}
