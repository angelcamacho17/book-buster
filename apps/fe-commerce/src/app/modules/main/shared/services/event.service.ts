import { Injectable, EventEmitter } from '@angular/core';
import { ICustomer } from '@fecommerce-workspace/data-store-lib';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  customerChange = new EventEmitter<ICustomer>();

  constructor() {
    console.log('event service1')
  }

  customerChanged(customer: ICustomer) {
    this.customerChange.emit(customer);
  }
}
