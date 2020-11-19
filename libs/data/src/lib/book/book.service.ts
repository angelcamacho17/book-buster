import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { IBook } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private _books: IBook[] = [
    {
      title: 'Un saco de huesos',
      author: 'Stephen King',
      year: 1998,
      price: 4.5
    },
    {
      title: 'It',
      author: 'Stephen King',
      year: 1998,
      price: 4.5
    },
    {
      title: 'Revival',
      author: 'Stephen King',
      year: 1998,
      price: 4.5
    },
    {
      title: 'Cujo',
      author: 'Stephen King',
      year: 1998,
      price: 4.5
    },
  ]

  /**
   * @returns All books
   */
  public getAll(): Observable<IBook[]> {
    // this.setOrdersTotal();
    return of(this._books);
  }

  /**
   * Search for a book
   * @param filter 
   */
  public onSearchBook(filter: string): Observable<IBook[]> {
    return of(this._books.filter(book => book.title.toLowerCase().includes(filter.toLowerCase())));
  }

}
