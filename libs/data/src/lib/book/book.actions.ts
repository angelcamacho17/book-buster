import { createAction, props } from '@ngrx/store';
import { IBook } from '../models/xbook.model';

// App Books
export const appendBookRequest = createAction('[Book] Append Book Request', props<{ book: IBook }>());

// New webservices actions
export const getBookRequest = createAction('[Book] Get Book Request', props<{ bookId: number }>());
export const refreshBooksRequest = createAction('[Book] Refresh Books Request');
export const refreshBooksDone = createAction('[Book] Refresh Books Done', props<{ books: IBook[] }>());
export const handleBookRequest = createAction('[Book] Handle Book Request', props<{ book: IBook }>());
export const searchBookRequest = createAction('[Book] Book Search Request', props<{ filter: string }>());
export const deleteBookRequest = createAction('[Book] Delete Book Request');

// Current Book
export const refreshBookRequest = createAction('[Current Book] Refresh Book Request');
export const setCurrentBookRequest = createAction('[Current Book] Set Current Book Done', props<{ book: IBook }>());
export const clearCurrentBookRequest = createAction('[Current Book] Clear Current Book Done');
export const getCurrentBookRequest = createAction('[Current Book] Get Current Book Done');
export const refreshBookDone = createAction('[Current Book] Refresh Book Done', props<{ book: IBook }>());
export const refreshBookSetted = createAction('[Current Book] Refresh Book Setted');
