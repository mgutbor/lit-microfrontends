import { BaseCustomEvent } from '@sas/lib-stic-kernel';

export class AperturasistemaTerceroEvent extends BaseCustomEvent<AperturasistemaTerceroEventData> {
    constructor(detail: AperturasistemaTerceroEventData) {
        super("externalApp:open", detail);
    }
}

export class AperturasistemaTerceroEventData {
    private _url: string;
    private _sistemId: string;
    private _configData: Record<string, any> | undefined;

    constructor(url: string, sistemId: string, configData?: Record<string, any>) {
        this._url = url;
        this._sistemId = sistemId;
        this._configData = configData;
    }

    public get url(): string {
        return this._url;
    }

    public get sistemId(): string {
        return this._sistemId;
    }

    public get configData(): Record<string, any> | undefined {
        return this._configData;
    }
}
