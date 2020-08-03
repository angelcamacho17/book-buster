import { Component, OnInit, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { refreshCustomersRequest, setCurrentOrderRequest, getCurrentOrderRequest, replaceCurrentOrderRequest, IOrder, ICustomer, setOrderArticlesRequest, handleOrderRequest, TranslationService, isUndefined } from '@fecommerce-workspace/data-store-lib';
import { Observable, Subject, Subscription } from 'rxjs';
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
  private _subscriptions: Subscription;
  private _cusEvent: Subscription;
  private _curIOrderSubs: Subscription;
  private _returnUrl = 'home';
  private _curId: number = null;
  public hide = false;
  public shadow = false;
  public emptyResults = true;
  public lastUrl = 'neworder';
  public icon = 'close';
  public filteredResults: ICustomer[] = [];
  public innerHeight = null;
  // public filteredICustomers$: Observable<ICustomer[]> = of([]);

  constructor(
    private eventService: EventService,
    private matDialog: MatDialog,
    private _store: Store<{ orders: IOrder[], currentOrder: IOrder, customers: ICustomer[] }>,
    private _router: Router,
    private _transServ: TranslationService,
    private _route: ActivatedRoute) {
    this._cusEvent = this.eventService.customerChange.subscribe(customer => this.onCustomerChange(customer));

    this.customers$ = this._store.pipe(select('customers'));
    this._subscriptions = this.customers$.subscribe(data => {
      this.customers = data;
    });

    this.currentOrder$ = this._store.pipe(select('currentOrder'));
    this._curIOrderSubs = this.currentOrder$.subscribe((currentOrder) => {
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

  }
  ngAfterViewInit(): void {
    window.scrollTo(0, 0);
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
    const dialogRef = this.matDialog.open(ConfirmDiscardDialogComponent, {
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

  public onCustomerChange(customer: ICustomer) {
    console.log('customer change', customer)
    if (this.currentOrder === null || isUndefined(this.currentOrder)) {
      console.log('setting')
      const order: IOrder = {
        description: 'Latest order',
        articles: [],
        amount: 0,
        customer: customer,
        createdBy: 'user'
      }
      this._store.dispatch(setCurrentOrderRequest({ order }));
    } else {
      console.log('replacing')
      const order: IOrder = {
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

  // public onScroll(event): void {
  //   if(event.srcElement.scrollTop>0){
  //     this._hedSer.dropShadow = true;
  //   } else {
  //     this._hedSer.dropShadow = false;
  //   }
  // }

  ngOnDestroy(): void {
    if (this._cusEvent){
      this._cusEvent.unsubscribe();
    }
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
    if (this._curIOrderSubs) {
      this._curIOrderSubs.unsubscribe();
    }

    this.currentOrder = null;
  }
}
