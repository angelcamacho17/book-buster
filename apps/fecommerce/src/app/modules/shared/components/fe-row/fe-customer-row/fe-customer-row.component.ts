import { Component, OnInit, Input, OnChanges, ComponentFactoryResolver, AfterContentInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { appendOrderRequest, Order, Customer, setCurrentOrderRequest, handleOrderRequest, refreshOrdersRequest } from '@fecommerce-workspace/data-store-lib';


@Component({
  selector: 'fe-customer-row',
  templateUrl: './fe-customer-row.component.html',
  styleUrls: ['./fe-customer-row.component.scss']
})
export class FeCustomerRowComponent implements OnDestroy {

  @Input() item: any;
  public smaller: Observable<boolean>;
  public initials = '';
  private _subs: Subscription;

  constructor(private router: Router,
    private _store: Store<{ currentOrder: Order }>) {

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
      amount: 178,
      createdBy: 'Robin Person',
      articles: [{
        article: {
          id: 31,
          name: "Tea - Honey Green Tea",
          description: "Twin birth, mate liveborn, born in hospital, delivered without mention of cesarean section",
          price: 61.15
        }, quantity: 3
      }, {
        article: {
          id: 32,
          name: "Soup - Knorr, Chicken Noodle",
          description: "Poisoning by erythromycin and other macrolides",
          price: 51.80
        }, quantity: 8
      }],
      customer: this.item
    }

    this._store.dispatch(handleOrderRequest({ order }));
    this._store.dispatch(setCurrentOrderRequest({ order }));
    this._store.dispatch(refreshOrdersRequest())
    setTimeout(() => {
      this.router.navigate(['/article']);
    }, 100);

  }

  ngOnDestroy(): void {
    if (this._subs) {
      this._subs.unsubscribe();
    }
  }

}
