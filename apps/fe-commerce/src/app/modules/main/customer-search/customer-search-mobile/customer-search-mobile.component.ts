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
import { ScanResult } from '@fecommerce-workspace/scanner';

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
    public store: Store<{ orders: IOrder[], currentOrder: IOrder, customers: ICustomer[] }>,
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
      this.customers$.subscribe(data => {
        this.customers = data;
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
        this.openConfirmDialog();
      })
    );

    this.store.dispatch(refreshCustomersRequest());
  }

  ngOnInit(): void {
  }

  private _goBack() {
    const flow = this.orderService.orderFlow;
    if (this.orderService.switchCustomerFlow) {
      return this.router.navigate(['/main/order-overview']);
    }else if (flow === 'new') {
      if (this.currentOrder?.id) {
        this.location.back();
      } else {
        console.log('no current order')
        this.router.navigate(['/main/article-search']);
      }
    } else if (flow === 'edit') {
      this.router.navigate(['/main/order-overview']);
    }
  }

  /*
  private _handleSetCustomer(customer: ICustomer): void {
    console.log(this.currentOrder);
    if (this.currentOrder) {
      this.replaceCustomerOnCurrentOrder(customer);
      this.location.back();
    } else {
      this.setCustomerToNewOrder(customer);
      this.router.navigate(['/main/article-search']);
    }
  }
 */

  public loyaltyCardScanned(scanResult: ScanResult) {
    let snack;
    if (this.pauseScan) {
      return;
    }
    const customerCode = JSON.parse(scanResult.code)?.customer;
    this.pauseScan = true;

    const customer = this.customers.find((c: any) => {
      return c.name === customerCode.name;
    });

    if (customer) {
      snack = this.snackBar.open(`Customer ${customer?.name} selected.`, 'Close');
      this.onCustomerChange(customer);
    } else {
      snack = this.snackBar.open(`Customer could not be found.`, 'Close')
    }
    snack.afterDismissed().subscribe(() => {
      this.pauseScan = false;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
