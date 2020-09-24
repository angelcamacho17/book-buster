import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { KeyValueStoreService } from '../sdp/keyvaluestore/keyvaluestore.service';
import { OrderService } from '../order/order.service';

@Injectable()
export class FeOrderGuard implements CanActivate {

    constructor(private key: KeyValueStoreService, private ordSer: OrderService, private router: Router) { }

    canActivate(): Observable<boolean> {
      if(this.ordSer.currentOrder) {
        return of(true)
      } else {
        this.router.navigate(['/home']);
        return of(false);
      }
    }
}
