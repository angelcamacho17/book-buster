import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderOverviewComponent } from '../order-overview.component';
import { Store, select } from '@ngrx/store';
import {
  IOrder, IOrderArticle, OrderArticlesService, BackNavigationService, TranslationService,
  HeaderService, OrderService, getCurrentOrderRequest, refreshOrderArticlesRequest, deleteOrderArticleRequest, isUndefined
} from '@fecommerce-workspace/data-store-lib';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LayoutService } from '../../shared/services/layout.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ArtSheetComponent } from '../../shared/components/art-sheet/art-sheet.component';
import { of, Observable, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { CustomerSearchTabletComponent } from '../../customer-search/customer-search-tablet/customer-search-tablet.component';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { ArticleSearchTabletComponent } from '../../article-search/article-search-tablet/article-search-tablet.component';

@Component({
  selector: 'order-overview-tablet',
  templateUrl: './order-overview-tablet.component.html',
  styleUrls: ['./order-overview-tablet.component.scss']
})
export class OrderOverviewTabletComponent extends OrderOverviewComponent implements OnInit, OnDestroy {

  public substractArt = 0;

  constructor(public store: Store<{ currentOrder: IOrder, orderArticles: IOrderArticle[] }>,
    public snackBar: MatSnackBar,
    public router: Router,
    public matDialog: MatDialog,
    public ordArtsService: OrderArticlesService,
    public bnService: BackNavigationService,
    public transServ: TranslationService,
    public headerService: HeaderService,
    public orderService: OrderService,
    public layoutService: LayoutService,
  ) {
    super(store, snackBar, router, matDialog,
      ordArtsService, bnService, transServ,
      headerService, orderService, layoutService)

    this.$articles = this.store.pipe(select('orderArticles'));
    this.subscriptions.add(
      this.$articles.subscribe((arts) => {
        console.log('arts');
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

  ngOnInit(): void { }

  public getTotal(): number {
    let total = this.ordArtsService.getTotal() - this.substractArt;
    total = Math.round(total * 100) / 100;
    return total > 0 ? total : 0;
  }

  public setArtToDelete(price: number) {
    this.substractArt = price;
  }

  ngOnDestroy(): void {
    //If the time of the snackbar
    //hasnt past yet, and the user wnats tyo go back
    //delete the article and dismiss snackbar
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

}
