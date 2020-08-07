import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IOrder, OrderService, BackNavigationService, HeaderService, clearCurrentOrderRequest, setOrderArticlesRequest, refreshOrdersRequest, setCurrentOrderRequest } from '@fecommerce-workspace/data-store-lib';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'home-tablet',
  templateUrl: './home-tablet.component.html',
  styleUrls: ['./home-tablet.component.scss']
})
export class HomeTabletComponent implements OnInit {
  public orders$: Observable<IOrder[]>;
  public orders: IOrder[];
  private _subscriptions: Subscription = new Subscription();

  constructor(
    private _store: Store,
    private _router: Router,
    private _orderService: OrderService,
    private _storeOrders: Store<{ orders: IOrder[] }>,
    private _backNavigationService: BackNavigationService,
    private _headerService: HeaderService
  ) {
    this.orders$ = this._storeOrders.pipe(select('orders'));
    this._subscriptions.add(
      this.orders$.subscribe(data => {
        if (data.length) {
          data = data.slice().sort((a, b) => b.id - a.id)
        }
        this.orders = data;
      })
    );


    this._store.dispatch(clearCurrentOrderRequest());
    this._store.dispatch(setOrderArticlesRequest({ orderArticles: [] }));
    this._storeOrders.dispatch(refreshOrdersRequest())
  }

  ngOnInit(): void {
  }


  public openOrder(order: IOrder): void {
    this._storeOrders.dispatch(setCurrentOrderRequest({ order }))
    this._store.dispatch(setOrderArticlesRequest({ orderArticles: order?.articles }));
    this._orderService.orderFlow = 'edit';
    this._router.navigate(['/main/order-overview']);
  }
}
