import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IOrderArticle } from '../models/order-article.model';
import { IArticle } from '../models/article.model';
import { OrderService } from '../order/order.service';

@Injectable({ providedIn: 'root' })
export class OrderArticlesService {

  private _orderArticles: IOrderArticle[] = [];
  public total = 0;
  // private orderArticles = new BehaviorSubject(this._orderArticles);

  constructor() { }

  /**
   * @returns All order articles.
   */
  public getAll(): Observable<IOrderArticle[]> {
    this.setTotal()
    return of(this._orderArticles);
  }

  /**
   * Set order articles
   * @param orderArticles
   * @returns order created
   */

  public setOrderArticles(orderArticles: IOrderArticle[]): Observable<IOrderArticle[]> {
    this._orderArticles = orderArticles;
    return of(this._orderArticles);
  }

  /**
   * Set total price of order articles.
   */
  public setTotal(): void {
    this.total = this.getTotal()
  }

  /**
   * Create an order article
   * @param orderArticle
   * @returns order articles
   */
  public append(orderArticle: IOrderArticle): Observable<IOrderArticle[]> {
    const lastOrderArticleId = this._orderArticles[this._orderArticles.length - 1]?.id ?? 0;
    orderArticle = { ...orderArticle, ...{ id: lastOrderArticleId + 1 } }
    this._orderArticles = this._orderArticles.concat(orderArticle);
    return of(this._orderArticles);
  }

  /**
   * Edit order article of an order
   * @param orderArticle
   * @returns order articles
   */
  public replace(orderArticle: IOrderArticle): Observable<IOrderArticle[]> {
    this.delete(orderArticle.id);
    this.append(orderArticle);
    return of(this._orderArticles);
  }

  /**
   * Delete order article
   * @returns all order articles
   */
  public delete(articleId: any): Observable<IOrderArticle[]> {
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

  /**
   * Calculate total an order.
   * @param order
   */
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
