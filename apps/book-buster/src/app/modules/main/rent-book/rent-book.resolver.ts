import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IOrder, clearCurrentOrderRequest, refreshOrdersRequest, IHeader, setHeaderRequest, OrderService } from '@fecommerce-workspace/data';

@Injectable()
export class RentBookResolver implements Resolve<any> {
  orders$: Observable<unknown>;
  constructor(
    private _store: Store<{}>,
    private orderService: OrderService
    ) {}

  resolve(): Observable<any> {
    const header = this._headerNewOrderFlow();
    this._store.dispatch(setHeaderRequest({header}))
    return of(null);
  }

  private _headerNewOrderFlow(): IHeader {
    const header: IHeader = {
      title: 'rentbook',
      leftIcon: 'keyboard_arrow_left',
      titClass: 'mat-title',
      lastUrl: 'main/book-to-rent',
      centered: true,
    }
    return header;
  }
}
