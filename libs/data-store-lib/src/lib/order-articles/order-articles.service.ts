import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderArticle } from '../models/order-article.model';

@Injectable({ providedIn: 'root' })
export class OrderArticlesService {

    private _orderArticles: OrderArticle[] = [];
    private orderArticles = new BehaviorSubject(this._orderArticles);

    constructor() { }

    public all() {
        return this.orderArticles.asObservable();
    }

    public append(orderArticle: OrderArticle) {
        const lastOrderArticleId = this._orderArticles[this._orderArticles.length - 1].id;
        orderArticle = { ...orderArticle, ...{ id: lastOrderArticleId + 1 } }
        this._orderArticles = this._orderArticles.concat(orderArticle);
        this.orderArticles.next(this._orderArticles);
        return this.orderArticles.asObservable();
    }

    /* public replace(article: Article): Observable<Article[]> {
        const index = this._orderArticles.findIndex(c => c.id === article.id);
        this._orderArticles[index].description = article.description;
        this._orderArticles[index].name = article.name;
        this._orderArticles[index].price = article.price;
        this.orderArticles.next(this._orderArticles);
        return this.orderArticles.asObservable();
    }

    public delete(articleId: any): Observable<Article[]> {
      const index = this._orderArticles.findIndex(c => c.id === articleId);
      this._orderArticles.splice(index, 1);
      this.orderArticles.next(this._orderArticles);
      return this.orderArticles.asObservable();
    } */

}