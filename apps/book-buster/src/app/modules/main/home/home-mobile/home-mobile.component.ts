import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { OrderService, IOrder, HeaderService, TranslationService } from '@fecommerce-workspace/data-store-lib';
import { HomeComponent } from '../home.component';
import { LayoutService } from '../../shared/services/layout.service';

@Component({
  selector: 'home-mobile',
  templateUrl: './home-mobile.component.html',
  styleUrls: ['./home-mobile.component.scss']
})
export class HomeMobileComponent extends HomeComponent implements OnDestroy {
  constructor(
    public store: Store<{ orders: IOrder[], currentOrder: IOrder }>,
    public router: Router,
    public orderService: OrderService,
    public translationService: TranslationService,
    public headerService: HeaderService,
    public layoutService: LayoutService
  ) {
    super(
      store,
      router,
      orderService,
      translationService,
      headerService,
      layoutService
    );
    this.orders$ = this.store.pipe(select('orders'));
    this.subscriptions.add(
      this.orders$.subscribe(data => {
        if (data.length) {
          data = data.slice().sort((a, b) => b.id - a.id)
        }
        this.orders = data;
      })

      )

      this.currentOrder$ = this.store.pipe(select('currentOrder'));
      this.subscriptions.add(
      this.currentOrder$.subscribe(data => {

        this.currentOrder = data;
      })
      );

      this.subscriptions.add(
        this.headerService.rightIconClicked
        .subscribe(() => this.logout())
      );

      this.clearData();
      this.refreshOrders();
  }

  /**
   * Create order-
   */
  public createOrder() {
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
    this.setOrderArticles(order);
    this.router.navigate(['/main/order-overview']);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
