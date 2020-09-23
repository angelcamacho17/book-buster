import { Component, OnInit, OnDestroy } from '@angular/core';
import { IArticle, IOrder, IArticleLine, getArticleRequest, OrderService, clearArticleRequest } from '@fecommerce-workspace/data-store-lib';
import { Observable, Subscription, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { LayoutService } from '../shared/services/layout.service';

@Component({
  selector: 'article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit, OnDestroy {
  public amount = 1;
  public article$: Observable<IArticle>;
  public currentOrder$: Observable<IOrder>;
  public article: IArticle = null;
  public x: IArticle;
  public name: Observable<string>;
  public code: Observable<string>;
  public price: Observable<number>;
  public orderArticles: IArticleLine[];
  public currentOrder: IOrder;
  public subscriptions = new Subscription();
  public loading = true;
  public loadingCurrentOrder = true;
  public initState = false;

  constructor(
    public store: Store<{ article: IArticle, currentOrder: IOrder }>,
    public route: ActivatedRoute,
    public router: Router,
    public orderService: OrderService,
    public layoutService: LayoutService
  ) { }

  ngOnInit(): void {
  }

  /**
   * Read id from url to get current article-
   */
  public getArticle(): void {
    let articleId: number;

    this.subscriptions.add(
      this.route.paramMap.pipe(
        map((params: ParamMap) => articleId = +params.get('id'))
      ).subscribe(() => {
        this.store.dispatch(getArticleRequest({ articleId }));
      })
    );
  }

  /**
   * Add quantity to current article.
   */
  public addQuantity(): void {
    this.amount++;
  }

  /**
   * Substract quantity to current article.
   */
  public removeQuantity(): void {
    if (this.amount > 0) {
      this.amount--;
    }
  }

  private createOrderArt(): IArticleLine {
    return {
      articleId: this.article.uuid,
      article: this.article,
      qty: this.amount
    }
  }

  /**
   * @returns update current order
   */
  public updatedOrder(): IOrder {
    const order: IOrder = {
      uuid: this.currentOrder?.uuid,
      documentNr: this.currentOrder?.documentNr,
      articlesLines: this.orderArticles,
      total: this.currentOrder?.total,
      customer: this.currentOrder?.customer,
      created: this.currentOrder?.created
    };
    return order;
  }

  /**
   * Got o article saearch
   */
  public goToArticlesSearch(): void {
    if (this.orderService.orderFlow === 'edit') {
      this.router.navigate(['/main/article-search/edit']);
    } else {
      this.router.navigate(['/main/article-search']);
    }
  }

  public subscribeToArticle() {
    this.article$ = this.store.pipe(select('article'));
    this.subscriptions.add(
      this.article$.subscribe((res: any) => {
        this.article = res?.body?.data;
        this.loading = false;
      })
    );
  }

  public subscribeToCurrentOrder() {
    this.currentOrder$ = this.store.pipe(select('currentOrder'));
    this.subscriptions.add(
      this.currentOrder$.subscribe((data: any) => {
        this.currentOrder = data;
        this.loadingCurrentOrder = false;
      })
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearArticleRequest());
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}
