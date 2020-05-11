import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order.model';
import { Observable, BehaviorSubject, of, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  _baseUrl = 'assets/data/orders.json';

  private _orders: Array<Order> = [
    {
      "id": 8,
      "description": "Other Order",
      "amount": 65.22,
      "createdBy": "Federico Ribero",
      "articles": [{
        // "id": 1,
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
      "amount": 95.42,
      "createdBy": "Angel Camacho",
      "articles": [{
        "article": {
          "id": 1,
          "name": "Southern Comfort",
          "description": "Eosinophilic gastroenteritis",
          "price": 56.87
        },
        "quantity": 2
      }, {
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
      "amount": 83,
      "createdBy": "Federico Ribero",
      "articles": [{
        "article": {
          "id": 69,
          "name": "Cookie Dough - Double",
          "description": "Other complications due to nervous system device, implant, and graft",
          "price": 11.42
        },
        "quantity": 6
      }, {
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
      "amount": 36.45,
      "createdBy": "Federico Ribero",
      "articles": [{
        "article": {
          "id": 31,
          "name": "Tea - Honey Green Tea",
          "description": "Twin birth, mate liveborn, born in hospital, delivered without mention of cesarean section",
          "price": 61.15
        }, "quantity": 3
      }, {
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
    /* ,
    {
      "id": 14,
      "articles": [{
        id: 1,
        name: 'Envelope',
        description: 'articles envelope'
      },
      {
        id: 2,
        name: 'Box',
        description: 'articles box'
      },
      {
        id: 3,
        name: 'Food',
        description: 'articles foos'
      }],
      "description": "Order",
      "amount": 135.1,
      "createdBy": "Angel Camacho",
      "customer": {
        "id": 2,
        "name": "Robin Peerson",
        "address": "25 de Mayo 600",
        "initials": "RP",
        "smallIcon": false
      }
    },
    {
      "id": 13,
      "articles": [{
        id: 1,
        name: 'Envelope',
        description: 'articles envelope'
      },
      {
        id: 2,
        name: 'Box',
        description: 'articles box'
      },
      {
        id: 3,
        name: 'Food',
        description: 'articles foos'
      },
      {
        id: 1,
        name: 'Envelope',
        description: 'articles envelope'
      },
      {
        id: 2,
        name: 'Box',
        description: 'articles box'
      },
      {
        id: 3,
        name: 'Food',
        description: 'articles foos'
      }
      ],
      "description": "Order",
      "amount": 88.44,
      "createdBy": "Rodrigo Martinez Jr",
      "customer": {
        "id": 7,
        "name": "Martina Briganti",
        "address": "Lima 1540",
        "initials": "MB",
        "smallIcon": false
      }
    },
    {
      "id": 15,
      "articles": [{
        id: 1,
        name: 'Envelope',
        description: 'articles envelope'
      },
      {
        id: 2,
        name: 'Box',
        description: 'articles box'
      },
      {
        id: 3,
        name: 'Food',
        description: 'articles foos'
      },
      {
        id: 1,
        name: 'Envelope',
        description: 'articles envelope'
      },
      {
        id: 2,
        name: 'Box',
        description: 'articles box'
      },
      {
        id: 3,
        name: 'Food',
        description: 'articles foos'
      },
      {
        id: 1,
        name: 'Envelope',
        description: 'articles envelope'
      },
      {
        id: 2,
        name: 'Box',
        description: 'articles box'
      },
      {
        id: 3,
        name: 'Food',
        description: 'articles foos'
      }
      ],
      "description": "Order",
      "amount": 96.92,
      "createdBy": "Federico Ribero",
      "customer": {
        "id": 4,
        "name": "Rodrigo Martinez Jr",
        "address": "Jujuy 800",
        "initials": "RMJ",
        "smallIcon": true
      }
    } */
  ];

  public currentOrder: Order;

  public orders = new BehaviorSubject<Order[]>(this._orders);

  constructor(
    private httpClient: HttpClient
  ) { }

  public all(): Observable<Order[]> {
    return this.orders.asObservable();
  }

  public append(order: Order): Observable<Order[]> {
    const lastOrderId = this._orders[this._orders.length - 1].id;
    order = { ...order, ...{ id: lastOrderId + 1 } };
    this._orders = this._orders.concat(order);
    this.orders.next(this._orders);
    return of(this._orders);
  }

  public replace(order: Order): Observable<Order[]> {
    const orders = [];
    const editedOrder = {
      id: this.currentOrder.id,
      customer: order.customer,
      description: this.currentOrder.description,
      amount: this.currentOrder.amount,
      createdBy: this.currentOrder.createdBy,
      articles: this.currentOrder.articles
    };
    console.log(this.currentOrder);
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
    console.log(this._orders);
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
    if (!this.currentOrder) {
      this.currentOrder = order;
    }
    return of(null);
  }

  public getCurrentOrder(): Observable<Order> {
    return of(this.currentOrder);
  }

  public clearCurrentOrder(): Observable<any> {
    this.currentOrder = null;
    return of(null);
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
