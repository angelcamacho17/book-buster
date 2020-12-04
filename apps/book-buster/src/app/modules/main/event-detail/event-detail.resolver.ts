import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IOrder, clearCurrentOrderRequest, refreshOrdersRequest, IHeader, setHeaderRequest, OrderService } from '@fecommerce-workspace/data';

@Injectable()
export class EventDetailResolver implements Resolve<any> {
  orders$: Observable<unknown>;
  constructor(
    private _store: Store<{}>,
    private _router: Router,
    ) {}

  resolve(): Observable<any> {
    const header = this._headerNewOrderFlow();
    this._store.dispatch(setHeaderRequest({header}))
    return of(null);
  }

  private _headerNewOrderFlow(): IHeader {
    let title = 'detailPost';
    if (this._router.url.toString().includes('rent')) {
      title = 'detailRent';
    }
    const header: IHeader = {
      title,
      leftIcon: 'close',
      titClass: 'mat-title',
      lastUrl: 'loc',
      centered: true,
    }
    return header;
  }
}
