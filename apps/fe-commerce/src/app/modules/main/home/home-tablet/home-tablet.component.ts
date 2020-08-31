import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { IOrder, OrderService, HeaderService, TranslationService, clearCurrentOrderRequest, setOrderArticlesRequest, refreshOrdersRequest } from '@fecommerce-workspace/data-store-lib';
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
    this.orders$ = this.store.pipe(select('orders'));
    this.subscriptions.add(
      this.orders$.subscribe(data => {
        console.log('SETTINGS ORDERS', this.orders)
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
   * Create order.
   */
  public createOrder() {
    this.orderService.orderFlow = 'new';
    this.clearData();
    this.router.navigate(['/main/order-overview']);
  }

  /**
   * Open an exizsting order.
   * @param order
   */
  public openOrder(order: IOrder): void {
    this.orderService.orderFlow = 'edit';
    this.router.navigate(['/main/order-overview']);
  }

  /**
   * To preview an order in the rioght side of the screen.
   * @param order
   */
  public previewOrder(order: IOrder): void {
    this.clearData();
    this.setCurrentOrder(order);
    this.setOrderArticles(order);
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
