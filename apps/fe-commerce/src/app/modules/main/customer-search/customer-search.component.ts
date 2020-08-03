import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { refreshCustomersRequest, setCurrentOrderRequest, getCurrentOrderRequest, replaceCurrentOrderRequest, IOrder, ICustomer, setOrderArticlesRequest, handleOrderRequest, TranslationService, OrderService } from '@fecommerce-workspace/data-store-lib';
import { Observable, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { EventService } from '../shared/services/event.service';
import { CustomerRowComponent } from '../shared/components/row/customer-row/customer-row.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDiscardDialogComponent } from '../shared/components/confirm-discard/confirm-discard-dialog.component';

@Component({
  selector: 'customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.scss']
})
export class CustomerSearchComponent implements OnInit, OnDestroy, AfterViewInit {
  public customers$: Observable<ICustomer[]>;
  public customers: ICustomer[];
  public orders: IOrder[];
  public currentOrder$: Observable<IOrder>;
  public currentOrder: IOrder;
  public rowType = CustomerRowComponent;
  public hide = false;
  public shadow = false;
  public emptyResults = true;
  public filteredResults: ICustomer[] = [];
  private _subscriptions$ = new Subject<any>();

  constructor(
    private eventService: EventService,
    private _orderService: OrderService,
    private matDialog: MatDialog,
    private _store: Store<{ orders: IOrder[], currentOrder: IOrder, customers: ICustomer[] }>,
    private _router: Router,
    private _translationService: TranslationService,
  ) {

    this.customers$ = this._store.pipe(select('customers'));
    this.customers$.pipe(
      takeUntil(this._subscriptions$)
    ).subscribe(data => {
      this.customers = data;
    });

    this.currentOrder$ = this._store.pipe(select('currentOrder'));
    this.currentOrder$.pipe(
      takeUntil(this._subscriptions$)
    ).subscribe((currentOrder) => {
      this.currentOrder = currentOrder;
    })

    this.eventService.customerChange.pipe(takeUntil(this._subscriptions$)).subscribe(customer => {
      this.onCustomerChange(customer);
    });

    this._store.dispatch(refreshCustomersRequest());

  }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void { }

  // private openConfirmDialog() {
  //   let message;
  //   if (this.currentOrder?.articles?.length) {
  //     message = this._transServ.get('progressord');
  //   } else {
  //     message = this._transServ.get('noarts');
  //   }
  //   const dialogRef = this.matDialog.open(ConfirmDiscardDialogComponent, {
  //     data: {
  //       title: this._transServ.get('saveord'),
  //       message,
  //       firstBtn: this._transServ.get('discard'),
  //       secondBtn: this._transServ.get('save')
  //     }
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this._store.dispatch(handleOrderRequest({ order: this.currentOrder }));
  //     }
  //     this._store.dispatch(setCurrentOrderRequest({ order: null }))
  //     const orderArticles = [];
  //     this._store.dispatch(setOrderArticlesRequest({ orderArticles }));
  //     return this.goBack();
  //   });
  // }

  public onCustomerChange(customer: ICustomer) {
    const flow = this._orderService.orderFlow;
    if (flow === 'new') {
      if (this._orderService.switchCustomerFlow) {
        this._replaceCustomerOnCurrentOrder(customer);
        this._router.navigate(['/main/order-overview']);
      } else {
        this._setCustomerToNewOrder(customer);
        this._router.navigate(['/main/article-search']);
      }
    } else if (flow === 'edit') {
      this._replaceCustomerOnCurrentOrder(customer);
      this._router.navigate(['/main/order-overview']);
    }
  }

  private _setCustomerToNewOrder(customer: ICustomer) {
    const order: IOrder = {
      description: 'Latest order',
      articles: [],
      amount: 0,
      customer: customer,
      createdBy: 'user'
    }
    this._store.dispatch(setCurrentOrderRequest({ order }));
  }

  private _replaceCustomerOnCurrentOrder(customer: ICustomer) {
    const order: IOrder = {
      id: this.currentOrder?.id,
      description: this.currentOrder?.description,
      articles: this.currentOrder?.articles,
      amount: this.currentOrder?.amount,
      customer: customer,
      createdBy: this.currentOrder?.createdBy
    }
    this._store.dispatch(replaceCurrentOrderRequest({ order }));
  }

  public hidePanel(hide: boolean): void {
    this.hide = hide;
  }

  public showShadow(shadow: boolean): void {
    this.shadow = shadow;
  }

  public removeShadow(): void {
    this.shadow = false;
    this.hide = false;
  }

  public handleSearchResults(results: any[]): void {
    this.emptyResults = results.length === 0;
    this.filteredResults = results;
  }

  ngOnDestroy(): void {
    this._subscriptions$.next();
    this._subscriptions$.complete();
    this.currentOrder = null;
  }
}
