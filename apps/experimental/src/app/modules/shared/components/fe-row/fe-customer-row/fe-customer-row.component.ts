import { Component, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Order, setCurrentOrderRequest, handleOrderRequest, refreshOrdersRequest, Customer, AuthService, getCurrentOrderRequest, replaceCurrentOrderRequest, changedNavigationRequest } from '@fecommerce-workspace/data-store-lib';
import { isUndefined } from 'util';
import { EventService } from '../../../services/event.service';


@Component({
  selector: 'fe-customer-row',
  templateUrl: './fe-customer-row.component.html',
  styleUrls: ['./fe-customer-row.component.scss']
})
export class FeCustomerRowComponent implements OnDestroy {
  // @Output() customerChange = new EventEmitter<Customer>();
  @Input() item: any;
  public smaller: Observable<boolean>;
  public initials = '';
  private _subscriptions = new Subscription();
  constructor(
    private eventService: EventService,
    private router: Router,
    private _store: Store<{ currentOrder: Order }>,
  ) {

    if (this.item) {
      this.smaller = this.reduceLetterSize();
    }
  }

  private reduceLetterSize(): Observable<boolean> {
    const fullName = this.item.name;
    if (fullName) {
      const name: string[] = fullName.split(' ');
      if (name.length > 2) {
        return of(true);
      }
      else {
        return of(false);
      }
    }
  }

  public getInitials(): string {
    const fullName = this.item.name;
    if (fullName) {
      const name: string[] = fullName.split(' ');
      let initials: string;
      if (name.length > 2) {
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

  public onSelectCustomer(customer: Customer): void {
    this.eventService.customerChanged(customer);
    this.router.navigate(['/article']);
  }

  ngOnDestroy(): void {
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
  }

}


/**
 *
 *
 *     let currentOrder: Order = history?.state?.order;

    if (isUndefined(currentOrder) || currentOrder != null) {
      const order: Order = {
        id: currentOrder.id,
        description: currentOrder.description,
        articles: currentOrder.articles,
        amount: currentOrder.amount,
        customer: this.item ,
        createdBy: currentOrder.createdBy
      }
    } else {
const order: Order = {
  description: 'Latest order',
  amount: 0,
  createdBy: 'loggedInUser',
  articles: [],
  customer: this.item
}
    }
if (currentOrder) {
  currentOrder.customer = this.item
  console.log(currentOrder);
  this._store.dispatch(replaceCurrentOrderRequest({ order: currentOrder }));
} else {
  console.log(order)
  this._store.dispatch(setCurrentOrderRequest({ order }));
}
console.log('current order: ', currentOrder);
console.log('order: ', order);
 */
