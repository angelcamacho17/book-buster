import { createReducer, on } from '@ngrx/store';
import { refreshOrdersDone, refreshOrderDone, refreshOrderSetted } from './order.actions';
import { IOrder, IOrderState, IOrdersState } from '../models/order.model';

export const initialOrders: IOrdersState = {
  orders: []
};

export const initialOrder: IOrderState = {
  order: null
};

export const ordersReducer = createReducer<IOrder[]>(initialOrders.orders,
  on(refreshOrdersDone, (_, action) => action.orders),
);

export const currentOrderReducer = createReducer<IOrder>(initialOrder.order,
  on(refreshOrderDone, (_, action) => {
    return action.order
  }),
  on(refreshOrderSetted, (_, action) => null),
);

