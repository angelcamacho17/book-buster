import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private _customers: Customer[] = [
    {
        "id": 1,
        "name": "Angel Andres Camacho",
        "address": "T. caceres de allende 454",
        "initials": null
    },
    {
        "id": 2,
        "name": "Robin Peerson",
        "address": "25 de Mayo 600",
        "initials": null
    },
    {
        "id": 3,
        "name": "Federico Ribero",
        "address": "24 de Septiembre 3500",
        "initials": null
    },
    {
        "id": 4,
        "name": "Rodrigo Martinez Jr",
        "address": "Jujuy 800",
        "initials": null
    },
    {
        "id": 5,
        "name": "Juan Pérez",
        "address": "General Paz 665",
        "initials": null
    },
    {
        "id": 6,
        "name": "Luciana Fernandez",
        "address": "Gramajo Gutierrez 66",
        "initials": null
    },
    {
        "id": 7,
        "name": "Martina Briganti",
        "address": "Lima 1540",
        "initials": null
    },
    {
        "id": 8,
        "name": "Morena Moreno",
        "address": "Belgrano 478",
        "initials": null
    },
    {
        "id": 9,
        "name": "Esteban Quito",
        "address": "San Juan 90",
        "initials": null
    },
    {
        "id": 10,
        "name": "Angel Camacho",
        "address": "Rincon 550",
        "initials": null
    },
    {
        "id": 11,
        "name": "Cecilia Rodriguez",
        "address": "Libertad 740",
        "initials": null
    },
    {
        "id": 12,
        "name": "Virginia Suarez",
        "address": "Av. Los patitos 5500",
        "initials": null
    }
  ];
  customers = new BehaviorSubject<Customer[]>(this._customers);

  _baseUrl = 'assets/data/customers.json';

  constructor(private httpClient: HttpClient) { }

  public all(): Observable<Customer[]> {
    return this.customers.asObservable();
  }

  public append(customer: Customer): Observable<Customer[]> {
    this.customers.next({ ...this._customers, ...customer });
    return this.customers.asObservable();
  }

  public replace(customer: Customer): Observable<Customer[]> {
    const index = this._customers.findIndex(c => c.id === customer.id);
    this._customers[index].address = customer.address;
    this._customers[index].address = customer.name;
    this._customers[index].address = customer.initials;
    this.customers.next(this._customers);
    return this.customers.asObservable();
  }

  public delete(customer: Customer): Observable<Customer[]> {
    const index = this._customers.findIndex(c => c.id === customer.id);
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