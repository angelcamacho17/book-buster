import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IOrder, OrderService, HeaderService, setOrderArticlesRequest, TranslationService, replaceCurrentOrderRequest } from '@fecommerce-workspace/data-store-lib';
import { HomeComponent } from '../home.component';
import { LayoutService } from '../../shared/services/layout.service';

@Component({
  selector: 'home-tablet',
  templateUrl: './home-tablet.component.html',
  styleUrls: ['./home-tablet.component.scss']
})
export class HomeTabletComponent extends HomeComponent implements OnDestroy {
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
    this.router.navigate(['/main/order-overview']);
  }

  public viewOrder(order: IOrder): void {
    this.setCurrentOrder(order);
  }

  // public deleteOrder() {
  //   const dialogRef = this._matDialog.open(DialogComponent, {
  //     width: '280px',
  //     height: '120px',
  //     data: {
  //       msg: this._translationService.get('deleteord'),
  //       firstButton: this._translationService.get('cancel'),
  //       secondButton: this._translationService.get('delete'),
  //       buttonColor: 'red'
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe(data => {
  //     if (data === undefined) {
  //       // Is undefined when the user closes
  //       // the dialog without an action
  //       return;
  //     }
  //     if (data?.result === 'DELETE') {
  //       this._store.dispatch(deleteOrderRequest());
  //       // this.router.navigate(['/home']);
  //     }
  //   });
  // }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
