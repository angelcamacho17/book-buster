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
    const flow = this._orderService.orderFlow;
    let header;
    if (flow === 'edit') {
      header = this._headerEditOrderFlow();
    } else {
      header = this._headerNewOrderFlow();
    }

    this._store.dispatch(setHeaderRequest({ header }))
    return of(null);
  }

  private _headerNewOrderFlow(): IHeader {
    const header: IHeader = {
      title: 'orderover',
      leftIcon: 'keyboard_arrow_left',
      titClass: 'mat-title',
      lastUrl: '/main/article-search',
      centered: true
    }
    return header;
  }

  private _headerEditOrderFlow(): IHeader {
    // this._orderService.setOrderModifiedState(false);
    const header: IHeader = {
      title: 'orderover',
      leftIcon: 'close',
      rightIcon: 'delete_outlined',
      titClass: 'mat-title',
      checkGoBack: true,
      centered: true
    }
    return header;
  }
}
