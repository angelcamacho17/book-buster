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
export class BookService {
  
}
