import { CustomerService } from './customer.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { refreshCustomersRequest, refreshCustomersDone, appendCustomerRequest, replaceCustomerRequest, deleteCustomerRequest } from './customer.actions';
import { EMPTY } from 'rxjs';

@Injectable()
export class CustomerEffects{
  constructor(private customerService: CustomerService,
              private actions$: Actions) { }

  refreshCustomers$ = createEffect(() =>this.actions$.pipe(
    ofType(refreshCustomersRequest),
    mergeMap(() => {
      return this.customerService.all().pipe(
        map(customers => refreshCustomersDone({customers})),
        catchError(() => EMPTY)
      );
    })
  ))

  appendCustomer$ = createEffect(():any => this.actions$.pipe(
    ofType(appendCustomerRequest),
    mergeMap((action) => {
      return this.customerService.append(action.customer).pipe(
        map(() => refreshCustomersRequest()),
        catchError(() => EMPTY)
      );
    })
  ))

  replaceCustomer$ = createEffect(():any => this.actions$.pipe(
    ofType(replaceCustomerRequest),
    mergeMap((action) => {
      console.log('replace effect');
      console.log(action.customer);
      return this.customerService.replace(action.customer).pipe(
        map(() => refreshCustomersRequest()),
        catchError(() => EMPTY)
      );
    })
  ))

  deleteCustomer$ = createEffect(():any =>
    this.actions$.pipe(
    ofType(deleteCustomerRequest),
    mergeMap((action) => {
      return this.customerService.delete(action.customerId).pipe(
        map(() => refreshCustomersRequest()),
        catchError(() => EMPTY)
      );
    })
  ))

}
