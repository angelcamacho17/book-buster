import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticleSearchComponent } from '../article-search.component';
import { Store, select } from '@ngrx/store';
import { OrderService, IArticle, IOrder, refreshArticlesRequest, getCurrentOrderRequest, IArticleLine } from '@fecommerce-workspace/data';
import { Router } from '@angular/router';
import { LayoutService } from '../../shared/services/layout.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventService } from '../../shared/services/event.service';

@Component({
  selector: 'article-search-mobile',
  templateUrl: './article-search-mobile.component.html',
  styleUrls: ['./article-search-mobile.component.scss']
})
export class ArticleSearchMobileComponent extends ArticleSearchComponent implements OnInit, OnDestroy {

  constructor(
    public store: Store<{ article: IArticle, articles: IArticle[], currentOrder: IOrder, orderArticles: IArticleLine[]  }>,
    public ordSer: OrderService,
    public router: Router,
    public layoutService: LayoutService,
    public snackBar: MatSnackBar,
    public eventService: EventService
  ) {
    super(store, ordSer, router, layoutService, snackBar, eventService)
  }

  ngOnInit(): void {
    this._articles$ = this.store.pipe(select('articles'));
    this._subscriptions.add(
      this._articles$.subscribe((res: any) => {
        this.loading = false;
        if (res?.body?.data?.articles?.length === 0 || res?.body?.data?.articles?.length === undefined) {
          this.emptyResults = true;
        } else {
          this.emptyResults = false;
        }
        this.filteredResults = res?.body?.data?.articles;
        this.articles = this.filteredResults;
      })
    );

    this._articleScanned$ = this.store.pipe(select('article'));
    this._subscriptions.add(
      this._articleScanned$.subscribe((article: IArticle) => {
        // Workaround to avoid trigger this without calling it.
        if(!this.firstCall) {
          this.handleScannRes(article)
        } else {
           this.firstCall = false;
        }
      })
    );

    this._currentOrder$ = this.store.pipe(select('currentOrder'));
    this._subscriptions.add(this._currentOrder$.subscribe(data => {
      this.currentOrder = data;
    }));

    this._orderArticles$ = this.store.pipe(select('orderArticles'));
    this._subscriptions.add(this._orderArticles$.subscribe((res: any) => {
      this.orderArticles = res;
    }));

    this.store.dispatch(getCurrentOrderRequest());
    // this.store.dispatch(refreshArticlesRequest());
    setTimeout(()=>{
      this.showScanner()
    }, )

  }
  ngOnDestroy() {
    this.scanner = false;
    this.scannerStarted = false;
    this._subscriptions.unsubscribe();
  }
}
