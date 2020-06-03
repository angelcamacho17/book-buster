import { Injectable, EventEmitter } from '@angular/core';
import { Customer } from '@fecommerce-workspace/data-store-lib';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  customerChange = new EventEmitter<Customer>();

  constructor() { }

  customerChanged(customer: Customer) {
    this.customerChange.emit(customer);
  }
}
