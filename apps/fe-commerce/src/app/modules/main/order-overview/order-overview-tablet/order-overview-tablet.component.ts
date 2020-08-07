import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderOverviewComponent } from '../order-overview.component';
import { Store, select } from '@ngrx/store';
import { IOrder, IOrderArticle, OrderArticlesService, BackNavigationService, TranslationService, HeaderService, OrderService, getCurrentOrderRequest, refreshOrderArticlesRequest } from '@fecommerce-workspace/data-store-lib';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LayoutService } from '../../shared/services/layout.service';

@Component({
  selector: 'order-overview-tablet',
  templateUrl: './order-overview-tablet.component.html',
  styleUrls: ['./order-overview-tablet.component.scss']
})
export class OrderOverviewTabletComponent extends OrderOverviewComponent implements OnInit, OnDestroy {

  constructor(public store: Store<{ currentOrder: IOrder, orderArticles: IOrderArticle[] }>,
    public snackBar: MatSnackBar,
    public router: Router,
    public matDialog: MatDialog,
    public ordArtsService: OrderArticlesService,
    public bnService: BackNavigationService,
    public transServ: TranslationService,
    public headerService: HeaderService,
    public orderService: OrderService,
    public layoutService: LayoutService
    ) {
      super(store, snackBar, router, matDialog,
            ordArtsService, bnService, transServ,
            headerService, orderService, layoutService)
      this.$articles = this.store.pipe(select('orderArticles'));
      this.subscriptions.add(
        this.$articles.subscribe((arts) => {
          this.articles = arts;
        })
      );

      this.currentOrder$ = this.store.pipe(select('currentOrder'));
      this.subscriptions.add(
        this.currentOrder$.subscribe(data => {
          this.currentOrder = data;
        })
      );

      this.subscriptions.add(
        this.headerService.goBack.subscribe(() => this._goBack())
      );


      this.store.dispatch(getCurrentOrderRequest());
      this.store.dispatch(refreshOrderArticlesRequest());
      this.store.dispatch(getCurrentOrderRequest());

    }

  ngOnInit(): void {
  }

}