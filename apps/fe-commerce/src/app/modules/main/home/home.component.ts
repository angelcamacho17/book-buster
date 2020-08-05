import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { setCurrentOrderRequest, clearCurrentOrderRequest, OrderService, setOrderArticlesRequest, BackNavigationService, HeaderService } from '@fecommerce-workspace/data-store-lib';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { IOrder } from '@fecommerce-workspace/data-store-lib';
import { refreshOrdersRequest } from '@fecommerce-workspace/data-store-lib';
import { LayoutService } from '../shared/services/layout.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public orders$: Observable<IOrder[]>;
  public orders: IOrder[];
  public display = false;
  public cardOverflows = false;
  private _subscriptions: Subscription = new Subscription();

  constructor(
    private _store: Store,
    private _router: Router,
    private _ordSer: OrderService,
    private _storeOrders: Store<{ orders: IOrder[] }>,
    private _bnService: BackNavigationService,
    private _headerService: HeaderService,
    private _layoutService: LayoutService
  ) {
    this.orders$ = this._storeOrders.pipe(select('orders'));
    this._subscriptions= this.orders$.subscribe(data => {
      if (data.length) {
        data = data.slice().sort((a, b) => b.id - a.id)
      }
      this.orders = data;
    });


    this._store.dispatch(clearCurrentOrderRequest());
    this._store.dispatch(setOrderArticlesRequest({ orderArticles: [] }));
    this._storeOrders.dispatch(refreshOrdersRequest())
  }

  ngOnInit(): void {
    console.log('subscriptions array', this._subscriptions)
    this.subscribeToHeader();
  }

  public subscribeToHeader() {
    this._subscriptions.add(this._headerService.rightIconClicked
      .subscribe(() => this._logout())
    );
  }

  private _logout() {
    this._router.navigate(['/login'])
  }

  public createOrder(): void {
    this._bnService.switchCustomer(false);
    this._ordSer.orderFlow = 'new';
    this._router.navigate(['/main/customer-search']);
  }

  public openOrder(order: IOrder): void {
    this._storeOrders.dispatch(setCurrentOrderRequest({ order }))
    this._store.dispatch(setOrderArticlesRequest({ orderArticles: order?.articles }));
    this._ordSer.orderFlow = 'edit';
    this._router.navigate(['/main/order-overview']);
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
