import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ArticleRowComponent } from '../shared/components/row/article-row/article-row.component';
import { IArticle, OrderService, IOrder, refreshArticlesRequest } from '@fecommerce-workspace/data-store-lib';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { LayoutService } from '../shared/services/layout.service';

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
  public display = false;
  public navigation$: Observable<string>;
  public hide = false;
  public nodata = false;
  public shadow = false;
  public lastUrl = 'neworder';
  public emptyResults = true;
  public filteredResults: IArticle[] = [];
  constructor(
    public store: Store<{ articles: IArticle[], currentOrder: IOrder }>,
    public ordSer: OrderService,
    public router: Router,
    public layoutService: LayoutService
  ) { }

  ngOnInit(): void {
  }

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
  }


  public removeShadow(): void {
    this.shadow = false;
    this.hide = false;
  }

  public noDataPlaceholder(show: boolean): void {
    this.nodata = show;
  }

  handleSearchResults(results: any[]): void {
    this.emptyResults = results.length === 0;
    this.filteredResults = results;
  }

  ngOnDestroy(): void {
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
  }
}

