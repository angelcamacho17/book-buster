import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { setCurrentOrderRequest, replaceCurrentOrderRequest, IOrder, ICustomer, setOrderArticlesRequest, handleOrderRequest, TranslationService, OrderService, HeaderService } from '@fecommerce-workspace/data-store-lib';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { EventService } from '../shared/services/event.service';
import { CustomerRowComponent } from '../shared/components/row/customer-row/customer-row.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDiscardDialogComponent } from '../shared/components/confirm-discard/confirm-discard-dialog.component';
import { LayoutService } from '../shared/services/layout.service';
import { ScanResult } from '@fecommerce-workspace/scanner';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.scss']
})
export class CustomerSearchComponent implements OnInit, OnDestroy {
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
  public subscriptions: Subscription = new Subscription();
  public scanner = false;
  public pauseScan = false;

  constructor(
    public eventService: EventService,
    public orderService: OrderService,
    public matDialog: MatDialog,
    public store: Store<{ orders: IOrder[], currentOrder: IOrder, customers: ICustomer[] }>,
    public router: Router,
    public transServ: TranslationService,
    public headerService: HeaderService,
    public location: Location,
    public layoutService: LayoutService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  public openConfirmDialog() {
    let message;

    if (!this.currentOrder) {
      this.router.navigate(['/main/home']);
      return;
    }

    if (this.currentOrder?.articles?.length) {
      message = this.transServ.get('progressord');
    } else {
      message = this.transServ.get('noarts');
    }
    const dialogRef = this.matDialog.open(ConfirmDiscardDialogComponent, {
      data: {
        title: this.transServ.get('saveord'),
        message,
        firstBtn: this.transServ.get('discard'),
        secondBtn: this.transServ.get('save')
      },
      panelClass: 'no-padding-dialog'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(handleOrderRequest({ order: this.currentOrder }));
      }
      this.store.dispatch(setCurrentOrderRequest({ order: null }))
      const orderArticles = [];
      this.store.dispatch(setOrderArticlesRequest({ orderArticles }));
      this.router.navigate(['/main/home']);
    });
  }

  public onCustomerChange(customer: ICustomer) {
    this.handleSetCustomer(customer);
  }

  /* Used to handle the selection of a customer */
  public handleSetCustomer(customer: ICustomer): void {
    if (this.currentOrder) {
      this._replaceCustomerOnCurrentOrder(customer);
    } else {
      this._setCustomerToNewOrder(customer);
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
    this.store.dispatch(setCurrentOrderRequest({ order }));
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
    this.store.dispatch(replaceCurrentOrderRequest({ order }));
  }
  /* Used to handle the selection of a customer */

  public hidePanel(hide: boolean): void {
    this.hide = hide;
  }

  public showShadow(shadow: boolean): void {
    this.shadow = shadow;
    this.scanner = false;
  }

  public showScanner() {
    this.scanner = true;
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
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
    this.currentOrder = null;
    this.scanner = false;

  }
}
