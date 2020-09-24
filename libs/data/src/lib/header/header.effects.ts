import { HeaderService } from './header.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { refreshHeaderRequest, refreshHeaderDone, setHeaderRequest } from './header.actions';
import { EMPTY } from 'rxjs';

@Injectable()
export class HeaderEffects{
  constructor(private headerService: HeaderService,
              private actions$: Actions) { }

  refreshHeader$ = createEffect(() =>this.actions$.pipe(
    ofType(refreshHeaderRequest),
    mergeMap(() => {
      return this.headerService.getHeader().pipe(
        map(header => refreshHeaderDone({header})),
        catchError(() => EMPTY)
      );
    })
  ))

  setHeader$ = createEffect(():any => this.actions$.pipe(
    ofType(setHeaderRequest),
    mergeMap((action) => {
      return this.headerService.setHeader(action.header).pipe(
        map(() => refreshHeaderRequest()),
        catchError(() => EMPTY)
      );
    })
  ))

}
