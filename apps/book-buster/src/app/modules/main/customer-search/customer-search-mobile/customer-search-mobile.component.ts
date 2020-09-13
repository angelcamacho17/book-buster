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
        this._goBack(true);
      })
    );

    this.subscriptions.add(
      this.headerService.rightIconClicked.subscribe(()=>{
        this.router.navigate(['/main/article-search'])
      })
    )

    this.store.dispatch(refreshCustomersRequest());
  }

  ngOnInit(): void {
  }

  /**
   * Manage routing depending on the flow and the moment.
   * @param leftIconAction
   */
  private _goBack(leftIconAction?: boolean) {
    // Read current flow
    const flow = this.orderService.orderFlow;

    // If the action performing is the switch customer
    if (this.orderService.switchCustomerFlow) {
      return this.router.navigate(['/main/order-overview']);
      // If is not, go back to last location.
    } else if (flow === 'new') {
      // If the order exists
      if (this.currentOrder?.id) {
        this.location.back();
      } else {
        // The action comes from the header
        if (leftIconAction) {
          this.openConfirmDialog();
        } else {
          this.router.navigate(['/main/article-search']);
        }
      }
      // If edit flow, just one location to go back
    } else if (flow === 'edit') {
      this.router.navigate(['/main/order-overview']);
    }
  }

  /**
   * Handle customer selection.
   * @param customer
   */
  public handleCustomerScanned(customer: ICustomer): void {
    this.onCustomerChange(customer);
    // Handle routing.
    this._goBack();
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
