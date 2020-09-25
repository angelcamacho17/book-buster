import { UserService } from './user.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { refreshUsersRequest, refreshUsersDone, appendUserRequest, replaceUserRequest, deleteUserRequest, getUsersRequest, refreshScannedUserDone, getUserScannedRequest } from './user.actions';
import { EMPTY } from 'rxjs';

@Injectable()
export class UserEffects{
  constructor(private userService: UserService,
              private actions$: Actions) { }

  getUsers$ = createEffect(() =>this.actions$.pipe(
    ofType(getUsersRequest),
    mergeMap((action) => {
      return this.userService.getUsers(action.filter).pipe(
        map(users => refreshUsersDone({users})),
        catchError(() => EMPTY)
      );
    })
  ))

  getUserScanned$ = createEffect(() => this.actions$.pipe(
    ofType(getUserScannedRequest),
    mergeMap((action) => {
        return this.userService.getScannedUser(action.barcode).pipe(
            map((res: any) => {
              return refreshScannedUserDone({ user: res?.body?.data?.users[0] })
            }),
            catchError(() => EMPTY)
        )
    })
));

  refreshUsers$ = createEffect(() =>this.actions$.pipe(
    ofType(refreshUsersRequest),
    mergeMap(() => {
      return this.userService.getAll().pipe(
        map(users => refreshUsersDone({users})),
        catchError(() => EMPTY)
      );
    })
  ))

  appendUser$ = createEffect(():any => this.actions$.pipe(
    ofType(appendUserRequest),
    mergeMap((action) => {
      return this.userService.append(action.user).pipe(
        map(() => refreshUsersRequest()),
        catchError(() => EMPTY)
      );
    })
  ))

  replaceUser$ = createEffect(():any => this.actions$.pipe(
    ofType(replaceUserRequest),
    mergeMap((action) => {
      return this.userService.replace(action.user).pipe(
        map(() => refreshUsersRequest()),
        catchError(() => EMPTY)
      );
    })
  ))

  deleteUser$ = createEffect(():any =>
    this.actions$.pipe(
    ofType(deleteUserRequest),
    mergeMap((action) => {
      return this.userService.delete(action.userId).pipe(
        map(() => refreshUsersRequest()),
        catchError(() => EMPTY)
      );
    })
  ))

}
