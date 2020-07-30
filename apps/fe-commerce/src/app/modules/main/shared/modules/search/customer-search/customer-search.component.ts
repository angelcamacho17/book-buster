import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ICustomer, refreshCustomersRequest, IOrder, setCurrentOrderRequest } from '@fecommerce-workspace/data-store-lib';
import { Observable, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { CustomerRowComponent } from '../search-results/row/customer-row/customer-row.component';
import { EventService } from '../../../../shared/services/event.service';

@Component({
  selector: 'fe-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.scss']
})
export class CustomerSearchComponent implements OnInit {
  // @Input() autoFocus = false;
  public customers$: Observable<ICustomer[]>;
  public customers: ICustomer[] = [];
  private _returnUrl = 'home';
  public hide = false;
  public shadow = false;
  public emptyResults = true;
  public lastUrl = 'neworder';
  public rowType = CustomerRowComponent;
  public filteredResults: ICustomer[] = [];
  private _subscriptions$ = new Subject<any>();
  constructor(
    private eventService: EventService,
    private _router: Router,
    private _store: Store<{ customers: ICustomer[] }>
  ) {

    this._subscribeToCustomerChange();

    this.customers$ = this._store.pipe(select('customers'));
    this.customers$.subscribe(data => {
      console.log(data)
      this.customers = data;
    })

    this._store.dispatch(refreshCustomersRequest());
  }

  ngOnInit(): void {
  }

  private _subscribeToCustomerChange() {
    this.eventService.customerChange.pipe(
      takeUntil(this._subscriptions$)
    ).subscribe(customer => this._onCustomerChange(customer));
  }

  private _onCustomerChange(customer: ICustomer) {
    console.log(customer)
    const order: IOrder = {
      description: 'Latest order',
      articles: [],
      amount: 0,
      customer: customer,
      createdBy: 'user'
    }
    this._store.dispatch(setCurrentOrderRequest({ order }));
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

}
