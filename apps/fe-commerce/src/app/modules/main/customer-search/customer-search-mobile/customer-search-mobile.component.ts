import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { CustomerSearchComponent } from '../customer-search.component';
import { EventService } from '../../shared/services/event.service';
import { OrderService, IOrder, ICustomer, TranslationService, HeaderService, refreshCustomersRequest } from '@fecommerce-workspace/data-store-lib';
import { LayoutService } from '../../shared/services/layout.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'customer-search-mobile',
  templateUrl: './customer-search-mobile.component.html',
  styleUrls: ['./customer-search-mobile.component.scss']
})
export class CustomerSearchMobileComponent extends CustomerSearchComponent implements OnInit, OnDestroy {

  constructor(
    public eventService: EventService,
    public orderService: OrderService,
    public matDialog: MatDialog,
    public store: Store<{ orders: IOrder[], currentOrder: IOrder, customers: ICustomer[], customer: ICustomer }>,
    public router: Router,
    public transServ: TranslationService,
    public headerService: HeaderService,
    public location: Location,
    public layoutService: LayoutService,
    public snackBar: MatSnackBar
  ) {
    super(eventService, orderService, matDialog, store,
      router, transServ, headerService, location, layoutService, snackBar)

    this.customers$ = this.store.pipe(select('customers'));
    this.subscriptions.add(
      this.customers$.subscribe((res: any) => {
        this.loading = false;
        if (res?.body?.data?.customers?.length === 0 || res?.body?.data?.customers?.length === undefined) {
          this.emptyResults = true;
        } else {
          this.emptyResults = false;
        }
        this.filteredResults = res?.body?.data?.customers;
        this.customers = this.filteredResults;
      })
    );

    this._customerScanned$ = this.store.pipe(select('customer'));
    this.subscriptions.add(
      this._customerScanned$.subscribe((customer: ICustomer) => {
        // Workaround to avoid trigger this without calling it.
        if(!this.firstCall) {
          this.handleCustomerScanned(customer)
        } else {
          this.firstCall = false;
        }
      })
    );

    this.currentOrder$ = this.store.pipe(select('currentOrder'));
    this.subscriptions.add(
      this.currentOrder$.subscribe((currentOrder) => {
        this.currentOrder = currentOrder;
      })
    );

    this.subscriptions.add(
      this.eventService.customerChange.subscribe(customer => {
        this.onCustomerChange(customer);
        this._goBack();
      })
    );

    this.subscriptions.add(
      this.headerService.goBack.subscribe(() => {
        this._goBack(true);
      })
    );

    this.subscriptions.add(
      this.headerService.rightIconClicked.subscribe(()=>{
        this.router.navigate(['/main/article-search'])
      })
    )

    this.filteredResults = [];
    this.emptyResults = true;

    //this.store.dispatch(refreshCustomersRequest());
  }

  ngOnInit(): void {
  }

  /**
   * Manage routing depending on the flow and the moment.
   * @param leftIconAction
   */
  private _goBack(leftIconAction?: boolean) {
    // The action comes from the header
    if (leftIconAction) {
      this.openConfirmDialog();
    } else {
      this.router.navigate(['/main/order-overview']);
    }
    return ;
  }

  /**
   * Handle customer selection.
   * @param customer
   */
  public handleCustomerScanned(customer: ICustomer): void {
    let snack ;
    if(customer) {
      snack = this.snackBar.open(`Customer ${customer?.name} selected.`, 'Close');
      this.onCustomerChange(customer);
      // Handle routing.
      this._goBack();
    } else {
      snack = this.snackBar.open(`Customer could not be found.`, 'Close')
    }
    snack.afterDismissed().subscribe(() => {
      this.pauseScan = false;
    });
  }

  ngOnDestroy(): void {
    this.scanner = false;
    this.scannerStarted = false;
    this.subscriptions.unsubscribe();
  }
}
