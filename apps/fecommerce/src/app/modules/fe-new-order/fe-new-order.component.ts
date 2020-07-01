import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Observable, Subject, Subscription, of } from 'rxjs';
import { Customer, setCurrentOrderRequest, getCurrentOrderRequest, Order, appendOrderRequest, replaceCurrentOrderRequest, handleOrderRequest, setOrderArticlesRequest, clearCurrentOrderRequest, changedNavigationRequest, TranslationService } from '@fecommerce-workspace/data-store-lib';
import { Store, select } from '@ngrx/store';
import { refreshCustomersRequest } from '@fecommerce-workspace/data-store-lib';
import { FeCustomerRowComponent } from '../shared/components/fe-row/fe-customer-row/fe-customer-row.component';
import { MatDialog } from '@angular/material/dialog';
import { FeConfirmDiscardDialogComponent } from '../shared/components/fe-confirm-discard/fe-confirm-discard-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../shared/services/event.service';
import { isUndefined } from 'util';

@Component({
  selector: 'fe-new-order',
  templateUrl: './fe-new-order.component.html',
  styleUrls: ['./fe-new-order.component.scss']
})
export class FeNewOrderComponent implements OnInit, OnDestroy {

  public customers$: Observable<Customer[]>;
  public customers: Customer[];
  public orders: Order[];
  public currentOrder$: Observable<Order>;
  public currentOrder: Order;
  public rowType = FeCustomerRowComponent;
  private _subscriptions: Subscription;
  private _curOrderSubs: Subscription;
  private _returnUrl = 'home';
  private _curId: number = null;
  public hide = false;
  public shadow = false;
  public emptyResults = true;
  public lastUrl = 'neworder';
  public icon = 'close';
  public filteredResults: Customer[] = [];
  public keyboardH = null;
  // public filteredCustomers$: Observable<Customer[]> = of([]);

  constructor(
    private eventService: EventService,
    private matDialog: MatDialog,
    private _store: Store<{ orders: Order[], currentOrder: Order, customers: Customer[] }>,
    private _router: Router,
    private _transServ: TranslationService,
    private _route: ActivatedRoute) {
    this._subscriptions = this.eventService.customerChange.subscribe(customer => this.onCustomerChange(customer));

    this.customers$ = this._store.pipe(select('customers'));
    this._subscriptions = this.customers$.subscribe(data => {
      this.customers = data;
    });

    this.currentOrder$ = this._store.pipe(select('currentOrder'));
    this._curOrderSubs = this.currentOrder$.subscribe((currentOrder) => {
      this.currentOrder = currentOrder;
      if (this._curId === null) {
        this._curId = currentOrder?.id;
        if (this._curId) {
          this.icon = 'keyboard_arrow_left';
          this._returnUrl = 'order/edit';
        } else {
          this.icon = 'close';
        }
      }
      if (!this.currentOrder?.id) {
        this.lastUrl = 'article';
      }
    })

    this._store.dispatch(refreshCustomersRequest());

    window.addEventListener('keyboardWillShow', (e) => {
      console.log('keyboard will show! ', e);
      alert('keyboarON')
      this.keyboardH = e.keyboardHeight;
    });

  }

  ngOnInit(): void {
    this._subscriptions = this._route.queryParams.subscribe(params => {
        if (params.returnUrl && this.icon ==='close') {
          this._returnUrl = params.returnUrl;
        }
      });
  }

  private openConfirmDialog() {
    let message;
    if (this.currentOrder?.articles?.length) {
      message =  this._transServ.get('progressord');
    } else {
      message = this._transServ.get('noarts');
    }
    const dialogRef = this.matDialog.open(FeConfirmDiscardDialogComponent, {
      data: {
        title: this._transServ.get('saveord'),
        message,
        firstBtn: this._transServ.get('discard'),
        secondBtn: this._transServ.get('save')
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._store.dispatch(handleOrderRequest({ order: this.currentOrder }));
      }
      this._store.dispatch(setCurrentOrderRequest({ order: null }))
      const orderArticles = [];
      this._store.dispatch(setOrderArticlesRequest({ orderArticles }));
      return this.goBack();
    });
  }

  public onCustomerChange(customer: Customer) {
    if (this.currentOrder === null || isUndefined(this.currentOrder)) {
      const order: Order = {
        description: 'Latest order',
        articles: [],
        amount: 0,
        customer: customer,
        createdBy: 'user'
      }
      this._store.dispatch(setCurrentOrderRequest({ order }));
    } else {
      const order: Order = {
        id: this._curId,
        description: this.currentOrder.description,
        articles: this.currentOrder.articles,
        amount: this.currentOrder.amount,
        customer: customer,
        createdBy: this.currentOrder.createdBy
      }
      this._store.dispatch(replaceCurrentOrderRequest({ order }));
    }
  }

  public onHeaderGoBack() {

    if (this.icon === 'close') {
      this._store.dispatch(getCurrentOrderRequest());
      if (this.currentOrder != null) {
        this.openConfirmDialog();
      } else {
        this.goBack();
      }
    } else {
      this.returnUrl();
    }

  }

  public goBack() {
    this.returnUrl();
  }

  public getInitials(customer: any): string {
    const fullName = customer.name;
    if (fullName) {
      const name: string[] = fullName.split(' ');
      let initials: string;
      if (name.length > 2) {
        customer.smaller = true;
        initials = `${this.getChar(name[0], 0)}${this.getChar(name[1], 0)}${this.getChar(name[2], 0)}`;
      } else if (name.length > 1) {
        initials = `${this.getChar(name[0], 0)}${this.getChar(name[1], 0)}`;
      } else {
        initials = `${this.getChar(name[0], 0)}`;
      }
      return initials.toUpperCase();
    }
  }

  private getChar(text: string, index: number) {
    return text.charAt(index);
  }

  public returnUrl(): void {
    this._router.navigate(['/' + this._returnUrl]);
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
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
    if (this._curOrderSubs) {
      this._curOrderSubs.unsubscribe();
    }

    this.currentOrder = null;
  }
}
