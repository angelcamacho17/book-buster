import { Component, OnInit, OnDestroy, Renderer2, AfterViewInit, ViewChild, ComponentRef, ViewContainerRef, ComponentFactory } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, Subject } from 'rxjs';
import { HeaderService, IOrder, getCurrentOrderRequest, IOrderArticle, handleOrderRequest, setOrderArticlesRequest, refreshOrderArticlesRequest, replaceCurrentOrderRequest, OrderArticlesService, BackNavigationService, TranslationService, setHeaderRequest, IHeader, deleteOrderRequest, OrderService, setCurrentOrderRequest, replaceOrderRequest } from '@fecommerce-workspace/data-store-lib';
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

  constructor(
    public store: Store<{ currentOrder: IOrder, orderArticles: IOrderArticle[] }>,
    public snackBar: MatSnackBar,
    public router: Router,
    // public matDialog: MatDialog,
    public ordArtsService: OrderArticlesService,
    public bnService: BackNavigationService,
    public transServ: TranslationService,
    public headerService: HeaderService,
    public orderService: OrderService,
    public layoutService: LayoutService
  ) { }

  ngAfterViewInit(): void { }

  ngOnInit(): void {
    this.orderService.switchCustomerFlow = false;    // Reset flag of customer flow.
    // this._loadComponent();
  }


  public subscribeToHeader() {

  }

  public deleteOrder() {
    // const dialogRef = this.matDialog.open(DialogComponent, {
    //   width: '280px',
    //   height: '120px',
    //   data: {
    //     msg: this.transServ.get('deleteord'),
    //     firstButton: this.transServ.get('cancel'),
    //     secondButton: this.transServ.get('delete'),
    //     buttonColor: 'red'
    //   }
    // });
    // dialogRef.afterClosed().subscribe(data => {
    //   if (data === undefined) {
    //     // Is undefined when the user closes
    //     // the dialog without an action
    //     return;
    //   }
    //   if (data?.result === 'DELETE') {
    //     this.store.dispatch(deleteOrderRequest());
    //     this.router.navigate(['/home']);
    //   }
    // });
  }

  public orderConfirmed(): void {
    // if (isUndefined(this.order?.id) || this.order?.id == null) {
    // }
    if (this.updatedOrder() === null) {
    }
    this.store.dispatch(replaceCurrentOrderRequest({ order: this.updatedOrder() }))
    this.store.dispatch(handleOrderRequest({ order: this.currentOrder }));
    this.store.dispatch(setOrderArticlesRequest({ orderArticles: [] }));
    const msg = 'Order succesfully confirmed';
    this.snackBar.open(msg, '', {
      duration: 5000,
    });

    this.router.navigate(['/home']);
  }

  public updatedOrder(): IOrder {
    const order: IOrder = {
      id: this.currentOrder?.id,
      description: this.currentOrder.description,
      articles: this.articles,
      amount: this.getTotal(),
      customer: this.currentOrder.customer,
      createdBy: this.currentOrder.createdBy
    };
    return order;
  }

  public changeCustomer(): void {
    // const dialogRef = this.matDialog.open(DialogComponent, {
    //   width: '280px',
    //   height: '248px',
    //   data: {
    //     title: this.transServ.get('switchcus'),
    //     msg: this.transServ.get('switchcusmes'),
    //     firstButton: this.transServ.get('cancel'),
    //     secondButton: this.transServ.get('switch'),
    //     buttonColor: 'blue'
    //   }
    // });

    // this.subscriptions.add(
    //   dialogRef.afterClosed().subscribe(data => {
    //     if (isUndefined(data)) {
    //       // Is undefined when the user closes
    //       // the dialog without an action
    //       return;
    //     }
    //     if (data?.result === 'SWITCH') {
    //       this.orderService.switchCustomerFlow = true;
    //       this.router.navigate(['/main/customer-search'])
    //     }
    //   })
    // );
  }

  public openItems(): void {
    this.router.navigate(['/main/order-items']);
  }

  public returnUrl(): void {
    this.router.navigate(['/main/home']);
  }


  public _goBack() {
    console.log('order modificada ', this.orderService.getOrderModifiedState());

    if (this.orderService.getOrderModifiedState()) {
      this._openConfirmDialog();
    } else {
      this.returnUrl();
    }
  }

  public getTotal(): number {
    let total = this.ordArtsService.getTotal();
    total = Math.round(total * 100) / 100;
    return total > 0 ? total : 0;
  }

  public _openConfirmDialog() {
    // const message = this.transServ.get('progressord');
    // const dialogRef = this.matDialog.open(ConfirmDiscardDialogComponent, {
    //   data: {
    //     title: this.transServ.get('saveord'),
    //     message,
    //     firstBtn: this.transServ.get('discard'),
    //     secondBtn: this.transServ.get('save')
    //   }
    // });

    // this.subscriptions.add(
    //   dialogRef.afterClosed().subscribe((result) => {
    //     if (result) {
    //       this.store.dispatch(replaceOrderRequest({ order: this.currentOrder }));
    //     }
    //     this.store.dispatch(setCurrentOrderRequest({ order: null }))
    //     const orderArticles = [];
    //     this.store.dispatch(setOrderArticlesRequest({ orderArticles }));

    //     this.returnUrl();
    //   })
    // );
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

}
