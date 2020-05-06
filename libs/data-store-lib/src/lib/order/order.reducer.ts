import { createReducer, on } from '@ngrx/store';
import { refreshOrdersDone, refreshOrderDone, refreshOrderSetted } from './order.actions';
import { Order, OrderState, OrdersState } from '../models/order.model';

export const initialOrders: OrdersState = {
  orders: []
};

export const initialOrder: OrderState = {
  order: null
};

export const ordersReducer = createReducer<Order[]>(initialOrders.orders,
  on(refreshOrdersDone, (_, action) => action.orders),
);

export const currentOrderReducer = createReducer<Order>(initialOrder.order,
  on(refreshOrderDone, (_, action) => action.order),
  on(refreshOrderSetted, (_, action) => null),
);

