import { Injectable } from '@angular/core';
import { getRemoteConfig, fetchAndActivate, getValue } from 'firebase/remote-config';

@Injectable({
  providedIn: 'root'
})
export class RemoteConfigService {

  private remoteConfig = getRemoteConfig();

  async init() {
    await fetchAndActivate(this.remoteConfig);
  }

  getFeatureFlag(): boolean {
    return getValue(this.remoteConfig, 'enable_categories').asBoolean();
  }
}