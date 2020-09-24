import { OrderService } from './order.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, mergeMap, catchError } from 'rxjs/operators';
import {
  refreshOrdersRequest, refreshOrdersDone, appendOrderRequest,
  deleteOrderRequest, refreshOrderDone,
  setCurrentOrderRequest, getCurrentOrderRequest, handleOrderRequest,
  clearCurrentOrderRequest, refreshOrderRequest,
  getOrderRequest, createOrderRequest, switchCustomerRequest, addArticleLineToOrderRequest, editArticleLineFromOrderRequest, deleteArticleLineFromOrderRequest, handleArticleLineRequest
} from './order.actions';
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
      return this.orderService.getAll().pipe(
        map(orders => refreshOrdersDone({ orders })),
        catchError(() => EMPTY)
      );
    })
  ));

  refreshOrder$ = createEffect(() => this.actions$.pipe(
    ofType(refreshOrderRequest),
    mergeMap(() => {
      return this.orderService.getCurrentOrder().pipe(
        map(order => {
          return refreshOrderDone({ order });
        }),
        catchError(() => EMPTY)
      );
    })
  ));

  getOrder$ = createEffect(() => this.actions$.pipe(
    ofType(getOrderRequest),
    mergeMap((action) => {
      return this.orderService.getOrder(action.orderId).pipe(
        map(order => setCurrentOrderRequest({ order })),
        catchError(() => EMPTY)
      );
    })
  ));

  createOrder$ = createEffect(() => this.actions$.pipe(
    ofType(createOrderRequest),
    mergeMap((action) => {
      return this.orderService.createOrder(action.customer).pipe(
        map(order => setCurrentOrderRequest({ order })),
        catchError(() => EMPTY)
      );
    })
  ));

  switchCustomer$ = createEffect(() => this.actions$.pipe(
    ofType(switchCustomerRequest),
    mergeMap((action) => {
      return this.orderService.switchCustomer(action.orderId, action.customer).pipe(
        map(order => setCurrentOrderRequest({ order })),
        catchError(() => EMPTY)
      );
    })
  ));

  handleArticleLine$ = createEffect((): any => this.actions$.pipe(
    ofType(handleArticleLineRequest),
    mergeMap((action) => {
      return this.orderService.handleArticleLine(action.orderId, action.articleLine).pipe(
        map((order) => setCurrentOrderRequest({ order })),
        catchError(() => EMPTY)
      );
    })
  ));

  addArticleLine$ = createEffect((): any => this.actions$.pipe(
    ofType(addArticleLineToOrderRequest),
    mergeMap((action) => {
      return this.orderService.addArticleLine(action.orderId, action.articleLine).pipe(
        map((order) => setCurrentOrderRequest({ order })),
        catchError(() => EMPTY)
      );
    })
  ));

  editArticleLine$ = createEffect((): any => this.actions$.pipe(
    ofType(editArticleLineFromOrderRequest),
    mergeMap((action) => {
      return this.orderService.editArticleLine(action.orderId, action.articleLineId, action.quantity).pipe(
        map((order) => setCurrentOrderRequest({ order })),
        catchError(() => EMPTY)
      );
    })
  ));

  deleteArticleLine$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(deleteArticleLineFromOrderRequest),
      mergeMap((action) => {
        return this.orderService.deleteArticleLine(action.orderId, action.articleLineId).pipe(
          map((order) => setCurrentOrderRequest({ order })),
          catchError(() => EMPTY)
        );
      })
    ));

  setCurrentOrder$ = createEffect((): any => this.actions$.pipe(
    ofType(setCurrentOrderRequest),
    mergeMap((action) => {
      return this.orderService.setCurrentOrder(action.order).pipe(
        map((order) => {
          return refreshOrderRequest()
        }),
        catchError(() => EMPTY)
      )
    })
  ))

  getCurrentOrder$ = createEffect((): any => this.actions$.pipe(
    ofType(getCurrentOrderRequest),
    mergeMap((action) => {
      return this.orderService.getCurrentOrder().pipe(
        map((order) => refreshOrderRequest()),
        catchError(() => EMPTY)
      )
    })
  ))

  clearCurrentOrder$ = createEffect((): any => this.actions$.pipe(
    ofType(clearCurrentOrderRequest),
    mergeMap(() => {
      return this.orderService.clearCurrentOrder().pipe(
        map(() => {
          return refreshOrderRequest()
        }),
        catchError(() => EMPTY)
      )
    })
  ))


  // handleOrder$ = createEffect((): any => this.actions$.pipe(
  //   ofType(handleOrderRequest),
  //   mergeMap((action) => {

  //     if (this.orderService.currentOrder?.uuid) {
  //       return this.orderService.replaceCurrentOrder(action.order).pipe(
  //         map(() => refreshOrdersRequest()),
  //         catchError(() => EMPTY)
  //       );
  //     } else {
  //       return this.orderService.append(action.order).pipe(
  //         map(() => refreshOrdersRequest()),
  //         catchError(() => EMPTY)
  //       );
  //     }
  //   })
  // ))

  // appendOrder$ = createEffect((): any => this.actions$.pipe(
  //   ofType(appendOrderRequest),
  //   mergeMap((action) => {
  //     return this.orderService.append(action.order).pipe(
  //       map((order) => {
  //         return refreshOrdersRequest()
  //       }),
  //       catchError(() => EMPTY)
  //     );
  //   })
  // ))

  deleteOrder$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(deleteOrderRequest),
      mergeMap(() => {
        return this.orderService.delete().pipe(
          map(() => refreshOrdersRequest()),
          catchError(() => EMPTY)
        );
      })
    ))
}
