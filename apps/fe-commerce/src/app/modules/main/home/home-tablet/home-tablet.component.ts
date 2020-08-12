import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IOrder, OrderService, BackNavigationService, HeaderService, clearCurrentOrderRequest, setOrderArticlesRequest, refreshOrdersRequest, setCurrentOrderRequest, TranslationService, deleteOrderRequest, replaceCurrentOrderRequest } from '@fecommerce-workspace/data-store-lib';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CustomerSearchTabletComponent } from '../../customer-search/customer-search-tablet/customer-search-tablet.component';
import { ArticleSearchTabletComponent } from '../../article-search/article-search-tablet/article-search-tablet.component';

@Component({
  selector: 'home-tablet',
  templateUrl: './home-tablet.component.html',
  styleUrls: ['./home-tablet.component.scss']
})
export class HomeTabletComponent implements OnInit, OnDestroy {
  public orders$: Observable<IOrder[]>;
  public orders: IOrder[];
  public currentOrder$: Observable<IOrder>;
  public currentOrder: IOrder;
  private _subscriptions: Subscription = new Subscription();
  constructor(
    public orderService: OrderService,
    private _store: Store<{ orders: IOrder[], currentOrder: IOrder }>,
    private _router: Router,
    private _orderService: OrderService,
    private _translationService: TranslationService,
    private _matDialog: MatDialog,
    private _headerService: HeaderService
  ) {
    this.orders$ = this._store.pipe(select('orders'));
    this._subscriptions.add(
      this.orders$.subscribe(data => {
        if (data.length) {
          data = data.slice().sort((a, b) => b.id - a.id)
        }
        this.orders = data;
      })
    );

    this.currentOrder$ = this._store.pipe(select('currentOrder'));
    this._subscriptions.add(
      this.currentOrder$.subscribe(data => {
        this.currentOrder = data;
        console.log(data)
      })
    );


    this._store.dispatch(clearCurrentOrderRequest());
    this._store.dispatch(setOrderArticlesRequest({ orderArticles: [] }));
    this._store.dispatch(refreshOrdersRequest())
  }

  ngOnInit(): void {
    console.log('subscriptions array', this._subscriptions)
    this.subscribeToHeader();
  }

  public subscribeToHeader() {
    this._subscriptions.add(
      this._headerService.rightIconClicked
        .subscribe(() => this._logout())
    );
  }

  private _logout() {
    this._router.navigate(['/login'])
  }


  public viewOrder(order: IOrder): void {
    this._store.dispatch(replaceCurrentOrderRequest({ order }))
    this._store.dispatch(setOrderArticlesRequest({ orderArticles: order?.articles }));
  }

  public openOrder(order: IOrder): void {
    // this._store.dispatch(replaceCurrentOrderRequest({ order }))
    // this._store.dispatch(setOrderArticlesRequest({ orderArticles: order?.articles }));
    this._orderService.orderFlow = 'edit';
    this._router.navigate(['/main/order-overview']);
  }

  public deleteOrder() {
    const dialogRef = this._matDialog.open(DialogComponent, {
      width: '280px',
      height: '120px',
      data: {
        msg: this._translationService.get('deleteord'),
        firstButton: this._translationService.get('cancel'),
        secondButton: this._translationService.get('delete'),
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
        // this.router.navigate(['/home']);
      }
    });
  }

public createOrder() {
  this.orderService.orderFlow = 'new';
  this._openCustomerDialog();
}

private _openCustomerDialog(): void {
  const dialogRef = this._matDialog.open(CustomerSearchTabletComponent, {
    panelClass: 'modal-dialog'
  });

  this._subscriptions.add(
    dialogRef.afterClosed().subscribe(() => this._openArticlesDialog())
  );
}

private _openArticlesDialog(): void {
  const dialogRef = this._matDialog.open(ArticleSearchTabletComponent, {
    panelClass: 'modal-dialog',
    disableClose: true
  });

  this._subscriptions.add(
    dialogRef.afterClosed().subscribe()
  );
}

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
