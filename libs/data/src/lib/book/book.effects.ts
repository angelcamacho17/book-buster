import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { BookService } from './book.service';

@Injectable()
export class BookEffects {
  constructor(
    private bookService: BookService,
    private actions$: Actions
  ) { }
}
