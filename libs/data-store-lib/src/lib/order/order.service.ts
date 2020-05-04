import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  _baseUrl = 'assets/data/orders.json';
  
  private _orders: Order[] = [
    {
      "id": 8,
      "description": "Other Order",
      "amount": 65.22,
      "createdBy": "Federico Ribero",
      "articles": []
    },
    {
      "id": 9,
      "description": "New order",
      "amount": 95.42,
      "createdBy": "Angel Camacho",
      "articles": []
    },
    {
      "id": 11,
      "description": "other thing",
      "amount": 83,
      "createdBy": "Federico Ribero",
      "articles": []
    },
    {
      "articles": [],
      "description": "Order",
      "amount": 36.45,
      "createdBy": "Federico Ribero",
      "id": 12
    },
    {
      "articles": [],
      "description": "Order",
      "amount": 88.44,
      "createdBy": "Rodrigo Martinez Jr",
      "id": 13
    },
    {
      "articles": [],
      "description": "Order",
      "amount": 135.1,
      "createdBy": "Angel Camacho",
      "id": 14
    },
    {
      "articles": [],
      "description": "Order",
      "amount": 96.92,
      "createdBy": "Federico Ribero",
      "id": 15
    }
  ];

  orders = new BehaviorSubject<Order[]>(this._orders);
  
  constructor(
    private httpClient: HttpClient
  ) { }

  public all(): Observable<Order[]> {
    return this.orders.asObservable();
  }

  public append(order: Order): Observable<Order[]> {
    this.orders.next({ ...this._orders, ...order });
    return this.orders.asObservable();
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

  public delete(order: Order): Observable<Order[]> {
    const index = this._orders.findIndex(c => c.id === order.id);
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
