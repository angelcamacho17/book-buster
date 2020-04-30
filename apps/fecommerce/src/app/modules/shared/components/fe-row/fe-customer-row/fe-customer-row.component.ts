import { Component, OnInit, Input, OnChanges, ComponentFactoryResolver } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { FeRowComponent } from '../fe-row.component';
import { Store } from '@ngrx/store';
import { appendOrderRequest, Order, Customer } from '@fecommerce-workspace/data-store-lib';


@Component({
  selector: 'fe-customer-row',
  templateUrl: './fe-customer-row.component.html',
  styleUrls: ['./fe-customer-row.component.scss']
})
export class FeCustomerRowComponent extends FeRowComponent{

  public smaller: Observable<boolean>;
  public initials = '';

  constructor(router: Router,
              componentFactoryResolver: ComponentFactoryResolver,
              store: Store<{orders: Order[]}>) {
    super(router, componentFactoryResolver, store);
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
    const customer: Customer = this.item;
    customer.initials = this.getInitials();
    this.smaller.subscribe(data=>{
      customer.smallIcon = data;
    })
    const newOrder: Order = {
      description: 'Latest order',
      amount: 0,
      createdBy: 'Robin Person',
      articles: [],
      customer
    }
    this.store.dispatch(appendOrderRequest({order: newOrder}));
    setTimeout(()=> {
      this.router.navigate(['/article']);
    },300);

  }

}
