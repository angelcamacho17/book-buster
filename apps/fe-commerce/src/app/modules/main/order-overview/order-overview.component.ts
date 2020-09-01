import { Component, OnInit, OnDestroy, Renderer2, AfterViewInit, ViewChild, ComponentRef, ViewContainerRef, ComponentFactory } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, Subject } from 'rxjs';
import { HeaderService, IOrder, getCurrentOrderRequest, IOrderArticle, handleOrderRequest, setOrderArticlesRequest, refreshOrderArticlesRequest, replaceCurrentOrderRequest, OrderArticlesService, TranslationService, setHeaderRequest, IHeader, deleteOrderRequest, OrderService, setCurrentOrderRequest, replaceOrderRequest } from '@fecommerce-workspace/data-store-lib';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { isUndefined } from 'util';
import { DialogComponent } from '../shared/components/dialog/dialog.component';
import { takeUntil } from 'rxjs/operators';
import { ConfirmDiscardDialogComponent } from '../shared/components/confirm-discard/confirm-discard-dialog.component';
import { LayoutService } from '../shared/services/layout.service';
// import { OrderOverviewTabletComponent } from './order-overview-tablet/order-overview-tablet.component';
// import { OrderOverviewMobileComponent } from './order-overview-mobile/order-overview-mobile.component';

@Component({
  selector: 'order-overview',
  templateUrl: './order-overview.component.html',
  styleUrls: ['./order-overview.component.scss']
})
export class OrderOverviewComponent implements OnInit, OnDestroy, AfterViewInit {
  public currentOrder$: Observable<IOrder>;
  public currentOrder: IOrder;
  public $articles: Observable<IOrderArticle[]>;
  public articles: IOrderArticle[] = [];
  public orderArticles$: Observable<IOrderArticle[]>;
  public orderArticle: IOrderArticle[];
  public subscriptions = new Subscription();
  public totalPrice = 0;

  constructor(
    public store: Store<{ currentOrder: IOrder, orderArticles: IOrderArticle[] }>,
    public snackBar: MatSnackBar,
    public router: Router,
    public matDialog: MatDialog,
    public ordArtsService: OrderArticlesService,
    public transServ: TranslationService,
    public headerService: HeaderService,
    public orderService: OrderService,
    public layoutService: LayoutService,
  ) { }

  ngAfterViewInit(): void { }

  ngOnInit(): void {
    this.orderService.switchCustomerFlow = false;    // Reset flag of customer flow.
    // this._loadComponent();
  }

  /**
   * Delete the current order.
   */
  public deleteOrder() {
    const dialogRef = this.matDialog.open(DialogComponent, {
      panelClass: 'no-padding-dialog',
      width: '280px',
      height: '120px',
      data: {
        msg: this.transServ.get('deleteord'),
        firstButton: this.transServ.get('cancel'),
        secondButton: this.transServ.get('delete'),
        buttonColor: 'red'
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      console.log(data);
      if (data === undefined) {
        // Is undefined when the user closes
        // the dialog without an action
        return;
      }
      if (data?.result === 'DELETE') {
        this.store.dispatch(deleteOrderRequest());
        this.router.navigate(['/home']);
      }
    });
  }

  /**
   * On order confirmed.
   */
  public orderConfirmed(): void {
    // if (isUndefined(this.order?.id) || this.order?.id == null) {
    // }
    if (this.getUpdatedOrder() === null) {
    }
    this.store.dispatch(replaceCurrentOrderRequest({ order: this.getUpdatedOrder() }))
    this.store.dispatch(handleOrderRequest({ order: this.currentOrder }));
    this.store.dispatch(setOrderArticlesRequest({ orderArticles: [] }));
    const msg = 'Order succesfully confirmed';
    this.snackBar.open(msg, '', {
      duration: 5000,
    });

    this.router.navigate(['/home']);
  }

  /**
   * Get updated order with updated articles.
   */
  public getUpdatedOrder(): IOrder {
    const order: IOrder = {
      id: this.currentOrder?.id,
      description: this.currentOrder.description,
      articles: this.articles,
      amount: this.totalPrice,
      customer: this.currentOrder.customer,
      createdBy: this.currentOrder.createdBy
    };
    return order;
  }

  /**
   * Change customer dialog.
   */
  public changeCustomer(): void {
    const dialogRef = this.matDialog.open(DialogComponent, {
      width: '280px',
      height: '248px',
      data: {
        title: this.transServ.get('switchcus'),
        msg: this.transServ.get('switchcusmes'),
        firstButton: this.transServ.get('cancel'),
        secondButton: this.transServ.get('switch'),
        buttonColor: 'blue'
      }
    });

    this.subscriptions.add(
      dialogRef.afterClosed().subscribe(data => {
        if (isUndefined(data)) {
          // Is undefined when the user closes
          // the dialog without an action
          return;
        }
        if (data?.result === 'SWITCH') {
          this.orderService.switchCustomerFlow = true;
          this.router.navigate(['/main/customer-search'])
        }
      })
    );
  }

  /**
   * Go to order items.
   */
  public openItems(): void {
    this.router.navigate(['/main/order-items']);
  }

  /**
   * Return to home.
   */
  public returnUrl(): void {
    this.router.navigate(['/main/home']);
  }

  /**
   * Go back and handle if there is a current order.
   */
  public goBack() {

    if (this.orderService.getOrderModifiedState()) {
      this.openConfirmDialog();
    } else {
      this.returnUrl();
    }
  }

  /**
   * Open confirm/discard current order.
   */
  public openConfirmDialog() {
    const message = this.transServ.get('progressord');
    const dialogRef = this.matDialog.open(ConfirmDiscardDialogComponent, {
      panelClass: 'no-padding-dialog',
      data: {
        title: this.transServ.get('saveord'),
        message,
        firstBtn: this.transServ.get('discard'),
        secondBtn: this.transServ.get('save')
      }
    });

    this.subscriptions.add(
      dialogRef.afterClosed().subscribe((result) => {
        console.log(result);
        if (result === true) {
          this.store.dispatch(replaceOrderRequest({ order: this.currentOrder }));
          this._cleanCurrentorder();
          this.returnUrl();
        } else if (result === false){
          this._cleanCurrentorder();
          this.returnUrl();
        }
      })
    );
  }

  /**
   * Reset current order values.
   */
  private _cleanCurrentorder(): void {
    this.store.dispatch(setCurrentOrderRequest({ order: null }))
    const orderArticles = [];
    this.store.dispatch(setOrderArticlesRequest({ orderArticles }));
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

}
