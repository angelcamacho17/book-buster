import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  IOrder, IArticleLine, IArticle, OrderService, getCurrentOrderRequest, handleArticleLineRequest
} from '@fecommerce-workspace/data-store-lib';
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
    public store: Store<{ article: IArticle, currentOrder: IOrder, orderArticles: IArticleLine[] }>,
    public route: ActivatedRoute,
    public router: Router,
    public orderService: OrderService,
    public layoutService: LayoutService
  ) {
    super(store, route, router, orderService, layoutService);

    setTimeout(() => {
      this.loading = true;
    });

    this.article$ = this.store.pipe(select('article'));
    this.subscriptions.add(
      this.article$.subscribe((data: any) => {
        this.article = data?.body?.data;
        this.loading = false;
      })
    );

    this.currentOrder$ = this.store.pipe(select('currentOrder'));
    this.subscriptions.add(
      this.currentOrder$.subscribe((data: any) => {
        this.currentOrder = data;
      })
    );

    this.store.dispatch(getCurrentOrderRequest())

    this.subscribeToArticle();
  }

  ngOnInit(): void {
    this.getArticle()
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

  /**
   * Add article to order.
   */
  public addToOrder() {
    const articleLine: IArticleLine = {
      article: this.article,
      qty: this.amount
    }
    const orderId = this.currentOrder.uuid;
    this.store.dispatch(handleArticleLineRequest({ orderId, articleLine }));
    this.orderService.addingArticlesOnNewOrder = true;
    this.goToArticlesSearch();
  }

  public goToArticlesSearch(): void {
    this.router.navigate(['/main/order-overview']);
  }

}
