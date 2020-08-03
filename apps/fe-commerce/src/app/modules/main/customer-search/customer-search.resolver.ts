import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IOrder, clearCurrentOrderRequest, setOrderArticlesRequest, refreshOrdersRequest, IHeader, setHeaderRequest, OrderService } from '@fecommerce-workspace/data-store-lib';

@Injectable()
export class CustomerSearchResolver implements Resolve<any> {
  orders$: Observable<unknown>;
  constructor(
    private _store: Store<{}>,
    private orderService: OrderService
    ) {}

  resolve(): Observable<any> {
    const flow = this.orderService.orderFlow;
    const header = flow === 'edit' ? this._headerEditOrderFlow() : this._headerNewOrderFlow();
    this._store.dispatch(setHeaderRequest({header}))
    return of(null);
  }

  private _headerNewOrderFlow(): IHeader {
    const header: IHeader = {
      title: 'neworder',
      leftIcon: 'close',
      titClass: 'mat-title',
      lastUrl: 'main/home',
      centered: true
    }
    return header;
  }

  private _headerEditOrderFlow(): IHeader {
    const header: IHeader = {
      title: 'neworder',
      leftIcon: 'keyboard_arrow_left',
      titClass: 'mat-title',
      lastUrl: 'main/order-overview',
      centered: true
    }
    return header;
  }
}
