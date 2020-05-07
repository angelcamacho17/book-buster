import { OrderService } from './order.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { refreshOrdersRequest, refreshOrdersDone, appendOrderRequest, replaceOrderRequest, deleteOrderRequest, refreshOrderDone, setCurrentOrderRequest, getCurrentOrderRequest, refreshOrderSetted } from './order.actions';
import { EMPTY, of } from 'rxjs';

@Injectable()
export class OrderEffects {
  constructor(
    private orderService: OrderService,
    private actions$: Actions
  ) { }

  refreshOrders$ = createEffect(() => this.actions$.pipe(
    ofType(refreshOrdersRequest),
    mergeMap(() => {
      return this.orderService.all().pipe(
        map(orders => refreshOrdersDone({ orders })),
        catchError(() => EMPTY)
      );
    })
  ));

  setCurrentOrder$ = createEffect((): any => this.actions$.pipe(
    ofType(setCurrentOrderRequest),
    mergeMap((action) => {
      return this.orderService.setCurrentOrder(action.order).pipe(
        map(() => refreshOrderSetted()),
        catchError(() => EMPTY)
      )
    })
  ))

  getCurrentOrder$ = createEffect((): any => this.actions$.pipe(
    ofType(getCurrentOrderRequest),
    mergeMap((action) => {
      console.log('get');
      return this.orderService.getCurrentOrder().pipe(
        map((order) => refreshOrderDone({order})),
        catchError(() => EMPTY)
      )
    })
  ))

  appendOrder$ = createEffect((): any => this.actions$.pipe(
    ofType(appendOrderRequest),
    mergeMap((action) => {
      return this.orderService.append(action.order).pipe(
        map(() => refreshOrdersRequest()),
        catchError(() => EMPTY)
      );
    })
  ))

  replaceOrder$ = createEffect((): any => this.actions$.pipe(
    ofType(replaceOrderRequest),
    mergeMap((action) => {
      return this.orderService.replace(action.order).pipe(
        map(() => refreshOrdersRequest()),
        catchError(() => EMPTY)
      );
    })
  ))

  deleteOrder$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(deleteOrderRequest),
      mergeMap((action) => {
        return this.orderService.delete(action.orderId).pipe(
          map(() => refreshOrdersRequest()),
          catchError(() => EMPTY)
        );
      })
    ))

}
