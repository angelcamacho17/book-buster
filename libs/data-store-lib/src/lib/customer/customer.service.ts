import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICustomer } from '../models/customer.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private _customers: ICustomer[] = [
  {
      "id": 1,
      "name": "Angel Andres Camacho",
      "address": "T. caceres de allende 454",
      "initials": "AAC",
      "smallIcon": true
  },
  {
      "id": 2,
      "name": "Robin Peerson",
      "address": "25 de Mayo 600",
      "initials": "RP",
      "smallIcon": false
  },
  {
      "id": 3,
      "name": "Federico Ribero",
      "address": "24 de Septiembre 3500",
      "initials": "FR",
      "smallIcon": false
  },
  {
      "id": 4,
      "name": "Rodrigo Martinez Jr",
      "address": "Jujuy 800",
      "initials": "RMJ",
      "smallIcon": false
  },
  {
      "id": 5,
      "name": "Juan Pérez",
      "address": "General Paz 665",
      "initials": "JP",
      "smallIcon": false
  },
  {
      "id": 6,
      "name": "Luciana Fernandez",
      "address": "Gramajo Gutierrez 66",
      "initials": "LF",
      "smallIcon": false
  },
  {
      "id": 7,
      "name": "Martina Briganti",
      "address": "Lima 1540",
      "initials": "MB",
      "smallIcon": false
  },
  {
      "id": 8,
      "name": "Morena Moreno",
      "address": "Belgrano 478",
      "initials": "MM",
      "smallIcon": false
  },
  {
      "id": 9,
      "name": "Esteban Quito",
      "address": "San Juan 90",
      "initials": "EQ",
      "smallIcon": false
  },
  {
      "id": 10,
      "name": "Angel Camacho",
      "address": "Rincon 550",
      "initials": "AC",
      "smallIcon": false
  },
  {
      "id": 11,
      "name": "Cecilia Rodriguez",
      "address": "Libertad 740",
      "initials": "CR",
      "smallIcon": false
  },
  {
      "id": 12,
      "name": "Virginia Suarez",
      "address": "Av. Los patitos 5500",
      "initials": "VS",
      "smallIcon": false
  }
  ];
  customers = new BehaviorSubject<ICustomer[]>(this._customers);

  _baseUrl = 'assets/data/customers.json';

  constructor(private httpClient: HttpClient) { }

  public all(): Observable<ICustomer[]> {
    return this.customers.asObservable();
  }

  public append(customer: ICustomer): Observable<ICustomer[]> {
    this.customers.next({ ...this._customers, ...customer });
    return this.customers.asObservable();
  }

  public replace(customer: ICustomer): Observable<ICustomer[]> {
    const index = this._customers.findIndex(c => c.id === customer.id);
    this._customers[index].address = customer.address;
    this._customers[index].address = customer.name;
    this._customers[index].address = customer.initials;
    this.customers.next(this._customers);
    return this.customers.asObservable();
  }

  public delete(customerId: any): Observable<ICustomer[]> {
    const index = this._customers.findIndex(c => c.id === customerId);
    this._customers.splice(index, 1);
    this.customers.next(this._customers);
    return this.customers.asObservable();
  }

}

/*

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
   */
