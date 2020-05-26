import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { BackNavigationService } from './back.navigation.service';
import { goBackNavigationRequest, refreshBackNavigationDone, appendBackNavigationRequest, refreshBackNavigationRequest } from './back-navigation.actions';

@Injectable()
export class BackNavigationEffects {
    constructor(
        private _bnService: BackNavigationService,
        private actions$: Actions
    ) { }

    refreshBackNavigation$ = createEffect(() => this.actions$.pipe(
      ofType(refreshBackNavigationRequest),
      mergeMap(() => {
          return this._bnService.getUrl().pipe(
              map(url => refreshBackNavigationDone({ url })),
              catchError(() => EMPTY)
          )
      })
    ));

    goBackUrl$ = createEffect(() => this.actions$.pipe(
        ofType(goBackNavigationRequest),
        mergeMap((action) => {
            return this._bnService.goBack().pipe(
                map(url => refreshBackNavigationDone({ url })),
                catchError(() => EMPTY)
            )
        })
    ));

    appendBackNavigation$ = createEffect((): any => this.actions$.pipe(
        ofType(appendBackNavigationRequest),
        mergeMap((action) => {
            return this._bnService.add(action.url).pipe(
                map(url => refreshBackNavigationDone({ url })),
                catchError(() => EMPTY)
            )
        })
    ));

}
