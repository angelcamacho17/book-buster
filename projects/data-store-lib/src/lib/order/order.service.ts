import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  _baseUrl = 'http://localhost:4250/orders';

  constructor(
    private httpClient: HttpClient
  ) { }

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
}
