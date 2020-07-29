import { createReducer, on } from '@ngrx/store';
import { refreshCustomersDone, editCustomer, cancelCustomer } from './customer.actions';
import { ICustomerState, ICustomer } from '../models/customer.model';

export const initialState: ICustomerState = {
  customers: []
};

export const customersReducer = createReducer<ICustomer[]>(initialState.customers,
  on(refreshCustomersDone, (_, action) => action.customers),
);

