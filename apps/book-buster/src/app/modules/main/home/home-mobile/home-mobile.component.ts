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
    this.subscriptions.add(
      this.headerService.rightIconClicked
      .subscribe(() => this.logout())
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
