import { Component, OnInit, OnDestroy, Renderer2, AfterViewInit } from '@angular/core';
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
  private _subscriptions: Subscription[] = [];
  public icon = 'keyboard_arrow_left';
  public lastUrl = 'article';
  public delete = false;

  constructor(
    private _store: Store<{ currentOrder: IOrder, orderArticles: IOrderArticle[] }>,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _matDialog: MatDialog,
    private _ordArtsService: OrderArticlesService,
    private _bnService: BackNavigationService,
    private _transServ: TranslationService,
    private _headerService: HeaderService,
    private _orderService: OrderService
  ) {
    this.$articles = this._store.pipe(select('orderArticles'));
    this._subscriptions.push(
      this.$articles.subscribe((arts) => {
        this.articles = arts;
      })
    );

    this.currentOrder$ = this._store.pipe(select('currentOrder'));
    this._subscriptions.push(
      this.currentOrder$.subscribe(data => {
        this.currentOrder = data;
      })
    );

    this._subscriptions.push(
      this._headerService.goBack.subscribe(() => this._goBack())
    );


    this._store.dispatch(getCurrentOrderRequest());
    this._store.dispatch(refreshOrderArticlesRequest());
    this._store.dispatch(getCurrentOrderRequest());

  }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this._orderService.switchCustomerFlow = false;    // Reset flag of customer flow.
    this.subscribeToHeader();
  }

  public subscribeToHeader() {
    this._subscriptions.push(
      this._headerService.rightIconClicked
        .subscribe(() => this._deleteOrder())
    );
  }

  private _deleteOrder() {
    const dialogRef = this._matDialog.open(DialogComponent, {
      width: '280px',
      height: '120px',
      data: {
        msg: this._transServ.get('deleteord'),
        firstButton: this._transServ.get('cancel'),
        secondButton: this._transServ.get('delete'),
        buttonColor: 'red'
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data === undefined) {
        // Is undefined when the user closes
        // the dialog without an action
        return;
      }
      if (data?.result === 'DELETE') {
        this._store.dispatch(deleteOrderRequest());
        this._router.navigate(['/home']);
      }
    });
  }

  public orderConfirmed(): void {
    // if (isUndefined(this.order?.id) || this.order?.id == null) {
    // }
    if (this.updatedOrder() === null) {
    }
    this._store.dispatch(replaceCurrentOrderRequest({ order: this.updatedOrder() }))
    this._store.dispatch(handleOrderRequest({ order: this.currentOrder }));
    this._store.dispatch(setOrderArticlesRequest({ orderArticles: [] }));
    const msg = 'Order succesfully confirmed';
    this._snackBar.open(msg, '', {
      duration: 5000,
    });

    this._router.navigate(['/home']);
  }

  private updatedOrder(): IOrder {
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
    const dialogRef = this._matDialog.open(DialogComponent, {
      width: '280px',
      height: '248px',
      data: {
        title: this._transServ.get('switchcus'),
        msg: this._transServ.get('switchcusmes'),
        firstButton: this._transServ.get('cancel'),
        secondButton: this._transServ.get('switch'),
        buttonColor: 'blue'
      }
    });

    this._subscriptions.push(
      dialogRef.afterClosed().subscribe(data => {
        if (isUndefined(data)) {
          // Is undefined when the user closes
          // the dialog without an action
          return;
        }
        if (data?.result === 'SWITCH') {
          // this._bnService.switchCustomer(true);
          this._orderService.switchCustomerFlow = true;
          this._router.navigate(['/main/customer-search'])
          // , {
          //   state: {
          //     order: this.order
          //   },
          //   queryParams: {
          //     lastUrl: 'order'
          //   }
          // });
        }
      })
    );
  }

  public openItems(): void {
    this._router.navigate(['/main/order-items']);
  }

  public returnUrl(): void {
    this._router.navigate(['/main/home']);
  }


  private _goBack() {
    // console.log('order modificada ', this._orderService.getOrderModifiedState());

    this.returnUrl()
    // if (this._orderService.getOrderModifiedState()) {
    //   this._openConfirmDialog();
    // } else {
    // }
  }

  public getTotal(): number {
    let total = this._ordArtsService.getTotal();
    total = Math.round(total * 100) / 100;
    return total > 0 ? total : 0;
  }

  private _openConfirmDialog() {
    const message = this._transServ.get('progressord');
    const dialogRef = this._matDialog.open(ConfirmDiscardDialogComponent, {
      data: {
        title: this._transServ.get('saveord'),
        message,
        firstBtn: this._transServ.get('discard'),
        secondBtn: this._transServ.get('save')
      }
    });

    this._subscriptions.push(
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this._store.dispatch(replaceOrderRequest({ order: this.currentOrder }));
        }
        this._store.dispatch(setCurrentOrderRequest({ order: null }))
        const orderArticles = [];
        this._store.dispatch(setOrderArticlesRequest({ orderArticles }));
  
        this._router.navigate(['/main/home']);
      })
    );
  }

  ngOnDestroy(): void {
    if (this._subscriptions) {
      this._subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
    }
  }

}
