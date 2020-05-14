import { Injectable } from '@angular/core';

import { AuthTokenService } from '../auth/auth-token-service/auth-token.service';

import { Observable, pipe } from 'rxjs';
import { Httpheadername } from './httpheadername.enum';
import { EMPTY } from 'rxjs';
import { ConfigService } from '../../config/config.service';
import { KeyValueStoreService } from '../../keyvaluestore/keyvaluestore.service';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class HCSLoad {
  public key: ISecondaryKey;

  constructor(private config: ConfigService, private auth: AuthTokenService, private store: KeyValueStoreService) { }
  /**
   * Loads the hcs module authentication before the app loads
   */
  public load(): Observable<any> {
    const key = this.config.get('APIKEY');
    if (key !== undefined) {
      return this.loadWithApiKey(key);
    } else {
      return this.loadWithCustomerKey();
    }
  }

  /**
   * Loads the hcs module authentication tokens with customer key before the app loads
   */
  private loadWithCustomerKey(): Observable<any> {
    return this.store.get(this.config.get('APPKEY') + '_CUSTOMER_KEY').pipe(switchMap((val) => {
      if (val !== undefined) {
        this.key = {
          name: Httpheadername.customerKey,
          value: val
        };
      }
      return this.auth.initTokens();
    }));
  }

  /**
   * Loads the hcs module authentications tokens with api key before the app loads
   */
  private loadWithApiKey(key: string): Observable<any> {
    this.key = {
      name: Httpheadername.apikey,
      value: key
    };
    return this.auth.initTokens();
  }
}

interface ISecondaryKey {
  name: string;
  value: string;
}
