export enum EcuIndicatorCriticality {
    CRITICAL = 1,
    ON_TIME = 4,
    HEALTHY = 5,
    TECHNICAL_ERROR = -1,
}

export interface EcuIndicatorBadge {
    criticality: EcuIndicatorCriticality;
}

export interface EcuIndicatorTagData {
    text: string;
    icon?: string;
    status?: string;
}

export interface EcuIndicatorConfig {
    token: string;
    nuhsa: string;
}

export type VaccinationStatus =
    | 'Vacunas sin alertas'
    | 'Bien vacunado'
    | 'Mal vacunado'
    | 'Vacunas pendientes'
    | 'Vacunas no administradas'
    | 'Sin calendario PVA asociado'
    | 'Error técnico';

export const VACCINATION_STATUS_CRITICALITY_MAP: Record<VaccinationStatus, EcuIndicatorCriticality> = {
    'Vacunas sin alertas': EcuIndicatorCriticality.HEALTHY,
    'Bien vacunado': EcuIndicatorCriticality.HEALTHY,
    'Vacunas pendientes': EcuIndicatorCriticality.ON_TIME,
    'Vacunas no administradas': EcuIndicatorCriticality.CRITICAL,
    'Mal vacunado': EcuIndicatorCriticality.CRITICAL,
    'Sin calendario PVA asociado': EcuIndicatorCriticality.CRITICAL,
    'Error técnico': EcuIndicatorCriticality.TECHNICAL_ERROR,
};

export const VACCINATION_STATUS_TAG_MAP: Record<VaccinationStatus, EcuIndicatorTagData | null> = {
    'Vacunas sin alertas': { text: 'Sin alertas', icon: 'syringe', status: 'healthy' },
    'Bien vacunado': { text: 'Bien vacunado', icon: 'syringe', status: 'healthy' },
    'Mal vacunado': { text: 'Mal vacunado', icon: 'syringe', status: 'critical' },
    'Vacunas pendientes': { text: 'Tiene vacunas en plazo', icon: 'schedule', status: 'on-time' },
    'Vacunas no administradas': { text: 'Tiene vacunas no administradas', icon: 'syringe', status: 'critical' },
    'Sin calendario PVA asociado': { text: 'Sin PVA asociado', icon: 'syringe', status: 'critical' },
    'Error técnico': null,
};

export const ECU_INDICATOR_BADGE_CONFIGS: Record<EcuIndicatorCriticality, EcuIndicatorBadge> = {
    [EcuIndicatorCriticality.CRITICAL]: {
        criticality: EcuIndicatorCriticality.CRITICAL,
    },
    [EcuIndicatorCriticality.ON_TIME]: {
        criticality: EcuIndicatorCriticality.ON_TIME,
    },
    [EcuIndicatorCriticality.HEALTHY]: {
        criticality: EcuIndicatorCriticality.HEALTHY,
    },
    [EcuIndicatorCriticality.TECHNICAL_ERROR]: {
        criticality: EcuIndicatorCriticality.TECHNICAL_ERROR,
    },
};
