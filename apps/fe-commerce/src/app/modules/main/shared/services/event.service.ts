import { Injectable, EventEmitter } from '@angular/core';
import { ICustomer, IArticle } from '@fecommerce-workspace/data-store-lib';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  customerChange = new EventEmitter<ICustomer>();
  articleSelect = new EventEmitter<IArticle>();

  constructor() {
    console.log('event service1')
  }

  public customerChanged(customer: ICustomer) {
    this.customerChange.emit(customer);
  }

  public articleSelected(article: IArticle) {
    this.articleSelect.emit(article);
  }
}
