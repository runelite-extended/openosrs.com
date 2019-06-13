export interface ILocalStorageEvent {
  key: string;
  newValue?: any;
  storageType: string;
}

export interface INotifyOptions {
  setItem?: boolean;
  removeItem?: boolean;
}

export interface ILocalStorageServiceConfig {
  notifyOptions?: INotifyOptions;
  prefix?: string;
  storageType?: 'sessionStorage' | 'localStorage';
}

