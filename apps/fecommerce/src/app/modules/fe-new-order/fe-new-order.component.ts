import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '@fecommerce-workspace/data-store-lib';
import { Store, select } from '@ngrx/store';
import { refreshCustomersRequest } from '@fecommerce-workspace/data-store-lib';
import { FeCustomerRowComponent } from '../shared/components/fe-row/fe-customer-row/fe-customer-row.component';

@Component({
  selector: 'fe-new-order',
  templateUrl: './fe-new-order.component.html',
  styleUrls: ['./fe-new-order.component.scss']
})
export class FeNewOrderComponent implements OnInit {

  public $customers: Observable<Customer[]>;
  public customers: Customer[];
  public rowType = FeCustomerRowComponent;

  constructor(private store: Store<{customers: Customer[]}>) {
    this.$customers = this.store.pipe(select('customers'));
    this.$customers.subscribe(data => {
      this.customers = data;
    });
    this.store.dispatch(refreshCustomersRequest());
  }

  ngOnInit(): void {
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


}
