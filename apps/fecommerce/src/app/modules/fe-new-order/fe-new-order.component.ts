import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '@fecommerce-workspace/data-store-lib';
import { Store, select } from '@ngrx/store';
import { setHeaderTitleRequest } from '@fecommerce-workspace/data-store-lib';
import { refreshCustomersRequest } from '@fecommerce-workspace/data-store-lib';

@Component({
  selector: 'app-fe-new-order',
  templateUrl: './fe-new-order.component.html',
  styleUrls: ['./fe-new-order.component.scss']
})
export class FeNewOrderComponent implements OnInit {

  public $customers: Observable<Customer[]>;
  public customers: Customer[];

  constructor(private store: Store<{customers: Customer[]}>) {
    this.store.dispatch(setHeaderTitleRequest({title: 'new order'}));
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
