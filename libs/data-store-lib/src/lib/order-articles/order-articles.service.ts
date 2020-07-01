import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { OrderArticle } from '../models/order-article.model';
import { Article } from '../models/article.model';

@Injectable({ providedIn: 'root' })
export class OrderArticlesService {

    private _orderArticles: OrderArticle[] = [];
    // private orderArticles = new BehaviorSubject(this._orderArticles);

    constructor() { }

    public all(): Observable<OrderArticle[]> {
      return of(this._orderArticles);
    }

    public set(orderArticles: OrderArticle[]): Observable<OrderArticle[]> {
        this._orderArticles = orderArticles;
        return of(this._orderArticles);
    }

    public append(orderArticle: OrderArticle): Observable<OrderArticle[]> {
        const lastOrderArticleId = this._orderArticles[this._orderArticles.length - 1]?.id ?? 0;
        orderArticle = { ...orderArticle, ...{ id: lastOrderArticleId + 1 } }
        this._orderArticles = this._orderArticles.concat(orderArticle);
        //this.orderArticles.next(this._orderArticles);
        return of(this._orderArticles);
    }

    public replace(orderArticle: OrderArticle): Observable<OrderArticle[]> {
      this.delete(orderArticle.id);
      this.append(orderArticle);
      return of(this._orderArticles);
    }

    public delete(articleId: any): Observable<OrderArticle[]> {
      const articles = [];
      for (let i = 0; i < this._orderArticles.length; i++) {
        if (this._orderArticles[i].id !== articleId) {
          articles.push(this._orderArticles[i]);
        }
      }

      this._orderArticles = [];
      this._orderArticles = articles;

      return of(this._orderArticles);
    }

    public getTotal(): number {
      if (this._orderArticles == null) {
        return 0;
      }

      let total = 0;
      for (const orderArticle of this._orderArticles) {
        total = total + (orderArticle.article.price * orderArticle.quantity);
      }
      // Adding VAT
      total = total + 10.55;
      // Substracting discounts
      total = total - 45.13;

      if (total < 0) {
        total = 0;
      }

      return Math.round(total * 100) / 100;
    }

}
