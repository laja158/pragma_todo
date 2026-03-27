import { Injectable } from '@angular/core';
import {
  getRemoteConfig,
  fetchAndActivate,
  getValue
} from 'firebase/remote-config';

@Injectable({
  providedIn: 'root'
})
export class RemoteConfigService {

  private remoteConfig = getRemoteConfig();

  async init() {
    this.remoteConfig.defaultConfig = {
      enable_categories: false
    };

    this.remoteConfig.settings = {
      minimumFetchIntervalMillis: 0,
      fetchTimeoutMillis: 60000
    };

    await fetchAndActivate(this.remoteConfig);
  }

  getFeatureFlag(): boolean {
    return getValue(this.remoteConfig, 'enable_categories').asBoolean();
  }
}