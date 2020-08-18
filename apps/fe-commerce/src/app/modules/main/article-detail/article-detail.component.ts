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

  public getArticle() {
    let articleId: number;

    this.subscriptions.add(
      this.route.paramMap.pipe(
        map((params: ParamMap) => articleId = +params.get('id'))
      ).subscribe(() => {
        this.store.dispatch(getArticleRequest({ articleId }));
      })
    );
  }

  public addQuantity() {
    this.amount++;
  }

  removeQuantity() {
    if (this.amount > 0) {
      this.amount--;
    }
  }

  public addToOrder() {
    console.log('ENTRANDO')
    let orderArticle: IOrderArticle = {
      article: this.article,
      quantity: this.amount
    }
    console.log('order articles', this.orderArticles)
    console.log('current articles', this.currentOrder.articles);
    const orderArticles = this.currentOrder?.articles;
    // if (orderArticles?.length > 0) {
    //   this.store.dispatch(setOrderArticlesRequest({ orderArticles }));
    // }
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
    this.orderService.setOrderModifiedState(true);
    this.store.dispatch(replaceCurrentOrderRequest({ order: this.updatedOrder() }));
    console.log('update ',this.updatedOrder())
    this.goToArticlesSearch();
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
