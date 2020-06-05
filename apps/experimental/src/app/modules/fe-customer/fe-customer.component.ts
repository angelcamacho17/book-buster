import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'fe-customer',
  templateUrl: './fe-customer.component.html',
  styleUrls: ['./fe-customer.component.scss']
})
export class FeCustomerComponent implements OnInit {

  constructor( private _store: Store) {}

  ngOnInit(): void {
  }

}
