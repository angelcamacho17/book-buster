import { Component, OnDestroy } from '@angular/core';
import { LayoutService } from '../shared/services/layout.service';
import { OrderService, IOrder, TranslationService, HeaderService, clearCurrentOrderRequest, setOrderArticlesRequest, refreshOrdersRequest, setCurrentOrderRequest, replaceCurrentOrderRequest, IOrderArticle } from '@fecommerce-workspace/data-store-lib';
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
  ) { }

  /**
   * Logout of the app.
   */
  public logout() {
    this.router.navigate(['/login'])
  }

  /**
   * Set current order in data store
   * @param order
   */
  public setCurrentOrder(order: IOrder) {
    this.store.dispatch(setCurrentOrderRequest({ order }))
  }

  /**
   * Set order articles opf the current order.
   */
  public setOrderArticles(order: IOrder) {
    this.store.dispatch(setOrderArticlesRequest({ orderArticles: order?.articles }))

  }

  /**
   * Clear current order and order articles.
   */
  public clearData() {
    this.store.dispatch(clearCurrentOrderRequest());
    this.store.dispatch(setOrderArticlesRequest({ orderArticles: [] }));
  }

  /**
   * Get all the updated orders.
   */
  public refreshOrders() {
    console.log('here')
    this.store.dispatch(refreshOrdersRequest())
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
