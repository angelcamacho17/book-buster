import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  _baseUrl = 'assets/data/customers.json';

  constructor(private httpClient: HttpClient) { }

  private getCollectionUrl() {
    return this._baseUrl;
  }

  private getElementUrl(elementId: any) {
    return this._baseUrl + '/' + encodeURIComponent(String(elementId));
  }

  public all() {
    return this.httpClient.get<Customer[]>(this.getCollectionUrl());
  }

  public append(customer: Customer) {
    return this.httpClient.post<Customer>(this.getCollectionUrl(), customer);
  }

  public replace(car: Customer) {
    return this.httpClient.put<Customer>(this.getElementUrl(car.id), car);
  }

  public delete(carId: number) {
    return this.httpClient.delete<Customer>(this.getElementUrl(carId));
  }
}
