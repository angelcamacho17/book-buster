import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IHeader, setHeaderRequest } from '@fecommerce-workspace/data-store-lib';

@Injectable()
export class NewOrderResolver implements Resolve<any> {
  constructor(private _store: Store<{}>) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    let header: IHeader;
    if (route.data?.flow === 'switchCustomer') {
      header = this._headerSwitchCustomerFlow();
    } else {
      header = this._headerNewOrderFlow();
    }

    this._store.dispatch(setHeaderRequest({ header }))
    return of(null);
  }

  private _headerNewOrderFlow(): IHeader {
    const header: IHeader = {
      title: 'orderover',
      leftIcon: 'close',
      rightIcon: 'delete_outline',
      titClass: 'mat-title',
      lastUrl: 'home',
      centered: true,
    }
    return header;
  }

  private _headerSwitchCustomerFlow(): IHeader {
    const header: IHeader = {
      title: 'orderover',
      leftIcon: 'close',
      rightIcon: 'delete_outline',
      titClass: 'mat-title',
      lastUrl: 'home',
      centered: true,
    }
    return header;
  }
}
