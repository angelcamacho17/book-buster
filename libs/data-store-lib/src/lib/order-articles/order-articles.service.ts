import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { OrderArticle } from '../models/order-article.model';
import { Article } from '../models/article.model';

@Injectable({ providedIn: 'root' })
export class OrderArticlesService {

    private _orderArticles: OrderArticle[] = [];
    // private orderArticles = new BehaviorSubject(this._orderArticles);

    constructor() { }

    public all() {
      console.log('all ord arts')

        return of(this._orderArticles);
    }

    public append(orderArticle: OrderArticle) {
      console.log('append serv ord arts')

        const lastOrderArticleId = this._orderArticles[this._orderArticles.length - 1]?.id ?? 0;
        orderArticle = { ...orderArticle, ...{ id: lastOrderArticleId + 1 } }
        this._orderArticles = this._orderArticles.concat(orderArticle);
        //this.orderArticles.next(this._orderArticles);
        return of(this._orderArticles);
    }

    /* public replace(article: Article): Observable<Article[]> {
        const index = this._orderArticles.findIndex(c => c.id === article.id);
        this._orderArticles[index].description = article.description;
        this._orderArticles[index].name = article.name;
        this._orderArticles[index].price = article.price;
        this.orderArticles.next(this._orderArticles);
        return this.orderArticles.asObservable();
    }*/

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

}
