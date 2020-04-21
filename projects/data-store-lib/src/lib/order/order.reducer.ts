import { createReducer, on } from '@ngrx/store';
import { refreshOrdersDone, editOrder, cancelOrder } from './order.actions';
import { Order, OrderState } from '../models/order.model';

export const initialState: OrderState = {
  orders: []
};

export const ordersReducer = createReducer<Order[]>(initialState.orders,
  on(refreshOrdersDone, (_, action) => action.orders),
);

