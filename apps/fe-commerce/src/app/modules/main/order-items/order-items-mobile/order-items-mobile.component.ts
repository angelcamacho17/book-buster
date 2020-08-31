import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService, IOrderArticle, OrderArticlesService, HeaderService, refreshOrderArticlesRequest } from '@fecommerce-workspace/data-store-lib';
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
    public ordSer: OrderService,
    public store: Store<{ orderArticles: IOrderArticle[] }>,
    public ordArtsService: OrderArticlesService,
    public bottomSheet: MatBottomSheet,
    public router: Router,
    public headerService: HeaderService,
    public layoutService: LayoutService
    ) {
      super(snackBar, ordSer, store, ordArtsService, bottomSheet, router, headerService, layoutService );
      this.$articles = this.store.pipe(select('orderArticles'));
      this.listenToOrderArts();
      this.store.dispatch(refreshOrderArticlesRequest());
    }


    ngOnInit(): void {
      this.subscribeToHeader();
    }


    public subscribeToHeader() {
      this._subscriptions.add(
        this.headerService.rightIconClicked
          .subscribe(() => this.goToArticles())
      );
    }


}
