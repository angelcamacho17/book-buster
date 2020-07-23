import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Order, getCurrentOrderRequest, OrderArticle, handleOrderRequest, setOrderArticlesRequest, refreshOrderArticlesRequest, replaceCurrentOrderRequest, OrderArticlesService, BackNavigationService, TranslationService } from '@fecommerce-workspace/data-store-lib';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { isUndefined } from 'util';
import { DialogComponent } from '../shared/components/dialog/dialog.component';

@Component({
  selector: 'fe-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {

  public order$: Observable<Order>;
  public order: Order;
  public $articles: Observable<OrderArticle[]>;
  public articles: OrderArticle[] = [];
  public orderArticles$: Observable<OrderArticle[]>;
  public orderArticle: OrderArticle[];
  private _subscriptions = new Subscription();
  public icon = 'keyboard_arrow_left';
  public lastUrl = 'article';
  public delete = false;

  constructor(
    private _store: Store<{ currentOrder: Order, orderArticles: OrderArticle[] }>,
    private _snackBar: MatSnackBar,
    private _router: Router,
    public dialog: MatDialog,
    private _ordArtsService: OrderArticlesService,
    private _bnService: BackNavigationService,
    private _transServ: TranslationService
  ) {
    this.$articles = this._store.pipe(select('orderArticles'));
    this._subscriptions = this.$articles.subscribe((arts) => {
      this.articles = arts;
    })

    this.order$ = this._store.pipe(select('currentOrder'));
    this._subscriptions = this.order$.subscribe(data => {
      this.order = data;
      if (this.order?.id) {
        this.icon = 'close';
        this.lastUrl = 'home';
        this.delete = true;
      }
    });
    this._store.dispatch(getCurrentOrderRequest());

    this._store.dispatch(refreshOrderArticlesRequest());
    this._store.dispatch(getCurrentOrderRequest());

  }

  ngOnInit(): void {
    this._bnService.switchCustomer(false);

  }

  public orderConfirmed(): void {
    // if (isUndefined(this.order?.id) || this.order?.id == null) {
    // }
    if (this.updatedOrder() === null) {
    }
    this._store.dispatch(replaceCurrentOrderRequest({ order: this.updatedOrder() }))
    this._store.dispatch(handleOrderRequest({ order: this.order }));
    this._store.dispatch(setOrderArticlesRequest({ orderArticles: [] }));
    const msg = 'Order succesfully confirmed';
    this._snackBar.open(msg, '', {
      duration: 5000,
    });

    this._router.navigate(['/home']);
  }

  private updatedOrder(): Order {
    const order: Order = {
      id: this.order?.id,
      description: this.order.description,
      articles: this.articles,
      amount: this.getTotal(),
      customer: this.order.customer,
      createdBy: this.order.createdBy
    };
    return order;
  }

  public changeCustomer(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
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

    dialogRef.afterClosed().subscribe(data => {
      if (isUndefined(data)) {
        // Is undefined when the user closes
        // the dialog without an action
        return;
      }
      if (data?.result === 'SWITCH') {
        this._bnService.switchCustomer(true);
        this._router.navigate(['/neworder'])
        // , {
        //   state: {
        //     order: this.order
        //   },
        //   queryParams: {
        //     lastUrl: 'order'
        //   }
        // });
      }
    });
  }

  public openItems(): void {
    this._router.navigate(['/orderitems']);
  }

  public returnUrl(): void {
    this._router.navigate(['/home']);
  }

  public getTotal(): number {
    let total = this._ordArtsService.getTotal() ;
    total = Math.round(total * 100) / 100;
    return total > 0 ? total : 0;
  }

  ngOnDestroy(): void {
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
  }

}