import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IOrder, IArticleLine, IArticle, OrderService, getCurrentOrderRequest, handleArticleLineRequest } from '@fecommerce-workspace/data';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from '../../shared/services/layout.service';
import { ArticleDetailComponent } from '../article-detail.component';

@Component({
  selector: 'article-detail-mobile',
  templateUrl: './article-detail-mobile.component.html',
  styleUrls: ['./article-detail-mobile.component.scss']
})
export class ArticleDetailMobileComponent extends ArticleDetailComponent implements OnInit {

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
      this.loadingCurrentOrder = true;
      this.initState = true;
    });

    this.subscribeToCurrentOrder();
        
    this.subscribeToArticle();
    this.store.dispatch(getCurrentOrderRequest());
  }

  ngOnInit(): void {
    this.getArticle()
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
}
