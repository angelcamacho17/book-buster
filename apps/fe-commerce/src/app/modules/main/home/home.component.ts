import { Component, OnDestroy } from '@angular/core';
import { LayoutService } from '../shared/services/layout.service';
import { OrderService, IOrder, TranslationService, HeaderService, clearCurrentOrderRequest, setOrderArticlesRequest, refreshOrdersRequest, setCurrentOrderRequest } from '@fecommerce-workspace/data-store-lib';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  public subscriptions = new Subscription();
  public orders$: Observable<IOrder[]>;
  public orders: IOrder[];
  public currentOrder$: Observable<IOrder>;
  public currentOrder: IOrder;

  constructor(
    public store: Store<{ orders: IOrder[], currentOrder: IOrder }>,
    public router: Router,
    public orderService: OrderService,
    public translationService: TranslationService,
    public headerService: HeaderService,
    public layoutService: LayoutService
  ) {
    this._subscribeToOrders();
    this._subscribeToCurrentOrder();
    this._subscribeToHeader();

    this.clearCurrentOrder();
    this.refreshOrders()
  }

  private _subscribeToOrders() {
    this.orders$ = this.store.pipe(select('orders'));
    this.subscriptions.add(
      this.orders$.subscribe(data => {
        if (data.length) {
          data = data.slice().sort((a, b) => b.id - a.id)
        }
        this.orders = data;
      })
    )
  }

  private _subscribeToCurrentOrder() {
    this.currentOrder$ = this.store.pipe(select('currentOrder'));
    this.subscriptions.add(
      this.currentOrder$.subscribe(data => {
        this.currentOrder = data;
      })
    );
  }

  private _subscribeToHeader() {
    this.subscriptions.add(
      this.headerService.rightIconClicked
        .subscribe(() => this.logout())
    );
  }

  public logout() {
    this.router.navigate(['/login'])
  }

  public openOrder(order: IOrder): void {
    this.orderService.orderFlow = 'edit';
    this.setCurrentOrder(order);
    this.router.navigate(['/main/order-overview']);
  }
  
  public setCurrentOrder(order: IOrder) {
    this.store.dispatch(setCurrentOrderRequest({ order }))
    this.store.dispatch(setOrderArticlesRequest({ orderArticles: order?.articles }))
  }

  public clearCurrentOrder() {
    this.store.dispatch(clearCurrentOrderRequest());
    this.store.dispatch(setOrderArticlesRequest({ orderArticles: [] }));
  }

  public refreshOrders() {
    this.store.dispatch(refreshOrdersRequest())
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
