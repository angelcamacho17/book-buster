import { OrderService } from './order.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { refreshOrdersRequest, refreshOrdersDone, appendOrderRequest, replaceOrderRequest, deleteOrderRequest, refreshOrderDone, setCurrentOrderRequest, getCurrentOrderRequest, refreshOrderSetted, handleOrderRequest, clearCurrentOrderRequest, replaceArticlesOnCurrentOrder, replaceCurrentOrderRequest } from './order.actions';
import { EMPTY, of } from 'rxjs';

@Injectable()
export class OrderEffects {
  constructor(
    private orderService: OrderService,
    private actions$: Actions
  ) { }

  /* replaceArticlesOnCurrentOrder$ = createEffect(() => this.actions$.pipe(
    ofType(replaceArticlesOnCurrentOrder),
    mergeMap((action) => {
      return this.orderService.replaceArticles(action.orderArticles).pipe(
        map((order) => refreshOrderDone({ order })),
        catchError(() => EMPTY)
      );
    })
  )); */

  refreshOrders$ = createEffect(() => this.actions$.pipe(
    ofType(refreshOrdersRequest),
    mergeMap(() => {
      return this.orderService.all().pipe(
        map(orders => refreshOrdersDone({ orders })),
        catchError(() => EMPTY)
      );
    })
  ));

  replaceCurrentOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(replaceCurrentOrderRequest),
      mergeMap((action) => {
        return this.orderService.replaceCurrentOrder(action.order).pipe(
          map(() => refreshOrderSetted()),
          catchError(() => EMPTY)
        )
      })
    )
  })

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
      return this.orderService.getCurrentOrder().pipe(
        map((order) => refreshOrderDone({order})),
        catchError(() => EMPTY)
      )
    })
  ))

  clearCurrentOrder$ = createEffect((): any => this.actions$.pipe(
    ofType(clearCurrentOrderRequest),
    mergeMap(() => {
      return this.orderService.clearCurrentOrder().pipe(
        map(() => refreshOrderSetted()),
        catchError(() => EMPTY)
      )
    })
  ))


  handleOrder$ = createEffect((): any => this.actions$.pipe(
    ofType(handleOrderRequest),
    mergeMap((action) => {
      if (this.orderService.currentOrder) {
        return this.orderService.replace(action.order).pipe(
          map(() => refreshOrdersRequest()),
          catchError(() => EMPTY)
        );
      } else {
        return this.orderService.append(action.order).pipe(
          map(() => refreshOrdersRequest()),
          catchError(() => EMPTY)
        );
      }
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
