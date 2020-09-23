import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { setCurrentOrderRequest, IOrder, ICustomer, handleOrderRequest, TranslationService, OrderService, HeaderService, getCustomersRequest, getCustomerScannedRequest, createOrderRequest, switchCustomerRequest } from '@fecommerce-workspace/data-store-lib';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { EventService } from '../shared/services/event.service';
import { CustomerRowComponent } from '../shared/components/row/customer-row/customer-row.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDiscardDialogComponent } from '../shared/components/confirm-discard/confirm-discard-dialog.component';
import { LayoutService } from '../shared/services/layout.service';
import { ScanResult } from '@fecommerce-workspace/scanner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from '../shared/components/dialog/dialog.component';

@Component({
  selector: 'customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.scss']
})
export class CustomerSearchComponent implements OnInit, OnDestroy {
  public customers$: Observable<ICustomer[]>;
  public customers: ICustomer[] = [];
  public customereScanned: ICustomer;
  public _customerScanned$: Observable<ICustomer>;
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
  public loading = false;
  public pauseScan = false;
  public scannerStarted = false;
  public firstCall = true;

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
  ) { }

  ngOnInit(): void {
    localStorage.setItem('CAMERA_ALLOWED', 'true')

  }

  public openConfirmDialog() {
    let message;
    console.log('OPEN')
    if (!this.currentOrder) {
      this.router.navigate(['/main/home']);
      return;
    }

    if (this.currentOrder?.articlesLines?.length) {
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
      this.router.navigate(['/main/home']);
    });
  }

  /**
 * Handle customer scanner.
 * @param scanResult
 */
  public loyaltyCardScanned(scanResult: ScanResult): void {
    // Pause scann to avoid errors.
    if (this.pauseScan) {
      return;
    }
    this.pauseScan = true;
    this.store.dispatch(getCustomerScannedRequest({ barcode: scanResult.code?.code }))
    return;
  }

  /**
   * Handle customer scanned
   * @param customer
   */
  public handleCustomerScanned(customer: ICustomer): void { }

  public onCustomerChange(customer: ICustomer) {
    this.handleSetCustomer(customer);
  }

  /* Used to handle the selection of a customer */
  public handleSetCustomer(customer: ICustomer): void {
    if (customer) {
      if (this.currentOrder) {
        this._replaceCustomerOnCurrentOrder(customer);
      } else {
        this._setCustomerToNewOrder(customer);
      }
    }
  }

  /**
   * Setting customer to the new current order.
   * @param customer
   */
  private _setCustomerToNewOrder(customer: ICustomer) {
    this.store.dispatch(createOrderRequest({ customer }));
  }

  /**
   * Replacing customer of the current order.
   * @param customer
   */
  private _replaceCustomerOnCurrentOrder(customer: ICustomer) {
    this.store.dispatch(switchCustomerRequest({ orderId: this.currentOrder.uuid, customer }));
  }

  /* Used to handle the states of the component */

  /**
   * Hide scanner and show initial state of the search.
   * @param hide
   */
  public hidePanel(hide: boolean): void {
    this.hide = hide;
  }

  /**
   * Finish laoding state.
   * @param event
   */
  public onStarted(event) {
    this.scannerStarted = true;
  }

  /**
   * On focus of the search, show shadow state.
   * @param shadow
   */
  public showShadow(shadow: boolean): void {
    this.shadow = shadow;
    this.scanner = false;
    this.scannerStarted = false;
  }

  /**
   * Show scanner.
   */
  public showScanner(event?) {
    if (localStorage.getItem('CAMERA_ALLOWED') && localStorage.getItem('CAMERA_ALLOWED')==='false'){
      const msg = 'Refresh your page to allow the camera';
      const snackRef = this.snackBar.open(msg, 'REFRESH', {
        duration: 2000,
      });
      snackRef.afterDismissed().subscribe((action)=>{
        if (action.dismissedByAction) {
          this.loading = true;
          setTimeout(() => {
            location.reload();
          }, 0);
          event.stopImmediatePropagation();
        }
      });
    } else {
      this.scanner = true;
    }
  }

  /**
   * Permission response.
   */
  public handlePermission(event) {
    if (event === false) {
      localStorage.setItem('CAMERA_ALLOWED', 'false')
      this.noCameraFound(false);
      const msg = 'You need to allow the camera to access the scanner';
      this.snackBar.open(msg, '', {
        duration: 2000,
      });
    } else {
      localStorage.setItem('CAMERA_ALLOWED', 'true')
    }
  }

  /**
   * On start seaching, set state.
   */
  public searchStarted(): void {
    this.shadow = false;
    this.hide = false;
    this.scanner = false;
    this.scannerStarted = false;

  }

  /**
  * After a search, set vars to react propperly.
  * @param query
  */
  public handleSearchResults(query: any): void {
    this.emptyResults = query.length === 0;
    if (query.length > 2) {
      this.loading = true;
      this.store.dispatch(getCustomersRequest({ filter: query }))
    } else {
      this.emptyResults = true;
      setTimeout(() => {
        this.loading = false;
      })
      this.filteredResults = [];
      this.customers = [];
    }
  }

  /**
   * Return filter results.
   * @param query
   */
  private getFilteredResults(query): any[] {
    if (this.customers?.length && query) {
      return this.customers.filter((resource) => {
        return resource.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
      })
    } else {
      this.filteredResults = [];
      this.customers = []
      return this.customers;
    }
  }

  /**
   * Check results to handle state.
   * @param query
   */
  private checkResults(query) {
    this.emptyResults = this.filteredResults.length === 0;
    this.hide = query.length > 0;
  }

  /**
   * No camera found.
   * @param event
   */
  public noCameraFound(event) {
    this.scanner = false;
    this.loading = false;
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
    this.currentOrder = null;
    this.scanner = false;
    this.scannerStarted = false;

    localStorage.setItem('CAMERA_ALLOWED', 'true')

  }
}
