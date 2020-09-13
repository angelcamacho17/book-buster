import { Component, OnInit, OnDestroy } from '@angular/core';
import { IArticle, IOrder, IOrderArticle, getCurrentOrderRequest, getArticleRequest, setOrderArticlesRequest, replaceOrderArticleRequest, appendOrderArticleRequest, replaceCurrentOrderRequest, OrderService } from '@fecommerce-workspace/data-store-lib';
import { Observable, Subscription } from 'rxjs';
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
  public orderArticles$: Observable<IOrderArticle[]>
  public article: IArticle;
  public orderArticles: IOrderArticle[];
  public currentOrder: IOrder;
  public subscriptions = new Subscription();


  constructor(
    public store: Store<{ article: IArticle, currentOrder: IOrder, orderArticles: IOrderArticle[] }>,
    public route: ActivatedRoute,
    public router: Router,
    public orderService: OrderService,
    public layoutService: LayoutService
  ) {

    this.article$ = this.store.pipe(select('article'));
    this.subscriptions.add(
      this.article$.subscribe(data => {
        this.article = data;
      })
    );

    this.currentOrder$ = this.store.pipe(select('currentOrder'));
    this.subscriptions.add(
      this.currentOrder$.subscribe(data => {
        this.currentOrder = data;
      })
    );
    this.store.dispatch(getCurrentOrderRequest())

    this.orderArticles$ = this.store.pipe(select('orderArticles'));
    this.subscriptions.add(
      this.orderArticles$.subscribe(data => {
        this.orderArticles = data;
      })
    );
  }

  ngOnInit(): void {
    this.getArticle()
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

  private createOrderArt(): IOrderArticle {
    return {
      article: this.article,
      quantity: this.amount
    }

  }

  /**
   * Add
   */
  public addToOrder(): void {

    // Create order article
    let orderArticle = this.createOrderArt();

    // Get order articles
    const orderArticles = this.currentOrder?.articles;

    // Check if this articles is already added.
    const existingOrderArticle = orderArticles?.find((o) => o.article.id === this.article.id);
    if (existingOrderArticle) {
      orderArticle = {
        id: existingOrderArticle.id,
        article: this.article,
        quantity: (existingOrderArticle.quantity + this.amount)
      }
      this.store.dispatch(replaceOrderArticleRequest({ orderArticle }));
    } else {
      this.store.dispatch(appendOrderArticleRequest({ orderArticle }));
    }

    // Update current order
    this.store.dispatch(replaceCurrentOrderRequest({ order: this.updatedOrder() }));

    // Go back to article search
    this.goToArticlesSearch();
  }

  /**
   * @returns update current order
   */
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

  ngOnDestroy(): void {
    if(this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}
