import { Injectable } from '@angular/core';
import { IOrder, IArticleLine } from '../models/order.model';
import { Observable, of, EMPTY } from 'rxjs';
import { DataService, IHCSParameter } from '../services/data.service';
import { HCSClient } from '../sdp/hcs/hcs-client/hcs-client.service';
import { switchMap, catchError } from 'rxjs/operators';
import { ICustomer } from '../models/customer.model';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private _resource = 'documents/orders'
  public orderFlow: string;           // Used on new order flow to know where to navigate.
  public switchCustomerFlow = false;  // Used on new order flow to know where to navigate.
  public addingArticlesOnNewOrder = false;  // Used on new order flow to know where to navigate.
  public _orders: Array<IOrder> = [];
  public currentOrder: IOrder = this._localStorageService.getKey('currentOrder');
  constructor(
    private _dataService: DataService,
    // private _hcs: HCSClient
    private _localStorageService: LocalStorageService
  ) { }

  /**
   * @returns All orders
   */
  public getAll(): Observable<IOrder[]> {
    // this.setOrdersTotal();
    return this._dataService.get(this._resource + '/recent');
  }

  /**
   * Get an order
   * @param orderId
   */
  public getOrder(orderId: number): Observable<IOrder> {
    const url = this._resource + '/{' + orderId + '}'
    return this._dataService.get(url).pipe(
      switchMap((data: any) => {
        const order = data?.body?.data;
        return of(order);
      }),
      catchError(() => {
        return of(EMPTY);
      })
    )
  }

  public createOrder(customer: ICustomer): Observable<IOrder> {
    const url = this._resource;
    const parameters: IHCSParameter[] = [
      {
        key: 'customerId',
        value: customer.uuid.toString()
      }
    ];

    return this._dataService.create(url, parameters).pipe(
      switchMap((data: any) => {
        const order = data?.body?.data;
        return of(order);
      }),
      catchError(() => EMPTY)
    );
  }

  public switchCustomer(orderId: number, customer: ICustomer): Observable<IOrder> {
    const url = this._resource + '/{' + orderId + '}';
    const parameters: IHCSParameter[] = [
      {
        key: 'customerId',
        value: customer.uuid
      }
    ];

    return this._dataService.update(url, parameters).pipe(
      switchMap((data: any) => {
        return of(data?.body?.data);
      }),
      catchError(() => EMPTY)
    )
  }

  public handleArticleLine(orderId: number, articleLine: IArticleLine): Observable<IOrder> {
    let existingOrderArticle;
    if (this.currentOrder.articlesLines) {
      existingOrderArticle = this.currentOrder.articlesLines.find((value) => {
        return value.article.uuid === articleLine.article.uuid;
      });
    }
    if (existingOrderArticle) {
      return this.editArticleLine(orderId, existingOrderArticle.uuid, articleLine.qty);
    } else {
      return this.addArticleLine(orderId, articleLine)
    }
  }

  /**
   * Create an article line
   * @param articleLine
   * @returns order articles
   */
  public addArticleLine(orderId: number, articleLine: IArticleLine): Observable < IOrder > {
  const url = this._resourceUrl(orderId);
  const parameters: IHCSParameter[] = [
    {
      key: 'Articles',
      value: [
        {
          'articleId': articleLine.article.uuid,
          'qty': articleLine.qty
        }
      ]
    }
  ]
    return this._dataService.create(url, parameters).pipe(
    switchMap((data: any) => {
      return of(data?.body?.data);
    }),
    catchError(() => EMPTY)
  )
}

  /**
   * This method updates an articleline of an order.
   * @param orderId 
   * @param articleLineId 
   * @param quantity How much the qty has to increase.
   */
  public editArticleLine(orderId: number, articleLineId: number, quantity: number): Observable < IOrder > {
  const url = this._resourceUrl(orderId, articleLineId)
    const parameters: IHCSParameter[] = [
    {
      key: 'qty',
      value: quantity
    }
  ];

  return this._dataService.update(url, parameters).pipe(
    switchMap((data: any) => {
      return of(data?.body?.data);
    }),
    catchError(() => EMPTY)
  );
}

  public deleteArticleLine(orderId: number, articleLineId: number): Observable < IOrder > {
  const url = this._resourceUrl(orderId, articleLineId);
  console.log(url)
  return this._dataService.delete(url).pipe(
    switchMap((data: any) => {
      console.log(data)
      return of(data?.body?.data);
    }),
    catchError((e) => {
      console.log(e)
      return EMPTY;
    })
  );
}


  /**
   * Delete order
   * @returns all orders
   */
  public delete (): Observable < IOrder[] > {
  return of(null);
}

  /**
   * Set currrent order
   * @param order
   * @returns current order
   */
  public setCurrentOrder(order: IOrder): Observable < any > {
  this.currentOrder = order;
  this._localStorageService.setKey('currentOrder', order);
  return of(this.currentOrder);
}

  /**
   * @returns current order.
   */
  public getCurrentOrder(): Observable < IOrder > {
  return of(this.currentOrder);
}

  /**
   * clear current order
   */
  public clearCurrentOrder(): Observable < any > {
  this.currentOrder = null;
  this._localStorageService.removeKey('currentOrder');
  return of(null);
}

  public getVat() {
  const vat = this.currentOrder ? this.currentOrder?.total?.vat : null;
  let totalVat = 0;
  if (vat) {
    vat.forEach(v => {
      totalVat += v.amount;
    })
  }
  return totalVat;
}

getTotal() {
  return this.currentOrder ? this.currentOrder.total.incl : 0;
}

  /**
 * Returns the complete url.
 * @param orderId
 * @param articleId
 */
  private _resourceUrl(orderId, articleLineId = null) {
  const url = `documents/orders/{${orderId}}`;
  if (articleLineId) {
    return `${url}/articlelines/{${articleLineId}}`;
  }
  return `${url}/articles`;
}
}
