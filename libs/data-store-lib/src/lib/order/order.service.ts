import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order.model';
import { Observable, BehaviorSubject, of, EMPTY } from 'rxjs';
import { OrderArticle } from '../models/order-article.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  _baseUrl = 'assets/data/orders.json';
  private totalsCalculated = false;

  private _orders: Array<Order> = [
    {
      "id": 8,
      "description": "Other Order",
      "amount": null,
      "createdBy": "Federico Ribero",
      "articles": [{
        "id": 1,
        "article": {
          "id": 3,
          "name": "Soy Protein",
          "description": "Placental polyp, unspecified as to episode of care or not applicable",
          "price": 98.57
        },
        "quantity": 5
      },
      ],
      "customer": {
        "id": 5,
        "name": "Juan Pérez",
        "address": "General Paz 665",
        "initials": "JP",
        "smallIcon": false
      }
    },
    {
      "id": 9,
      "description": "New order",
      "amount": null,
      "createdBy": "Angel Camacho",
      "articles": [{
        "id": 1,
        "article": {
          "id": 1,
          "name": "Southern Comfort",
          "description": "Eosinophilic gastroenteritis",
          "price": 56.87
        },
        "quantity": 2
      }, {
        "id": 2,
        "article": {
          "id": 2,
          "name": "Stock - Veal, White",
          "description": "Malignant neoplasm of other specified sites of nasopharynx",
          "price": 76.19
        }, "quantity": 3
      }],
      "customer": {
        "id": 8,
        "name": "Morena Moreno",
        "address": "Belgrano 478",
        "initials": "MM",
        "smallIcon": false
      }
    },
    {
      "id": 11,
      "description": "other thing",
      "amount": null,
      "createdBy": "Federico Ribero",
      "articles": [{
        "id": 1,
        "article": {
          "id": 69,
          "name": "Cookie Dough - Double",
          "description": "Other complications due to nervous system device, implant, and graft",
          "price": 11.42
        },
        "quantity": 6
      }, {
        "id": 2,
        "article": {
          "id": 70,
          "name": "Ham - Black Forest",
          "description": "Transient paralysis of limb",
          "price": 40.36
        },
        "quantity": 8
      }],
      "customer": {
        "id": 12,
        "name": "Virginia Suarez",
        "address": "Av. Los patitos 5500",
        "initials": "VS",
        "smallIcon": false
      }
    },
    {
      "id": 12,
      "description": "Order",
      "amount": null,
      "createdBy": "Federico Ribero",
      "articles": [{
        "id":1,
        "article": {
          "id": 31,
          "name": "Tea - Honey Green Tea",
          "description": "Twin birth, mate liveborn, born in hospital, delivered without mention of cesarean section",
          "price": 61.15
        }, "quantity": 3
      }, {
        "id": 2,
        "article": {
          "id": 32,
          "name": "Soup - Knorr, Chicken Noodle",
          "description": "Poisoning by erythromycin and other macrolides",
          "price": 51.80
        }, "quantity": 8
      }],
      "customer": {
        "id": 11,
        "name": "Cecilia Rodriguez",
        "address": "Libertad 740",
        "initials": "CR",
        "smallIcon": false
      }
    }
  ];

  public currentOrder: Order;

  public orders = new BehaviorSubject<Order[]>(this._orders);

  constructor(
    private httpClient: HttpClient
  ) { }

  public all(): Observable<Order[]> {
    this.setOrdersTotal();
    return this.orders.asObservable();
  }

  public append(order: Order): Observable<Order[]> {
    console.log('estoy append')
    console.log(this._orders)
    const lastOrderId = this._orders[this._orders.length - 1]?.id ?? 0;
    const newOrder: Order = {
      id: lastOrderId + 1,
      description: order.description,
      amount: this.calculateTotal(order),
      createdBy: order.createdBy,
      articles: order.articles,
      customer: order.customer
    }
    this._orders = this._orders.concat(newOrder);
    this.orders.next(this._orders);
    return of(this._orders);
  }

  public replace(order: Order): Observable<Order[]> {
    console.log('estoy replace')
    const orders = [];
    const editedOrder = {
      id: this.currentOrder.id,
      customer: order.customer,
      description: this.currentOrder.description,
      amount: this.calculateTotal(order),
      createdBy: this.currentOrder.createdBy,
      articles: this.currentOrder.articles
    };
    for (let i = 0; i < this._orders.length; i++) {
      if (this._orders[i].id !== this.currentOrder.id) {
        orders.push(this._orders[i]);
      }
    }

    this._orders = [];
    this.currentOrder = editedOrder;
    orders.push(editedOrder);
    this._orders = orders;
    this.orders.next(this._orders);

    return of(this._orders);

  }

  public delete(orderId: number): Observable<Order[]> {
    const orders = [];
    for (let i = 0; i < this._orders.length; i++) {
      if (this._orders[i].id !== orderId) {
        orders.push(this._orders[i]);
      }
    }
    return of(orders);
  }

  public setCurrentOrder(order: Order): Observable<any> {
    if (this.currentOrder === null) {
      this.currentOrder = order;
    }
    return of(null);
  }

  public replaceCurrentOrder(order: Order): Observable<any> {
    this.currentOrder = order;
    return of(this.currentOrder);
  }

  public getCurrentOrder(): Observable<Order> {
    return of(this.currentOrder);
  }

  public clearCurrentOrder(): Observable<any> {
    this.currentOrder = null;
    return of(null);
  }

  private setOrdersTotal(): void {
    if (this.totalsCalculated) {
      return;
    }
    for (const order of this._orders) {
      order.amount = this.calculateTotal(order);
    }
    this.totalsCalculated = true;
  }

  private calculateTotal(order: Order): number {
    let total = 0;
    for (const orderArticle of order.articles) {
      total = total + orderArticle.article.price;
    }
    return Math.round(total * 100) / 100;
  }
}

/**


  private getCollectionUrl() {
    return this._baseUrl;
  }

  private getElementUrl(elementId: any) {
    return this._baseUrl + '/' + encodeURIComponent(String(elementId));
  }

  public all() {
    return this.httpClient.get<Order[]>(this.getCollectionUrl());
  }

  public append(order: Order) {
    return this.httpClient.post<Order>(this.getCollectionUrl(), order);
  }

  public replace(car: Order) {
    return this.httpClient.put<Order>(this.getElementUrl(car.id), car);
  }

  public delete(carId: number) {
    return this.httpClient.delete<Order>(this.getElementUrl(carId));
  }

 */
