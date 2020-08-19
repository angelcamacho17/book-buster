import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
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
  }

  public createOrder() {
    this.orderService.orderFlow = 'new';
    this.clearCurrentOrder();
    this.router.navigate(['/main/customer-search']);
  }

  public openOrder(order: IOrder): void {
    this.orderService.orderFlow = 'edit';
    this.setCurrentOrder(order);
    this.router.navigate(['/main/order-overview']);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
