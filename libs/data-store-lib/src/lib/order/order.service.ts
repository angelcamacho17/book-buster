import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order.model';
import { Observable, BehaviorSubject, of, EMPTY } from 'rxjs';
import { OrderArticle } from '../models/order-article.model';
import { OrderArticlesService } from '../order-articles/order-articles.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  _baseUrl = 'assets/data/orders.json';
  private totalsCalculated = false;

  private _orders: Array<Order> = [
    {
      "id": 9,
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
      "id": 10,
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
      },
      {
        "id": 3,
        "article": {
        "id": 81,
        "name": "Thyme - Fresh",
        "description": "Inflamed seborrheic keratosis",
        "price": +"7.14"
      }, "quantity": 3
    },
    {
      "id": 4,
      "article": {
        "id": 82,
        "name": "Port - 74 Brights",
        "description": "Frostbite of face",
        "price": +"52.75"
      }, "quantity": 3
    }, {
      "id": 5,
      "article": {
        "id": 83,
        "name": "Bread - Roll, Calabrese",
        "description": "Better eye: moderate vision impairment; lesser eye: profound vision impairment",
        "price": +"57.68"
      }, "quantity": 3
    }, {
        "id": 6,
        "article": {
        "id": 84,
        "name": "Squash - Pepper",
        "description": "Psychosexual dysfunction with other specified psychosexual dysfunctions",
        "price": +"26.33"
      }, "quantity": 3
    }, {
      "id": 7,
      "article": {
        "id": 85,
        "name": "Wheat - Soft Kernal Of Wheat",
        "description": "Other fetal and newborn aspiration without respiratory symptoms",
        "price": +"44.40"
      }, "quantity": 3
    },
    ],
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
      },{
        "id": 3,
        "article": {
          "id": 10,
          "name": "Pork - Butt, Boneless",
          "description": "Deep necrosis of underlying tissues [deep third degree) with loss of a body part, of forearm",
          "price": +"37.21"
        },
        "quantity": 2
      }, {
        "id": 4,
        "article": {
          "id": 8,
          "name": "Muffin Mix - Carrot",
          "description": "Secondary neuroendocrine tumor, unspecified site",
          "price": +"93.17"
        }, "quantity": 3
      },
      {
        "id": 5,
        "article": {
          "id": 36,
          "name": "Orange - Blood",
          "description": "Femoral hernia without mention of obstruction or gangrene, bilateral (not specified as recurrent)",
          "price": +"1.47"
        },
        "quantity": 2
      }, {
        "id": 6,
        "article": {
          "id": 9,
          "name": "Tea - Earl Grey",
          "description": "Stenosis of lacrimal punctum",
          "price": +"95.78"
        }, "quantity": 3
      },
      {
        "id": 7,
        "article": {
          "id": 29,
          "name": "Guinea Fowl",
          "description": "Unspecified monoarthritis, site unspecified",
          "price": +"74.00"
        },
        "quantity": 2
      }, {
        "id": 8,
        "article": {
          "id": 32,
          "name": "Soup - Knorr, Chicken Noodle",
          "description": "Poisoning by erythromycin and other macrolides",
          "price": +"51.80"
        }, "quantity": 3
      },
      {
        "id": 9,
        "article": {
          "id": 31,
          "name": "Tea - Honey Green Tea",
          "description": "Twin birth, mate liveborn, born in hospital, delivered without mention of cesarean section",
          "price": +"61.15"
        },
        "quantity": 2
      }, {
        "id": 10,
        "article": {
          "id": 30,
          "name": "Salmon - Atlantic, No Skin",
          "description": "Post term pregnancy, unspecified as to episode of care or not applicable",
          "price": +"78.52"
        }, "quantity": 3
      }
    ],
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
    },

  ];

  public currentOrder: Order = null;

  constructor(
    private httpClient: HttpClient,
    private _ordArtsService: OrderArticlesService
  ) { }

  public all(): Observable<Order[]> {
    this.setOrdersTotal();
    return of(this._orders);
  }

  public append(order: Order): Observable<Order[]> {
    console.log(this._orders);
    const lastOrderId = this._orders[this._orders.length - 1]?.id;
    const newOrder: Order = {
      id: lastOrderId + 1,
      description: order.description,
      amount: this.calculateTotal(order),
      createdBy: order.createdBy,
      articles: order.articles,
      customer: order.customer
    }
    console.log(lastOrderId);
    this._orders = this._orders.concat(newOrder);
    return of(this._orders);
  }

  public replace(order: Order): Observable<Order[]> {
    const orders = [];
    const editedOrder = {
      id: this.currentOrder.id,
      customer: order.customer,
      description: this.currentOrder.description,
      amount: this._ordArtsService.getTotal(),
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
    this._orders.sort(function(a, b){return a.id - b.id});
    return of(this._orders);

  }

  public delete(): Observable<Order[]> {
    const orders = [];
    for (let i = 0; i < this._orders.length; i++) {
      if (this._orders[i].id !== this.currentOrder?.id) {
        orders.push(this._orders[i]);
      }
    }
    this._orders = [];
    this._orders = orders;
    console.log(this._orders);
    return of(this._orders);
  }

  public setCurrentOrder(order: Order): Observable<any> {
    if (this.currentOrder === null) {
      this.currentOrder = order;
    }
    return of(this.currentOrder);
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
      total = total + (orderArticle.article.price * orderArticle.quantity);
    }
    // Adding VAT
    total = total + 10.55;
    // Substracting discounts
    total = total - 45.13
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
