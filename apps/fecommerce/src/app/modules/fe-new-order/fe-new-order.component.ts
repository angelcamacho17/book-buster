import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Customer, setCurrentOrderRequest, getCurrentOrderRequest, Order, appendOrderRequest, replaceCurrentOrderRequest, handleOrderRequest } from '@fecommerce-workspace/data-store-lib';
import { Store, select } from '@ngrx/store';
import { refreshCustomersRequest } from '@fecommerce-workspace/data-store-lib';
import { FeCustomerRowComponent } from '../shared/components/fe-row/fe-customer-row/fe-customer-row.component';
import { MatDialog } from '@angular/material/dialog';
import { FeConfirmDiscardDialogComponent } from '../shared/components/fe-confirm-discard/fe-confirm-discard-dialog.component';
import { Location } from '@angular/common';
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
  private _subscriptions = new Subscription();
  private _returnUrl = 'home'

  constructor(
    private eventService: EventService,
    private matDialog: MatDialog,
    private _location: Location,
    private _store: Store<{ orders: Order[], currentOrder: Order, customers: Customer[] }>,
    private _router: Router,
    private _route: ActivatedRoute) {
    this._subscriptions.add(this.eventService.customerChange
      .subscribe(customer => this.onCustomerChange(customer))
    );

    this.customers$ = this._store.pipe(select('customers'));
    this._subscriptions.add(this.customers$.subscribe(data => {
      this.customers = data;
    }));

    this.currentOrder$ = this._store.pipe(select('currentOrder'));
    this.currentOrder$.subscribe((currentOrder) => {
      this.currentOrder = currentOrder;
      console.log('The order, has changed.', currentOrder);
    })

    this._store.dispatch(refreshCustomersRequest());
    // this._store.dispatch(setCurrentOrderRequest({ order: null }));
  }

  ngOnInit(): void {
    this._route.queryParams
      .subscribe(params => {
        if (params.returnUrl) {
          this._returnUrl = params.returnUrl;
        }
      });
  }

  openConfirmDialog() {
    let message;
    if (this.currentOrder?.articles?.length) {
      message = "You have an order on progress, do you want to save it?"
    } else {
      message = "Your current order has no articles in it, do you want to save it anyway?";
    }
    const dialogRef = this.matDialog.open(FeConfirmDiscardDialogComponent, {
      data: {
        title: "Save order?",
        message
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._store.dispatch(handleOrderRequest({ order: this.currentOrder }));
      }
      this._store.dispatch(setCurrentOrderRequest({ order: null }))
      return this.goBack();
    });
  }

  onCustomerChange(customer: Customer) {
    console.log('The customer has been changed.', customer)
    if (!this.currentOrder || isUndefined(this.currentOrder)) {
      console.log('SET cO')
      const order: Order = {
        description: 'Latest order',
        articles: [],
        amount: 0,
        customer: customer,
        createdBy: 'user'
      }
      this._store.dispatch(setCurrentOrderRequest({ order }));
    } else {
      console.log('replace cO')
      const order: Order = {
        id: this.currentOrder.id,
        description: this.currentOrder.description,
        articles: this.currentOrder.articles,
        amount: this.currentOrder.amount,
        customer: customer,
        createdBy: this.currentOrder.createdBy
      }
      this._store.dispatch(replaceCurrentOrderRequest({ order }));
    }
  }

  onHeaderGoBack() {
    this._store.dispatch(getCurrentOrderRequest())
    if (this.currentOrder != null) {
      this.openConfirmDialog();
    } else {
      this.goBack();
    }
  }

  goBack() {
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
    console.log('return url' + this._returnUrl);
    this._router.navigate(['/' + this._returnUrl]);
  }

  ngOnDestroy(): void {
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
  }
}
