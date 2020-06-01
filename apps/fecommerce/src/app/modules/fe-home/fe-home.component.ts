import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { setCurrentOrderRequest, clearCurrentOrderRequest, OrderService, setOrderArticlesRequest } from '@fecommerce-workspace/data-store-lib';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Order } from '@fecommerce-workspace/data-store-lib';
import { refreshOrdersRequest } from '@fecommerce-workspace/data-store-lib';
import { takeUntil } from 'rxjs/operators';
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
  private _subscriptions = new Subject<any>();

  constructor(
    private _store: Store,
    private _router: Router,
    private _storeOrders: Store<{ orders: Order[] }>,
    private _orderService: OrderService
  ) {
    this.orders$ = this._storeOrders.pipe(select('orders'));
    this.orders$.pipe(takeUntil(this._subscriptions))
    .subscribe(data => {
      if (data.length) {
        data = data.slice().sort((a, b) => b.id - a.id)
      }
      this.orders = data;
    });
    this._store.dispatch(clearCurrentOrderRequest());
    this._store.dispatch(setOrderArticlesRequest({orderArticles: []}));
    this._storeOrders.dispatch(refreshOrdersRequest())
  }

  ngOnInit(): void { }

  public createOrder(): void {
    this._router.navigate(['/neworder']);
  }

  public openOrder(order: Order): void {
    this._storeOrders.dispatch(setCurrentOrderRequest({order}))
    this._store.dispatch(setOrderArticlesRequest({ orderArticles: order?.articles }));
    this._router.navigate(['/order']);
  }

  ngOnDestroy(): void {
    this._subscriptions.next();
    this._subscriptions.complete();
  }
}
