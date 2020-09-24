import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService, HeaderService, IOrder } from '@fecommerce-workspace/data';
import { Store, select } from '@ngrx/store';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { OrderItemsComponent } from '../order-items.component';
import { LayoutService } from '../../shared/services/layout.service';

@Component({
  selector: 'order-items-mobile',
  templateUrl: './order-items-mobile.component.html',
  styleUrls: ['./order-items-mobile.component.scss']
})
export class OrderItemsMobileComponent extends OrderItemsComponent implements OnInit {

  constructor(public snackBar: MatSnackBar,
    public orderService: OrderService,
    public store: Store<{ currentOrder: IOrder }>,
    public bottomSheet: MatBottomSheet,
    public router: Router,
    public headerService: HeaderService,
    public layoutService: LayoutService
  ) {
    super(snackBar, orderService, store, bottomSheet, router, headerService, layoutService);
    this.subscribeToCurrentOrder();
  }

  ngOnInit(): void {
    this.subscribeToHeader();
  }

  /**
   * Listen to right icon click of the header.
   */
  public subscribeToHeader() {
    this.subscriptions.add(
      this.headerService.rightIconClicked
        .subscribe(() => this.goToArticles())
    );
  }

  /**
   * Navigate to articles search on edit flow.
   */
  public goToArticles(): void {
    this.router.navigate(['/main/article-search/edit']);
  }

}
