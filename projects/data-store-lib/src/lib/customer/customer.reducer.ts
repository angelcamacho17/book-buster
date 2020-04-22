import { createReducer, on } from '@ngrx/store';
import { refreshCustomersDone, editCustomer, cancelCustomer } from './customer.actions';
import { CustomerState, Customer } from '../models/customer.model';

export const initialState: CustomerState = {
  customers: []
};

export const customersReducer = createReducer<Customer[]>(initialState.customers,
  on(refreshCustomersDone, (_, action) => action.customers),
);

