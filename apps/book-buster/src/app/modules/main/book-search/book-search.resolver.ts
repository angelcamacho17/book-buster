import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IOrder, clearCurrentOrderRequest, refreshOrdersRequest, IHeader, setHeaderRequest, OrderService } from '@fecommerce-workspace/data';

@Injectable()
export class BookSearchResolver implements Resolve<any> {
  orders$: Observable<unknown>;
  constructor(
    private _store: Store<{}>,
    private orderService: OrderService
    ) {}

  resolve(): Observable<any> {
    let header = this._headerNewOrderFlow();
    this._store.dispatch(setHeaderRequest({header}))
    return of(null);
  }

  private _headerNewOrderFlow(): IHeader {
    const header: IHeader = {
      title: 'lookbook',
      leftIcon: 'close',
      titClass: 'mat-title',
      lastUrl: 'main/home',
      centered: true,
    }
    return header;
  }
}
