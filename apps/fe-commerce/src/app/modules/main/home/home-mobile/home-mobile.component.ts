import { Component, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IOrder,IArticleLine } from '@fecommerce-workspace/data';
import { OrderService, TranslationService, HeaderService, AuthService } from '@fecommerce-workspace/data';
import { HomeComponent } from '../home.component';
import { LayoutService } from '../../shared/services/layout.service';

@Component({
  selector: 'home-mobile',
  templateUrl: './home-mobile.component.html',
  styleUrls: ['./home-mobile.component.scss']
})
export class HomeMobileComponent extends HomeComponent implements OnDestroy {
  constructor(
    public store: Store<{ orders: IOrder[], currentOrder: IOrder, orderArticles: IArticleLine[] }>,
    public router: Router,
    public orderService: OrderService,
    public translationService: TranslationService,
    public headerService: HeaderService,
    public layoutService: LayoutService,
    public authService: AuthService
  ) {
    super(
      store,
      router,
      orderService,
      translationService,
      headerService,
      layoutService,
      authService
    );
    setTimeout(() => {
      this.loading = true;

    });

    this.subscribeToOrders();
    this.subscribeToCurrentOrder();
    this.subscribeToHeader();

    this.clearData();
    this.refreshOrders();
  }

  /**
   * Create order-
   */
  public createOrder() {
    // this.store.dispatch(appendOrderRequest({order: null}))
    this.orderService.orderFlow = 'new';
    this.clearData();
    this.router.navigate(['/main/customer-search']);
  }

  /**
   * Open an exixting order.
   * @param order
   */
  public openOrder(order: IOrder): void {
    this.orderService.orderFlow = 'edit';
    this.setCurrentOrder(order);
    this.router.navigate(['/main/order-overview']);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
