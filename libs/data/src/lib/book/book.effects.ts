import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, mergeMap, catchError, filter } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { BookService } from './book.service';
import { refreshBooksDone, refreshBooksRequest, searchBookRequest } from './book.actions';

@Injectable()
export class BookEffects {
  constructor(
    private bookService: BookService,
    private actions$: Actions
  ) { }

  refreshBooks$ = createEffect(() => this.actions$.pipe(
    ofType(refreshBooksRequest),
    mergeMap(() => {
      return this.bookService.getAll().pipe(
        map(books => {
          console.log(books)
          return refreshBooksDone({ books })  
        }),
        catchError(() => EMPTY)
      );
    })
  ));

  searchBook$ = createEffect(() => this.actions$.pipe(
    ofType(searchBookRequest),
    mergeMap((action) => {
      return this.bookService.onSearchBook(action.filter).pipe(
        map(books => {
          console.log(books);
          return refreshBooksDone({ books })  
        }),
        catchError(() => EMPTY)
      );
    })
  ));

}
