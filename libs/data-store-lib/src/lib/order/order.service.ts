import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order.model';
import { Observable, BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  _baseUrl = 'assets/data/orders.json';

  private _orders: Array<Order> = [{
    "id": 8,
    "description": "Other Order",
    "amount": 65.22,
    "createdBy": "Federico Ribero",
    "articles": [{
      "id": 3,
      "name": "Soy Protein",
      "description": "Placental polyp, unspecified as to episode of care or not applicable",
      "price": "98.57"
    }, {
      "id": 4,
      "name": "Ocean Spray - Ruby Red",
      "description": "Late effect of internal injury to chest",
      "price": "8.94"
    }, {
      "id": 5,
      "name": "Cheese - Le Cheve Noir",
      "description": "Late effect of radiation",
      "price": "89.72"
    }],
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
      "id": 1,
      "name": "Southern Comfort",
      "description": "Eosinophilic gastroenteritis",
      "price": "56.87"
    }, {
      "id": 2,
      "name": "Stock - Veal, White",
      "description": "Malignant neoplasm of other specified sites of nasopharynx",
      "price": "76.19"
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
      "id": 69,
      "name": "Cookie Dough - Double",
      "description": "Other complications due to nervous system device, implant, and graft",
      "price": "11.42"
    }, {
      "id": 70,
      "name": "Ham - Black Forest",
      "description": "Transient paralysis of limb",
      "price": "40.36"
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
      "id": 31,
      "name": "Tea - Honey Green Tea",
      "description": "Twin birth, mate liveborn, born in hospital, delivered without mention of cesarean section",
      "price": "61.15"
    }, {
      "id": 32,
      "name": "Soup - Knorr, Chicken Noodle",
      "description": "Poisoning by erythromycin and other macrolides",
      "price": "51.80"
    }],
    "customer": {
      "id": 11,
      "name": "Cecilia Rodriguez",
      "address": "Libertad 740",
      "initials": "CR",
      "smallIcon": false
    }
  },
  {
    "id": 13,
    "articles": [{
      "id": 74,
      "name": "Sword Pick Asst",
      "description": "Suicide and self-inflicted injury by electrocution",
      "price": "35.09"
    }, {
      "id": 75,
      "name": "Transfer Sheets",
      "description": "Malignant neoplasm of ampulla of vater",
      "price": "76.52"
    }],
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
    "id": 14,
    "articles": [{
      "id": 83,
      "name": "Bread - Roll, Calabrese",
      "description": "Better eye: moderate vision impairment; lesser eye: profound vision impairment",
      "price": "57.68"
    }, {
      "id": 84,
      "name": "Squash - Pepper",
      "description": "Psychosexual dysfunction with other specified psychosexual dysfunctions",
      "price": "26.33"
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
    "id": 15,
    "articles": [{
      "id": 85,
      "name": "Wheat - Soft Kernal Of Wheat",
      "description": "Other fetal and newborn aspiration without respiratory symptoms",
      "price": "44.40"
    }],
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
  }];

  orders = new BehaviorSubject<Order[]>(this._orders);

  constructor(
    private httpClient: HttpClient
  ) { }

  public all(): Observable<Order[]> {
    return this.orders.asObservable();
  }

  public append(order: Order): Observable<Order[]> {
    const lastOrderId = this._orders[this._orders.length - 1].id;
    order = {...order, ...{ id: lastOrderId + 1 }};
    this._orders = this._orders.concat(order);
    this.orders.next(this._orders);

    return of(this._orders);
  }

  public replace(order: Order): Observable<Order[]> {
    const index = this._orders.findIndex(c => c.id === order.id);
    this._orders[index].description = order.description;
    this._orders[index].articles = order.articles;
    this._orders[index].amount = order.amount;
    this._orders[index].createdBy = order.createdBy;
    this.orders.next(this._orders);
    return this.orders.asObservable();
  }

  public delete(orderId: any): Observable<Order[]> {
    const index = this._orders.findIndex(c => c.id === orderId);
    this._orders.splice(index, 1);
    this.orders.next(this._orders);
    return this.orders.asObservable();
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
