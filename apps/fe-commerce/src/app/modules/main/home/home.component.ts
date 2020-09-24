import { Component, OnDestroy } from '@angular/core';
import { LayoutService } from '../shared/services/layout.service';
import { IOrder,IArticleLine } from '@fecommerce-workspace/data';
import { clearCurrentOrderRequest, refreshOrdersRequest, getOrderRequest } from '@fecommerce-workspace/data';
import { OrderService, TranslationService, HeaderService, AuthService } from '@fecommerce-workspace/data';
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
  public orders: IOrder[] = [];
  public currentOrder$: Observable<IOrder>;
  public currentOrder: IOrder;
  public loading = true;
  public previewLoading = true;

  constructor(
    public store: Store<{ orders: IOrder[], currentOrder: IOrder }>,
    public router: Router,
    public orderService: OrderService,
    public translationService: TranslationService,
    public headerService: HeaderService,
    public layoutService: LayoutService,
    public authService: AuthService
  ) { }

  /**
   * Logout of the app.
   */
  public logout() {
    this.authService.logout();
  }

   /**
   * Set current order in data store
   * @param order
   */
  public setCurrentOrder(order: IOrder) {
    this.store.dispatch(getOrderRequest({ orderId: order?.uuid}))
  }

 /**
   * Clear current order and order articles.
   */
  public clearData() {
    this.store.dispatch(clearCurrentOrderRequest());
  }

  /**
   * Get all the updated orders.
   */
  public refreshOrders() {
    this.store.dispatch(refreshOrdersRequest())
  }

  /**
   * Subscribe to orders reducer.
   */
  public subscribeToOrders() {
    this.orders$ = this.store.pipe(select('orders'));
    this.subscriptions.add(
      this.orders$.subscribe((data: any) => {
        this.orders = data?.body?.data?.orders;
        this.loading = false;
      })
    )
  }

  /**
   * Subscribe to current order reducer.
   */
  public subscribeToCurrentOrder() {
    this.currentOrder$ = this.store.pipe(select('currentOrder'));
    this.subscriptions.add(
      this.currentOrder$.subscribe((data: any) => {
        this.currentOrder = data;
        this.previewLoading = false;
      })
    );
  }

  /**
   * Subscribe to header events.
   */
  public subscribeToHeader() {
    this.subscriptions.add(
      this.headerService.rightIconClicked
        .subscribe(() => this.logout())
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
