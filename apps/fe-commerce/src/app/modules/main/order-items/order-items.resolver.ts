import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IHeader, setHeaderRequest, OrderService } from '@fecommerce-workspace/data-store-lib';

@Injectable()
export class OrderItemsResolver implements Resolve<any> {
  constructor(
    private _store: Store<{}>,
    private _orderService: OrderService
  ) { }

  resolve(): Observable<any> {
    const header = this._headerOrderFlow();

    this._store.dispatch(setHeaderRequest({ header }))
    return of(null);
  }

  private _headerOrderFlow(): IHeader {
    const header: IHeader = {
      title: 'orderitems',
      leftIcon: 'keyboard_arrow_left',
      rightIcon: 'add',
      rightIconClass: 'right-icon',
      titClass: 'mat-title',
      lastUrl: 'main/order-overview',
      centered: true
    }
    return header;
  }
}
