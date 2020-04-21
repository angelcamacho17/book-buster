import { createReducer, on } from '@ngrx/store';
import { refreshOrdersDone, editOrder, cancelOrder } from './order.actions';
import { Order } from '../models/order.model';

export const ordersReducer = createReducer<Order[]>([],
  on(refreshOrdersDone, (_, action) => action.orders),
);

