import { Injectable } from '@angular/core';
import { KeyValueStoreService } from '../sdp/keyvaluestore/keyvaluestore.service';
import { HCSClient } from '../sdp/hcs/hcs-client/hcs-client.service';
import { LanguageService } from '../sdp/language/language.service';
import { ConfigService } from '../sdp/config/config.service';
import { Router } from '@angular/router';
import { TranslationService } from '../sdp/translation/translation.service';
import { getLocales } from '../sdp/utils/locales/locales';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(
    private _key: KeyValueStoreService,
    private _hcs: HCSClient,
    private _lgs: LanguageService,
    private _config: ConfigService,
    private _rt: Router,
    private _transServ: TranslationService
  ) { }

  // public login( userInfo: User ): boolean {
  //   if ( userInfo.key === 'sdp'
  //       && userInfo.user === 'angel' && userInfo.password === '123456') {
  //     localStorage.setItem('ACCESSTOKEN', 'accesstoken');
  //     localStorage.setItem('CUSTOMERKEY', userInfo.key);
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  public logout(): void {
    // To fetch the favorites whenever the user re-enter the app.

    if (localStorage.getItem('HIDE_CUSTOMER_KEY') !== null) {
      localStorage.removeItem('HIDE_CUSTOMER_KEY');
    }
    this._rt.navigateByUrl('/login');

    this._hcs.logout().subscribe(() => {
      this._key.delete('userPicture').subscribe();
      this._key.delete('attBoard').subscribe();
      this._lgs.resetLanguage(getLocales(this._key, this._config)).subscribe(() => {
      });
    });
    this._key.clearData();
  }

  public setCustomerKey(key: string): void {
    if (key !== undefined) {
      localStorage.setItem('CUSTOMER_KEY', key);
    }
  }

  public getCustomerKey(): string {
    if (localStorage.getItem('CUSTOMER_KEY') !== null) {
      return localStorage.getItem('CUSTOMER_KEY');
    } else {
      return '';
    }
  }

  public notificateLogout(message: string): void {
    // const msg = this._transServ.get('logoutInactive');
    // if (message === 'Token not found') {
    //     msg = this._transServ.get('logoutUser');
    // }
    // this._snackBar.open(msg, '', {
    //   duration: 5000,
    // });
    this.logout();
  }
}
