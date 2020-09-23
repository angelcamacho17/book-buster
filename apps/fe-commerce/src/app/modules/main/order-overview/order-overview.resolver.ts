import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IHeader, setHeaderRequest, OrderService } from '@fecommerce-workspace/data-store-lib';

@Injectable()
export class OrderOverviewResolver implements Resolve<any> {
  constructor(
    private _store: Store<{}>,
    private _orderService: OrderService
    ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const header = this._headerOrderFlow();
    this._store.dispatch(setHeaderRequest({ header }))
    return of(null);
  }

  private _headerOrderFlow(): IHeader {
    const header: IHeader = {
      title: 'orderover',
      leftIcon: 'close',
      titClass: 'mat-title',
      lastUrl: '/main',
      centered: true
    }
    return header;
  }
}
