import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IOrder, IOrderArticle, IArticle, OrderService, getCurrentOrderRequest, setOrderArticlesRequest, replaceOrderArticleRequest, appendOrderArticleRequest, replaceCurrentOrderRequest } from '@fecommerce-workspace/data-store-lib';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from '../../shared/services/layout.service';
import { ArticleDetailComponent } from '../article-detail.component';

@Component({
  selector: 'article-detail-tablet',
  templateUrl: './article-detail-tablet.component.html',
  styleUrls: ['./article-detail-tablet.component.scss']
})
export class ArticleDetailTabletComponent extends ArticleDetailComponent implements OnInit {

  constructor(
    public store: Store<{ article: IArticle, currentOrder: IOrder, orderArticles: IOrderArticle[] }>,
    public route: ActivatedRoute,
    public router: Router,
    public orderService: OrderService,
    public layoutService: LayoutService
  ) {
    super(store, route, router, orderService, layoutService);
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
  }

  public addToOrder() {
    let orderArticle: IOrderArticle = {
      article: this.article,
      quantity: this.amount
    }
    const orderArticles = this.currentOrder.articles;
    if (orderArticles?.length > 0) {
      this.store.dispatch(setOrderArticlesRequest({ orderArticles }));
    }
    const existingOrderArticle = this.orderArticles.find((o) => o.article.id === this.article.id);
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
    this.orderService.addingArticlesOnNewOrder = true;
    this.store.dispatch(replaceCurrentOrderRequest({ order: this.updatedOrder() }));
    this.goToArticlesSearch();
  }

  public goToArticlesSearch(): void {
    this.router.navigate(['/main/order-overview']);
  }

}
