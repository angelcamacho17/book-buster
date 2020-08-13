import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { IHeader, setHeaderRequest, OrderService } from '@fecommerce-workspace/data-store-lib';

@Injectable()
export class HomeResolver implements Resolve<any> {
  constructor(
    private _store: Store<{}>,
    private _orderService: OrderService
  ) {
    this._orderService.setOrderModifiedState(false);
  }

  resolve(): Observable<any> {
    const header: IHeader = {
      title: 'home',
      rightIcon: 'exit_to_app',
      rightIconClass: 'right-icon',
      titClass: 'mat-display-1',
      centered: true
    }

    this._store.dispatch(setHeaderRequest({ header }))
    return of(null);
  }
}
