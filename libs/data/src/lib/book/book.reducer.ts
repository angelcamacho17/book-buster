import { createReducer, on } from '@ngrx/store';
import { refreshBooksDone, refreshBookDone, refreshBookSetted } from './book.actions';
import { IBook, IBookState, IBooksState } from '../models/xbook.model';

export const initialBooks: IBooksState = {
  books: []
};

export const initialBook: IBookState = {
  book: null
};

export const booksReducer = createReducer<IBook[]>(initialBooks.books,
  on(refreshBooksDone, (_, action) => action.books),
);

export const currentBookReducer = createReducer<IBook>(initialBook.book,
  on(refreshBookDone, (_, action) => {
    return action.book
  }),
  on(refreshBookSetted, (_, action) => null),
);

