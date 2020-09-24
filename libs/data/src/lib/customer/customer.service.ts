import { Injectable } from '@angular/core';
import { ICustomer } from '../models/customer.model';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { DataService, IHCSParameter } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private _customers: ICustomer[] = [];
  customers = new BehaviorSubject<ICustomer[]>(this._customers);

  private _resource = 'customers'

  constructor(private _dataService: DataService) { }

  public getCustomers(userQuery: string): Observable<ICustomer[]> {
    const queryParameters: IHCSParameter[] = [
      {
        key: 'filter',
        value: userQuery
      }
    ];
    return this._dataService.get(this._resource, queryParameters);
  }

  /**
   * @returns All customers.
   */
  public getAll(): Observable<ICustomer[]> {
    // Until we need this method
    return of(this._customers)
  }

  /**
   * @returns get scanned customer
   */
  public getScannedCustomer(barcode: string): Observable<ICustomer[]> {
    const queryParameters: IHCSParameter[] = [
      {
        key: 'barcode',
        value: barcode
      }
    ];
    return this._dataService.get(this._resource, queryParameters);
  }


  /**
   * Create a customer
   * @param customer
   * @returns customer
   */
  public append(customer: ICustomer): Observable<ICustomer[]> {
    this.customers.next({ ...this._customers, ...customer });
    return this.customers.asObservable();
  }

  /**
   * Edit customer
   * @param customer
   * @returns customer
   */
  public replace(customer: ICustomer): Observable<ICustomer[]> {
    // const index = this._customers.findIndex(c => c.id === customer.id);
    // this._customers[index].address = customer.address;
    // this._customers[index].address = customer.name;
    // this._customers[index].address = customer.initials;
    // this.customers.next(this._customers);
    return this.customers.asObservable();
  }

  /**
   * Delete customer
   * @param customerId
   * @returns customers
   */
  public delete(customerId: any): Observable<ICustomer[]> {
    // const index = this._customers.findIndex(c => c.id === customerId);
    // this._customers.splice(index, 1);
    // this.customers.next(this._customers);
    return this.customers.asObservable();
  }

}
