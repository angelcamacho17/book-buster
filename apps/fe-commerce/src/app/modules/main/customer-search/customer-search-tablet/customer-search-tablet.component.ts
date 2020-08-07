import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { CustomerSearchComponent } from '../customer-search.component';
import { EventService } from '../../shared/services/event.service';
import { OrderService, IOrder, ICustomer, TranslationService, HeaderService, refreshCustomersRequest } from '@fecommerce-workspace/data-store-lib';
import { LayoutService } from '../../shared/services/layout.service';

@Component({
  selector: 'customer-search-tablet',
  templateUrl: './customer-search-tablet.component.html',
  styleUrls: ['./customer-search-tablet.component.scss']
})
export class CustomerSearchTabletComponent extends CustomerSearchComponent implements OnInit {

  constructor(
    public eventService: EventService,
    public orderService: OrderService,
    public matDialog: MatDialog,
    public store: Store<{ orders: IOrder[], currentOrder: IOrder, customers: ICustomer[] }>,
    public router: Router,
    public transServ: TranslationService,
    public headerService: HeaderService,
    public location: Location,
    public layoutService: LayoutService
  ) {
    super(eventService, orderService, matDialog, store,
          router, transServ, headerService, location, layoutService)

    this.customers$ = this.store.pipe(select('customers'));
    this._subscriptions.add(
      this.customers$.subscribe(data => {
        this.customers = data;
      })
    );

    this.currentOrder$ = this.store.pipe(select('currentOrder'));
    this._subscriptions.add(
      this.currentOrder$.subscribe((currentOrder) => {
        this.currentOrder = currentOrder;
      })
    );

    this._subscriptions.add(
      this.eventService.customerChange.subscribe(customer => {
        this.onCustomerChange(customer);
      })
    );

    this._subscriptions.add(
      this.headerService.goBack.subscribe(()=>{
        this.openConfirmDialog();
      })
    );

    this.store.dispatch(refreshCustomersRequest());
  }

  ngOnInit(): void {
  }

}
