import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { setHeaderTitleRequest, refresHeaderDone } from './header.actions';
import { HeaderService } from './header.service';

@Injectable()
export class HeaderEffects {
  constructor(
    private actions$: Actions,
    private headerService: HeaderService
  ) { }

  setTitle$ = createEffect((): any => this.actions$.pipe(
    ofType(setHeaderTitleRequest),
    mergeMap((action) => {
      console.log(action);
      return this.headerService.setTitle(action.title).pipe(
        map(title => refresHeaderDone({ title })),
        catchError(() => EMPTY)
      );
    })
  ))
}
