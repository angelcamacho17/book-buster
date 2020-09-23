import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerSearchComponent } from '../customer-search.component';
import { EventService } from '../../shared/services/event.service';
import { OrderService, IOrder, ICustomer, TranslationService, HeaderService, refreshCustomersRequest } from '@fecommerce-workspace/data-store-lib';
import { LayoutService } from '../../shared/services/layout.service';
import { DialogData } from '../../shared/components/dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ScanResult } from '@fecommerce-workspace/scanner';

@Component({
  selector: 'customer-search-tablet',
  templateUrl: './customer-search-tablet.component.html',
  styleUrls: ['./customer-search-tablet.component.scss']
})
export class CustomerSearchTabletComponent extends CustomerSearchComponent implements OnInit, OnDestroy {

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
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CustomerSearchTabletComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    super(eventService, orderService, matDialog, store,
          router, transServ, headerService, location, layoutService, snackBar)

    this.customers$ = this.store.pipe(select('customers'));
    this.subscriptions.add(
      this.customers$.subscribe(customers => {
        this.customers = customers;
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
        this.rightButtonClick('next');
      })
    );

    this.subscriptions.add(
      this.headerService.goBack.subscribe(()=>{
        this.openConfirmDialog();
      })
    );

    this.store.dispatch(refreshCustomersRequest());
  }

  ngOnInit(): void {
  }

  /**
   * Handle customer selection.
   * @param customer
   */
  public handleCustomerScanned(customer: ICustomer): void {
    this.onCustomerChange(customer);
    // Handle routing.
    this.rightButtonClick('next');
  }

  /**
   * Listen left icon header click.
   */
  public leftButtonClick(): void {
    const actionResult = {
      action: this.data?.firstButton
    }
    this.dialogRef.close(actionResult);

  }

  /**
   * Listen click outside of the dialog.
   */
  public onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Listen right icon header click.
   */
  public rightButtonClick(action = null): void {
    const actionResult = {
      action: action ?? this.data?.secondButton
    }
    this.dialogRef.close(actionResult);
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
    this.currentOrder = null;
    this.scanner = false;

  }
}