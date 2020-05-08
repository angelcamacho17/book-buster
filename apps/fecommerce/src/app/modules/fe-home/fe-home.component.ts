import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { setCurrentOrderRequest, clearCurrentOrderRequest } from '@fecommerce-workspace/data-store-lib';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Order } from '@fecommerce-workspace/data-store-lib';
import { refreshOrdersRequest } from '@fecommerce-workspace/data-store-lib';
// import * as ordersData from '../../../assets/data/orders.json';

@Component({
  selector: 'fe-home',
  templateUrl: './fe-home.component.html',
  styleUrls: ['./fe-home.component.scss'],
})
export class FeHomeComponent implements OnInit, OnDestroy {
  public orders$: Observable<Order[]>;
  public orders: Order[];
  public display = false;
  private _subs: Subscription;

  constructor(
    private _store: Store,
    private _router: Router,
    private _storeOrders: Store<{ orders: Order[] }>
  ) {
    this.orders$ = this._storeOrders.pipe(select('orders'));
    this._subs = this.orders$.subscribe(data => {
      if (data.length) {
        data = data.slice().sort((a, b) => b.id - a.id)
      }
      this.orders = data;
    })
    this._store.dispatch(clearCurrentOrderRequest());
    this._storeOrders.dispatch(refreshOrdersRequest())
  }

  ngOnInit(): void { }

  public createOrder(): void {
    this._router.navigate(['/neworder']);
  }

  public openOrder(order: Order): void {
    this._storeOrders.dispatch(setCurrentOrderRequest({order}))
    this._router.navigate(['/order']);
  }

  ngOnDestroy(): void {
    if(this._subs) {
      this._subs.unsubscribe();
    }
  }
}
