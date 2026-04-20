export interface ButtonConfig {
  token?: string;
  nuhsa?: string;
}

export interface ButtonClickEventData {
  url: string;
  sistemId: string;
  configData: ButtonConfig;
}
