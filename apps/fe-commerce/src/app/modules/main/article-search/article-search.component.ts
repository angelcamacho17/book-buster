import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticleRowComponent } from '../shared/components/row/article-row/article-row.component';
import { IArticle, OrderService, IOrder, refreshArticlesRequest, IArticleLine, getArticlesRequest, getScannedArticleRequest } from '@fecommerce-workspace/data';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LayoutService } from '../shared/services/layout.service';
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
  public articleScanned: IArticle;
  public _articleScanned$: Observable<IArticle>;
  public _subscriptions = new Subscription();
  public scanner = true;
  public navigation$: Observable<string>;
  public hide = false;
  public nodata = false;
  public shadow = false;
  public lastUrl = 'neworder';
  public emptyResults = true;
  public filteredResults: IArticle[] = [];
  public loading = true;
  public pauseScan = false;
  public orderArticles: IArticleLine[];
  public currentOrder: IOrder;
  public _currentOrder$: Observable<IOrder>;
  public _orderArticles$: Observable<IArticleLine[]>;
  public scannerStarted = false;
  public firstCall = true;

  constructor(
    public store: Store<{ article: IArticle, articles: IArticle[], currentOrder: IOrder, orderArticles: IArticleLine[]  }>,
    public ordSer: OrderService,
    public router: Router,
    public layoutService: LayoutService,
    public snackBar: MatSnackBar,
    public eventService: EventService

    ) { }

  ngOnInit(): void {
    localStorage.setItem('CAMERA_ALLOWED', 'true')

  }

  /**
   * Handle navigation after select.
   */
  public overviewOrder(): void {
    this.router.navigate(['/main/order-overview']);
  }
  /**
   * Handle article scanned.
   * @param scanResult
   */
  public articleCodeScanned(scanResult) {
    // Pause scanning.
    if (this.pauseScan) {
      return;
    }
    this.pauseScan = true;

    this.store.dispatch(getScannedArticleRequest({ barcode: scanResult.code?.code }))
    return;
  }

  /**
   * Handle article scanned
   * @param article
   */
  public handleScannRes(article: any) {
    let snack;

    if (article !== undefined && article !== null && article?.uuid) {
      this.router.navigate(['/main/article-detail/', article.uuid]);
    } else {
      snack = this.snackBar.open(`Article could not be found.`, 'Close')
    }
    this.pauseScan = false;
    // After snack bar closed, continue scanner.
    if(snack) {
      snack.afterDismissed().subscribe(() => {
        this.pauseScan = false;
      });
    }
  }

  /**
   * Hide scanner and show initial state of the search.
   * @param hide
   */
  public hidePanel(hide: boolean): void {
    this.hide = hide;
  }

  /**
   * On searching, show shadow state.
   * @param shadow
   */
  public showShadow(shadow: boolean): void {
    this.shadow = shadow;
    this.scanner = false;
    this.scannerStarted = false;

  }

  /**
   * Show scanner.
   */
  public showScanner(event?) {
    if (localStorage.getItem('CAMERA_ALLOWED') && localStorage.getItem('CAMERA_ALLOWED')==='false'){
      const msg = 'Refresh your page to allow the camera';
      const snackRef = this.snackBar.open(msg, 'REFRESH', {
        duration: 5000,
      });
      snackRef.afterDismissed().subscribe((action)=>{
        if (action.dismissedByAction) {
          this.loading = true;
          setTimeout(() => {
            location.reload();
          }, 0);
          event.stopImmediatePropagation();
        }
      });
    } else {
      this.scanner = true;
    }
  }
  /**
   * On start seaching, set state.
   */
  public searchStarted(): void {
    this.shadow = false;
    this.hide = false;
    this.scanner = false;
    this.scannerStarted = false;

  }

  /**
   * Finish laoding state.
   * @param event
   */
  public onStarted(event) {

    this.scannerStarted = true;
  }

  public noDataPlaceholder(show: boolean): void {
    this.nodata = show;
  }

  /**
   * To be overright by the child classes.
   * @param article
   */
  public addToOrder(article: IArticle) { }

  /**
   * @returns Get updated current order.
   */
  public updatedOrder(): IOrder {
    const order: IOrder = {
      uuid: this.currentOrder?.uuid,
      documentNr: this.currentOrder?.documentNr,
      articlesLines: this.orderArticles,
      total: this.currentOrder.total,
      customer: this.currentOrder.customer,
      created: this.currentOrder.created
    };
    return order;
  }

   /**
  * After a search, set vars to react propperly.
  * @param query
  */
 public handleSearchResults(query: any): void {
  this.emptyResults = query.length === 0;
  if (query.length > 2) {
    this.loading = true;
    this.store.dispatch(getArticlesRequest({ filter: query }))
  } else {
    setTimeout(() => {
      this.loading = false;
    })
    this.filteredResults = [];
    this.articles = [];
  }
}

  /**
   * Permission response.
   */
  public handlePermission(event) {
    if (event === false) {
      localStorage.setItem('CAMERA_ALLOWED', 'false')

      this.noCameraFound(false);
      const msg = 'You need to allow the camera to access the scanner';
      this.snackBar.open(msg, '', {
        duration: 2000,
      });
    } else {
      localStorage.setItem('CAMERA_ALLOWED', 'true')
    }
  }

  /**
   * No camera found.
   * @param event
   */
  public noCameraFound(event) {
    this.scanner = false;
    this.loading = false;
  }

  ngOnDestroy(): void {
    this.filteredResults = [];
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
    this.store.dispatch(refreshArticlesRequest());
    this.scanner = false;
    this.scannerStarted = false;
    localStorage.setItem('CAMERA_ALLOWED', 'true')

  }
}

