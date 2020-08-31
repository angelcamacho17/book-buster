import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { OrderOverviewComponent } from '../order-overview.component';
import { Store, select } from '@ngrx/store';
import { IOrder, IOrderArticle, OrderArticlesService, TranslationService, HeaderService, OrderService, getCurrentOrderRequest, refreshOrderArticlesRequest } from '@fecommerce-workspace/data-store-lib';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LayoutService } from '../../shared/services/layout.service';

@Component({
  selector: 'order-overview-mobile',
  templateUrl: './order-overview-mobile.component.html',
  styleUrls: ['./order-overview-mobile.component.scss']
})
export class OrderOverviewMobileComponent extends OrderOverviewComponent implements OnInit, OnDestroy{

  constructor(public store: Store<{ currentOrder: IOrder, orderArticles: IOrderArticle[] }>,
    public snackBar: MatSnackBar,
    public router: Router,
    public matDialog: MatDialog,
    public ordArtsService: OrderArticlesService,
    public transServ: TranslationService,
    public headerService: HeaderService,
    public orderService: OrderService,
    public layoutService: LayoutService
    ) {
      super(store, snackBar, router, matDialog,
            ordArtsService, transServ,
            headerService, orderService, layoutService)
      this.subscriptions.add(
        this.headerService.rightIconClicked
          .subscribe(() => this.deleteOrder())
      );

      this.subscriptions.add(
        this.headerService.goBack
          .subscribe(() => this.goBack())
      );

      this.$articles = this.store.pipe(select('orderArticles'));
      this.subscriptions.add(
        this.$articles.subscribe((arts) => {
          this.totalPrice = this.ordArtsService.total;
          this.articles = arts;
        })
      );

      this.currentOrder$ = this.store.pipe(select('currentOrder'));
      this.subscriptions.add(
        this.currentOrder$.subscribe(data => {
          this.currentOrder = data;
        })
      );

      this.store.dispatch(refreshOrderArticlesRequest());
      this.store.dispatch(getCurrentOrderRequest());
    }

  ngOnInit(): void {
  }
}
