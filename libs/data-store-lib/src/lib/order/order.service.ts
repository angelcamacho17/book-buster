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
    "articles": [],
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
    "articles": [],
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
    "articles": [],
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
    "articles": [],
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
    "articles": [],
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
    "articles": [],
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
    "articles": [],
    "description": "Order",
    "amount": 96.92,
    "createdBy": "Federico Ribero",
    "customer": {
      "id": 4,
      "name": "Rodrigo Martinez Jr",
      "address": "Jujuy 800",
      "initials": "RMJ",
      "smallIcon": true
    },}
    ,
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
      },
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
        }},
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
          }}
  ];

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
