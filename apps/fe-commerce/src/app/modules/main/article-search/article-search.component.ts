import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ArticleRowComponent } from '../shared/components/row/article-row/article-row.component';
import { IArticle, OrderService, IOrder, refreshArticlesRequest, IOrderArticle, setOrderArticlesRequest, replaceOrderArticleRequest, appendOrderArticleRequest, replaceCurrentOrderRequest } from '@fecommerce-workspace/data-store-lib';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { LayoutService } from '../shared/services/layout.service';
import { ScanResult } from '@fecommerce-workspace/scanner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventService } from '../shared/services/event.service';

@Component({
  selector: 'article-search',
  templateUrl: './article-search.component.html',
  styleUrls: ['./article-search.component.scss']
})
export class ArticleSearchComponent implements OnInit, OnDestroy {
  public rowType = ArticleRowComponent;
  public articles: IArticle[] = [];
  public _articles$: Observable<IArticle[]>;
  public _subscriptions = new Subscription();
  public scanner = false;
  public navigation$: Observable<string>;
  public hide = false;
  public nodata = false;
  public shadow = false;
  public lastUrl = 'neworder';
  public emptyResults = true;
  public filteredResults: IArticle[] = [];
  public display = false;
  public displayResults = false;
  public pauseScan = false;
  public innerHeight = null;
  public orderArticles: IOrderArticle[];
  public currentOrder: IOrder;
  public _currentOrder$: Observable<IOrder>;
  public _orderArticles$: Observable<IOrderArticle[]>;

  constructor(
    public store: Store<{ articles: IArticle[], currentOrder: IOrder, orderArticles: IOrderArticle[]  }>,
    public ordSer: OrderService,
    public router: Router,
    public layoutService: LayoutService,
    public snackBar: MatSnackBar,
    public eventService: EventService

  ) { }

  ngOnInit(): void { }

  public overviewOrder(): void {
    if (this.ordSer.currentOrder?.id) {
      this.router.navigate(['/main/order-overview']);
    } else {
      this.router.navigate(['/main/order-overview']);
    }
  }

  public hidePanel(hide: boolean): void {
    this.hide = hide;
  }

  public showShadow(shadow: boolean): void {
    this.shadow = shadow;
    this.scanner = false;
  }

  public showScanner() {
    this.scanner = true;
  }


  public removeShadow(): void {
    this.shadow = false;
    this.hide = false;
    this.scanner = false;
  }

  public noDataPlaceholder(show: boolean): void {
    this.nodata = show;
  }

  public articleCodeScanned(scanResult: ScanResult) { // art: Article) {
    let snack;
    if (this.pauseScan) {
      return;
    }
    console.log(scanResult);

  const articleScanned = JSON.parse(scanResult?.code)?.article ;
  this.pauseScan = true;

  this.eventService.articleSelected(articleScanned);
  this.router.navigate(['/main/article-detail', articleScanned.id]);

  const article = this.articles.find((a: any) => {
      return a.description === articleScanned.description;
    });

    if (article) {
      this.addToOrder(article);
      // snack = this.snackBar.open(`Article ${article?.name} added to order.`, 'Close');

    } else {
      snack = this.snackBar.open(`Article could not be found.`, 'Close')
    }
    snack.afterDismissed().subscribe(() => {
      this.pauseScan = false;
    })

  }

  public addToOrder(article: IArticle) {
    let orderArticle: IOrderArticle = {
      article,
      quantity: 1
    }

    const orderArticles = this.currentOrder.articles;
    if (orderArticles.length > 0) {
      this.store.dispatch(setOrderArticlesRequest({ orderArticles }));
    }
    if (this.orderArticles) {
      const existingOrderArticle = this.orderArticles.find((o) => o.article.id === article.id);

      if (existingOrderArticle) {
        orderArticle = {
          id: existingOrderArticle.id,
          article,
          quantity: (existingOrderArticle.quantity + 1)
        }
        this.store.dispatch(replaceOrderArticleRequest({ orderArticle }))
      } else {
        this.store.dispatch(appendOrderArticleRequest({ orderArticle }));
      }
    } else {
      this.store.dispatch(appendOrderArticleRequest({ orderArticle }));
    }


    this.store.dispatch(replaceCurrentOrderRequest({ order: this.updatedOrder() }))
  }

  public updatedOrder(): IOrder {
    const order: IOrder = {
      id: this.currentOrder?.id,
      description: this.currentOrder.description,
      articles: this.orderArticles,
      amount: this.currentOrder.amount,
      customer: this.currentOrder.customer,
      createdBy: this.currentOrder.createdBy
    };
    return order;
  }

  public handleSearchResults(results: any[]): void {
    this.emptyResults = results.length === 0;
    this.filteredResults = results;
    this.scanner = true;
  }

  ngOnDestroy(): void {
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
    this.scanner = false;
  }
}

