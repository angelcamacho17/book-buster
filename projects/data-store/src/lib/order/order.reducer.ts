import { createReducer, on } from '@ngrx/store';
import { refreshOrdersDone, editOrder, cancelOrder } from './order.actions';
import { Order } from '../models/order.model';

export const ordersReducer = createReducer<Order[]>([],
  on(refreshOrdersDone, (_, action) => action.orders),
);

export const editOrderReducer = createReducer<number>(-1,
  on(editOrder, (_, action) => action.orderId),
  on(cancelOrder, () => -1),
  on(refreshOrdersDone, () => -1)
)
