import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { IHeader, setHeaderRequest, OrderService } from '@fecommerce-workspace/data-store-lib';

@Injectable()
export class CustomerSearchResolver implements Resolve<any> {
  orders$: Observable<unknown>;
  constructor(
    private _store: Store<{}>,
    private orderService: OrderService
    ) {}

  resolve(): Observable<any> {
    const flow = this.orderService.orderFlow;
    let header;
    if (flow==='new' && this.orderService.currentOrder) {
      header = this._headerNewOrderFlowWithCustomer();
    } else {
      header = flow === 'edit' ? this._headerEditOrderFlow() : this._headerNewOrderFlow();
    }
    this._store.dispatch(setHeaderRequest({header}))
    return of(null);
  }

  private _headerNewOrderFlow(): IHeader {
    const header: IHeader = {
      title: 'neworder',
      leftIcon: 'close',
      titClass: 'mat-title',
      lastUrl: 'main/home',
      centered: true,
      checkGoBack: true
    }
    return header;
  }

  private _headerEditOrderFlow(): IHeader {
    const header: IHeader = {
      title: 'neworder',
      leftIcon: 'keyboard_arrow_left',
      titClass: 'mat-title',
      lastUrl: 'main/order-overview',
      centered: true,
      checkGoBack: true
    }
    return header;
  }

  private _headerNewOrderFlowWithCustomer(): IHeader {
    const header: IHeader = {...
      this._headerNewOrderFlow(),
      rightIcon: 'keyboard_arrow_right',
      rightIconClass: 'navigation-icon'
    }
    return header;
  }
}
