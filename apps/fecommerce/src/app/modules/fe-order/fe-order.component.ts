import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { setHeaderTitleRequest, Order } from '@fecommerce-workspace/data-store-lib';
import { Customer } from '@fecommerce-workspace/data-store-lib';

@Component({
  selector: 'fe-order',
  templateUrl: './fe-order.component.html',
  styleUrls: ['./fe-order.component.scss']
})
export class FeOrderComponent implements OnInit {

  @Input() order: Order = {
    id: 8,
    description: "Recent Order",
    amount: 65.22,
    createdBy: "Federico Ribero",
    articles: [],
    customer: {
      id: 1,
      name: "Angel Andres Camacho",
      address: "T. caceres de allende 454",
      email: "angel.camacho@sdp.biz",
      initials: 'AAC',
      smallIcon: true

    }
  }

  constructor( private store: Store<{customers: Customer[]}>) {
    this.store.dispatch(setHeaderTitleRequest({title: 'Order overview'}));
  }

  ngOnInit(): void {
  }

}
