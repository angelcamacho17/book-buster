import { Component, Input, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Order, setCurrentOrderRequest, handleOrderRequest, refreshOrdersRequest, Customer, AuthService, getCurrentOrderRequest } from '@fecommerce-workspace/data-store-lib';


@Component({
  selector: 'fe-customer-row',
  templateUrl: './fe-customer-row.component.html',
  styleUrls: ['./fe-customer-row.component.scss']
})
export class FeCustomerRowComponent implements OnDestroy {

  @Input() item: any;
  public smaller: Observable<boolean>;
  public initials = '';
  private _subscriptions = new Subscription();
  constructor(
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

  public selectedCustomer(): void {

    const order: Order = {
      description: 'Latest order',
      amount: 0,
      createdBy: 'loggedInUser',
      articles: [],
      customer: this.item
    }

    this._store.dispatch(handleOrderRequest({ order }));
    setTimeout(() => {
      this.router.navigate(['/article']);
    }, 100);

  }

  ngOnDestroy(): void {
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
  }

}
