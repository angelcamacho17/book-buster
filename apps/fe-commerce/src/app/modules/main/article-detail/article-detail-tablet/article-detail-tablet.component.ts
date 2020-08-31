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

    this.orderArticles$ = this.store.pipe(select('orderArticles'));
    this.subscriptions.add(
      this.orderArticles$.subscribe(data => {
        this.orderArticles = data;
      })
    );
    this.store.dispatch(getCurrentOrderRequest())
  }

  ngOnInit(): void {
  }

  /**
   * Overwrite to stay in overview.
   */
  public goToArticlesSearch(): void {
    this.router.navigate(['/main/order-overview']);
  }

}
